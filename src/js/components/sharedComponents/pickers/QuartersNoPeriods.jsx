import React from 'react';
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
import QuarterButton from "./NewQuarterButton";

const isIdOrGreaterInArray = (idStr, arr) => arr
    .some((periodOrQuarter) => parseInt(periodOrQuarter, 10) >= parseInt(idStr, 10));

const propTypes = {
    periodsPerQuarter: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                id: PropTypes.string
            })
        )
    ),
    handleSelection: PropTypes.func,
    selectedQuarters: PropTypes.arrayOf(PropTypes.string),
    disabledQuarters: PropTypes.arrayOf(PropTypes.string),
    selectedPeriods: PropTypes.arrayOf(PropTypes.string),
    disabledPeriods: PropTypes.arrayOf(PropTypes.string),
    showPeriods: PropTypes.bool,
    isCumulative: PropTypes.bool,
    periodHoverState: PropTypes.string,
    handleHover: PropTypes.func,
    handleBlur: PropTypes.func,
    quarterHoverState: PropTypes.string,
    index: PropTypes.number
};


const Quarters = ({
    periodsPerQuarter,
    handleSelection,
    selectedQuarters,
    disabledQuarters,
    selectedPeriods,
    disabledPeriods,
    showPeriods,
    isCumulative,
    index,
    periodHoverState,
    handleHover,
    handleBlur,
    quarterHoverState
}) => {
    const quarterNumber = index + 1;
    const quarterNumberAsString = `${quarterNumber}`;

    if (showPeriods) {
        const periodsForQuarter = periodsPerQuarter[index];
        const isQuarterDisabled = periodsForQuarter.every(
            (period) => disabledPeriods.includes(period.id)
        );

        const className = (period) => Object.keys(period).includes('className') ?
            `${period.className} quarter-picker__list-item` : 'quarter-picker__list-item';

        return (
            <li
                className="quarter-picker__list-item quarter-picker__period-list-container"
                key={uniqueId()}>
                <p className={isQuarterDisabled ? 'disabled' : ''}>{`Q${quarterNumber}`}</p>
                <ul className="quarter-picker__period-list">
                    {periodsForQuarter.map((period) => (
                        <li
                            className={className(period)}
                            key={uniqueId()}>
                            <QuarterButton
                                showPeriods={showPeriods}
                                quarter={period.id}
                                title={period.title}
                                disabled={disabledPeriods.includes(period.id)}
                                active={(
                                    isIdOrGreaterInArray(period.id, selectedPeriods) ||
                                    parseInt(periodHoverState, 10) >= parseInt(period.id, 10)
                                )}
                                handleHover={handleHover}
                                handleBlur={handleBlur}
                                handleSelection={handleSelection}
                                toggleTooltip={() => {}} />
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    const disabled = disabledQuarters.includes(quarterNumberAsString)
    const active = isCumulative ?
        (
            isIdOrGreaterInArray(quarterNumberAsString, selectedQuarters) ||
            parseInt(quarterHoverState, 10) >= quarterNumber
        )
        : (
            selectedQuarters.includes(quarterNumberAsString) ||
            quarterHoverState === quarterNumberAsString
        )

    return (
        <li className="quarter-picker__list-item" key={uniqueId()}>
            <QuarterButton
                quarter={quarterNumberAsString}
                disabled={disabled}
                active={active}
                handleSelection={handleSelection}
                handleHover={handleHover}
                handleBlur={handleBlur}
                toggleTooltip={() => {}}/>
        </li>
    );
};

Quarters.propTypes = propTypes;
export default Quarters;
