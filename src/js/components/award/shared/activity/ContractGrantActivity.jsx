import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import moment from 'moment';
import { TooltipWrapper } from 'data-transparency-ui';
import { formatMoney } from 'helpers/moneyFormatter';
import { RectanglePercentVizTooltip } from 'components/award/financialAssistance/RectanglePercentVizTooltip';
import ContractGrantActivityChart from './ContractGrantActivityChart';

const propTypes = {
    transactions: PropTypes.array,
    dates: PropTypes.object,
    awardType: PropTypes.string,
    totalObligation: PropTypes.number
};

const defaultPadding = { left: 45, bottom: 30 };
const defaultTooltipWidth = 375;
const height = 360;

const ContractGrantActivity = ({
    transactions,
    dates,
    awardType,
    totalObligation
}) => {
    // reference to the div - using to get the width
    const divReference = useRef(null);
    // window width
    const [windowWidth, setWindowWidth] = useState(0);
    // visualization width
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    /**
     * Line tooltip data e.g. { title: 'Start Date', amount: '04/24/2020' }
     * Circle tooltip data e.g. transaction object
     */
    const [tooltipData, setTooltipData] = useState(null);
    /**
     * handleWindowResize
     * - updates window and visualization width based on current window width.
     * @returns {null}
     */
    const handleWindowResize = throttle(() => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            setWindowWidth(windowWidth);
            setVisualizationWidth(divReference.current.offsetWidth);
        }
    }, 50);
    /**
     * hook - runs on mount and unmount.
     * Any updates to the width of the browser is handled by the
     * event listener.
     */
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleTooltipData = (data, text) => {
        let tooltipInfo = null;
        // potential award amount line
        if (!text) {
            /**
             * X Translation
             * We are positioning the potential award amount line tooltip centered.
             * Therefore, we must halve the width to get the center of the graph and add 8
             * (since 8 is half the pointer for the tooltip that is auto adjusted in the tooltip
             * wrapper) and subtract half of the tooltip (since the tooltip position draws left to right)
             * Y Translation
             * We position with respect to the y position and add 8 for half the point and padding bottom.
             */
            tooltipInfo = {
                tooltipPosition: 'bottom',
                styles: { // 8px is half the tooltip pointer, data.position is the y-position
                    transform: `translate(${((data.x2 / 2) + 8) - (defaultTooltipWidth / 2)}px,${data.position + 8 + defaultPadding.bottom}px)`,
                    position: 'absolute'
                },
                tooltipComponent: <RectanglePercentVizTooltip
                    title="Current Potential Award Amount"
                    amount={formatMoney(totalObligation)} />
            };
        }
        else { // all other award lines
            tooltipInfo = {
                styles: { // y position is in the middle
                    position: 'absolute',
                    transform: `translate(${((data.position))}px,${(height / 2) - defaultPadding.bottom}px)`
                },
                tooltipComponent: <RectanglePercentVizTooltip
                    title={text}
                    amount={moment(data.value).format("MM/DD/YYYY")}
                    left />
            };
        }
        setTooltipData(tooltipInfo);
        setShowTooltip(true);
    };

    const showHideTooltip = (data, text) => {
        // hide tooltip
        if (!data && showTooltip) return setShowTooltip(false);
        return handleTooltipData(data, text);
    };

    return (
        <div ref={divReference} className="award-amounts-viz contract-grant-activity-visualization">
            {showTooltip && <TooltipWrapper
                className="award-section-tt"
                {...tooltipData}
                wide={false}
                width={defaultTooltipWidth}
                controlledProps={{
                    isControlled: true,
                    isVisible: showTooltip,
                    showTooltip: () => {},
                    closeTooltip: () => {}
                }} />}
            <ContractGrantActivityChart
                visualizationWidth={visualizationWidth}
                transactions={transactions}
                height={height}
                padding={defaultPadding}
                dates={dates}
                awardType={awardType}
                totalObligation={totalObligation}
                showHideTooltip={showHideTooltip} />
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
