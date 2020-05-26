/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';

import { AWARD_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

const isCovid = true;

const emptyTooltipProps = {
    styles: {},
    tooltipComponent: <p>Placeholder</p>
};

const NormalChart = ({ awardType, awardAmounts }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    const isIdv = (awardType === 'idv');

    const showTooltip = (spendingCategory, type = awardType, data = awardAmounts) => {
        setActiveTooltipProps({
            ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
            wide: isIdv
        });
        setIsTooltipVisible(true);
    };

    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const obligation = awardAmounts._totalObligation;
    const current = awardAmounts._baseExercisedOptions;
    const potential = awardAmounts._baseAndAllOptions;
    const fileCOutlay = awardAmounts._fileCOutlay;
    const fileCObligated = awardAmounts._fileCObligated;

    const fileCOutlayWidth = {
        width: generatePercentage(fileCOutlay / potential)
    };
    const fileCObligatedWidth = {
        width: generatePercentage((fileCObligated + fileCOutlay) / potential)
    };
    const obligatedWidth = {
        width: generatePercentage(obligation / potential)
    };
    const currentWidth = {
        width: generatePercentage((current - obligation) / potential)
    };

    const currentLabelWidth = {
        width: generatePercentage(current / potential)
    };

    const fileCOutlayBarStyle = {
        backgroundColor: '#6E338E'
    };

    const fileCOutlayPositioning = {
        position: 'relative',
        right: fileCObligatedWidth.width,
        padding: '0.2rem'
    };

    const fileCObligatedBarStyle = {
        backgroundColor: '#B699C6'
    };

    const obligatedBarStyle = {
        backgroundColor: isCovid ? '#0A2F5A' : '#4773aa',
        border: isCovid ? 'solid 0.2rem #558EC6' : 'solid 0.4rem #d6d7d9'
    };

    const currentBarStyle = {
        backgroundColor: isCovid ? '#558EC6' : '#d8d8d8',
        border: 'none'
    };

    const potentialBarStyle = {
        backgroundColor: isCovid ? '#AAC6E2' : '#fff',
        border: 'none'
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

    const classNameForCovid = isCovid ? ' covid' : '';

    return (
        <div className="award-amounts-viz">
            <TooltipWrapper
                className="award-section-tt"
                onMouseMoveTooltip={setIsTooltipVisible.bind(null, true)}
                onMouseLeaveTooltip={setIsTooltipVisible.bind(null, false)}
                controlledProps={{
                    isControlled: true,
                    isVisible: isTooltipVisible
                }}
                {...activeTooltipProps} />
            <div
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
            <div className="award-amounts-viz__label obligated" style={obligatedWidth}>
                <div className={`award-amounts-viz__line-up${classNameForCovid}`} />
            </div>
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
                    <div className="award-amounts-viz__bar potential" style={potentialBarStyle}>
                        <div
                            className="obligated"
                            style={obligatedWidth}
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
                                <div className="nested-obligations">
                                    <div
                                        className="file-c-obligated"
                                        style={fileCObligatedWidth}
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
                                    <div
                                        className="file-c-outlay"
                                        style={{ ...fileCOutlayWidth, ...fileCOutlayPositioning }}
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
                                </div>
                            </div>
                        </div>
                        <div
                            className="current"
                            style={currentWidth}
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
            <div className="award-amounts-viz__label" style={currentLabelWidth}>
                <div
                    className={`award-amounts-viz__line current${classNameForCovid}`}
                    style={{ backgroundColor: currentBarStyle.backgroundColor }} />
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
