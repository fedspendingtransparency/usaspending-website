/**
 * BudgetCategoryFilterGroup.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { toArray, indexOf, concat, difference } from 'lodash';

import { Set } from 'immutable';

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';
import * as ObjectClasses from 'dataMapping/search/budgetCategory';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class BudgetCategoryFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }

    removeGroup(value) {
        // remove a group of filter items
        // let's actually fake the removal by just overwriting the the filter value with everything
        // except for the values in the specified group

        let updatedValues = new Set(toArray(this.props.filter.values));

        // remove the current group's values
        const objectValues = ObjectClasses.objectClassDefinitionsGroups[value];
        updatedValues = updatedValues.filterNot((x) => indexOf(objectValues, x) > -1);

        this.props.redux.updateGenericFilter({
            type: 'objectClasses',
            value: updatedValues
        });
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

    formatTag(code, val) {
        switch (code) {
            case 'budgetFunctions':
                return {
                    value: val.title,
                    title: BudgetCategoryHelper.formatBudgetFunction(val)
                };
            case 'federalAccounts':
                return {
                    value: `${val.id}`,
                    title: val.federal_account_code
                };
            case 'objectClasses':
                return {
                    value: val,
                    title: ObjectClasses.objectClassDefinitions[val]
                };
            default:
                return {
                    value: val,
                    title: val
                };
        }
    }

    generateTags() {
        const tags = [];

        // check to see if any type groups are fully selected
        const selectedValues = toArray(this.props.filter.values);
        const fullGroups = [];
        ObjectClasses.groupKeys.forEach((key) => {
            const fullMembership = ObjectClasses.objectClassDefinitionsGroups[key];

            // quick way of checking for full group membership is to return an array of missing
            // values; it'll be empty if all the values are selected
            const missingValues = difference(fullMembership, selectedValues);

            if (missingValues.length === 0) {
                // this group is complete
                fullGroups.push(key);
            }
        });

        // add full groups to the beginning of the tag list
        let excludedValues = [];
        fullGroups.forEach((group) => {
            const tag = {
                value: group,
                title: `All ${ObjectClasses.groupLabels[group]}`,
                isSpecial: true,
                removeFilter: this.removeGroup
            };

            tags.push(tag);

            // exclude these values from the remaining tags
            excludedValues = concat(excludedValues,
                ObjectClasses.objectClassDefinitionsGroups[group]);
        });

        // Grab filter values
        let budgetCatgories = this.props.filter.values;

        // If we're dealing with objectClasses, convert objectClasses object to array of keys
        if (this.props.filter.code === 'objectClasses') {
            budgetCatgories = Object.keys(budgetCatgories);
        }

        // Check to see if budgetFunctions, federalAccount, or objectClasses are provided
        if (budgetCatgories.length > 0) {
            budgetCatgories.forEach((value) => {
                const formattedTag = this.formatTag(this.props.filter.code, value);

                const tag = {
                    value: formattedTag.value,
                    title: formattedTag.title,
                    isSpecial: false,
                    removeFilter: this.removeFilter
                };

                if (indexOf(excludedValues, value) < 0) {
                    // only insert individual tags that aren't part of a fully-selected group
                    // excluded values is an array of values that are already included in a
                    // full group, so if this value isn't in that array, it can be shown
                    // individually
                    tags.push(tag);
                }
            });
        }

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

BudgetCategoryFilterGroup.propTypes = propTypes;
