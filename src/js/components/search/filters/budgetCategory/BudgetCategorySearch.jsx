/**
 * BudgetCategorySearch.jsx
 * Created by michaelbray on 3/17/17.
 */

import React from 'react';

import BudgetCategoryFunctionContainer
    from 'containers/search/filters/budgetCategory/BudgetCategoryFunctionContainer';
import BudgetCategoryAccountContainer
    from 'containers/search/filters/budgetCategory/BudgetCategoryAccountContainer';
import BudgetCategoryOCContainer
    from 'containers/search/filters/budgetCategory/BudgetCategoryOCContainer';

export default class BudgetCategorySearch extends React.Component {
    render() {
        return (
            <div className="budget-category-filter search-filter">
                <BudgetCategoryFunctionContainer
                    {...this.props} />
                <BudgetCategoryAccountContainer
                    {...this.props} />
                <BudgetCategoryOCContainer
                    {...this.props} />
            </div>
        );
    }
}
