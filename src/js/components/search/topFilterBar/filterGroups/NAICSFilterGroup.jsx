/**
 * NAICSFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class NAICSFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedNAICS.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedNAICS',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedNAICS');
    }

    generateTags() {
        return this.props.filter.values
            .map((naics) => ({
                value: `${naics.identifier}`,
                title: `${naics.value} - ${naics.label} (${naics.count})`,
                removeFilter: () => this.removeFilter
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

NAICSFilterGroup.propTypes = propTypes;
