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
    appliedFilters: PropTypes.object,
    newAwardsOnlySelected: PropTypes.bool,
    newAwardsOnlyActive: PropTypes.bool
};

export class TimePeriodContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timePeriods: [],
            activeTab: 'fy',
            cachedTimePeriods: Set(),
            cachedStart: null,
            cachedEnd: null
        };

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount() {
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
        // set the state to a clone of the filter subobject merged with the param object
        const currentFilters = {
            dateType: this.state.activeTab,
            fy: this.props.filterTimePeriodFY,
            startDate: this.props.filterTimePeriodStart,
            endDate: this.props.filterTimePeriodEnd
        };

        const newFilters = Object.assign({}, currentFilters, params);

        if (this.state.activeTab === 'fy') {
            // reset the date range values
            newFilters.startDate = null;
            newFilters.endDate = null;
        }
        else {
            // reset the fiscal year set
            newFilters.fy = [];

            if (!newFilters.startDate && !newFilters.endDate) {
                newFilters.dateType = 'fy';
            }
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
        filterTimePeriodEnd: state.filters.timePeriodEnd,
        newAwardsOnlySelected: state.filters.filterNewAwardsOnlySelected,
        newAwardsOnlyActive: state.filters.filterNewAwardsOnlyActive,
        naoActiveFromFyOrDateRange: state.filters.filterNaoActiveFromFyOrDateRange,
        appliedFilters: state.appliedFilters.filters,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimePeriodContainer);
