/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';

import FilterTabs from 'components/sharedComponents/filterSidebar/FilterTabs';
import usePrevious from "hooks/usePrevious";
import DateRange from './DateRange';
import AllFiscalYearsWithChips from "./AllFiscalYearsWithChips";
import DateRangeError from './DateRangeError';
import NewAwardsFilter from "./NewAwardsFilter";

const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const propTypes = {
    filterTimePeriodFY: PropTypes.instanceOf(Set),
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    filterTimePeriodType: PropTypes.string,
    filterTime_Period: PropTypes.object,
    label: PropTypes.string,
    timePeriods: PropTypes.array,
    activeTab: PropTypes.string,
    updateFilter: PropTypes.func,
    updateGenericFilter: PropTypes.func,
    updateNewAwardsOnlyActive: PropTypes.func,
    updateNaoActiveFromFyOrDateRange: PropTypes.func,
    changeTab: PropTypes.func,
    disableDateRange: PropTypes.bool,
    dirtyFilters: PropTypes.symbol,
    federalAccountPage: PropTypes.bool
};

const TimePeriod = ({
    filterTimePeriodFY,
    filterTimePeriodStart,
    filterTimePeriodEnd,
    filterTimePeriodType,
    filterTime_Period: filterTimePeriod,
    label,
    timePeriods,
    activeTab,
    updateFilter,
    updateGenericFilter,
    updateNewAwardsOnlyActive,
    updateNaoActiveFromFyOrDateRange,
    changeTab,
    disableDateRange = false,
    dirtyFilters,
    federalAccountPage
}) => {
    const [startDateUI, setStartDateUI] = useState(null);
    const [endDateUI, setEndDateUI] = useState(null);
    const [startDateDropdown, setStartDateDropdown] = useState(null);
    const [endDateDropdown, setEndDateDropdown] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [header, setHeader] = useState('');
    const [dateRangeChipRemoved, setDateRangeChipRemoved] = useState(false);
    const prevProps = usePrevious({ filterTimePeriodFY, filterTimePeriod });
    const prevState = usePrevious({
        startDateUI, endDateUI, startDateDropdown, endDateDropdown
    });

    const prepopulateDatePickers = () => {
        if ((!filterTimePeriodStart || !filterTimePeriodEnd) &&
            filterTimePeriodType !== 'dr') {
            // not filtering by a date range
            return;
        }
        // prepopulate the date pickers with the current filter values (in the event of remounting
        // or loading from a URL)
        const startDate = dayjs(null, 'YYYY-MM-DD');
        const endDate = dayjs(null, 'YYYY-MM-DD');
        if (startDate.isValid() && endDate.isValid()) {
            setStartDateUI(startDate);
            setEndDateUI(endDate);
        }
    };

    const synchronizeDatePickers = (nextProps) => {
        // synchronize the date picker state to Redux controlled props
        // convert start/end date strings to dayjs objects
        let datesChanged = false;
        const newState = {};

        // check if the start date changed
        if (nextProps.filterTimePeriodStart !== filterTimePeriodStart) {
            const startDate = dayjs(nextProps.filterTimePeriodStart, 'YYYY-MM-DD');
            // start date did change, and it is a valid date (not null)
            if (startDate.isValid()) {
                datesChanged = true;
                newState.startDateUI = startDate;
            }
            else {
                // value became null
                datesChanged = true;
                newState.startDateUI = null;
            }
        }

        // check if the end date changed
        if (nextProps.filterTimePeriodEnd !== filterTimePeriodEnd) {
            const endDate = dayjs(nextProps.filterTimePeriodEnd, 'YYYY-MM-DD');
            if (endDate.isValid()) {
                // end date did change and it is a valid date (not null)
                datesChanged = true;
                newState.endDateUI = endDate;
            }
            else if (filterTimePeriodEnd) {
                // value became null
                datesChanged = true;
                newState.endDateUI = null;
            }
        }

        if (datesChanged && newState?.startDateUI) {
            setStartDateUI(newState.startDateUI);
        }
        else if (datesChanged && newState?.endDateUI) {
            setEndDateUI(newState.endDateUI);
        }
    };

    const handleDateChange = useCallback((date, dateType) => {
        // the component will hold values of the start/end dates for use by the UI only
        // this is because the start/end range will be incomplete during the time the user has only
        // picked one date, or if they have picked an invalid range
        // additional logic is required to keep these values in sync with Redux
        let value = dayjs(date);
        if (!date) {
            value = null;
        }
        switch (dateType) {
            case 'startDate':
                setStartDateUI(value);
                break;
            case 'endDate':
                setEndDateUI(value);
                break;
            case 'startDateDropdown':
                setStartDateDropdown(value);
                break;
            case 'endDateDropdown':
                setEndDateDropdown(value);
                break;
            // no default
        }
    }, []);

    const removeDateRange = useCallback((newValue) => {
        setDateRangeChipRemoved(true);
        setStartDateUI(null);
        setEndDateUI(null);
        setStartDateDropdown(null);
        setEndDateDropdown(null);

        if (newValue?.size >= 1) {
            updateGenericFilter({
                type: 'time_period',
                value: newValue
            });
        }
        else {
            updateGenericFilter({
                type: 'time_period',
                value: new Set()
            });
            updateGenericFilter({
                type: 'timePeriodType',
                value: activeTab
            });
        }
    }, [activeTab, updateGenericFilter]);

    const showErrorFunc = useCallback((error, message) => {
        setShowError(true);
        setHeader(error);
        setErrorMessage(message);
    }, []);

    const hideError = useCallback(() => {
        setShowError(false);
        setHeader('');
    }, []);

    let errorDetails;
    let showFilter;
    let activeClassDR = '';

    if (showError && activeTab === 'dr' && header !== '' && errorMessage !== '') {
        errorDetails = (<DateRangeError
            header={header}
            message={errorMessage} />);
        activeClassDR = 'inactive';
    }

    if (activeTab === 'fy' && !dateRangeChipRemoved) {
        showFilter = (<AllFiscalYearsWithChips
            updateFilter={updateFilter}
            timePeriods={timePeriods}
            selectedFY={filterTimePeriodFY} />);
    }
    else {
        showFilter = (<DateRange
            label={label}
            datePlaceholder=""
            startingTab={1}
            startDate={startDateUI}
            endDate={endDateUI}
            startDateDropdown={startDateDropdown}
            endDateDropdown={endDateDropdown}
            timePeriod={filterTimePeriod}
            onDateChange={handleDateChange}
            showError={showErrorFunc}
            errorState={showError}
            hideError={hideError}
            removeDateRange={removeDateRange}
            updateFilter={updateFilter}
            header={header}
            setStartDate={setStartDateUI}
            setEndDate={setEndDateUI} />);
        activeClassDR = '';
    }

    if (disableDateRange) {
        activeClassDR = 'hidden';
    }

    const tabLabels = [
        {
            internal: 'fy',
            label: 'Fiscal years',
            title: 'Fiscal years'
        },
        {
            internal: 'dr',
            label: 'Custom dates',
            title: 'Custom dates'
        }
    ];

    const toggleTab = (e) => {
        setDateRangeChipRemoved(false);
        if ((activeTab === 'fy' && e.target.textContent.trim() !== 'Fiscal years') ||
            (activeTab === 'dr' && e.target.textContent.trim() !== 'Custom dates')) {
            const nextTab = activeTab === 'fy' ? 'dr' : 'fy';
            changeTab(nextTab);
        }
    };

    const additonalText = activeTab === 'fy' ?
        "Search by fiscal year (FY), a 12-month span from October 1 to September 30" :
        "Select a start/end date or choose from the pre-selected date ranges";

    useEffect(() => {
        prepopulateDatePickers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        synchronizeDatePickers({ filterTimePeriodStart, filterTimePeriodEnd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTimePeriodStart, filterTimePeriodEnd]);

    useEffect(() => {
        // determineIfNaoIsActive
        if (prevProps?.filterTimePeriodFY !== filterTimePeriodFY) {
            updateNewAwardsOnlyActive(!!filterTimePeriodFY?.size);
            updateNaoActiveFromFyOrDateRange(!!filterTimePeriodFY?.size);
        }
        else if (prevProps?.filterTime_Period !== filterTimePeriod) {
            updateNewAwardsOnlyActive(false);
            updateNaoActiveFromFyOrDateRange(false);
        }
        if (dirtyFilters) {
            updateNewAwardsOnlyActive(true);
            updateNaoActiveFromFyOrDateRange(true);
        }
        else if ((prevState?.startDateUI !== startDateUI || prevState?.endDateUI !== endDateUI) && (!startDateUI && !endDateUI)) {
            updateNewAwardsOnlyActive(false);
            updateNaoActiveFromFyOrDateRange(false);
        }
        else if ((prevState?.startDateDropdown !== startDateDropdown || prevState?.endDateDropdown !== endDateDropdown) && (!startDateDropdown && !endDateDropdown)) {
            updateNewAwardsOnlyActive(false);
            updateNaoActiveFromFyOrDateRange(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTimePeriodFY, filterTimePeriod, startDateUI, endDateUI, startDateDropdown, endDateDropdown]);

    return (
        <div className="tab-filter-wrap">
            <div className="filter-item-wrap">
                <div className="filter-description">
                    {additonalText}
                </div>
                <FilterTabs
                    labels={tabLabels}
                    switchTab={toggleTab}
                    active={activeTab} />
                { showFilter }
                { errorDetails }
                { !federalAccountPage && <NewAwardsFilter activeClassDR={activeClassDR} /> }
            </div>
        </div>
    );
};

TimePeriod.propTypes = propTypes;
export default TimePeriod;
