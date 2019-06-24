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
        this.mouseLeave = this.mouseLeave.bind(this);
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
        // award and bar info
        const { data } = this.props;
        // measure the tooltip width
        const awardAgencyDiv = this.awardAgencyDiv.getBoundingClientRect().width;
        const recipientDiv = this.recipientDiv.getBoundingClientRect().width;
        const divHeight = this.div.getBoundingClientRect().height;
        console.log(' Awarding Agency Width : ', awardAgencyDiv);
        console.log(' Recipient Div : ', recipientDiv);
        let theTooltipWidth = awardAgencyDiv + recipientDiv + 70;
        let xPosition = data.x;
        let yPosition = data.y;
        // ajust Y position: if bar y position (considering the y
        // of the bar is the distance from the bottom of the graph because the graph starts at 0)
        // is smaller than the tooltip height show tooltip on top of bar
        if (this.props.data.y < divHeight) {
            yPosition += (divHeight + 7);
        }
        // console.log(' Graph Width : ', this.props.data.graphWidth);
        // console.log(' Start : ', this.props.data.start);
        // console.log(' Bar Width : ', this.props.data.barWidth);
        // console.log(' Tooltip Width : ', theTooltipWidth);

        // get the spacing from the start of the graph to the start of the bar
        const spacingFromStartToBar = data.graphWidth - (data.graphWidth - data.start);
        // get the spacing from the end of the bar to the end of the graph
        const spacingFromEndofBar = data.graphWidth - (spacingFromStartToBar + data.barWidth);
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
            truncated: true
        });
        // if the area from the start of the bar to the end of the graph is larger than the tooltip
        // width, position the tooltip to the left of the bar
        let left = false;
        if (totalAvailableWidthToTheRight < totalAvailableWidthToTheLeft) {
            const percentage = 0.9 * data.barWidth;
            xPosition -= (theTooltipWidth - percentage);
            left = true;
        }
        // console.log('left : ', left);
        // console.log('Tooltip Width : ', theTooltipWidth);
        // console.log('Right Available width : ', totalAvailableWidthToTheRight);
        if (!left && (theTooltipWidth > totalAvailableWidthToTheRight)) {
            const overshowing = theTooltipWidth - totalAvailableWidthToTheRight;
            xPosition -= overshowing;
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

    mouseLeave() {
        this.props.mouseOutOfTooltipDiv(this.props.data);
    }

    render() {
        const { data } = this.props;
        const awardedAgencyHover = (
            <div className="awarded-agency-hover">
                {data.awardingAgencyName}
            </div>
        );
        const recipientHover = (
            <div className="recipient-hover">
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
                    onMouseLeave={this.mouseLeave}
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
                                    <a
                                        href={
                                            `https://www.usaspending.gov/#/award/${data.piid}`}>
                                        {data.piid}
                                    </a>
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    Parent IDV PIID
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    <a
                                        href={
                                            `https://www.usaspending.gov/#/award/${data.piid}`
                                        }>
                                    NeedParentPiid
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Awarding Agency
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data awardingAgencyName"
                                    ref={(div) => {
                                        this.awardAgencyDiv = div;
                                    }}>
                                    <a
                                        href={
                                            `https://www.usaspending.gov/#/agency/
                                            ${data.awardingAgencyId}`
                                        }>
                                        {this.state.awardingAgency}
                                    </a>
                                </div>
                                {awardedAgencyHover}
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Recipient
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data recipientName"
                                    ref={(div) => {
                                        this.recipientDiv = div;
                                    }}>
                                    <a
                                        href={
                                            `https://www.usaspending.gov/#/recipient/
                                            ${data.recipientId}`
                                        }>
                                        {this.state.recipient.toUpperCase()}
                                    </a>
                                </div>
                                {recipientHover}
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
