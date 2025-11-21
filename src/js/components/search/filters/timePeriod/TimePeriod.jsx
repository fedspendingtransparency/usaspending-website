/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { Set } from 'immutable';

import { NewAwardsTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import DateRange from './DateRange';
import AllFiscalYearsWithChips from "./AllFiscalYearsWithChips";
import DateRangeError from './DateRangeError';
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import FilterTabs from '../../../sharedComponents/filterSidebar/FilterTabs';
import usePrevious from "../../../../hooks/usePrevious";

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
    updateNewAwardsOnlySelected: PropTypes.func,
    updateNewAwardsOnlyActive: PropTypes.func,
    updateNaoActiveFromFyOrDateRange: PropTypes.func,
    changeTab: PropTypes.func,
    disableDateRange: PropTypes.bool,
    dirtyFilters: PropTypes.symbol,
    newAwardsOnlySelected: PropTypes.bool,
    newAwardsOnlyActive: PropTypes.bool,
    federalAccountPage: PropTypes.bool,
    searchV2: PropTypes.bool
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
    updateNewAwardsOnlySelected,
    updateNewAwardsOnlyActive,
    updateNaoActiveFromFyOrDateRange,
    changeTab,
    disableDateRange = false,
    dirtyFilters,
    newAwardsOnlySelected,
    newAwardsOnlyActive,
    federalAccountPage,
    searchV2
}) => {
    const [startDateUI, setStartDateUI] = useState(null);
    const [endDateUI, setEndDateUI] = useState(null);
    const [startDateDropdown, setStartDateDropdown] = useState(null);
    const [endDateDropdown, setEndDateDropdown] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [header, setHeader] = useState('');
    const [dateRangeChipRemoved, setDateRangeChipRemoved] = useState(false);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
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

    const handleDateChange = (date, dateType) => {
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
    };

    const removeDateRange = (newValue) => {
        updateGenericFilter({
            type: 'timePeriodType',
            value: 'dr'
        });

        setDateRangeChipRemoved(true);
        setStartDateUI(null);
        setEndDateUI(null);
        setStartDateDropdown(null);
        setEndDateDropdown(null);

        if (activeTab === 'dr') {
            updateGenericFilter({
                type: 'timePeriodType',
                value: 'dr'
            });
            updateGenericFilter({
                type: 'time_period',
                value: newValue
            });
        }
    };

    const showErrorFunc = (error, message) => {
        setShowError(true);
        setHeader(error);
        setErrorMessage(message);
    };

    const hideError = () => {
        setShowError(false);
        setHeader('');
    };

    const newAwardsClick = (e) => {
        updateNewAwardsOnlySelected(e.target.checked);
    };

    const enterKeyToggleHandler = (e) => {
        if (e.key === 'Enter') {
            let isSelected = false;
            if (!newAwardsOnlySelected) {
                isSelected = true;
            }
            else {
                isSelected = false;
            }
            updateNewAwardsOnlySelected(isSelected);
        }
    };

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

    const isSubAward = spendingLevel === "subawards";
    const newAwardsFilter = (
        <div className={`new-awards-wrapper ${activeClassDR}`}>
            <label
                htmlFor="new-awards-checkbox">
                <input
                    type="checkbox"
                    className={`new-awards-checkbox ${isSubAward || !newAwardsOnlyActive ? 'not-active' : ''}`}
                    id="new-awards-checkbox"
                    value="new-awards-checkbox"
                    disabled={isSubAward || !newAwardsOnlyActive}
                    checked={newAwardsOnlySelected && !isSubAward}
                    onChange={newAwardsClick}
                    onKeyUp={(e) => enterKeyToggleHandler(e)} />
                <span className={`new-awards-label ${isSubAward || !newAwardsOnlyActive ? 'not-active' : ''}`}>
                    Show New Awards Only
                </span>
            </label>
            <TooltipWrapper
                icon="info"
                tooltipComponent={<NewAwardsTooltip />} />
        </div>
    );

    const tabLabels = [
        {
            internal: 'fy',
            label: (
                <div>
                    Fiscal years &nbsp; <GlossaryLink term="fiscal-year-fy" />
                </div>
            ),
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
                <FilterTabs
                    labels={tabLabels}
                    switchTab={toggleTab}
                    active={activeTab} />
                { showFilter }
                { errorDetails }
                { !federalAccountPage && newAwardsFilter }
                { !searchV2 && <SubmitHint selectedFilters={dirtyFilters} />}
            </div>
        </div>
    );
};

TimePeriod.propTypes = propTypes;
export default TimePeriod;
