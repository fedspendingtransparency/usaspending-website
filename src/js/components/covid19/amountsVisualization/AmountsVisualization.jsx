/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { scaleLinear } from 'd3-scale';
import DefaultAmountViz from 'components/covid19/amountsVisualization/amounts/shared/DefaultAmountViz';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import { TooltipWrapper, Carousel } from 'data-transparency-ui';
import PaginatedTooltipContainer from 'components/award/shared/activity/PaginatedTooltipContainer';
import Tooltip from 'components/award/shared/activity/Tooltip';

import {
    amountsHeight,
    amountsPadding,
    defaultTooltipWidth,
    tooltipMapping
} from 'dataMapping/covid19/amountsVisualization';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import {
    formatMoney,
    calculatePercentage
} from 'helpers/moneyFormatter';

const propTypes = {
    overviewData: PropTypes.object,
    width: PropTypes.number
};

const AmountsVisualization = ({
    overviewData,
    width = null
}) => {
    const [loading, setLoading] = useState(null);
    const [scale, setScale] = useState(null);
    const [showTooltip, setShowTooltip] = useState('');
    const [mouseValue, setMouseValue] = useState({ x: 0, y: 0 });

    useEffect(() => setLoading(!Object.keys(overviewData).length), [overviewData]);
    // X Scale
    useEffect(() => {
        if (width) {
            const s = scaleLinear()
                .domain([0, overviewData._totalBudgetAuthority])
                .range([amountsPadding.left, width - amountsPadding.right]);
            setScale(() => s);
        }
    }, [width, overviewData]);

    const setMouseData = throttle((e) => {
        const browser = window.navigator.userAgent;
        if (browser.includes('Chrome')) {
            // vertical offsets from trial/error. Not sure which element's height requires this?
            const verticalOffset = window.innerWidth >= 1600
                ? 40
                : 80;
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top - verticalOffset
            });
        }
        else if (browser.includes('Firefox') || browser.includes('Safari')) {
            // vertical offsets from trial/error. Not sure which element's height requires this?
            const verticalOffset = window.innerWidth >= 1600
                ? 0 + stickyHeaderHeight
                : 29.5 + stickyHeaderHeight;
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top - verticalOffset
            });
        }
        else {
            setMouseValue({
                x: e.offsetX || e.clientX,
                y: e.offsetY || e.clientY
            });
        }
    }, 100);

    useEffect(() => {
        document.getElementById('amounts-viz_id').addEventListener('mousemove', setMouseData);
        return () => document.getElementById('amounts-viz_id').removeEventListener('mousemove', setMouseData);
    }, []);

    const tooltipData = () => ({
        tooltipPosition: 'bottom',
        styles: {
            position: 'absolute',
            transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
        },
        tooltipComponent: <PaginatedTooltipContainer
            data={[{
                title: tooltipMapping[showTooltip].title,
                sections: [
                    {
                        paragraphs: [
                            `${formatMoney(overviewData[showTooltip])}`,
                            `${calculatePercentage(overviewData[showTooltip], overviewData._totalBudgetAuthority, null, 2)} of Total Budgetary Resources`,
                            tooltipMapping[showTooltip].paragraph
                        ]
                    }
                ]
            }]
            }
            tooltipElement={<Tooltip />} />
    });

    const displayTooltip1 = (e) => {
        console.log(' Target 1 : ', e.target);
        if (e.target) setShowTooltip(e.target.getAttribute('data-id'));
    };
    const displayTooltip2 = (e) => {
        console.log(' Target 2 : ', e.target);
        if (e.target) setShowTooltip(e.target.getAttribute('data-id'));
    };
    const displayTooltip3 = (e) => {
        console.log(' Target 3 : ', e.target);
        if (e.target) setShowTooltip(e.target.getAttribute('data-id'));
    };
    const displayTooltip4 = (e) => {
        console.log(' Target 4 : ', e.target);
        if (e.target) setShowTooltip(e.target.getAttribute('data-id'));
    };

    const hideTooltip1 = () => {
        console.log(' Hide It 1');
        setShowTooltip('');
    };
    const hideTooltip2 = () => {
        console.log(' Hide It 2');
        setShowTooltip('');
    };
    const hideTooltip3 = () => {
        console.log(' Hide It 3');
        setShowTooltip('');
    };
    const hideTooltip4 = () => {
        console.log(' Hide It 4');
        setShowTooltip('');
    };

    return (
        <div className="amounts-viz award-amounts-viz" id="amounts-viz_id">
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            {
                showTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...tooltipData()}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: !!showTooltip,
                        showTooltip: () => {},
                        closeTooltip: () => {}
                    }} />
            }
            {
                !loading &&
                <Carousel
                    items={[
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                This is how much was <strong>spent</strong> so far in response to COVID-19
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip1}
                                    hideTooltip={hideTooltip1}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthority" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip1}
                                    hideTooltip={hideTooltip1}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalObligations" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip1}
                                    hideTooltip={hideTooltip1}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalOutlays" />
                            </svg>
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                This is how much was <strong>spent</strong> so far in response to COVID-19
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip2}
                                    hideTooltip={hideTooltip2}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthority" />
                            </svg>
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                This is how much was <strong>spent</strong> so far in response to COVID-19
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip3}
                                    hideTooltip={hideTooltip3}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthority" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip3}
                                    hideTooltip={hideTooltip3}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalObligations" />
                            </svg>
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                This is how much was <strong>spent</strong> so far in response to COVID-19
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip4}
                                    hideTooltip={hideTooltip4}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthority" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip4}
                                    hideTooltip={hideTooltip4}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalObligations" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip4}
                                    hideTooltip={hideTooltip4}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalOutlays" />
                            </svg>
                        </div>
                    ]} />
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
