/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import { getBaseUrl } from 'helpers/socialShare';

import InfoSnippet from './InfoSnippet';

const propTypes = {
    account: PropTypes.object
};
export default class AccountHeader extends React.Component {
    render() {
        const accountSymbol =
            `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;
        const slug = `federal_account/${accountSymbol}`;
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
                <div className="sticky-header__toolbar">
                    <ShareIcon
                        slug={slug}
                        email={{
                            subject: `USAspending.gov Federal Account Profile: ${this.props.account.title}`,
                            body: `View the spending activity of this federal account on USAspending.gov: ${getBaseUrl(slug)}`
                        }} />
                </div>
            </StickyHeader>
        );
    }
}

AccountHeader.propTypes = propTypes;
