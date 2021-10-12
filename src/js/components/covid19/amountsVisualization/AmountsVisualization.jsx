/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { scaleLinear } from 'd3-scale';
import DefaultAmountViz from 'components/covid19/amountsVisualization/amounts/shared/DefaultAmountViz';
import { TooltipWrapper, Carousel, LoadingMessage } from 'data-transparency-ui';
import PaginatedTooltipContainer from 'components/award/shared/activity/PaginatedTooltipContainer';
import Tooltip from 'components/award/shared/activity/Tooltip';

import {
    amountsHeight,
    amountsPadding,
    defaultTooltipWidth,
    tooltipMapping
} from 'dataMapping/covid19/amountsVisualization';
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

    useEffect(() => {
        setLoading(!Object.keys(overviewData).length);
    }, [overviewData]);

    // X Scale
    useEffect(() => {
        if (width) {
            const s = scaleLinear()
                .domain([0, overviewData._totalBudgetAuthorityForBar])
                .range([amountsPadding.left, width - amountsPadding.right]);
            setScale(() => s);
        }
    }, [width, overviewData]);

    const setMouseData = throttle((e) => {
        const browser = window.navigator.userAgent;
        if (browser.includes('Chrome')) {
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: (e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top) + 5
            });
        }
        else if (browser.includes('Firefox') || browser.includes('Safari')) {
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top
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
                title: tooltipMapping[showTooltip.substring(0, showTooltip.length - 1)].title,
                sections: [
                    {
                        paragraphs: [
                            `${formatMoney(overviewData[showTooltip.substring(0, showTooltip.length - 1)])}`,
                            `${calculatePercentage(overviewData[showTooltip.substring(0, showTooltip.length - 1)], overviewData._totalBudgetAuthorityForBar, null, 2)} of Total Budgetary Resources`,
                            tooltipMapping[showTooltip.substring(0, showTooltip.length - 1)].paragraph
                        ]
                    }
                ]
            }]
            }
            tooltipElement={<Tooltip />} />
    });

    const displayTooltip = (e) => {
        if (e.target) setShowTooltip(e.target.getAttribute('data-tooltip'));
    };

    const hideTooltip = (e) => {
        if (e.target.getAttribute('data-tooltip') === showTooltip) setShowTooltip('');
    };

    return (
        <div className="amounts-viz award-amounts-viz" id="amounts-viz_id">
            {
                loading &&
                <LoadingMessage />
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
                                This is how much was spent so far in response to COVID-19
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalBudgetAuthorityForBar1"
                                    dataId="_totalBudgetAuthorityForBar" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalObligationsForBar1"
                                    dataId="_totalObligationsForBar" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalOutlaysForBar1"
                                    dataId="_totalOutlaysForBar" />
                            </svg>
                            <div className="amounts-viz__sub-title" />
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                    Total Budgetary Resources
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalBudgetAuthorityForBar2"
                                    dataId="_totalBudgetAuthorityForBar" />
                            </svg>
                            <div className="amounts-viz__sub-title">
                                    This is the total amount of funding that agencies have to
                                    spend based on legislation passed by Congress.
                            </div>
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                    Total Obligations
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthorityForBar"
                                    className="opaque" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalObligationsForBar3"
                                    dataId="_totalObligationsForBar" />
                            </svg>
                            <div className="amounts-viz__sub-title">
                                    This is how much agencies have committed to spend.
                            </div>
                        </div>,
                        <div>
                            <h3 className="body__narrative amounts-viz__title">
                                    Total Outlays
                            </h3>
                            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalBudgetAuthorityForBar"
                                    className="opaque" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    dataId="_totalObligationsForBar"
                                    className="opaque" />
                                <DefaultAmountViz
                                    displayTooltip={displayTooltip}
                                    hideTooltip={hideTooltip}
                                    showTooltip={showTooltip}
                                    overviewData={overviewData}
                                    scale={scale}
                                    width={width}
                                    tooltipId="_totalOutlaysForBar4"
                                    dataId="_totalOutlaysForBar" />
                            </svg>
                            <div className="amounts-viz__sub-title">
                                    This is how much agencies have paid out.
                            </div>
                        </div>
                    ]} />
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
