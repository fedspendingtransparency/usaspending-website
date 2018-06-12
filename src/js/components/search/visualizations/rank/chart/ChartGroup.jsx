/**
 * ChartGroup.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';

const propTypes = {
    label: PropTypes.string,
    labelWidth: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    index: PropTypes.number,
    linkID: PropTypes.string,
    urlRoot: PropTypes.string,
    clickedGroup: PropTypes.func
};

export default class ChartGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false
        };
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
        let linkClass = '';
        if (this.props.linkID !== '') {
            linkClass = ' group-label-link';
        }
        let title = (
            <text
                className={`group-label ${linkClass}`}
                ref={(text) => {
                    this.svgText = text;
                }}>
                {label}
            </text>
        );

        /* eslint-disable jsx-a11y/anchor-is-valid */
        // the link is actually valid since the URL root will provide an absolute URL
        if (this.props.linkID !== '') {
            title = (
                <a xlinkHref={`${this.props.urlRoot}${this.props.linkID}`}>
                    <text
                        className={`group-label ${linkClass}`}
                        ref={(text) => {
                            this.svgText = text;
                        }}>
                        {label}
                    </text>
                </a>
            );
        }
        /* eslint-enable jsx-a11y/anchor-is-valid */

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
            truncatedLabel = truncate(this.props.label, {
                length: maxChars
            });
        }

        this.setState({
            label: this.processLink(truncatedLabel),
            didProcess: true
        });
    }

    render() {
        let backgroundClass = 'odd';
        if (this.props.index % 2 === 0) {
            backgroundClass = 'even';
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

                <g transform="translate(12,20)">
                    {this.state.label}
                </g>
            </g>
        );
    }
}

ChartGroup.propTypes = propTypes;
