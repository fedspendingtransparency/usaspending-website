/**
 * BudgetCategorySearchContainer.jsx
 * Created by michaelbray on 3/17/17.
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import BudgetCategorySearch from 'components/search/filters/budgetCategory/BudgetCategorySearch';

const propTypes = {

};

export class BudgetCategorySearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.updateBudgetFunctions = this.updateBudgetFunctions.bind(this);
        this.updateFederalAccounts = this.updateFederalAccounts.bind(this);
        this.updateObjectClasses = this.updateObjectClasses.bind(this);
    }

    updateBudgetFunctions(budgetFunction) {
        console.log(budgetFunction);
    }

    updateFederalAccounts(federalAccount) {
        console.log(federalAccount);
    }

    updateObjectClasses(objectClass) {
        console.log(objectClass);
    }

    render() {
        return (
            <BudgetCategorySearch
                {...this.props}
                updateBudgetFunctions={this.updateBudgetFunctions}
                updateFederalAccounts={this.updateFederalAccounts}
                updateObjectClasses={this.updateObjectClasses} />
        );
    }
}

BudgetCategorySearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ awardAmounts: state.filters.awardAmounts }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(BudgetCategorySearchContainer);
