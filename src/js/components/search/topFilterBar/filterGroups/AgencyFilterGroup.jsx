/**
 * AgencyFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class AgencyFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const type = this.props.filter.code;
        const newValue = this.props.redux.reduxFilters[type].delete(value);
        this.props.redux.updateGenericFilter({
            type,
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType(this.props.filter.code);
    }

    generateTags() {
        const tags = [];

        // check to see if an agency is provided
        const agencies = this.props.filter.values;

        agencies.forEach((value) => {
            let agencyTitle = value.subtier_agency.name;

            if (value.agencyType === 'subtier' && value.subtier_agency.abbreviation) {
                agencyTitle += ` (${value.subtier_agency.abbreviation})`;
            }
            else if (value.agencyType === 'toptier' && value.toptier_agency.abbreviation) {
                agencyTitle += ` (${value.toptier_agency.abbreviation})`;
            }
            if (value.agencyType === 'subtier' && value.toptier_flag === false) {
                agencyTitle += ` | Sub-Agency of ${value.toptier_agency.abbreviation || value.toptier_agency.name}`;
            }

            const tag = {
                value: `${value.id}_${value.agencyType}`,
                title: agencyTitle,
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

AgencyFilterGroup.propTypes = propTypes;
