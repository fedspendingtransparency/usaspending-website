/**
 * PSCFilterGroup.jsx
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

export default class PSCFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedPSC.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedPSC',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedPSC');
    }

    generateTags() {
    // check to see if a PSC code is provided
        return this.props.filter.values.map((value) => ({
            value: `${value.value}`,
            title: `${value.psc_description}`,
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

PSCFilterGroup.propTypes = propTypes;
