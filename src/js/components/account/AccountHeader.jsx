/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';

import { PageWrapper } from 'components/sharedComponents/Page';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

const propTypes = {
    account: PropTypes.object
};
export default class AccountHeader extends React.Component {
    handleShare = (name, slug) => {
        handleShareOptionClick(name, slug, {
            subject: `USAspending.gov Federal Account Profile: ${this.props.account.title}`,
            body: `View the spending activity of this federal account on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };
    render() {
        const accountSymbol =
            `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;
        const slug = `federal_account/${accountSymbol}`;
        return (
            // TODO: DEV-6889 Get design approval for change
            <PageHeader
                overLine="Federal Account Profile"
                title={`Federal Account Symbol: ${accountSymbol}`}
                stickyBreakPoint={getStickyBreakPointForSidebar()}
                shareProps={{
                    url: getBaseUrl(slug),
                    onShareOptionClick: (name) => this.handleShare(name, slug)
                }} />
        );
    }
}

AccountHeader.propTypes = propTypes;
