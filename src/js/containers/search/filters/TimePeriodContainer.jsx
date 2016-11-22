/**
  * TimePeriodContainer.jsx
  * Created by Kevin Li 11/21/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import TimePeriod from 'components/search/filters/timePeriod/TimePeriod';

const startYear = 2009;

const propTypes = {
    updateTimePeriod: React.PropTypes.func
};

class TimePeriodContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timePeriods: [],
            activeTab: 'fy',
            filter: {
                fy: [],
                startDate: null,
                endDate: null
            }
        };
    }

    componentDidMount() {
        this.generateTimePeriods();
    }

    generateTimePeriods() {
        const timePeriods = [];

        // determine the current fiscal year
        const currentMonth = moment().month();
        let currentFY = moment().year();
        if (currentMonth >= 9) {
            // months are zero-indexed, so 9 is October
            // starting in October we are in the next fiscal year
            currentFY = moment().year() + 1;
        }

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
        }, () => {
            this.performSearch();
        });
    }

    updateFilter(params) {
        // set the state to a clone of the filter subobject merged with the param object
        const newFilter = Object.assign({}, this.state.filter, params);
        this.setState({
            filter: newFilter
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        const searchParams = {};
        if (this.state.activeTab === 'fy') {
            // use only fy values
            searchParams.fy = this.state.filter.fy;
        }
        else {
            // use only date range values
            searchParams.startDate = this.state.filter.startDate;
            searchParams.endDate = this.state.filter.endDate;
        }

        this.props.updateTimePeriod(searchParams);
    }

    render() {
        return (
            <TimePeriod
                {...this.props}
                activeTab={this.state.activeTab}
                timePeriods={this.state.timePeriods}
                updateFilter={this.updateFilter.bind(this)}
                changeTab={this.changeTab.bind(this)} />
        );
    }
}

TimePeriodContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimePeriodContainer);
