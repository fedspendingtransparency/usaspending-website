/**
  * TimePeriodContainer.jsx
  * Created by Kevin Li 11/21/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Set, is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import TimePeriod from 'components/search/filters/timePeriod/TimePeriod';

export const startYear = FiscalYearHelper.earliestFiscalYear;

const propTypes = {
    updateTimePeriod: PropTypes.func,
    filterTimePeriodType: PropTypes.string,
    filterTimePeriodFY: PropTypes.instanceOf(Set),
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    filterTime_Period: PropTypes.array,
    appliedFilters: PropTypes.object,
    newAwardsOnlySelected: PropTypes.bool,
    newAwardsOnlyActive: PropTypes.bool,
    naoActiveFromFyOrDateRange: PropTypes.bool
};

export class TimePeriodContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timePeriods: [],
            activeTab: 'dr',
            cachedTimePeriods: Set(),
            cachedStart: null,
            cachedEnd: null
        };

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount() {
        if (this.props.appliedFilters.timePeriodType === 'fy') {
            this.changeTab('fy');
        } else {
            this.changeTab('dr');
        }
        this.generateTimePeriods();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filterTimePeriodType !== this.props.filterTimePeriodType) {
            this.setUpdateState(this.props);
        }
    }

    setUpdateState(props) {
        this.setState({
            activeTab: props.filterTimePeriodType
        });
    }

    generateTimePeriods() {
        const timePeriods = [];

        // determine the current fiscal year
        const currentFY = FiscalYearHelper.currentFiscalYear();

        for (let i = currentFY; i >= startYear; i--) {
            timePeriods.push(i.toString());
        }

        this.setState({
            timePeriods
        });
    }

    changeTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    updateFilter(params) {
        console.debug(this.props.filterTimePeriodType, this.props.filterTimePeriodStart, this.props.filterTimePeriodEnd);
        const newFilters = Object.assign({}, params);

        if (this.state.activeTab === 'fy') {
            newFilters.dateType = 'fy';
            // reset the date range values
            newFilters.startDate = null;
            newFilters.endDate = null;
        }
        else {
            // reset the fiscal year set
            // start and end dates and datetype are in params
            newFilters.fy = [];
        }

        this.props.updateTimePeriod(newFilters);
    }

    dirtyFilters() {
        const appliedFields = [
            'timePeriodFY',
            'timePeriodStart',
            'timePeriodEnd'
        ];
        const activeFields = [
            'filterTimePeriodFY',
            'filterTimePeriodStart',
            'filterTimePeriodEnd'
        ];

        const noChanges = appliedFields.every((appliedField, index) => {
            const activeField = activeFields[index];
            const appliedValue = this.props.appliedFilters[appliedField];
            const activeValue = this.props[activeField];

            // do not set time filter to dirty when 1 checkbox is unchecked
            if ((activeValue && activeValue.size === 0) && (appliedValue && appliedValue.size >= 1)) {
                return true;
            }

            if (!is(appliedValue, activeValue)) {
                // field has changed
                return false;
            }


            return true;
        });

        if (!noChanges) {
            return Symbol('dirty time filter');
        }
        return null;
    }

    render() {
        return (
            <TimePeriod
                {...this.props}
                dirtyFilters={this.dirtyFilters()}
                newAwardsOnlySelected={this.props.newAwardsOnlySelected}
                newAwardsOnlyActive={this.props.newAwardsOnlyActive}
                naoActiveFromFyOrDateRange={this.props.naoActiveFromFyOrDateRange}
                activeTab={this.state.activeTab}
                timePeriods={this.state.timePeriods}
                updateFilter={this.updateFilter}
                changeTab={this.changeTab} />
        );
    }
}

TimePeriodContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filterTimePeriodType: state.filters.timePeriodType,
        filterTimePeriodFY: state.filters.timePeriodFY,
        filterTimePeriodStart: state.filters.timePeriodStart,
        filterTime_Period: state.filters.time_period,
        filterTimePeriodEnd: state.filters.timePeriodEnd,
        newAwardsOnlySelected: state.filters.filterNewAwardsOnlySelected,
        newAwardsOnlyActive: state.filters.filterNewAwardsOnlyActive,
        naoActiveFromFyOrDateRange: state.filters.filterNaoActiveFromFyOrDateRange,
        appliedFilters: state.appliedFilters.filters,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimePeriodContainer);
