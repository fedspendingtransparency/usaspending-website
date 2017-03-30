/**
 * SelectedBudgetFunctions.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';
import ShownBudgetFunction from './ShownBudgetFunction';

const propTypes = {
    budgetFunctions: React.PropTypes.object,
    updateSelectedBudgetFunctions: React.PropTypes.func
};

export default class SelectedBudgetCategories extends React.Component {
    render() {
        const shownBudgetFunctions = [];

        this.props.budgetFunctions.entrySeq().forEach((entry) => {
            const key = entry[0];
            const budgetFunction = entry[1];
            const value = (<ShownBudgetFunction
                budgetFunction={budgetFunction}
                label={BudgetCategoryHelper.formatBudgetFunction(budgetFunction)}
                key={key}
                updateSelectedBudgetFunctions={
                    this.props.updateSelectedBudgetFunctions.bind(null, budgetFunction)
                } />);
            shownBudgetFunctions.push(value);
        });

        return (
            <div className="selected-budget-categories">
                {shownBudgetFunctions}
            </div>
        );
    }
}

SelectedBudgetCategories.propTypes = propTypes;
