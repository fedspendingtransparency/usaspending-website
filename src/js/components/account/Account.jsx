/**
 * Account.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import PageWrapper from 'components/sharedComponents/PageWrapper';

import AccountOverview from './AccountOverview';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

const propTypes = {
    account: PropTypes.object,
    currentFiscalYear: PropTypes.string
};

export default class Account extends React.Component {
    handleShare = (name, slug) => {
        handleShareOptionClick(name, slug, {
            subject: `USAspending.gov Federal Account Profile: ${this.props.account.title}`,
            body: `View the spending activity of this federal account on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };
    render() {
        const accountSymbol = `${this.props.account.agency_identifier}-${this.props.account.main_account_code}`;
        const slug = `federal_account/${accountSymbol}`;
        return (
            <PageWrapper
                pageName="Federal Account Profile"
                classNames="usa-da-account-page"
                overLine="Federal Account Profile"
                title={`Federal Account Symbol: ${accountSymbol}`}
                metaTagProps={this.props.account ? MetaTagHelper.federalAccountPageMetaTags(this.props.account) : {}}
                toolBarComponents={[
                    <ShareIcon
                        url={getBaseUrl(slug)}
                        onShareOptionClick={(name) => this.handleShare(name, slug)} />
                ]}>
                <main
                    id="main-content"
                    className="main-content">
                    <AccountOverview account={this.props.account} currentFiscalYear={this.props.currentFiscalYear} />
                    <div className="filter-results">
                        <SearchSidebar />
                        <SearchResults showNote={this.props.account.parent_agency_toptier_code === '097'} />
                    </div>
                </main>
            </PageWrapper>
        );
    }
}

Account.propTypes = propTypes;
