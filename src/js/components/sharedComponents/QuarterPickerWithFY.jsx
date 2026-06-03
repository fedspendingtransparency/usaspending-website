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
import { QuarterPicker } from "data-transparency-ui";
import FYPicker from 'components/sharedComponents/pickers/FYPicker';

const propTypes = {
    handlePickedYear: PropTypes.func,
    handleQuarterPickerSelection: PropTypes.func,
    selectedFy: PropTypes.string,
    latestSelectedTimeInterval: PropTypes.string,
    updateFilter: PropTypes.func,
    newPicker: PropTypes.bool
};

const QuarterPickerWithFY = ({
    handlePickedYear,
    selectedFy,
    handleQuarterPickerSelection,
    latestSelectedTimeInterval,
    updateFilter,
    newPicker
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

    const onClearSelect = () => {
        updateFilter('fy', '');
        updateFilter('period', null);
        updateFilter('quarter', null);
    }

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

    if (newPicker) return (
        <div className="download-filter__fy">
            <ComboBox
                optionsArray={optionsArray}
                onSelect={onSelect}
                defaultValue={`FY ${defaultFy}`}
                label={"Fiscal Year"}
                formName={"download-filter__fy"}
                onClearSelect={onClearSelect}
                disabled={!latestFy} />
            <NewQuarterPicker
                showPeriods
                periodsPerQuarter={periodsPerQuarter}
                selectedPeriods={[latestSelectedTimeInterval]}
                disabledPeriods={disabledPeriodsInFy}
                handleSelection={handleQuarterPickerSelection} />
        </div>
    );

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
    )
};

QuarterPickerWithFY.propTypes = propTypes;
export default QuarterPickerWithFY;
