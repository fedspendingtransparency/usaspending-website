/**
 * IdvActivityTooltip.jsx
 * Created by Jonathan Hill 6/24/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const propTypes = {
    data: PropTypes.object,
    mouseIsInTooltipDiv: PropTypes.func,
    mouseOutOfTooltipDiv: PropTypes.func
};

export default class IdvActivityTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: 'top',
            tooltipStyle: {
                transform: ''
            },
            windowWidth: 0,
            windowHeight: 0,
            awardingAgency: props.data.awardingAgencyName,
            recipient: props.data.recipientName,
            truncated: false
        };

        throttle(this.measureWindow = this.measureWindow.bind(this), 50);
        this.mouseEnter = this.mouseEnter.bind(this);
    }
    componentDidMount() {
        this.measureWindow();
        window.addEventListener('resize', this.measureWindow);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.x !== this.props.data.x || prevProps.data.y !== this.props.data.y) {
            this.positionTooltip();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWindow);
    }

    getLinks(path, data, params) {
        if (data === '--') {
            return (<div>{data}</div>);
        }
        let title;
        if (this.state.truncated) {
            title = params;
        }
        return (
            <a
                title={title}
                href={
                    `/#/${path}`}>
                {data}
            </a>
        );
    }

    measureWindow() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.setState({
            windowWidth,
            windowHeight
        }, () => {
            this.positionTooltip();
        });
    }

    truncateText(awardingAgencyNameDiv, recipientNameDiv, theTooltipWidth) {
        return new Promise(resolve => {
            const { graphWidth, recipientName, awardingAgencyName } = this.props.data;
            // get awardingAgencyName truncated width based on the tooltip width and graph width
            const truncatedTextWidthAgency =
            (graphWidth * awardingAgencyNameDiv) / theTooltipWidth;
            // get recipientName truncated width based on the tooltip width and graph width
            const truncatedTextWidthRecipient =
            (graphWidth * recipientNameDiv) / theTooltipWidth;
            // we now have a ratio of the truncated width to the total width,
            // and we have the total length
            // we can now find the appropriate truncated
            // length for the awardingAgencyName and recipientName
            const truncatedTextLengthAgency = Math.floor(
                ((truncatedTextWidthAgency * awardingAgencyName.length) / awardingAgencyNameDiv) / 2);
            const truncatedTextLengthRecipient = Math.floor(
                ((truncatedTextWidthRecipient * recipientName.length) / recipientNameDiv) / 2);
            const truncatedAgency = `${awardingAgencyName
                .substring(0, truncatedTextLengthAgency).trim()}...`;
            const truncatedRecipient = `${recipientName
                .substring(0, truncatedTextLengthRecipient).trim()}...`;
            this.setState({
                awardingAgency: truncatedAgency,
                recipient: truncatedRecipient,
                truncated: true
            }, () => resolve());
        });
    }

    async positionTooltip() {
        // award bar info ( BaseIdvActivityBar ) and data needed to display correctly
        const { data } = this.props;
        // measure the tooltip width
        const awardingAgencyNameDiv = this.awardAgencyDiv.getBoundingClientRect().width;
        const recipientNameDiv = this.recipientDiv.getBoundingClientRect().width;
        const tooltipDivHeight = this.div.getBoundingClientRect().height;
        // set the tooltip width to be the width of the largest row
        let theTooltipWidth = awardingAgencyNameDiv + recipientNameDiv + 70;
        let xPosition = data.x;
        let yPosition = data.y;
        // measuring from bottom of graph ( graph starts at 0 so we already have the height, with data.y)
        // if data.y is smaller than the height of the tooltip, show on top
        if (yPosition < tooltipDivHeight) {
            yPosition += (tooltipDivHeight + 7);
        }
        // get the spacing from start of graph to start of bar
        const spacingFromStartToBar = data.graphWidth - (data.graphWidth - data.start);
        // get spacing from end of bar to the start of graph
        const totalAvailableWidthToTheLeft = spacingFromStartToBar + data.barWidth;
        // get spacing from start of bar to the end of graph
        const totalAvailableWidthToTheRight = data.graphWidth - spacingFromStartToBar;
        // show left if there is greater witdth to the left
        let left;
        if (totalAvailableWidthToTheRight < totalAvailableWidthToTheLeft) {
            const percentage = 0.9 * data.barWidth;
            xPosition -= (theTooltipWidth - percentage);
            left = true;
        }
        // if we are displaying right && the tooltip is bigger than the available width
        // we are out of scope of the graph
        if (!left && (theTooltipWidth > totalAvailableWidthToTheRight)) {
            const overshowing = theTooltipWidth - totalAvailableWidthToTheRight;
            xPosition -= overshowing;
        }
        // if x position of off the page, move it on the page
        if (xPosition.toString()[0] === '-') {
            const difference = 0 - xPosition;
            // adjust the tooltip width based on x position movement
            theTooltipWidth += difference;
            xPosition = 0;
        }

        const startDateDiv = this.startDateDiv.getBoundingClientRect().width;
        const endDateDiv = this.endDateDiv.getBoundingClientRect().width;
        const amountsDiv = this.amountsDiv.getBoundingClientRect().width;
        // truncate text when the tooltip is bigger than the graph
        if (data.graphWidth < theTooltipWidth) {
            await this.truncateText(awardingAgencyNameDiv, recipientNameDiv, theTooltipWidth);
        }
        if (this.state.truncated) theTooltipWidth = startDateDiv + endDateDiv + amountsDiv + 100;
        this.setState({
            tooltipStyle: {
                transform: `translate(${xPosition}px,-${yPosition}px)`,
                width: `${theTooltipWidth}px`
            }
        });
    }

    mouseEnter() {
        this.props.mouseIsInTooltipDiv(this.props.data);
    }

    render() {
        const { data } = this.props;

        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className="tooltip"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.props.mouseOutOfTooltipDiv}
                    style={this.state.tooltipStyle}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <h5 className="tooltip-title">
                        { data.grandchild ? 'GRANDCHILD' : 'CHILD'} AWARD
                    </h5>
                    <div
                        className="tooltip-body"
                        ref={(div) => {
                            this.tooltipBody = div;
                        }}>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    PIID
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    {this.getLinks(`award/${data.generatedId}`, data.piid)}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    Parent Award
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    {
                                        this.getLinks(
                                            `award/${data.parentGeneratedId}`,
                                            data.parentAwardPIID
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Awarding Agency
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data
                                    tooltip-body__row-info-data__awarding-agency-name"
                                    ref={(div) => {
                                        this.awardAgencyDiv = div;
                                    }}>
                                    {
                                        this.getLinks(
                                            `agency/${data.awardingAgencyId}`,
                                            this.state.awardingAgency,
                                            data.awardingAgencyName
                                        )
                                    }
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Recipient
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data
                                    tooltip-body__row-info-data__recipient-name"
                                    ref={(div) => {
                                        this.recipientDiv = div;
                                    }}>
                                    {
                                        this.getLinks(
                                            `recipient/${data.recipientId}`,
                                            this.state.recipient.toUpperCase(),
                                            data.recipientName
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">Start</h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(d) => {
                                        this.startDateDiv = d;
                                    }}>
                                    {data.startDate}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info second-child">
                                <h6 className="tooltip-body__row-info-title">End</h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(d) => {
                                        this.endDateDiv = d;
                                    }}>
                                    {data.endDate}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Awarded Amount
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(d) => {
                                        this.amountsDiv = d;
                                    }}>
                                    <strong>
                                        {data._obligatedAmount !== 0 ?
                                            `${data.obligatedAmount} ` : '-- '}
                                    </strong>
                                    of {data._awardedAmount !== 0 ? data.awardedAmount : '--'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

IdvActivityTooltip.propTypes = propTypes;
