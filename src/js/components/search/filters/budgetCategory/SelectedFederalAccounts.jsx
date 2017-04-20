/**
 * SelectedFederalAccounts.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';
import ShownFederalAccount from './ShownFederalAccount';

const propTypes = {
    federalAccounts: React.PropTypes.object,
    updateSelectedFederalAccounts: React.PropTypes.func
};

export default class SelectedFederalAccounts extends React.Component {
    render() {
        const shownFederalAccounts = [];

        this.props.federalAccounts.entrySeq().forEach((entry) => {
            const key = entry[0];
            const federalAccount = entry[1];
            const value = (<ShownFederalAccount
                federalAccount={federalAccount}
                label={BudgetCategoryHelper.formatFederalAccount(federalAccount)}
                key={key}
                updateSelectedFederalAccounts={
                    this.props.updateSelectedFederalAccounts.bind(null, federalAccount)
                } />);
            shownFederalAccounts.push(value);
        });

        return (
            <div className="selected-budget-categories">
                {shownFederalAccounts}
            </div>
        );
    }
}

SelectedFederalAccounts.propTypes = propTypes;
