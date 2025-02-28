/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { NewAwardsTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';
import { TooltipWrapper } from 'data-transparency-ui';
import { Set } from 'immutable';
import { isEqual } from 'lodash';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import DateRange from './DateRange';
import AllFiscalYearsWithChips from "./AllFiscalYearsWithChips";
import DateRangeError from './DateRangeError';
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import FilterTabs from '../../../sharedComponents/filterSidebar/FilterTabs';


const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const defaultProps = {
    disableDateRange: false
};

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
    updateNewAwardsOnlySelected: PropTypes.func,
    updateNewAwardsOnlyActive: PropTypes.func,
    updateNaoActiveFromFyOrDateRange: PropTypes.func,
    changeTab: PropTypes.func,
    disableDateRange: PropTypes.bool,
    dirtyFilters: PropTypes.symbol,
    subaward: PropTypes.bool,
    newAwardsOnlySelected: PropTypes.bool,
    newAwardsOnlyActive: PropTypes.bool,
    naoActiveFromFyOrDateRange: PropTypes.bool,
    federalAccountPage: PropTypes.bool,
    searchV2: PropTypes.bool
};

export default class TimePeriod extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDateUI: null,
            endDateUI: null,
            startDateDropdown: null,
            endDateDropdown: null,
            showError: false,
            header: '',
            description: '',
            isActive: false,
            selectedFY: new Set(),
            allFY: false,
            clearHint: false,
            dateRangeChipRemoved: false
        };

        // bind functions
        this.handleDateChange = this.handleDateChange.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.removeDateRange = this.removeDateRange.bind(this);
        this.clearHint = this.clearHint.bind(this);
        this.newAwardsClick = this.newAwardsClick.bind(this);
        this.determineIfNaoIsActive = this.determineIfNaoIsActive.bind(this);
    }

    componentDidMount() {
        this.prepopulateDatePickers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps, this.props)) {
            this.synchronizeDatePickers(this.props);
        }
        if (this.state.clearHint) {
            this.clearHint(false);
        }
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }

        this.determineIfNaoIsActive(prevProps, prevState);
    }

    determineIfNaoIsActive(prevProps, prevState) {
        if (prevProps.filterTimePeriodFY !== this.props.filterTimePeriodFY) {
            this.props.updateNewAwardsOnlyActive(!!this.props.filterTimePeriodFY?.size);
            this.props.updateNaoActiveFromFyOrDateRange(!!this.props.filterTimePeriodFY?.size);
        }
        else if (prevProps.filterTime_Period !== this.props.filterTime_Period) {
            this.props.updateNewAwardsOnlyActive(false);
            this.props.updateNaoActiveFromFyOrDateRange(false);
        }
        if (this.props.dirtyFilters) {
            this.props.updateNewAwardsOnlyActive(true);
            this.props.updateNaoActiveFromFyOrDateRange(true);
        }
        else if ((prevState.startDateUI !== this.state.startDateUI || prevState.endDateUI !== this.state.endDateUI) && (!this.state.startDateUI && !this.state.endDateUI)) {
            this.props.updateNewAwardsOnlyActive(false);
            this.props.updateNaoActiveFromFyOrDateRange(false);
        }
        else if ((prevState.startDateDropdown !== this.state.startDateDropdown || prevState.endDateDropdown !== this.state.endDateDropdown) && (!this.state.startDateDropdown && !this.state.endDateDropdown)) {
            this.props.updateNewAwardsOnlyActive(false);
            this.props.updateNaoActiveFromFyOrDateRange(false);
        }
    }

    clearHint(val) {
        this.setState({
            clearHint: val
        });
    }

    prepopulateDatePickers() {
        if ((!this.props.filterTimePeriodStart || !this.props.filterTimePeriodEnd) &&
            this.props.filterTimePeriodType !== 'dr') {
            // not filtering by a date range
            return;
        }
        // prepopulate the date pickers with the current filter values (in the event of remounting
        // or loading from a URL)
        const startDate = dayjs(null, 'YYYY-MM-DD');
        const endDate = dayjs(null, 'YYYY-MM-DD');
        if (startDate.isValid() && endDate.isValid()) {
            this.setState({
                startDateUI: startDate,
                endDateUI: endDate
            });
        }
    }

    synchronizeDatePickers(nextProps) {
    // synchronize the date picker state to Redux controlled props
    // convert start/end date strings to dayjs objects
        let datesChanged = false;
        const newState = {};

        // check if the start date changed
        if (nextProps.filterTimePeriodStart !== this.props.filterTimePeriodStart) {
            const startDate = dayjs(nextProps.filterTimePeriodStart, 'YYYY-MM-DD');
            // start date did change and it is a valid date (not null)
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
        if (nextProps.filterTimePeriodEnd !== this.props.filterTimePeriodEnd) {
            const endDate = dayjs(nextProps.filterTimePeriodEnd, 'YYYY-MM-DD');
            if (endDate.isValid()) {
                // end date did change and it is a valid date (not null)
                datesChanged = true;
                newState.endDateUI = endDate;
            }
            else if (this.props.filterTimePeriodEnd) {
                // value became null
                datesChanged = true;
                newState.endDateUI = null;
            }
        }
        if (datesChanged) {
            this.setState(newState);
        }
    }

    handleDateChange(date, dateType) {
        // the component will hold values of the start/end dates for use by the UI only
        // this is because the start/end range will be incomplete during the time the user has only
        // picked one date, or if they have picked an invalid range
        // additional logic is required to keep these values in sync with Redux
        let value = dayjs(date);
        if (!date) {
            value = null;
        }
        if (!dateType.includes("Dropdown")) {
            this.setState({
                [`${dateType}UI`]: value
            });
        }
        else if (dateType.includes("Dropdown")) {
            this.setState({
                [`${dateType}`]: value
            });
        }
    }

    removeDateRange(e) {
        this.clearHint(true);
        this.props.updateFilter({
            dateType: 'dr',
            startDate: null,
            endDate: null
        });
        this.setState({
            dateRangeChipRemoved: true,
            startDateUI: null,
            endDateUI: null,
            startDateDropdown: null,
            endDateDropdown: null
        });

        if (this.props.activeTab === 'dr') {
            this.props.updateFilter({
                dateType: 'dr',
                startDate: null,
                endDate: null,
                event: e,
                removeFilter: true
            });
        }
    }

    showError(error, message) {
        this.setState({
            showError: true,
            header: error,
            errorMessage: message
        });
    }

    hideError() {
        this.setState({
            showError: false,
            header: '',
            errorMessage: ''
        });
    }

    newAwardsClick(e) {
        this.props.updateNewAwardsOnlySelected(e.target.checked);
        if (this.hint) {
            this.hint.showHint();
        }
    }

    enterKeyToggleHandler(e) {
        if (e.key === 'Enter') {
            let isSelected = false;
            if (!this.props.newAwardsOnlySelected) {
                isSelected = true;
            }
            else {
                isSelected = false;
            }
            this.props.updateNewAwardsOnlySelected(isSelected);
        }
    }

    render() {
        let errorDetails;
        let showFilter;
        let activeClassDR = '';

        if (this.state.showError && this.props.activeTab === 'dr' && this.state.header !== '' && this.state.errorMessage !== '') {
            errorDetails = (<DateRangeError
                header={this.state.header}
                message={this.state.errorMessage} />);
            activeClassDR = 'inactive';
        }

        if (this.props.activeTab === 'fy' && !this.state.dateRangeChipRemoved) {
            showFilter = (<AllFiscalYearsWithChips
                updateFilter={this.props.updateFilter}
                timePeriods={this.props.timePeriods}
                selectedFY={this.props.filterTimePeriodFY} />);
        }
        else {
            showFilter = (<DateRange
                label={this.props.label}
                datePlaceholder=""
                startingTab={1}
                startDate={this.state.startDateUI}
                endDate={this.state.endDateUI}
                startDateDropdown={this.state.startDateDropdown}
                endDateDropdown={this.state.endDateDropdown}
                timePeriod={this.props.filterTime_Period}
                selectedStart={this.props.filterTimePeriodStart}
                selectedEnd={this.props.filterTimePeriodEnd}
                onDateChange={this.handleDateChange}
                showError={this.showError}
                errorState={this.state.showError}
                hideError={this.hideError}
                removeDateRange={this.removeDateRange}
                updateFilter={this.props.updateFilter}
                header={this.state.header}
                errorMessage={this.state.errorMessage} />);
            activeClassDR = '';
        }

        if (this.props.disableDateRange) {
            activeClassDR = 'hidden';
        }
        const newAwardsFilter = (
            <div className={`new-awards-wrapper ${activeClassDR}`}>
                <label
                    htmlFor="new-awards-checkbox">
                    <input
                        type="checkbox"
                        className={`new-awards-checkbox ${this.props.subaward || !this.props.newAwardsOnlyActive ? 'not-active' : ''}`}
                        id="new-awards-checkbox"
                        value="new-awards-checkbox"
                        disabled={this.props.subaward || !this.props.newAwardsOnlyActive}
                        checked={this.props.newAwardsOnlySelected}
                        onChange={this.newAwardsClick}
                        onKeyUp={(e) => this.enterKeyToggleHandler(e)} />
                    <span className={`new-awards-label ${this.props.subaward || !this.props.newAwardsOnlyActive ? 'not-active' : ''}`}>
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
                internal: 'dr',
                label: 'Custom dates',
                title: 'Custom dates'
            },
            {
                internal: 'fy',
                label: (
                    <div>
                        Fiscal years &nbsp; <GlossaryLink term="fiscal-year-fy" />
                    </div>
                ),
                title: 'Fiscal years'
            }
        ];

        const toggleTab = (e) => {
            this.setState({ dateRangeChipRemoved: false }, () => {
                if ((this.props.activeTab === 'fy' && e.target.textContent.trim() !== 'Fiscal years') || (this.props.activeTab === 'dr' && e.target.textContent.trim() !== 'Custom dates')) {
                    const nextTab = this.props.activeTab === 'fy' ? 'dr' : 'fy';
                    this.props.changeTab(nextTab);
                    this.clearHint(true);
                }
            });
        };

        return (
            <div className="tab-filter-wrap time-period">
                <div className="filter-item-wrap">
                    <FilterTabs
                        labels={tabLabels}
                        switchTab={toggleTab}
                        active={this.props.activeTab} />
                    { showFilter }
                    { errorDetails }
                    { !this.props.federalAccountPage && newAwardsFilter }
                    { !this.props.searchV2 && !this.state.clearHint &&
                        <SubmitHint
                            ref={(component) => {
                                this.hint = component;
                            }} />
                    }
                </div>
            </div>
        );
    }
}

TimePeriod.propTypes = propTypes;
TimePeriod.defaultProps = defaultProps;
