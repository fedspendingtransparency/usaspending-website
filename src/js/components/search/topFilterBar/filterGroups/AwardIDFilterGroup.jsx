/**
 * AwardIDFilterGroup.jsx
 * Created by michaelbray on 3/6/17.
 */

import React from 'react';

import * as AwardIDFormatter from 'helpers/awardIDFormatter';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class AwardIDFilterGroup extends React.Component {
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

        // check to see if an award ID is provided
        const awardIDs = this.props.filter.values;

        awardIDs.forEach((value) => {
            const tag = {
                value: value.id,
                title: `${AwardIDFormatter.formatAwardID(value, value.awardIDType)}
                    | ${value.awardIDType}`,
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

AwardIDFilterGroup.propTypes = propTypes;
