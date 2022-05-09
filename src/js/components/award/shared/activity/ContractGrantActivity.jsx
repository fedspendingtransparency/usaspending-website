import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import moment from 'moment';
import { TooltipWrapper } from 'data-transparency-ui';
import { formatMoney, calculatePercentage } from 'helpers/moneyFormatter';
import { convertDatesToRange } from 'helpers/timeRangeHelper';
import { RectanglePercentVizTooltip } from 'components/award/shared/awardAmounts/RectanglePercentVizTooltip';
import ContractGrantActivityChart from './ContractGrantActivityChart';
import PaginatedTooltipContainer from './PaginatedTooltipContainer';
import Tooltip from './Tooltip';

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
    const [showTooltipLine, setShowTooltipLine] = useState(false);
    const [showTooltipTransaction, setShowTooltipTransaction] = useState(false);
    const [thisLineOrTextIsHovered, setThisLineOrTextIsHovered] = useState('');
    // const [hoveringOverTransactionArrow, setHoveringOverTransactionArrow] = useState(false);
    const [isHoveringOverTransactionTooltip, setHoveringOverTransactionTooltip] = useState(false);
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
    /**
     * X Translation
     * We are positioning the potential award amount line tooltip centered.
     * Therefore, we must halve the width to get the center of the graph and add 8
     * (since 8 is half the pointer for the tooltip that is auto adjusted in the tooltip
     * wrapper) and subtract half of the tooltip (since the tooltip position draws left to right)
     * Y Translation
     * We position with respect to the y position and add 8 for half the point and padding bottom.
     */
    const potentialAwardAmountLineTooltipData = (data) => ({
        tooltipPosition: 'bottom',
        styles: { // 8px is half the tooltip pointer, data.position is the y-position
            transform: `translate(${((data.x2 / 2) + 8) - (defaultTooltipWidth / 2)}px,${(data.position + defaultPadding.bottom) - 8}px)`,
            position: 'absolute'
        },
        tooltipComponent: <RectanglePercentVizTooltip
            title="Current Potential Award Amount"
            amount={formatMoney(totalObligation)} />
    });

    const formatDateData = (date) => {
        const today = moment(Date.now());
        const dateFormatted = date.format("MM/DD/YYYY");
        return today.isAfter(date) ?
            `${dateFormatted} (${convertDatesToRange(date, today)} ago)` :
            `${dateFormatted} (${convertDatesToRange(today, date)} from today)`;
    };

    const verticalLinesTooltipData = (data, text) => {
        const date = moment(data.value);
        setThisLineOrTextIsHovered(text);
        return {
            styles: { // y position is in the middle of the line
                position: 'absolute',
                transform: `translate(${((data.position + 16))}px,${(height / 2) - defaultPadding.bottom}px)`
            },
            tooltipComponent: <RectanglePercentVizTooltip
                title={`${text} Date`}
                amount={formatDateData(date)} />
        };
    };

    const transactionTooltipInfo = (data) => (data.allTransactionsOnTheSameDate.map((transaction) => {
        let actionTypeText;
        if (transaction.action_type && transaction.action_type_description) {
            actionTypeText = `${transaction.action_type}: ${transaction.action_type_description}`;
        }
        else if (transaction.action_type) {
            actionTypeText = transaction.action_type;
        }
        else if (transaction.action_type_description) {
            actionTypeText = transaction.action_type_description;
        }
        else {
            actionTypeText = '--';
        }

        return {
            title: `Modification ${transaction.modification_number || ''}`,
            sections: [
                {
                    title: 'Action Date',
                    paragraphs: [
                        `${formatDateData(transaction.action_date)}`
                    ]
                },
                {
                    title: 'Obligated Amount',
                    paragraphs: [
                        `${formatMoney(transaction.federal_action_obligation)}`
                    ]
                },
                {
                    title: 'Total Obligations to Date',
                    paragraphs: [
                        `${formatMoney(transaction.running_obligation_total_to_date)} 
                        ${totalObligation ? `(${calculatePercentage(transaction.running_obligation_total_to_date, totalObligation)} of Potential Award Amount)` : ''}`
                    ]
                },
                {
                    title: 'Action Type',
                    paragraphs: [
                        `${actionTypeText}`
                    ]
                },
                {
                    title: 'Description',
                    paragraphs: [
                        `${transaction.description || '--'}`
                    ]
                }
            ]
        };
    }));

    const transactionTooltipData = (data) => ({
        styles: { // y position is in the middle of the line
            position: 'absolute',
            transform: `translate(${data.cx + 11}px,${data.cy - 13}px)`
        },
        tooltipComponent: <PaginatedTooltipContainer
            data={transactionTooltipInfo(data.data, 'Modification')}
            tooltipElement={<Tooltip />} />
    });

    const handleTooltipDataLine = (data, text) => {
        let tooltipInfo = null;
        if (!text) { // potential award amount line
            tooltipInfo = potentialAwardAmountLineTooltipData(data);
        }
        else { // all other award lines
            tooltipInfo = verticalLinesTooltipData(data, text);
        }
        setTooltipData(tooltipInfo);
        setShowTooltipLine(true);
    };

    const handleTooltipDataTransaction = (data) => {
        setTooltipData(transactionTooltipData(data));
        setShowTooltipTransaction(true);
    };

    const onMouseMoveTooltip = () => {
        setHoveringOverTransactionTooltip(true);
    };
    const onMouseLeaveTooltip = () => {
        setHoveringOverTransactionTooltip(false);
    };

    const showTransactionTooltip = (data, text) => handleTooltipDataTransaction(data, text);

    const hideTooltipTransaction = () => setTimeout(() => setShowTooltipTransaction(false), 500);

    const hideTransactionTooltipOnBlur = () => setShowTooltipTransaction(false);

    const showHideTooltipLine = (data, text) => {
        if (!data && showTooltipLine) {
            setShowTooltipLine(false);
            setThisLineOrTextIsHovered('');
        }
        else {
            handleTooltipDataLine(data, text);
        }
    };

    return (
        <div ref={divReference} className="award-amounts-viz contract-grant-activity-visualization">
            {(showTooltipLine || showTooltipTransaction || isHoveringOverTransactionTooltip) && <TooltipWrapper
                className="award-section-tt"
                {...tooltipData}
                wide={false}
                width={defaultTooltipWidth}
                onMouseMoveTooltip={onMouseMoveTooltip}
                onMouseLeaveTooltip={onMouseLeaveTooltip}
                controlledProps={{
                    isControlled: true,
                    isVisible: showTooltipLine || showTooltipTransaction || isHoveringOverTransactionTooltip
                }} />}
            <ContractGrantActivityChart
                visualizationWidth={visualizationWidth}
                transactions={transactions}
                height={height}
                padding={defaultPadding}
                dates={dates}
                awardType={awardType}
                totalObligation={totalObligation}
                showHideTooltipLine={showHideTooltipLine}
                showTooltipTransaction={showTransactionTooltip}
                hideTooltipTransaction={hideTooltipTransaction}
                hideTransactionTooltipOnBlur={hideTransactionTooltipOnBlur}
                thisLineOrTextIsHovered={thisLineOrTextIsHovered} />
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
