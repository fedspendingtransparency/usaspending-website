/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    account: PropTypes.object
};

export default class AccountHeader extends React.Component {
    render() {
        const accountSymbol =
            `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;

        return (
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        Federal Account Profile
                    </h1>
                </div>
                <div className="sticky-header__options">
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <InfoSnippet
                                label="Federal Account Symbol"
                                value={accountSymbol} />
                        </ul>
                    </div>
                </div>
            </StickyHeader>
        );
    }
}

AccountHeader.propTypes = propTypes;
