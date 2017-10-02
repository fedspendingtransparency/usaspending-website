/**
 * FYPicker.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const propTypes = {
    pickedYear: PropTypes.func
};

const FYPicker = (props) => {
    const fy = [];
    const currentFY = FiscalYearHelper.defaultFiscalYear();
    const earliestFY = FiscalYearHelper.earliestExplorerYear;
    for (let year = currentFY; year >= earliestFY; year--) {
        const item = (<li key={year}>
            <button
                className="fy-item"
                onClick={props.pickedYear.bind(null, year)}>
                Fiscal Year {year}
            </button>
        </li>);

        fy.push(item);
    }

    return (
        <div className="explorer-fy-picker">
            <ul className="fy-list">
                {fy}
            </ul>
        </div>
    );
};

FYPicker.propTypes = propTypes;

export default FYPicker;
