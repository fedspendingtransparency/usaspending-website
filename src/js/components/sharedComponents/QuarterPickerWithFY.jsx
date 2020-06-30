import React from 'react';
import PropTypes from 'prop-types';
import { QuarterPicker } from 'data-transparency-ui';

import { availableQuartersInFY } from 'containers/explorer/detail/helpers/explorerQuarters';
import FYPicker from 'components/sharedComponents/pickers/FYPicker';

const quarters = ['1', '2', '3', '4'];

const defaultPeriodsPerQuarter = [
    [{ title: '1 - 3', id: '1', className: 'double-period' }],
    [{ title: '4 - 6', id: '2', className: 'double-period' }],
    [{ title: '7 - 9', id: '3', className: 'double-period' }],
    [{ title: '10 - 12', id: '4', className: 'double-period-extra-wide' }]
];

const QuarterPickerWithFY = ({
    handlePickedYear,
    selectedFy,
    handlePickedQuarter,
    selectedQuarter,
    periodsPerQuarter = defaultPeriodsPerQuarter
}) => {
    const availableQuarters = availableQuartersInFY(selectedFy).quarters.map((quarter) => `${quarter}`);
    const disabledQuarters = quarters.filter((quarter) => !availableQuarters.includes(quarter));
    return (
        <div className="quarter-picker">
            <div className="quarter-picker__fy">
                <FYPicker
                    fy={selectedFy}
                    onClick={handlePickedYear} />
            </div>
            <QuarterPicker
                showPeriods
                periodsPerQuarter={periodsPerQuarter}
                selectedPeriods={[selectedQuarter]}
                disabledPeriods={disabledQuarters}
                handleSelection={handlePickedQuarter} />
        </div>
    );
};

QuarterPickerWithFY.propTypes = {
    handlePickedYear: PropTypes.func,
    handlePickedQuarter: PropTypes.func,
    selectedFy: PropTypes.string,
    selectedQuarter: PropTypes.string,
    periodsPerQuarter: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        className: PropTypes.string
    })))
};

export default QuarterPickerWithFY;
