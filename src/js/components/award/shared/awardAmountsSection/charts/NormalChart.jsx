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
            width: generatePercentage(fileCOutlay / obligation)
        }
    };

    const fileCOutlayBarStyle = {
        backgroundColor: '#6E338E'
    };

    const fileCOutlayPositioning = {
        position: 'relative',
        right: relativeWidths.fileCObligated.width,
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
            <div
                style={{ marginLeft: `${offsets.obligated / 2}px` }}
                className="award-amounts-viz__desc-top"
                role="button"
                tabIndex="0"
                onBlur={closeTooltip}
                onFocus={showObligatedTooltip}
                onKeyPress={showObligatedTooltip}
                onMouseEnter={showObligatedTooltip}
                onMouseLeave={closeTooltip}
                onClick={showObligatedTooltip}>
                <strong>{awardAmounts.totalObligationAbbreviated}</strong><br />{isIdv ? "Combined Obligated Amounts" : "Obligated Amount"}
            </div>
            <div className="award-amounts-viz__label obligated" style={{ marginLeft: `${offsets.obligated / 2}px`, width: `calc(${absoluteWidths.obligated.width} - ${offsets.obligated}px)` }}>
                <div className={`award-amounts-viz__line-up${classNameForCovid}`} />
            </div>
            {isCaresReleased &&
                <>
                    <div
                        role="button"
                        className="award-amounts-viz__desc-top file-c-obligated"
                        style={{ marginLeft: `${offsets.fileCObligated / 2}px` }}
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showFileCObligatedTooltip}
                        onKeyPress={showFileCObligatedTooltip}
                        onMouseEnter={showFileCObligatedTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showFileCObligatedTooltip}>
                        <strong>{awardAmounts.fileCObligatedAbbreviated}</strong><br />COVID-19 Response Obligations Amount
                    </div>
                    <div className="award-amounts-viz__label file-c-obligated" style={{ marginLeft: `${offsets.fileCObligated / 2}px`, width: `calc(${absoluteWidths.fileCObligated.width} - ${offsets.fileCObligated / 2}px)` }}>
                        <div className="award-amounts-viz__line-up file-c-obligated" />
                    </div>
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <div
                    className="potential"
                    role="button"
                    tabIndex="0"
                    onBlur={closeTooltip}
                    onFocus={showPotentialTooltip}
                    onKeyPress={showPotentialTooltip}
                    onMouseEnter={showPotentialTooltip}
                    onMouseLeave={closeTooltip}
                    onClick={showPotentialTooltip}>
                    <div
                        className="award-amounts-viz__bar potential"
                        style={potentialBarStyle}>
                        <div
                            className="obligated"
                            style={absoluteWidths.obligated}
                            role="button"
                            tabIndex="0"
                            onBlur={closeTooltip}
                            onFocus={showObligatedTooltip}
                            onKeyPress={showObligatedTooltip}
                            onMouseEnter={showObligatedTooltip}
                            onMouseLeave={closeTooltip}
                            onClick={showObligatedTooltip}>
                            <div
                                className="award-amounts-viz__bar obligated"
                                style={{ width: generatePercentage(1), ...obligatedBarStyle }}>
                                {isCaresReleased &&
                                    <div className="nested-obligations">
                                        <div
                                            className="file-c-obligated"
                                            style={relativeWidths.fileCObligated}
                                            role="button"
                                            tabIndex="0"
                                            onBlur={closeTooltip}
                                            onFocus={showFileCObligatedTooltip}
                                            onKeyPress={showFileCObligatedTooltip}
                                            onMouseEnter={showFileCObligatedTooltip}
                                            onMouseLeave={closeTooltip}
                                            onClick={showFileCObligatedTooltip}>
                                            <div
                                                className="award-amounts-viz__bar file-c-obligated"
                                                style={{ width: generatePercentage(1), ...fileCObligatedBarStyle }} />
                                        </div>
                                        {isFileCOutlayDefined &&
                                            <div
                                                className="file-c-outlay"
                                                style={{ ...relativeWidths.fileCOutlay, ...fileCOutlayPositioning }}
                                                role="button"
                                                tabIndex="0"
                                                onBlur={closeTooltip}
                                                onFocus={showFileCOutlayTooltip}
                                                onKeyPress={showFileCOutlayTooltip}
                                                onMouseEnter={showFileCOutlayTooltip}
                                                onMouseLeave={closeTooltip}
                                                onClick={showFileCOutlayTooltip}>
                                                <div
                                                    className="award-amounts-viz__bar file-c-outlay"
                                                    style={{ width: generatePercentage(1), ...fileCOutlayBarStyle }} />
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div
                            className="current"
                            style={absoluteWidths.currentWithObligatedOffset}
                            role="button"
                            tabIndex="0"
                            onBlur={closeTooltip}
                            onFocus={showCurrentTooltip}
                            onKeyPress={showCurrentTooltip}
                            onMouseEnter={showCurrentTooltip}
                            onMouseLeave={closeTooltip}
                            onClick={showCurrentTooltip}>
                            <div className="award-amounts-viz__bar current" style={currentBarStyle} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Even if outlay is 0, we want to show this so long as the obligated is > 0 */}
            {isCaresReleased &&
                <div className="award-amounts-viz__label file-c-outlay" style={{ marginLeft: `${offsets.fileCOutlay / 2}px` }}>
                    <div className="award-amounts-viz__line file-c-outlay" style={{ width: `calc(${absoluteWidths.fileCOutlay.width} - ${offsets.fileCOutlay / 2}px)` }} />
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            style={{ marginLeft: `${offsets.fileCOutlay / 2}px` }}
                            onBlur={closeTooltip}
                            onFocus={showFileCOutlayTooltip}
                            onKeyPress={showFileCOutlayTooltip}
                            onMouseEnter={showFileCOutlayTooltip}
                            onMouseLeave={closeTooltip}
                            onClick={showFileCOutlayTooltip}>
                            <strong>{awardAmounts.fileCOutlayAbbreviated}</strong><br />
                            COVID-19 Response Outlay Amount
                        </div>
                    </div>
                </div>
            }
            <div className="award-amounts-viz__label" style={{ marginLeft: `${offsets.current / 2}px`, width: `calc(${absoluteWidths.current.width} - ${offsets.current / 2}px)` }}>
                <div
                    className={`award-amounts-viz__line current${classNameForCovid}`}
                    style={currentBarStyle} />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showCurrentTooltip}
                        onKeyPress={showCurrentTooltip}
                        onMouseEnter={showCurrentTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showCurrentTooltip}>
                        <strong>{awardAmounts.baseExercisedOptionsAbbreviated}</strong><br />{isIdv ? "Combined Current Award Amounts" : "Current Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line" style={currentBarStyle} />
                </div>
            </div>
            <div className="award-amounts-viz__label">
                <div className={`award-amounts-viz__line potential${classNameForCovid}`} />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showPotentialTooltip}
                        onKeyPress={showPotentialTooltip}
                        onMouseEnter={showPotentialTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showPotentialTooltip}>
                        <strong>{awardAmounts.baseAndAllOptionsAbbreviated}</strong><br />{isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={potentialBarStyle} />
                </div>
            </div>
        </div>
    );
};

NormalChart.propTypes = propTypes;

export default NormalChart;
