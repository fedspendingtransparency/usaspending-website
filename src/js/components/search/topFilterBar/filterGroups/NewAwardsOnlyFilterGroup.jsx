/**
 * NewAwardsOnlyFilterGroup.jsx
 * Created by Brian Petway 07/10/2023
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

export default class NewAwardsOnlyFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        console.log('this.props.filter', this.props.filter);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        const newValue = this.props.redux.reduxFilters.awardAmounts.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'newAwardsOnly',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('newAwardsOnly');
    }

    generateTags() {
        // todo
        // in this section there is only one option for the tag text
        // it's either there or not;
        // so you can simplify this fn
        // and change tags to singular i suppose
        const tags = [];

        // todo - make sure newAwardsOnly is added to the redux filter obj
        // then check for it here
        // check to see if an Award Amount is provided
        const awardAmounts = this.props.filter.values;

        // this is prob not needed; either present or not,
        // only one value and title for it
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

NewAwardsOnlyFilterGroup.propTypes = propTypes;
