/**
  * AccountTopFilterBarContainer.jsx
  * Created by Kevin Li 3/23/17
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import LegacyTopFilterBar from 'components/account/topFilterBar/LegacyTopFilterBar';
import { topFilterGroupGenerator } from
    'components/account/topFilterBar/filterGroups/AccountTopFilterGroupGenerator';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

const dayjs = require('dayjs');

const propTypes = {
    reduxFilters: PropTypes.object,
    resetAccountFilters: PropTypes.func
};

export class AccountTopFilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };

        this.clearAllFilters = this.clearAllFilters.bind(this);
    }

    componentDidMount() {
    // prepare filters on initial mount to handle pre-populated filters (such as a back
    // button event or a provided URL param)
        this.prepareFilters(this.props.reduxFilters);
    }

    componentDidUpdate(prevProps) {
        if (!Object.is(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.prepareFilters(this.props.reduxFilters);
        }
    }

    /**
     * Convert the Redux filter data into JS objects
     */
    prepareFilters(props) {
        const filters = [];
        // prepare the time filters
        const timeFilters = this.prepareTimeFilter(props);
        if (timeFilters) {
            filters.push(timeFilters);
        }

        const objectClass = this.prepareObjectClass(props);
        if (objectClass) {
            filters.push(objectClass);
        }

        const programActivity = this.prepareProgramActivity(props);
        if (programActivity) {
            filters.push(programActivity);
        }

        this.setState({
            filters
        });
    }

    /**
     * Logic for parsing the current Redux time filter into a JS object that can be parsed by the
     * top filter bar
     */
    prepareTimeFilter(props) {
        let selected = false;
        const filter = {};
        if (props?.dateType === 'fy') {
            // check to see if any FYs are selected
            if (props.fy.count() > 0) {
                // years are selected
                selected = true;
                filter.code = 'timePeriodFY';
                filter.name = 'Time Period';

                // return the years in chronological order
                filter.values = orderBy(props.fy.toArray(), [], ['desc']);
            }
        }
        else if (props?.dateType === 'dr') {
            // check to see if any date ranges are selected
            if (props.startDate && props.endDate) {
                // start and end dates are provided
                selected = true;
                filter.code = 'timePeriodDR';
                filter.name = 'Time Period';

                const startString = dayjs(props.startDate, 'YYYY-MM-DD')
                    .format('MM/DD/YYYY');
                const endString = dayjs(props.endDate, 'YYYY-MM-DD').format('MM/DD/YYYY');

                filter.values = [`${startString} to ${endString}`];
            }
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    prepareObjectClass(props) {
        let selected = false;

        const filter = {
            code: 'objectClass',
            name: 'Object Class',
            values: props.objectClass.toArray()
        };

        if (props.objectClass.count() > 0) {
            selected = true;
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    prepareProgramActivity(props) {
        let selected = false;

        const filter = {
            code: 'programActivity',
            name: 'Program Activity',
            values: props.programActivity.toArray()
        };

        if (props.programActivity.count() > 0) {
            selected = true;
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    clearAllFilters() {
        this.props.resetAccountFilters();
    }

    render() {
        let output = null;
        if (this.state.filters.length > 0) {
            let count = 0;
            this.state.filters.forEach((filter) => {
                count += filter.values.length;
            });

            output = (<LegacyTopFilterBar
                {...this.props}
                filterCount={count}
                clearAllFilters={this.clearAllFilters}
                filters={this.state.filters}
                groupGenerator={topFilterGroupGenerator} />);
        }

        return output;
    }
}

AccountTopFilterBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        filterOptions: state.account.filterOptions
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTopFilterBarContainer);
