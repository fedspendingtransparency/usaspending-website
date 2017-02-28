/**
 * AgencyFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class AgencyFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, value);
    }

    generateTags() {
        const tags = [];

        // check to see if an agency is provided
        const agencies = this.props.filter.values;

        agencies.forEach((value) => {
            let agencyTitle = value.subtier_agency.name;
            if (value.agencyType === 'subtier' &&
                value.toptier_agency.name === value.subtier_agency.name) {
                agencyTitle += ' | Sub-Agency';
            }

            const tag = {
                value: `${value.id}_${value.agencyType}`,
                title: agencyTitle,
                isSpecial: false,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

AgencyFilterGroup.propTypes = propTypes;
