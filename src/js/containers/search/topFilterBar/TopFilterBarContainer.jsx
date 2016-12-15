/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import TopFilterBarEmpty from 'components/search/topFilterBar/TopFilterBarEmpty';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as AwardType from 'dataMapping/search/awardType';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    updateTimePeriod: React.PropTypes.func,
    updateGenericFilter: React.PropTypes.func
};

class TopFilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };

        this.removeFilter = this.removeFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!Object.is(nextProps.reduxFilters, this.props.reduxFilters)) {
            this.prepareFilters(nextProps.reduxFilters);
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

        // prepare the award filters
        const awardFilters = this.prepareAwardTypes(props);
        if (awardFilters) {
            filters.push(awardFilters);
        }

        this.setState({
            filters
        });
    }

    /**
     * Logic for parsing the current Redux time filter into a JS object that can be parsed by the
     * top filter bar
     *
     * @param      object  props   Redux store filter values
     */
    prepareTimeFilter(props) {
        let selected = false;
        const filter = {};
        if (props.timePeriodType === 'fy') {
            // check to see if any FYs are selected
            if (props.timePeriodFY.count() > 0) {
                // years are selected
                selected = true;
                filter.code = 'timePeriodFY';
                filter.name = 'Time Period';

                // return the years in chronological order
                filter.values = _.orderBy(props.timePeriodFY.toArray(), [], ['desc']);
                filter.labels = filter.values.map((value) => (`FY ${value}`));
            }
        }
        else if (props.timePeriodType === 'dr') {
            // check to see if any date ranges are selected
            if (props.timePeriodStart && props.timePeriodEnd) {
                // start and end dates are provided
                selected = true;
                filter.code = 'timePeriodDR';
                filter.name = 'Time Period';

                const startString = moment(props.timePeriodStart, 'YYYY-MM-DD')
                    .format('MM/DD/YYYY');
                const endString = moment(props.timePeriodEnd, 'YYYY-MM-DD').format('MM/DD/YYYY');

                filter.values = ['time-dr'];
                filter.labels = [`${startString} to ${endString}`];
            }
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    prepareAwardTypes(props) {
        let selected = false;
        const filter = {};

        if (props.awardType.count() > 0) {
            // award types exist
            selected = true;
            filter.code = 'awardType';
            filter.name = 'Award Type';

            filter.values = [];
            filter.labels = [];
            props.awardType.forEach((type) => {
                if ({}.hasOwnProperty.call(AwardType.awardTypeCodes, type)) {
                    filter.values.push(type);
                    filter.labels.push(AwardType.awardTypeCodes[type]);
                }
            });
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    removeFilter(type, value) {
        if (type === 'timePeriodFY' || type === 'timePeriodDR') {
            this.removeTimePeriod(type, value);
        }
        else if (type === 'awardType') {
            this.removeFromSet(type, value);
        }
    }

    removeTimePeriod(type, value) {
        // check if fiscal year or date range
        const timePeriodFilter = {
            dateType: this.props.reduxFilters.timePeriodType,
            fy: this.props.reduxFilters.timePeriodFY,
            start: this.props.reduxFilters.timePeriodStart,
            end: this.props.reduxFilters.timePeriodEnd
        };

        if (type === 'timePeriodFY') {
            // remove the item from the set
            timePeriodFilter.dateType = 'fy';
            // as an ImmutableJS structure, the delete function will return a new instance
            timePeriodFilter.fy = this.props.reduxFilters.timePeriodFY.delete(value);
        }
        else {
            // reset the date range
            timePeriodFilter.dateType = 'dr';
            timePeriodFilter.start = null;
            timePeriodFilter.end = null;
        }

        this.props.updateTimePeriod(timePeriodFilter);
    }

    removeFromSet(type, value) {
        const newValue = this.props.reduxFilters[type].delete(value);
        this.props.updateGenericFilter({
            type,
            value: newValue
        });
    }

    render() {
        let output = <TopFilterBarEmpty {...this.props} />;
        if (this.state.filters.length > 0) {
            output = (<TopFilterBar
                {...this.props}
                filters={this.state.filters}
                removeFilter={this.removeFilter} />);
        }

        return output;
    }
}

TopFilterBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
