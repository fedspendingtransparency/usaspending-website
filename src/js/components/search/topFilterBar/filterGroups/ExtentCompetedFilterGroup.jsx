/**
 * ExtentCompetedFilterGroup.jsx
 * Created by Emily Gullo on 6/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as ContractFields from 'dataMapping/search/contractFields';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class ExtentCompetedFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.extentCompeted.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'extentCompeted',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('extentCompeted');
    }

    generateTags() {
        const tags = [];

        // check to see if an Award Amount is provided
        const extentCompeted = this.props.filter.values;

        Object.keys(extentCompeted).forEach((key) => {
            const tag = {
                value: key,
                title: ContractFields.extentCompetedDefinitions[key],
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

ExtentCompetedFilterGroup.propTypes = propTypes;
