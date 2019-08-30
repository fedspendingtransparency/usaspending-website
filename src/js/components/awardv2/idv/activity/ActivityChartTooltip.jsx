/**
 * ActivityChartTooltip.jsx
 * Created by Jonathan Hill 6/24/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { formatMoney } from 'helpers/moneyFormatter';

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
            recipientName: props.data.recipientName,
            awardingAgencyName: props.data.awardingAgencyName,
            piid: props.data.piid,
            parentAwardPIID: props.data.parentAwardPIID,
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

    getLinks(path, id, data, params) {
        if (data === '--' || id === '--') {
            return (<div>{data}</div>);
        }
        let title;
        if (this.state.truncated) {
            title = params;
        }
        return (
            <a
                title={title}
                href={`/#/${path}/${id}`}>
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
    // uses a ratio of
    // someDiv / GraphWidth = x ( TruncatedWidth ) / shortenedTooltipWidth
    // to get what the shortened width of the div should be
    truncatedWidth(graphWidth, tooltipWidth, div) {
        return (graphWidth * div) / tooltipWidth;
    }
    // uses a ratio of
    // TruncatedDivWidth / NormalDivWidth =
    // x ( Truncated character length ) / NormalCharacterLength
    truncatedCharacterLength(truncatedDivWidth, normalDivWidth, normalCharacterLength) {
        return Math.floor(
            ((truncatedDivWidth * normalCharacterLength) / normalDivWidth) / 2);
    }
    // truncates the text if warranted
    truncateText(text, truncatedLength, propertyName) {
        if (truncatedLength < text.length) {
            const truncatedText = `${text
                .substring(0, truncatedLength).trim()}...`;
            return { [propertyName]: truncatedText };
        }
        return { [propertyName]: text };
    }

    truncateLogic(arrayOfDivsToTruncate, theTooltipWidth) {
        return new Promise((resolve) => {
            const {
                graphWidth,
                recipientName,
                awardingAgencyName,
                piid,
                parentAwardPIID
            } = this.props.data;
            // need this to find the appropriate text to pass to
            // truncatedCharacterLength
            const arrayOfDivText = [
                recipientName,
                awardingAgencyName,
                piid,
                parentAwardPIID
            ];
            // need this to set the properties for state
            const arrayOfProperties = [
                'recipientName',
                'awardingAgencyName',
                'piid',
                'parentAwardPIID'
            ];
            const truncatedWidths = arrayOfDivsToTruncate.map((divWidth) => this.truncatedWidth(
                graphWidth, theTooltipWidth, divWidth));
            const truncatedLengths = truncatedWidths
                .map((truncatedDivWidth, index) => this.truncatedCharacterLength(
                    truncatedDivWidth,
                    arrayOfDivsToTruncate[index],
                    arrayOfDivText[index].length));
            const truncatedText = truncatedLengths.reduce((acc, truncatedLength, index) => {
                return {
                    ...acc,
                    ...this.truncateText(
                        arrayOfDivText[index],
                        truncatedLength,
                        arrayOfProperties[index]
                    )
                };
            }, {});
            // truncated to true adds titles to the a tags
            this.setState({ ...truncatedText, truncated: true }, () => resolve());
        });
    }

    async positionTooltip() {
        // award bar info ( BaseIdvActivityBar ) and data needed to display correctly
        const { data } = this.props;
        // measure the tooltip width
        // the two divs below make up the second row of the tooltip, the longest row
        // and therefore are the basis of our measurement
        const awardingAgencyNameDiv = this.awardAgencyDiv.getBoundingClientRect().width;
        const recipientNameDiv = this.recipientDiv.getBoundingClientRect().width;
        // get the height for placement comparison
        const tooltipDivHeight = this.div.getBoundingClientRect().height;
        // set the tooltip width to be the width of the largest row
        // 70px = 10px ( Left padding ) + 30px ( Right padding of first div )
        // + 30px ( Right spacing for end of tooltip )
        let theTooltipWidth = awardingAgencyNameDiv + recipientNameDiv + 70;
        let xPosition = data.x;
        let yPosition = data.y;
        // measuring from bottom of graph
        // ( graph starts at 0 so we already have the height, with data.y)
        // if data.y is smaller than the height of the tooltip, show on top
        if (yPosition < tooltipDivHeight) {
            yPosition += (tooltipDivHeight + (data.barHeight - 2));
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
        // '-' means negative and we are off the page
        if (xPosition.toString()[0] === '-') {
            const difference = 0 - xPosition;
            // adjust the tooltip width based on x position movement
            theTooltipWidth += difference;
            xPosition = 0;
        }
        // truncate text when the tooltip is bigger than the graph
        if (data.graphWidth < theTooltipWidth) {
            // getting the last row, only need if we truncate
            const startDateDiv = this.startDateDiv.getBoundingClientRect().width;
            const endDateDiv = this.endDateDiv.getBoundingClientRect().width;
            const amountsDiv = this.amountsDiv.getBoundingClientRect().width;
            // getting the first row, only need to if we truncate
            const piidDiv = this.piidDiv.getBoundingClientRect().width;
            // const grandparentDiv = this.grandparentDiv.getBoundingClientRect().width;
            const parentDiv = this.parentDiv.getBoundingClientRect().width;
            // this is the width of the last row
            // the smallest width allowed since we have to keep it inline
            // 100px = 10px ( Left of Row ) + 90px ( Three divs padding right )
            theTooltipWidth = startDateDiv + endDateDiv + amountsDiv + 100;
            // array of divs to truncate
            let truncateTheseDivWidths = [
                awardingAgencyNameDiv,
                recipientNameDiv,
                piidDiv,
                parentDiv
            ];
            // do not truncate PIID if there is no grandparent
            if (!this.grandparentDiv) {
                truncateTheseDivWidths = [awardingAgencyNameDiv, recipientNameDiv];
            }
            await this.truncateLogic(truncateTheseDivWidths, theTooltipWidth);
        }
        // 100px = 10px ( Left of Row ) + 90px ( Three divs padding right )
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
        const parentIDVData = data.grandchild ?
            (
                <div>
                    {this.getLinks(
                        'award',
                        data.parentGeneratedId,
                        this.state.parentAwardPIID,
                        data.parentAwardPIID)}
                </div>
            )
            : 'This IDV';
        const amountTitle = `${formatMoney(data._obligatedAmount)} of ${formatMoney(data._awardedAmount)}`;

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
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(div) => {
                                        this.piidDiv = div;
                                    }}>
                                    {this.getLinks('award', data.id, this.state.piid, data.piid)}
                                </div>
                            </div>
                            {
                                data.grandchild &&
                                <div className="tooltip-body__row-info" id="grandparentLabel">
                                    <h6 className="tooltip-body__row-info-title first-titles">
                                        Grandparent IDV
                                    </h6>
                                    <div
                                        className="tooltip-body__row-info-data"
                                        ref={(div) => {
                                            this.grandparentDiv = div;
                                        }}>
                                        This IDV
                                    </div>
                                </div>
                            }
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    Parent IDV
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(div) => {
                                        this.parentDiv = div;
                                    }}>
                                    {data.parentGeneratedId ? parentIDVData : <div>--</div>}
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
                                            'agency',
                                            data.awardingAgencyId,
                                            this.state.awardingAgencyName,
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
                                            'recipient',
                                            data.recipientId,
                                            this.state.recipientName.toUpperCase(),
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
                                    Obligated Amount
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(d) => {
                                        this.amountsDiv = d;
                                    }}
                                    title={amountTitle}>
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
