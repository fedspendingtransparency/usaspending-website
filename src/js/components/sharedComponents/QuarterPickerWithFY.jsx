/**
 * QuarterPickerWithFY
 * Created by Max Kendall 10/25/2020
 * TODOs:
 * 1. Decouple this component from the fy/period data for accounts. 😰
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QuarterPicker } from 'data-transparency-ui';

import { earliestExplorerYear } from 'helpers/fiscalYearHelper';
import { getLatestSubmissionPeriodInFy } from 'helpers/downloadHelper';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import {
    periods,
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
    const [, allPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();

    const pickedYear = (year) => {
    // 2020 is when we started receiving federal submissions on a per-period basis.
        if (parseInt(year, 10) >= 2020) {
            const { period: latestSubmission } = getLatestSubmissionPeriodInFy(year, allPeriods);
            handlePickedYear(year, latestSubmission);
        }
        else {
            handlePickedYear(year, 4);
        }
    };

    useEffect(() => {
        setPeriodsPerQuarter(getPeriodsPerQuarterByFy(parseInt(selectedFy, 10)));
    }, [selectedFy]);

    useEffect(() => {
    //  when the selectedFY changes or the periods change, update the disabled periods/quarters
        if (parseInt(selectedFy, 10) === earliestExplorerYear) {
            setDisabledPeriodsInFy(['1']);
        }
        else if (selectedFy && allPeriods.size) {
            const latestAvailablePeriodInFy = getLatestSubmissionPeriodInFy(selectedFy, allPeriods);
            const allAvailablePeriodsInFy = periods.filter((period) => parseInt(period, 10) <= latestAvailablePeriodInFy.period);
            setDisabledPeriodsInFy(periods.filter((period) => !allAvailablePeriodsInFy.includes(period)));
        }
    }, [selectedFy, allPeriods]);

    useEffect(() => {
    // fetch periods on first render
        if (latestFy && latestPeriod) {
            handlePickedYear(`${latestFy}`, `${latestPeriod}`);
        }
    }, [latestFy, latestPeriod]);

    return (
        <div className="quarter-picker">
            <div className="quarter-picker__fy">
                <FYPicker
                    isLoading={!latestFy}
                    latestFy={latestFy}
                    fy={selectedFy}
                    onClick={pickedYear} />
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
