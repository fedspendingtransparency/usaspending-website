/**
 * SelectedFederalAccounts.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ShownFederalAccount from './ShownFederalAccount';

const propTypes = {
    federalAccounts: PropTypes.object,
    updateSelectedFederalAccounts: PropTypes.func
};

export default class SelectedFederalAccounts extends React.Component {
    render() {
        const shownFederalAccounts = [];

        this.props.federalAccounts.entrySeq().forEach((entry) => {
            const key = entry[0];
            const federalAccount = entry[1];
            const value = (<ShownFederalAccount
                federalAccount={federalAccount}
                label={federalAccount.federal_account_code}
                key={key}
                updateSelectedFederalAccounts={
                    this.props.updateSelectedFederalAccounts.bind(null, federalAccount)
                } />);
            shownFederalAccounts.push(value);
        });

        return (
            <div className="selected-filters">
                {shownFederalAccounts}
            </div>
        );
    }
}

SelectedFederalAccounts.propTypes = propTypes;
