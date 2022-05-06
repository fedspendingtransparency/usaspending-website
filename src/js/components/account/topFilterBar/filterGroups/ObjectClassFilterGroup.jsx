/**
 * ObjectClassFilterGroup.jsx
 * Created by Kevin Li 3/31/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import LegacyBaseTopFilterGroup from './LegacyBaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object
};

export default class ObjectClassFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        this.props.redux.toggleObjectClass(value);
    }

    clearGroup() {
        this.props.redux.resetObjectClass();
    }

    generateTags() {
        const tags = [];

        const selectedValues = this.props.filter.values;

        selectedValues.forEach((value) => {
            const label = this.props.redux.filterOptions.objectClassDefinitions[value];
            const tag = {
                value,
                title: label,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

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

ObjectClassFilterGroup.propTypes = propTypes;
