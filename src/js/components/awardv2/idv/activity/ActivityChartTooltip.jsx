/**
 * FederalAccountsTreeTooltip.jsx
 * Created by Jonathan Hill 5/2/19
 */

import React from 'react';
import PropTypes from 'prop-types';

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

        this.measureWindow = this.measureWindow.bind(this);
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

    getLinks(path, data) {
        if (data === '--') {
            return (<div>{data}</div>);
        }
        return (
            <a
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

    positionTooltip() {
        // award bar info ( BaseIdvActivityBar ) and data needed to display correctly
        const { data } = this.props;
        // measure the tooltip width
        const awardAgencyDiv = this.awardAgencyDiv.getBoundingClientRect().width;
        const recipientDiv = this.recipientDiv.getBoundingClientRect().width;
        const divHeight = this.div.getBoundingClientRect().height;

        let theTooltipWidth = awardAgencyDiv + recipientDiv + 70;
        let xPosition = data.x;
        let yPosition = data.y;

        if (this.props.data.y < divHeight) {
            yPosition += (divHeight + 7);
        }

        // get the spacing from the start of the graph to the start of the bar
        const spacingFromStartToBar = data.graphWidth - (data.graphWidth - data.start);
        const totalAvailableWidthToTheLeft = spacingFromStartToBar + data.barWidth;
        const totalAvailableWidthToTheRight = data.graphWidth - spacingFromStartToBar;

        let truncatedAgency;
        let truncatedRecipient;
        if (data.graphWidth <= theTooltipWidth) {
            truncatedAgency = `${data.awardingAgencyName.substring(0, 7).trim()}...`;
            truncatedRecipient = `${data.recipientName.substring(0, 7).trim()}...`;
            const startDateDiv = this.startDateDiv.getBoundingClientRect().width;
            const endDateDiv = this.endDateDiv.getBoundingClientRect().width;
            const amountsDiv = this.amountsDiv.getBoundingClientRect().width;
            theTooltipWidth = startDateDiv + endDateDiv + amountsDiv + 100;
        }
        this.setState({
            awardingAgency: truncatedAgency || data.awardingAgencyName,
            recipient: truncatedRecipient || data.recipientName,
            truncated: truncatedAgency
        });
        // if the area from the start of the bar to the end of the graph is larger than the tooltip
        // width, position the tooltip to the left of the bar
        let left = false;
        if (totalAvailableWidthToTheRight < totalAvailableWidthToTheLeft) {
            const percentage = 0.9 * data.barWidth;
            xPosition -= (theTooltipWidth - percentage);
            left = true;
        }
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
        const awardedAgencyHover = (
            <div className="tooltip-body__row-info-data__awarding-agency-name-hover">
                {data.awardingAgencyName}
            </div>
        );
        const recipientHover = (
            <div className="tooltip-body__row-info-data__awarding-recipient-hover">
                {data.recipientName}
            </div>
        );

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
                                    {this.getLinks(`award/${data.piid}`, data.piid)}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    Parent Award
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    {
                                        this.getLinks(
                                            `award/${data.parentAwardId}`,
                                            data.parentAwardName
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
                                            this.state.awardingAgency
                                        )
                                    }
                                    {this.state.truncated && awardedAgencyHover}
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
                                            this.state.recipient.toUpperCase()
                                        )
                                    }
                                    {this.state.truncated && recipientHover}
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
