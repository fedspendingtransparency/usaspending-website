/**
 * CFDAFilterGroup.jsx
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

export default class CFDAFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedCFDA.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedCFDA',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedCFDA');
    }

    generateTags() {
        const tags = [];

        // check to see if an CFDA code is provided
        const CFDA = this.props.filter.values;

        CFDA.forEach((value) => {
            const tag = {
                value: `${value.identifier}`,
                title: `${value.program_number} | ${value.program_title}`,
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

CFDAFilterGroup.propTypes = propTypes;
