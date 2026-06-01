/**
 * QuarterPickerWithFY
 * Created by Max Kendall 10/25/2020
 **/

import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { allFiscalYears, currentFiscalYear, earliestExplorerYear } from 'helpers/fiscalYearHelper';
import { getLatestSubmissionPeriodInFy } from 'helpers/downloadHelper';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import {
    periods,
    getPeriodsPerQuarterByFy
} from 'containers/explorer/detail/helpers/explorerQuarters';
import NewQuarterPicker from "./pickers/NewQuarterPicker";
import ComboBox from "./ComboBox";

const propTypes = {
    handlePickedYear: PropTypes.func,
    handleQuarterPickerSelection: PropTypes.func,
    selectedFy: PropTypes.string,
    latestSelectedTimeInterval: PropTypes.string
};

const QuarterPickerWithFY = ({
    handlePickedYear,
    selectedFy,
    handleQuarterPickerSelection,
    latestSelectedTimeInterval
}) => {
    const [, allPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();

    const onSelect = useCallback((e) => {
        const year = e.target.value;

        // 2020 is when we started receiving federal submissions on a per-period basis.
        if (parseInt(year, 10) >= 2020) {
            const { period: latestSubmission } = getLatestSubmissionPeriodInFy(year, allPeriods);
            handlePickedYear(year, latestSubmission);
        }
        else {
            handlePickedYear(year, 4);
        }
    }, [allPeriods, handlePickedYear]);

    const periodsPerQuarter = useMemo(() =>
        getPeriodsPerQuarterByFy(parseInt(selectedFy, 10)),
    [selectedFy]);

    const disabledPeriodsInFy = useMemo(() => {
        //  when the selectedFY changes or the periods change, update the disabled periods/quarters
        if (parseInt(selectedFy, 10) === earliestExplorerYear) return ['1'];
        else if (selectedFy && allPeriods.size) {
            const latestAvailablePeriodInFy = getLatestSubmissionPeriodInFy(selectedFy, allPeriods);
            const allAvailablePeriodsInFy = periods.filter(
                (period) => parseInt(period, 10) <= latestAvailablePeriodInFy.period
            );

            return periods.filter((period) => !allAvailablePeriodsInFy.includes(period));
        }
    }, [selectedFy, allPeriods])

    useEffect(() => {
        // fetch periods on first render
        if (latestFy && latestPeriod) {
            handlePickedYear(`${latestFy}`, `${latestPeriod}`);
        }
    }, [latestFy, latestPeriod, handlePickedYear]);

    const defaultFy = useMemo( () => latestFy || currentFiscalYear(), [latestFy]);

    const optionsArray = useMemo(() => {
        return allFiscalYears(earliestExplorerYear, defaultFy)
            .map((fy) => ({
                text: `FY ${fy}`,
                value: fy
            }));
    }, [defaultFy]);

    return (
        <div className="quarter-picker">
            <div className="quarter-picker__fy">
                <ComboBox
                    optionsArray={optionsArray}
                    onSelect={onSelect}
                    defaultValue={`FY ${defaultFy}`}
                    disabled={!latestFy} />
            </div>
            <NewQuarterPicker
                showPeriods
                periodsPerQuarter={periodsPerQuarter}
                selectedPeriods={[latestSelectedTimeInterval]}
                disabledPeriods={disabledPeriodsInFy}
                handleSelection={handleQuarterPickerSelection} />
        </div>
    );
};

QuarterPickerWithFY.propTypes = propTypes;
export default QuarterPickerWithFY;
