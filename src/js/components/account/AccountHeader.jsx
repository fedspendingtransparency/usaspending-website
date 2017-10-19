/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import InfoSnippet from '../award/InfoSnippet';
import MoreHeaderOptions from '../award/MoreHeaderOptions';

const propTypes = {
    account: PropTypes.object
};

export default class AccountHeader extends React.Component {
    render() {
        const accountSymbol =
            `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;

        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Federal Account Profile
                    </h1>
                    <div className="summary-status">
                        <ul className="summary-status-items">
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
