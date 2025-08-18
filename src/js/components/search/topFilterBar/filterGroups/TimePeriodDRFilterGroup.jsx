/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash-es";
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class TimePeriodDRFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.clearGroup = this.clearGroup.bind(this);
    }

    clearGroup() {
        this.props.redux.resetTimeFilters();
    }

    generateTags() {
        const tags = [];

        this.props.filter.values.forEach((value) => {
            tags.push({
                value: 'dr',
                title: value,
                id: uniqueId()
            });
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();
        return (<BaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.clearGroup}
            compressed={this.props.compressed} />);
    }
}

TimePeriodDRFilterGroup.propTypes = propTypes;
