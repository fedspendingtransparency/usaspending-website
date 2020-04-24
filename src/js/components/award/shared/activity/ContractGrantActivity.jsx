import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';
import { formatMoney } from 'helpers/moneyFormatter';
import RectanglePercentVizTooltip from 'components/award/financialAssistance/RectanglePercentVizTooltip';
import ContractGrantActivityChart from './ContractGrantActivityChart';

const propTypes = {
    transactions: PropTypes.array,
    dates: PropTypes.object,
    awardType: PropTypes.string,
    totalObligation: PropTypes.number
};

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
        console.log(' Tooltip Data : ', { data, text });
        let tooltipInfo = null;
        // potential award amount line
        if (!text) {
            tooltipInfo = {
                title: 'Current Potential Award Amount',
                amount: formatMoney(totalObligation)
                // styles: {
                //     transform: `translate(${150}px,-${data}px)`,
                //     width: '160px'
                // }
            };
        }
        setTooltipData(tooltipInfo);
    };

    const showHideTooltip = (data, text) => {
        // hide tooltip
        if (!data && showTooltip) return setShowTooltip(false);
        return handleTooltipData(data, text);
    };

    return (
        <div ref={divReference} className="award-amounts-viz contract-grant-activity-visualization">
            <TooltipWrapper
                className="award-section-tt"
                {...tooltipData}
                controlledProps={{
                    isControlled: true,
                    isVisible: showTooltip,
                    showTooltip: () => {},
                    closeTooltip: () => {}
                }}
                // left
                tooltipComponent={RectanglePercentVizTooltip}>
                <ContractGrantActivityChart
                    visualizationWidth={visualizationWidth}
                    transactions={transactions}
                    height={360}
                    padding={{ left: 45, bottom: 30 }}
                    dates={dates}
                    awardType={awardType}
                    totalObligation={totalObligation}
                    showHideTooltip={showHideTooltip} />
            </TooltipWrapper>
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
