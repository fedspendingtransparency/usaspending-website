/**
 * Account.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon, FlexGridRow, FlexGridCol } from 'data-transparency-ui';

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

const Account = ({ account, currentFiscalYear }) => {
    const accountSymbol = `${account.agency_identifier}-${account.main_account_code}`;
    const fedAccountSlug = `federal_account/${accountSymbol}`;

    const handleShare = (name, slug) => {
        handleShareOptionClick(name, slug, {
            subject: `USAspending.gov Federal Account Profile: ${account.title}`,
            body: `View the spending activity of this federal account on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };

    return (
        <PageWrapper
            pageName="Federal Account Profile"
            classNames="usa-da-account-page"
            overLine="Federal Account Profile"
            title={`Federal Account Symbol: ${accountSymbol}`}
            metaTagProps={account ? MetaTagHelper.federalAccountPageMetaTags(account) : {}}
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl(fedAccountSlug)}
                    onShareOptionClick={(name) => handleShare(name, fedAccountSlug)} />
            ]}>
            <main
                id="main-content"
                className="main-content">
                <FlexGridRow className="fed-account-content__row" >
                    <FlexGridCol className="fed-account-content__col" >
                        <AccountOverview account={account} currentFiscalYear={currentFiscalYear} />
                        <div className="filter-results">
                            <SearchSidebar />
                            <SearchResults showNote={account.parent_agency_toptier_code === '097'} />
                        </div>
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

Account.propTypes = propTypes;
export default Account;
