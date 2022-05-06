/**
 * AwardAmountFilterGroup.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as AwardAmountFormatter from 'helpers/awardAmountHelper';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class AwardAmountFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.awardAmounts.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('awardAmounts');
    }

    generateTags() {
        const tags = [];

        // check to see if an Award Amount is provided
        const awardAmounts = this.props.filter.values;

        Object.keys(awardAmounts).forEach((key) => {
            const tag = {
                value: key,
                title: AwardAmountFormatter.formatAwardAmountRange(awardAmounts[key]),
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

AwardAmountFilterGroup.propTypes = propTypes;
