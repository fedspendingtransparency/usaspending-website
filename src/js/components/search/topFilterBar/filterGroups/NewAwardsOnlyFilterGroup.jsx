/**
 * NewAwardsOnlyFilterGroup.jsx
 * Created by Brian Petway 07/10/2023
 */

import React from 'react';
import PropTypes from 'prop-types';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class NewAwardsOnlyFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        const newValue = this.props.redux.reduxFilters.awardAmounts.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'newAwardsOnly',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('newAwardsOnly');
    }

    generateTags() {
        const tags = [];

        // check to see if newAwardsOnly is provided
        const newAwardsOnly = this.props.filter.values;

        if (newAwardsOnly) {
            const tag = {
                value: newAwardsOnly,
                title: 'Show New Awards Only',
                removeFilter: this.removeFilter
            };
            tags.push(tag);
        }

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

NewAwardsOnlyFilterGroup.propTypes = propTypes;
