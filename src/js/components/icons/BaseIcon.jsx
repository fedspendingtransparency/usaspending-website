/**
  * BaseIcon.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { PropTypes } from 'react';
import svg4everybody from 'svg4everybody';
import Request from 'superagent';
import xmldoc from 'xmldoc';
import EventEmitter from 'eventemitter2';
import { kGlobalConstants } from '../../GlobalConstants.js';

const svgData = {};
let loadingState = 0;

const propTypes = {
	iconClass: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired
};

const emitter = new EventEmitter();
// increase the number of listeners to 25 to handle the increase in icons we're adding to pages
emitter.setMaxListeners(25);

export default class BaseIcon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			icon: {
				data: '',
				viewBox: '0 0 0 0'
			}
		};
	}
	componentDidMount() {
		// download icons if necessary, otherwise populate the correct state
		this.prepareIcons();

		// necessary for IE support
		svg4everybody({
			polyfill: true
		});
	}


	parseSvg(rawSvg) {
		// downloaded raw SVG data, send it through an XML parser
		const data = new xmldoc.XmlDocument(rawSvg);

		// iterate through each symbol and extract the symbol's content XML as a string and also its viewbox attribute
		data.childrenNamed('symbol').forEach((symbol) => {
			let childData = '';
			symbol.eachChild((child) => {
				childData += child.toString();
			});

			// save all this data into the svg data singleton
			svgData[symbol.attr.id] = {
				data: childData,
				viewBox: symbol.attr.viewBox
			};

		});
	}

	prepareIcons() {
		// check to see if anyone has started the download process
		if (loadingState > 0) {

			// someone has, ideally load the SVG data out of memory
			if (loadingState == 2 && svgData.hasOwnProperty(this.props.iconName)) {
				this.setState({
					icon: svgData[this.props.iconName]
				});
			}
			else if (loadingState == 1) {
				// handle the case where the SVG is still being loaded by another component
				// set up a listener to populate the state once that download is complete
				emitter.once('usa-da-icons.loaded', () => {
					this.setState({
						icon: svgData[this.props.iconName]
					});
				});
			}
		}
		else {
			loadingState = 1;

			// no one has started downloading the SVG file yet, so start it here
			Request.get("graphics/icons.svg")
				.send()
				.end((err, res) => {
					if (!err) {
						// parse the response
						this.parseSvg(res.text);

						// set the state to the correct SVG data
						if (svgData.hasOwnProperty(this.props.iconName)) {
							this.setState({
								icon: svgData[this.props.iconName]
							});
						}

						// notify any other icon components that the SVG data is ready
						emitter.emit('usa-da-icons.loaded');
						loadingState = 2;
					}
					else {
						// something went wrong, so let's reset the loading state and try again on the next icon
						loadingState = 0;
					}
				});
		}
	}

	render() {
		return (
			<svg className={this.props.iconClass} viewBox={this.state.icon.viewBox} key={this.state.icon.data} dangerouslySetInnerHTML={{__html: this.state.icon.data}} />
		);
	}
}

BaseIcon.propTypes = propTypes;
