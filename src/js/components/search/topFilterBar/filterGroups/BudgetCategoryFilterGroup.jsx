/**
 * BudgetCategoryFilterGroup.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';
import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class BudgetCategoryFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, value);
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
                    title: BudgetCategoryHelper.formatFederalAccount(val)
                };
            case 'objectClasses':
                return {
                    value: val,
                    title: objectClassDefinitions[val]
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

                tags.push(tag);
            });
        }

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

BudgetCategoryFilterGroup.propTypes = propTypes;
