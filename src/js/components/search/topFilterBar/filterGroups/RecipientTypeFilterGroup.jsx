/**
 * RecipientTypeFilterGroup.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as RecipientType from 'dataMapping/search/recipientType';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class RecipientTypeFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.recipientType.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'recipientType',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('recipientType');
    }

    generateTags() {
        const tags = [];

        // check to see if any type groups are fully selected
        const selectedValues = this.props.filter.values;
        selectedValues.forEach((value) => {
            const tag = {
                value,
                title: RecipientType.recipientTypes[value],
                removeFilter: this.removeFilter
            };

            // check if this is a parent group
            if (RecipientType.groupLabels[value]) {
                // this is a a parent
                tag.title = `All ${RecipientType.groupLabels[value]}`;
            }

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

RecipientTypeFilterGroup.propTypes = propTypes;
