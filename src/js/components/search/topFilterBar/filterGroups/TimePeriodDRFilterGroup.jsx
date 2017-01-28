/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class TimePeriodDRFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter() {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, null);
    }

    generateTags() {
        const tags = [];

        const tag = {
            value: 'dr',
            title: this.props.filter.values[0],
            isSpecial: true,
            removeFilter: this.removeFilter
        };

        tags.push(tag);

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

TimePeriodDRFilterGroup.propTypes = propTypes;
