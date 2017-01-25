/**
  * TimePeriodContainer.jsx
  * Created by Kevin Li 11/21/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import TimePeriod from 'components/search/filters/timePeriod/TimePeriod';

const startYear = FiscalYearHelper.earliestFiscalYear;

const propTypes = {
    updateTimePeriod: React.PropTypes.func,
    filterTimePeriodType: React.PropTypes.string,
    filterTimePeriodFY: React.PropTypes.instanceOf(Immutable.Set),
    filterTimePeriodStart: React.PropTypes.string,
    filterTimePeriodEnd: React.PropTypes.string
};

class TimePeriodContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timePeriods: []
        };

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount() {
        this.generateTimePeriods();
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
        this.updateFilter({
            dateType: tab
        });
    }

    updateFilter(params) {
        // set the state to a clone of the filter subobject merged with the param object
        const currentFilters = {
            dateType: this.props.filterTimePeriodType,
            fy: this.props.filterTimePeriodFY,
            startDate: this.props.filterTimePeriodStart,
            endDate: this.props.filterTimePeriodEnd
        };

        const newFilters = Object.assign({}, currentFilters, params);

        this.props.updateTimePeriod(newFilters);
    }

    render() {
        return (
            <TimePeriod
                {...this.props}
                activeTab={this.props.filterTimePeriodType}
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
        filterTimePeriodEnd: state.filters.timePeriodEnd
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimePeriodContainer);
