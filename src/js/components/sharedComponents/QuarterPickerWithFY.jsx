import React from 'react';
import PropTypes from 'prop-types';
import { QuarterPicker } from 'data-transparency-ui';

import { availableQuartersInFY } from 'containers/explorer/detail/helpers/explorerQuarters';
import FYPicker from 'components/sharedComponents/pickers/FYPicker';

const quarters = ['1', '2', '3', '4'];

const QuarterPickerWithFY = ({
    handlePickedYear,
    selectedFy,
    handlePickedQuarter,
    selectedQuarter
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
                isCumulative
                selectedQuarters={[selectedQuarter]}
                disabledQuarters={disabledQuarters}
                handleSelection={handlePickedQuarter} />
        </div>
    );
};

QuarterPickerWithFY.propTypes = {
    handlePickedYear: PropTypes.func,
    handlePickedQuarter: PropTypes.func,
    selectedFy: PropTypes.string,
    selectedQuarter: PropTypes.string
};

export default QuarterPickerWithFY;
