import React from 'react';
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
import QuarterButton from "./NewQuarterButton";
import { getPeriodTitle } from '-helpers/shared/dateHelper';

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
    index
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
                                quarter={period.id}
                                title={getPeriodTitle(period.title)}
                                disabled={disabledPeriods.includes(period.id)}
                                active={isIdOrGreaterInArray(period.id, selectedPeriods)}
                                handleSelection={handleSelection} />
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    const disabled = disabledQuarters.includes(quarterNumberAsString)
    const active = isCumulative ?
        isIdOrGreaterInArray(quarterNumberAsString, selectedQuarters) :
        selectedQuarters.includes(quarterNumberAsString);

    return (
        <li className="quarter-picker__list-item" key={uniqueId()}>
            <QuarterButton
                quarter={quarterNumberAsString}
                disabled={disabled}
                active={active}
                handleSelection={handleSelection} />
        </li>
    );
};

Quarters.propTypes = propTypes;
export default Quarters;
