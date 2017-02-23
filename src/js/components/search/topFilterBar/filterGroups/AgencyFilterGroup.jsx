/**
 * AgencyFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import _ from 'lodash';

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
            const tag = {
                value: `${value.id}_${value.agencyType}`,
                title: value.subtier_agency.name,
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
