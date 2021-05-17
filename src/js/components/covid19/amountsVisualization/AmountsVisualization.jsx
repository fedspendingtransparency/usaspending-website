/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { scaleLinear } from 'd3-scale';
import DefaultAmountViz from 'components/covid19/amountsVisualization/amounts/shared/DefaultAmountViz';
import TotalObligations from 'components/covid19/amountsVisualization/amounts/totalObligations/TotalObligations';
import RemainingBalance from 'components/covid19/amountsVisualization/amounts/remainingBalance/RemainingBalance';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import { TooltipWrapper } from 'data-transparency-ui';
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
import PercentLabels from './amounts/PercentLabels';

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
    const [remainingBalanceLabelData, setRemainingBalanceLabelData] = useState({
        x: 0,
        width: 0
    });
    const [remainingBalanceValueData, setRemainingBalanceValueData] = useState({
        x: 0,
        width: 0
    });
    const [remainingBalanceDescriptionData, setRemainingBalanceDescriptionData] = useState({
        x: 0,
        width: 0
    });
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
                ? 30
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

    const displayTooltip = (e) => {
        setShowTooltip(e.target.getAttribute('data-id'));
    };

    const hideTooltip = () => {
        setShowTooltip('');
    };

    return (
        <div className="amounts-viz award-amounts-viz" id="amounts-viz_id">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was <strong>spent</strong> so far in response to COVID-19
            </h3>
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
                <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                    <DefaultAmountViz
                        displayTooltip={displayTooltip}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                        overviewData={overviewData}
                        scale={scale}
                        width={width}
                        dataId="_totalBudgetAuthority" />
                    <RemainingBalance
                        displayTooltip={displayTooltip}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                        overviewData={overviewData}
                        scale={scale}
                        width={width}
                        setRemainingBalanceLabelData={setRemainingBalanceLabelData}
                        setRemainingBalanceValueData={setRemainingBalanceValueData}
                        setRemainingBalanceDescriptionData={setRemainingBalanceDescriptionData} />
                    <TotalObligations
                        displayTooltip={displayTooltip}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                        overviewData={overviewData}
                        scale={scale}
                        remainingBalanceLabelData={remainingBalanceLabelData}
                        remainingBalanceValueData={remainingBalanceValueData}
                        remainingBalanceDescriptionData={remainingBalanceDescriptionData} />
                    <DefaultAmountViz
                        displayTooltip={displayTooltip}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                        overviewData={overviewData}
                        scale={scale}
                        width={width}
                        dataId="_totalOutlays" />
                    <PercentLabels width={width} />
                </svg>
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
