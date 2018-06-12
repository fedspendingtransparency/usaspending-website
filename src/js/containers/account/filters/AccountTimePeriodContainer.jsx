/**
  * AccountTimePeriodContainer.jsx
  * Created by Kevin Li 11/21/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import TimePeriod from 'components/search/filters/timePeriod/TimePeriod';

const startYear = FiscalYearHelper.earliestFederalAccountYear;

const propTypes = {
    updateTimePeriod: PropTypes.func,
    filterTimePeriodType: PropTypes.string,
    filterTimePeriodFY: PropTypes.instanceOf(Immutable.Set),
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string
};

export class AccountTimePeriodContainer extends React.Component {
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
        const currentFY = FiscalYearHelper.defaultFiscalYear();

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
                changeTab={this.changeTab}
                disableDateRange />
        );
    }
}

AccountTimePeriodContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filterTimePeriodType: state.account.filters.dateType,
        filterTimePeriodFY: state.account.filters.fy,
        filterTimePeriodStart: state.account.filters.startDate,
        filterTimePeriodEnd: state.account.filters.endDate
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimePeriodContainer);
