import React from 'react';
import PropTypes from 'prop-types';
import NewPicker from './NewPicker';
import { allFiscalYears } from '../../../helpers/fiscalYearHelper';

const propTypes = {
    size: PropTypes.string,
    leftIcon: PropTypes.string,
    enabled: PropTypes.bool,
    backgroundColor: PropTypes.string,
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    earliestValue: PropTypes.number,
    latestValue: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    handleChange: PropTypes.func,
    sortFn: PropTypes.func
};

const defaultSort = (a, b) => {
    if (Number.isInteger(a)) return b - a;
    return parseInt(b, 10) - parseInt(a, 10);
};

const NumericPickerWrapper = ({
    backgroundColor,
    size,
    latestValue,
    selectedValue = 2020,
    earliestValue = 2017,
    options = [],
    handleChange = () => { },
    sortFn = defaultSort,
    enabled = true
}) => {
    const renderOptions = () => {
        // override default earliest/latest options
        if (options.length) return options.map((obj) => ({ ...obj, onClick: handleChange }));
        if (latestValue) {
            return allFiscalYears(earliestValue, latestValue)
                .map((year) => ({ name: `FY ${year}`, value: `${year}`, onClick: handleChange }));
        }
        return [{ name: 'Loading fiscal years...', value: null, onClick: () => { } }];
    };
    return (
        <div className="numeric-picker__container">
            <NewPicker
                backgroundColor={backgroundColor}
                label="Filter by:"
                size={size}
                classname="numeric-picker__wrapper"
                dropdownClassname="numeric-picker__dropdown"
                leftIcon="calendar-alt"
                selectedOption={options.length
                    ? options.find((obj) => obj.value === selectedValue || obj.value === parseInt(selectedValue, 10)).name || '--'
                    : `FY ${selectedValue}`
                }
                sortFn={sortFn}
                options={renderOptions()}
                enabled={enabled} />
        </div>
    );
};

NumericPickerWrapper.displayName = 'Fiscal Year NewPicker';
NumericPickerWrapper.propTypes = propTypes;

export default NumericPickerWrapper;
