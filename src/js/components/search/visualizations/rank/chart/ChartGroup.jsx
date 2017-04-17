/**
 * ChartGroup.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';
import _ from 'lodash';

const propTypes = {
    label: React.PropTypes.string,
    labelWidth: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    index: React.PropTypes.number,
    linkID: React.PropTypes.string,
    urlRoot: React.PropTypes.string,
    clickedGroup: React.PropTypes.func
};

export default class ChartGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false
        };

        this.clickedLabel = this.clickedLabel.bind(this);
    }

    componentDidMount() {
        this.initialRender(this.props.label);
    }

    componentWillReceiveProps(props) {
        this.initialRender(props.label);
    }

    componentDidUpdate() {
        if (!this.state.didProcess) {
            // the label changed and needs to be reprocessed
            this.truncateText();
        }
    }

    processLink(label) {
        let title = label;

        if (this.props.linkID !== '') {
            title = (<a href={`${this.props.urlRoot}${this.props.linkID}`}>
                {label}
            </a>);
        }

        return title;
    }

    initialRender(label) {
        // We can only access the label width after we have rendered the full text due to the
        // variable widths of characters in non-monospaced fonts.
        // In this function, we trigger an initial render of the full text, then we perform the
        // calculations to test if truncation is necessary; if so, we'll re-render (this is
        // automatically triggered when we change the label state value).
        this.setState({
            label: this.processLink(label),
            didProcess: false
        });
    }

    truncateText() {
        // determine if the text needs to be truncated
        // get the current label width
        const fullWidth = this.svgText.getBBox().width;

        // there's a 12px margin on both sides of the label space
        const maxWidth = this.props.labelWidth - 24;

        let truncatedLabel = this.props.label;

        // make sure that the max width is positive (might be -24 if the tab loaded in the
        // background)
        if (fullWidth > maxWidth && maxWidth > 0) {
            // the label is going to exceed the available space, truncate it
            // determine how much of the text we can keep

            // calculate the averge character width
            const avgCharWidth = (fullWidth / this.props.label.length);

            // determine how many characters can fit in the available space
            const maxChars = Math.floor((maxWidth) / avgCharWidth);

            // truncate the label
            truncatedLabel = _.truncate(this.props.label, {
                length: maxChars
            });
        }

        this.setState({
            label: this.processLink(truncatedLabel),
            didProcess: true
        });
    }

    clickedLabel() {
        if (this.props.clickedGroup) {
            this.props.clickedGroup(this.props.index);
        }
    }

    render() {
        let backgroundClass = 'odd';
        if (this.props.index % 2 === 0) {
            backgroundClass = 'even';
        }

        let linkClass = '';
        if (this.props.linkID !== '') {
            linkClass = ' group-label-link';
        }

        return (
            <g
                className="chart-group"
                transform={`translate(0,${this.props.index * this.props.height})`}>

                <title>{this.props.label}</title>

                <rect
                    className={`group-background ${backgroundClass}`}
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height} />

                <g transform="translate(12,34)">
                    <text
                        className={`group-label ${linkClass}`}
                        onClick={this.clickedLabel}
                        ref={(text) => {
                            this.svgText = text;
                        }}>
                        {this.state.label}
                    </text>
                </g>
            </g>
        );
    }
}

ChartGroup.propTypes = propTypes;
