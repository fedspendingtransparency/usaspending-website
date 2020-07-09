import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { QuarterPicker } from 'data-transparency-ui';

import { fetchActivePeriods, getLatestSubmissionPeriodInFy } from 'helpers/downloadHelper';
import {
    availableQuartersInFY,
    periods,
    quarters,
    getPeriodsPerQuarterByFy
} from 'containers/explorer/detail/helpers/explorerQuarters';
import FYPicker from 'components/sharedComponents/pickers/FYPicker';

const QuarterPickerWithFY = ({
    handlePickedYear,
    selectedFy,
    handleQuarterPickerSelection,
    latestSelectedTimeInterval
}) => {
    const [periodsPerQuarter, setPeriodsPerQuarter] = useState(getPeriodsPerQuarterByFy(parseInt(selectedFy, 10)));
    const [disabledPeriodsInFy, setDisabledPeriodsInFy] = useState([]);
    const request = useRef();

    const getActivePeriods = useCallback((fy = selectedFy) => {
        if (parseInt(fy, 10) >= 2020) {
            if (request.current) {
                request.current.cancel();
            }
            request.current = fetchActivePeriods();
            request.current.promise
                .then(({ data: { available_periods: availablePeriods } }) => {
                    const latestAvailablePeriodInFy = getLatestSubmissionPeriodInFy(fy, availablePeriods);
                    const allAvailablePeriodsInFy = periods.filter((period) => parseInt(period, 10) <= latestAvailablePeriodInFy.period);
                    setDisabledPeriodsInFy(periods.filter((period) => !allAvailablePeriodsInFy.includes(period)));
                    request.current = null;
                });
        }
        else {
            const availableQuarters = availableQuartersInFY(fy).quarters.map((quarter) => `${quarter}`);
            setDisabledPeriodsInFy(quarters.filter((quarter) => !availableQuarters.includes(quarter)));
        }
    }, [selectedFy]);

    useEffect(() => {
        setPeriodsPerQuarter(getPeriodsPerQuarterByFy(parseInt(selectedFy, 10)));
    }, [selectedFy]);

    useEffect(() => {
        getActivePeriods();
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [getActivePeriods]);

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
                selectedPeriods={[latestSelectedTimeInterval]}
                disabledPeriods={disabledPeriodsInFy}
                handleSelection={handleQuarterPickerSelection} />
        </div>
    );
};

QuarterPickerWithFY.propTypes = {
    handlePickedYear: PropTypes.func,
    handleQuarterPickerSelection: PropTypes.func,
    selectedFy: PropTypes.string,
    latestSelectedTimeInterval: PropTypes.string
};

export default QuarterPickerWithFY;
