/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import InfoSnippet from '../award/InfoSnippet';
import MoreHeaderOptions from '../award/MoreHeaderOptions';

const propTypes = {
    account: React.PropTypes.object
};

export default class AccountHeader extends React.Component {
    render() {
        const accountSymbol =
            `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;

        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Federal Account Summary
                    </h1>
                    <div className="options">
                        <ul className="account-items">
                            <InfoSnippet
                                label="Federal Account Symbol"
                                value={accountSymbol} />
                        </ul>
                        <MoreHeaderOptions />
                    </div>
                </div>
            </div>
        );
    }
}

AccountHeader.propTypes = propTypes;
