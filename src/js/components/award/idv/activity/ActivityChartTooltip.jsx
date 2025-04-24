/**
 * ActivityChartTooltip.jsx
 * Created by Jonathan Hill 6/24/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';

import { formatMoney } from 'helpers/moneyFormatter';

// current list of properties we might truncate
const arrayOfProperties = [
    'recipientName',
    'awardingAgencyName',
    'piid',
    'parentAwardPIID'
];

export default class ActivityChartTooltip extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        mouseIsInTooltipDiv: PropTypes.func,
        mouseOutOfTooltipDiv: PropTypes.func
    };

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

    getLinks(path, slug, data, params) {
        if (data === '--' || !slug) {
            return (<div>{data}</div>);
        }
        return (
            <Link title={this.state.truncated ? params : ''} to={`/${path}/${slug}`}>
                {data}
            </Link>
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
    // someDivWidth / GraphWidth = x ( TruncatedWidth ) / shortenedTooltipWidth
    // to get what the shortened width of the div should be
    truncatedWidth(tooltipWidth, divWidth) {
        const graphWidth = this.props.data.graphWidth;
        return (graphWidth * (divWidth / 2)) / tooltipWidth;
    }
    // uses a ratio of
    // TruncatedDivWidth / NormalDivWidth =
    // x ( Truncated character length ) / NormalCharacterLength
    truncatedCharacterLength(truncatedDivWidth, normalDivWidth, normalCharacterLength) {
    // return Math.floor(
    //     ((truncatedDivWidth * normalCharacterLength) / normalDivWidth) / 2);
        return Math.floor(
            ((truncatedDivWidth * normalCharacterLength) / normalDivWidth));
    }
    // truncates the text if warranted
    truncateText(text, truncatedLength, propertyName) {
        if (truncatedLength < text.length) {
            // removing three character to adjust for ...
            const newLength = truncatedLength - 3;
            const truncatedText = `${text
                .substring(0, newLength).trim()}...`;
            return { [propertyName]: truncatedText };
        }
        return { [propertyName]: text };
    }

    decideOnTooltipWidth(arrayOfDivWidths, tooltipWidth) {
    // get truncated widths of the first two rows
    // add padding for the first two rows
    // compare the length of all three rows
    // return the new tooltip width
    // decide if there is a granparent div
        const truncatedWidths = arrayOfDivWidths.map((divWidth) => this.truncatedWidth(
            this.props.data.graphWidth, tooltipWidth, divWidth));
        let firstRowWidth = truncatedWidths[0] + truncatedWidths[1];
        if (this.grandparentDiv) {
            const grandparentDiv = this.grandparentDiv.getBoundingClientRect().width;
            firstRowWidth = truncatedWidths[0] + truncatedWidths[1] + grandparentDiv;
        }
        const secondRowWidth = truncatedWidths[2] + truncatedWidths[3] + 50;
        if ((firstRowWidth > tooltipWidth) || (secondRowWidth > tooltipWidth)) {
            if (firstRowWidth > secondRowWidth) return firstRowWidth;
            return secondRowWidth;
        }
        return tooltipWidth;
    }

    truncateLogic(arrayOfDivWidths, theTooltipWidth) {
        return new Promise((resolve) => {
            const {
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
            const truncatedText = arrayOfDivWidths
                .map((divWidth) => this.truncatedWidth(
                    theTooltipWidth, divWidth))
                .map((truncatedDivWidth, index) => this.truncatedCharacterLength(
                    truncatedDivWidth,
                    arrayOfDivWidths[index],
                    arrayOfDivText[index].length))
                .reduce((acc, truncatedLength, index) => {
                    const newText = this.truncateText(
                        arrayOfDivText[index],
                        truncatedLength,
                        arrayOfProperties[index]
                    );
                    return {
                        ...acc,
                        ...newText
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
        // + 10px ( Right spacing for end of tooltip )
        let theTooltipWidth = awardingAgencyNameDiv + recipientNameDiv + 50;
        // getting the first row
        const piidDiv = this.piidDiv.getBoundingClientRect().width;
        const parentDiv = this.parentDiv.getBoundingClientRect().width;
        // with the addition of the granparent section in the first row
        // the first row can now be longer than the second row
        // we will check for that below and set the starting width for the tooltip
        if (this.grandparentDiv) {
            const grandparentDiv = this.grandparentDiv.getBoundingClientRect().width;
            const totalFirstRowWidth = piidDiv + parentDiv + grandparentDiv + 90;
            if (totalFirstRowWidth > theTooltipWidth) theTooltipWidth = totalFirstRowWidth;
        }
        // x Position of the Award Bar ( start )
        let xPosition = data.x;
        // distance from the top of the graph to the middle of the bar
        let distanceFromBottomOfGraphToBar = data.y;
        if (distanceFromBottomOfGraphToBar < tooltipDivHeight) {
            distanceFromBottomOfGraphToBar += (tooltipDivHeight + (data.barHeight - 2));
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
            // this is the width of the last row
            // the smallest width allowed since we have to keep it inline
            // 100px = 10px ( Left of Row ) + 60px ( Two divs padding right )
            // + 10px ( padding end of row )
            theTooltipWidth = startDateDiv + endDateDiv + amountsDiv + 80;
            // array of divs to truncate
            let truncateTheseDivWidths = [
                awardingAgencyNameDiv,
                recipientNameDiv,
                piidDiv,
                parentDiv
            ];
            // do not truncate PIID if there is no grandparent
            if (!this.grandparentDiv) {
                truncateTheseDivWidths = [recipientNameDiv, awardingAgencyNameDiv];
            }
            await this.truncateLogic(truncateTheseDivWidths, theTooltipWidth);
            // decide how wide the tooltip should be
            theTooltipWidth = this.decideOnTooltipWidth(
                [piidDiv, parentDiv, awardingAgencyNameDiv, recipientNameDiv], theTooltipWidth) + 10;
        }
        this.setState({
            tooltipStyle: {
                transform: `translate(${xPosition}px,-${distanceFromBottomOfGraphToBar}px)`,
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
                                    {this.getLinks('award', data.generatedId, this.state.piid, data.piid)}
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
                                            data.awardingAgencySlug,
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
