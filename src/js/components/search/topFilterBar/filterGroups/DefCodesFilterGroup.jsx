/**
 * DefCodesFilterGroup.jsx
 * Created by Maxwell Kendall 06/01/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class DefCodesFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.defCodes.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'defCodes',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('defCodes');
    }

    generateTags() {
    // check to see if a DEF code is provided
        return this.props.filter.values.map((value) => ({
            value: `${value.value}`,
            title: `${value.def_description}`,
            removeFilter: this.removeFilter
        }));
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

DefCodesFilterGroup.propTypes = propTypes;
