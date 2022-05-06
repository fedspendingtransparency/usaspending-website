/**
 * SetAsideFilterGroup.jsx
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

export default class SetAsideFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.setAside.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'setAside',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('setAside');
    }

    generateTags() {
        const tags = [];

        // check to see if an Award Amount is provided
        const setAside = this.props.filter.values;

        Object.keys(setAside).forEach((key) => {
            const tag = {
                value: key,
                title: ContractFields.setAsideDefinitions[key],
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

SetAsideFilterGroup.propTypes = propTypes;
