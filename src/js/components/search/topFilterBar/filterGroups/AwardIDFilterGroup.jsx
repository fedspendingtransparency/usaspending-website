/**
 * AwardIDFilterGroup.jsx
 * Created by michaelbray on 3/6/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class AwardIDFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedAwardIDs.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedAwardIDs',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedAwardIDs');
    }

    generateTags() {
        const tags = [];

        // check to see if an award ID is provided
        const awardIDs = this.props.filter.values;

        awardIDs.forEach((value) => {
            const tag = {
                value: `${value}`,
                title: `${value} | Award ID`,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
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

AwardIDFilterGroup.propTypes = propTypes;
