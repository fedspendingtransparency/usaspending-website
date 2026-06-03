/**
 * QuarterPicker.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash-es";
import Quarters from "./Quarters";

// import '../../styles/components/quarterPicker/_quarterPicker.scss';

const defaultPeriodsPerQuarter = [
    [
        { title: '1 - 2', id: '2', className: 'double-period' },
        { title: '3', id: '3' }
    ],
    [
        { title: '4', id: '4' },
        { title: '5', id: '5' },
        { title: '6', id: '6' }
    ],
    [
        { title: '7', id: '7' },
        { title: '8', id: '8' },
        { title: '9', id: '9' }
    ],
    [
        { title: '10', id: '10' },
        { title: '11', id: '11' },
        { title: '12', id: '12' }
    ]
];

const propTypes = {
    handleSelection: PropTypes.func,
    selectedQuarters: PropTypes.arrayOf(PropTypes.string),
    disabledQuarters: PropTypes.arrayOf(PropTypes.string),
    selectedPeriods: PropTypes.arrayOf(PropTypes.string),
    disabledPeriods: PropTypes.arrayOf(PropTypes.string),
    periodsPerQuarter: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                id: PropTypes.string,
                className: PropTypes.string
            })
        )
    ),
    showPeriods: PropTypes.bool,
    isCumulative: PropTypes.bool
};

const QuarterPicker = ({
    handleSelection,
    disabledQuarters = [],
    disabledPeriods = [],
    periodsPerQuarter = defaultPeriodsPerQuarter,
    selectedQuarters = [],
    selectedPeriods = [],
    showPeriods = false,
    isCumulative = false
}) => {
    return (
        <div className="quarter-picker">
            <ul className="quarter-picker__list">
                { new Array(4)
                    .fill(0)
                    .map((_, quarterIndex) => (
                        <Quarters
                            periodsPerQuarter={periodsPerQuarter}
                            handleSelection={handleSelection}
                            selectedQuarters={selectedQuarters}
                            disabledQuarters={disabledQuarters}
                            selectedPeriods={selectedPeriods}
                            disabledPeriods={disabledPeriods}
                            showPeriods={showPeriods}
                            isCumulative={isCumulative}
                            index={quarterIndex}
                            key={uniqueId('quarter_')}/>

                    ))
                }
            </ul>
        </div>
    );
};

QuarterPicker.propTypes = propTypes;
export default QuarterPicker;
