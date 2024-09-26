/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import GlobalConstants from "GlobalConstants";
import PropTypes from 'prop-types';
import { NewAwardsTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';
import { TooltipWrapper } from 'data-transparency-ui';
import { Set } from 'immutable';
import { isEqual } from 'lodash';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import DateRange from './DateRange';
import AllFiscalYears from './AllFiscalYears';
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
    federalAccountPage: PropTypes.bool
};

export default class TimePeriod extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDateUI: null,
            endDateUI: null,
            showError: false,
            header: '',
            description: '',
            isActive: false,
            selectedFY: new Set(),
            allFY: false,
            clearHint: false,
            activeTab: 'fy',
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
            this.props.updateNewAwardsOnlyActive(!!this.props.filterTimePeriodFY.size);
            this.props.updateNaoActiveFromFyOrDateRange(!!this.props.filterTimePeriodFY.size);
        }
        else if ((prevState.startDateUI !== this.state.startDateUI || prevState.endDateUI !== this.state.endDateUI) && (this.state.startDateUI || this.state.endDateUI)) {
            this.props.updateNewAwardsOnlyActive(true);
            this.props.updateNaoActiveFromFyOrDateRange(true);
        }
        else if ((prevState.startDateUI !== this.state.startDateUI || prevState.endDateUI !== this.state.endDateUI) && (!this.state.startDateUI && !this.state.endDateUI)) {
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
        const startDate = dayjs(this.props.filterTimePeriodStart, 'YYYY-MM-DD');
        const endDate = dayjs(this.props.filterTimePeriodEnd, 'YYYY-MM-DD');

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
        this.setState({
            [`${dateType}UI`]: value
        });
    }

    removeDateRange() {
        this.clearHint(true);
        this.props.updateFilter({
            dateType: 'dr',
            startDate: null,
            endDate: null
        });
        this.setState({
            dateRangeChipRemoved: true
        });
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
            showFilter = GlobalConstants.QAT ? (<AllFiscalYearsWithChips
                updateFilter={this.props.updateFilter}
                timePeriods={this.props.timePeriods}
                selectedFY={this.props.filterTimePeriodFY} />) :
                (<AllFiscalYears
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
                internal: 'fy',
                label: (
                    <div>
                        Fiscal Year &nbsp; <GlossaryLink term="fiscal-year-fy" />
                    </div>
                ),
                title: 'Fiscal Year'
            },
            {
                internal: 'dr',
                label: 'Date Range',
                title: 'Date Range'
            }
        ];

        const toggleTab = (e) => {
            this.setState({ dateRangeChipRemoved: false }, () => {
                if ((this.state.activeTab === 'fy' && e.target.textContent.trim() !== 'Fiscal Year') || (this.state.activeTab === 'dr' && e.target.textContent.trim() !== 'Date Range')) {
                    const nextTab = this.state.activeTab === 'fy' ? 'dr' : 'fy';
                    this.setState({ ...this.state, activeTab: nextTab });
                    this.clearHint(true);
                    this.props.changeTab(nextTab);
                }
            });
        };

        return (
            <div className="tab-filter-wrap">
                <div className="filter-item-wrap location-filter">
                    <FilterTabs
                        labels={tabLabels}
                        switchTab={toggleTab}
                        active={this.state.activeTab} />
                    { showFilter }
                    { errorDetails }
                    { !this.props.federalAccountPage && newAwardsFilter }
                    {!this.state.clearHint &&
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
