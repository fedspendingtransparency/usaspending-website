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

class TopFilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.prepareFilters(nextProps.reduxFilters);
    }

    prepareFilters(props) {
        const filters = [];
        // prepare the time filters
        const timeFilters = this.prepareTimeFilter(props);
        if (timeFilters) {
            filters.push(timeFilters);
        }

        this.setState({
            filters
        });
    }

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
                // prefix special fields that require custom logic to clear with an underscore
                filter.code = '_timePeriodDR';
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

    render() {
        let output = <TopFilterBarEmpty {...this.props} />;
        if (this.state.filters.length > 0) {
            output = (<TopFilterBar
                {...this.props}
                filters={this.state.filters} />);
        }

        return output;
    }
}

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
