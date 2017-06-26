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
    static logBudgetFunctionFilterEvent(type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied Budget Function Filter`,
            label: type
        });
    }

    static logFederalAccountFilterEvent(type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied Federal Account Filter`,
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
        BudgetCategorySearchContainer.logBudgetFunctionFilterEvent(budgetFunction.title);
    }

    updateFederalAccounts(federalAccount) {
        this.props.updateSelectedFederalAccounts(federalAccount);

        // Analytics
        BudgetCategorySearchContainer.logFederalAccountFilterEvent(federalAccount.federal_account_code);
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
