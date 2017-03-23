/**
 * AwardAmountFilterGroup.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';

import * as AwardAmountFormatter from 'helpers/awardAmountHelper';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class AwardAmountFilterGroup extends React.Component {
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

        // check to see if an Award Amount is provided
        const awardAmounts = this.props.filter.values;

        Object.keys(awardAmounts).forEach((key) => {
            const tag = {
                value: key,
                title: AwardAmountFormatter.formatAwardAmountRange(awardAmounts[key]),
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

AwardAmountFilterGroup.propTypes = propTypes;
