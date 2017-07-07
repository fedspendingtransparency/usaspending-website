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
    updateSelectedBudgetFunctions: React.PropTypes.func,
    updateSelectedFederalAccounts: React.PropTypes.func,
    updateSelectedObjectClasses: React.PropTypes.func
};


const ga = require('react-ga');

export class BudgetCategorySearchContainer extends React.Component {
    static logBudgetCategoryFilterEvent(type, event) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied ${event} Filter`,
            label: type
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.updateBudgetFunctions = this.updateBudgetFunctions.bind(this);
        this.updateFederalAccounts = this.updateFederalAccounts.bind(this);
        this.updateObjectClasses = this.updateObjectClasses.bind(this);
    }

    updateBudgetFunctions(budgetFunction) {
        this.props.updateSelectedBudgetFunctions(budgetFunction);

        // Analytics
        BudgetCategorySearchContainer.logBudgetCategoryFilterEvent(budgetFunction.title, 'Budget Function');
    }

    updateFederalAccounts(federalAccount) {
        this.props.updateSelectedFederalAccounts(federalAccount);

        // Analytics
        BudgetCategorySearchContainer.logBudgetCategoryFilterEvent(federalAccount.federal_account_code, 'Federal Account');
    }

    updateObjectClasses(objectClassEvent) {
        this.props.updateSelectedObjectClasses(objectClassEvent);
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
    (state) => ({
        budgetFunctions: state.filters.budgetFunctions,
        federalAccounts: state.filters.federalAccounts,
        objectClasses: state.filters.objectClasses
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(BudgetCategorySearchContainer);
