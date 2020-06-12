/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';
import GlobalConstants from "GlobalConstants";

import { AWARD_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';
import {
    Bar,
    BarLabelAndLine,
    BarValue
} from "./SharedComponents";

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

const emptyTooltipProps = {
    styles: { transform: '' },
    tooltipComponent: <p>Placeholder</p>
};

const offsets = {
    current: 10,
    obligated: 14,
    fileCObligated: 18,
    fileCOutlay: 22
};

const NormalChart = ({ awardType, awardAmounts }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    const isIdv = (awardType === 'idv');

    const obligation = awardAmounts._totalObligation;
    const current = awardAmounts._baseExercisedOptions;
    const potential = awardAmounts._baseAndAllOptions;
    const fileCOutlay = awardAmounts._fileCOutlay;
    const fileCObligated = awardAmounts._fileCObligated;
    const isFileCOutlayDefined = fileCOutlay > 0;
    const isFileCObligatedDefined = fileCObligated > 0;
    const isCaresReleased = isFileCObligatedDefined && GlobalConstants.CARES_ACT_RELEASED;

    const verticalTooltipOffset = isCaresReleased
        ? 170
        : 90;

    const absoluteWidths = {
        currentWithObligatedOffset: {
            width: generatePercentage((current - obligation) / potential)
        },
        current: {
            width: generatePercentage((current / potential))
        },
        obligated: {
            width: generatePercentage(obligation / potential)
        },
        fileCObligated: {
            width: generatePercentage(fileCObligated / potential)
        },
        fileCOutlay: {
            width: generatePercentage(fileCOutlay / potential)
        },
        potential: {
            width: '100%'
        }
    };

    const relativeWidths = {
        fileCObligated: {
            width: generatePercentage(fileCObligated / obligation)
        },
        fileCOutlay: {
            width: generatePercentage(fileCOutlay / fileCObligated)
        }
    };

    const fileCOutlayBarStyle = {
        backgroundColor: '#6E338E'
    };

    const fileCOutlayPositioning = {
        padding: '0.2rem'
    };

    const fileCObligatedBarStyle = {
        backgroundColor: '#B699C6'
    };

    const obligatedBarStyle = {
        backgroundColor: isCaresReleased ? '#0A2F5A' : '#4773aa',
        border: isCaresReleased ? 'solid 0.2rem #558EC6' : 'solid 0.4rem #d6d7d9'
    };

    const currentBarStyle = {
        backgroundColor: isCaresReleased ? '#558EC6' : '#d8d8d8',
        border: 'none'
    };

    const potentialBarStyle = {
        backgroundColor: isCaresReleased ? '#AAC6E2' : '#fff',
        border: 'none'
    };

    const showTooltip = (spendingCategory, type = awardType, data = awardAmounts) => {
        setActiveTooltipProps({
            ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
            wide: isIdv,
            styles: {
                transform: `translate(calc(${absoluteWidths[spendingCategory].width} + 15px), ${verticalTooltipOffset}px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const showObligatedTooltip = (e) => {
        e.stopPropagation();
        showTooltip("obligated");
    };
    const showCurrentTooltip = (e) => {
        e.stopPropagation();
        showTooltip("current");
    };
    const showPotentialTooltip = (e) => {
        e.stopPropagation();
        showTooltip("potential");
    };
    const showFileCOutlayTooltip = (e) => {
        e.stopPropagation();
        showTooltip("fileCOutlay");
    };
    const showFileCObligatedTooltip = (e) => {
        e.stopPropagation();
        showTooltip("fileCObligated");
    };

    const classNameForCovid = isCaresReleased ? ' covid' : '';

    return (
        <div className="award-amounts-viz">
            {isTooltipVisible && <TooltipWrapper
                className="award-section-tt"
                onMouseMoveTooltip={setIsTooltipVisible.bind(null, true)}
                onMouseLeaveTooltip={setIsTooltipVisible.bind(null, false)}
                controlledProps={{
                    isControlled: true,
                    isVisible: true
                }}
                {...activeTooltipProps} />}
            <BarValue
                spendingCategory="obligated"
                style={{ marginLeft: `${offsets.obligated / 2}px` }}
                className="award-amounts-viz__desc-top"
                onLeave={closeTooltip}
                onEnter={showObligatedTooltip}
                number={awardAmounts.totalObligationAbbreviated}
                title={isIdv ? "Combined Obligated Amounts" : "Obligated Amount"} />
            <BarLabelAndLine
                spendingCategory="obligated"
                lineClassName={`award-amounts-viz__line-up${classNameForCovid}`}
                labelStyles={{ marginLeft: `${offsets.obligated / 2}px` }}
                lineStyles={{
                    marginLeft: `${offsets.obligated / 2}px`,
                    width: `calc(${absoluteWidths.obligated.width} - ${offsets.obligated}px)`
                }} />
            {isCaresReleased &&
                <>
                    <BarValue
                        spendingCategory="file-c-obligated"
                        className="award-amounts-viz__desc-top"
                        style={{ marginLeft: `${offsets.fileCObligated / 2}px` }}
                        onLeave={closeTooltip}
                        onEnter={showFileCObligatedTooltip}
                        number={awardAmounts.fileCObligatedAbbreviated}
                        title="COVID-19 Response Obligations Amount" />
                    <BarLabelAndLine
                        spendingCategory="file-c-obligated"
                        lineClassName="award-amounts-viz__line-up"
                        labelStyles={{ marginLeft: `${offsets.fileCObligated / 2}px` }}
                        lineStyles={{
                            width: `calc(${absoluteWidths.fileCObligated.width} - ${offsets.fileCObligated / 2}px)`
                        }} />
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <Bar
                    spendingCategory="potential"
                    onLeave={closeTooltip}
                    onEnter={showPotentialTooltip}
                    barStyles={potentialBarStyle}>
                    <Bar
                        spendingCategory="obligated"
                        barWrapperStyles={absoluteWidths.obligated}
                        onLeave={closeTooltip}
                        onEnter={showObligatedTooltip}
                        barStyles={{ width: generatePercentage(1), ...obligatedBarStyle }}>
                        {isCaresReleased &&
                            <div className="nested-obligations">
                                <Bar
                                    spendingCategory="file-c-obligated"
                                    onLeave={closeTooltip}
                                    onEnter={showFileCObligatedTooltip}
                                    barWrapperStyles={relativeWidths.fileCObligated}
                                    barStyles={{ width: generatePercentage(1), ...fileCObligatedBarStyle }}>
                                    {isFileCOutlayDefined &&
                                        <Bar
                                            spendingCategory="file-c-outlay"
                                            onLeave={closeTooltip}
                                            onEnter={showFileCOutlayTooltip}
                                            barWrapperStyles={{ ...relativeWidths.fileCOutlay, ...fileCOutlayPositioning }}
                                            barStyles={{ width: generatePercentage(1), ...fileCOutlayBarStyle }} />
                                    }
                                </Bar>
                            </div>
                        }
                    </Bar>
                    <Bar
                        spendingCategory="current"
                        barWrapperStyles={absoluteWidths.currentWithObligatedOffset}
                        onLeave={closeTooltip}
                        onEnter={showCurrentTooltip}
                        barStyles={currentBarStyle} />
                </Bar>
            </div>
            {/* Even if outlay is 0, we want to show this so long as the obligated is > 0 */}
            {isCaresReleased &&
                <BarLabelAndLine
                    spendingCategory="file-c-outlay"
                    labelStyles={{ marginLeft: `${offsets.fileCOutlay / 2}px` }}
                    lineStyles={{ width: `calc(${absoluteWidths.fileCOutlay.width} - ${offsets.fileCOutlay / 2}px)` }}>
                    <BarValue
                        spendingCategory="file-c-outlay"
                        onEnter={showFileCOutlayTooltip}
                        onLeave={closeTooltip}
                        title="COVID-19 Response Outlay Amount"
                        number={awardAmounts.fileCOutlayAbbreviated} />
                </BarLabelAndLine>
            }
            <BarLabelAndLine
                spendingCategory="current"
                labelStyles={{
                    marginLeft: `${offsets.current / 2}px`,
                    width: `calc(${absoluteWidths.current.width} - ${offsets.current / 2}px)`
                }}
                lineStyles={currentBarStyle}
                labelClassName={`award-amounts-viz__label${classNameForCovid}`}
                lineClassName={`award-amounts-viz__line${classNameForCovid} `}>
                <BarValue
                    spendingCategory="current"
                    onLeave={closeTooltip}
                    onEnter={showCurrentTooltip}
                    number={awardAmounts.baseExercisedOptionsAbbreviated}
                    title={isIdv ? "Combined Current Award Amounts" : "Current Award Amount"} />
            </BarLabelAndLine>
            <BarLabelAndLine
                spendingCategory="potential"
                labelClassName={`award-amounts-viz__label${classNameForCovid}`}
                lineClassName={`award-amounts-viz__line${classNameForCovid} `}
                lineStyles={{ backgroundColor: potentialBarStyle.backgroundColor }}>
                <BarValue
                    spendingCategory="potential"
                    onLeave={closeTooltip}
                    onEnter={showPotentialTooltip}
                    number={awardAmounts.baseAndAllOptionsAbbreviated}
                    title={isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"} />
            </BarLabelAndLine>
        </div>
    );
};

NormalChart.propTypes = propTypes;

export default NormalChart;
