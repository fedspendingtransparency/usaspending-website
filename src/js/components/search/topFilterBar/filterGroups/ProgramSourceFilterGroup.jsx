/**
 * ProgramSourceFilterGroup.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    toggle: PropTypes.string,
    compressed: PropTypes.bool
};

export default class ProgramSourceFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.removeScope = this.removeScope.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        const newValue = this.props.redux.reduxFilters[this.props.filter.code].delete(value);
        this.props.redux.updateGenericFilter({
            type: this.props.filter.code,
            value: newValue
        });
    }

    removeScope() {
        this.props.redux.clearFilterType(this.props.toggle);
    }

    clearGroup() {
        this.props.redux.clearFilterType(this.props.filter.code);
        this.props.redux.clearFilterType(this.props.toggle);
    }

    generateTags() {
        const tags = [];

        this.props.filter.values.forEach((value) => {
            const tag = {
                value: value.identifier,
                title: `${value.code.toUpperCase()} | ${value.value}`,
                isSpecial: false,
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

ProgramSourceFilterGroup.propTypes = propTypes;
