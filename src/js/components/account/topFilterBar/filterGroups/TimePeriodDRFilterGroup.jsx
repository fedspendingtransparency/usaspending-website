/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import LegacyBaseTopFilterGroup from './LegacyBaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object
};

export default class TimePeriodDRFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeTimePeriod = this.removeTimePeriod.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeTimePeriod() {
    // prepopulate the Redux action argument with the current filter values
        const timePeriodFilter = {
            dateType: this.props.redux.reduxFilters.dateType,
            fy: this.props.redux.reduxFilters.fy,
            start: null,
            end: null
        };
        // reuse the Redux action from the time period filter component
        this.props.redux.updateTimePeriod(timePeriodFilter);
    }

    clearGroup() {
        this.props.redux.resetTimeFilters();
    }

    generateTags() {
        const tags = [];

        const tag = {
            value: 'dr',
            title: this.props.filter.values[0],
            removeFilter: this.removeTimePeriod
        };

        tags.push(tag);

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<LegacyBaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.clearGroup} />);
    }
}

TimePeriodDRFilterGroup.propTypes = propTypes;
