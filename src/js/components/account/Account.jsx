/**
 * Account.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';

import AccountHeader from './AccountHeader';
import AccountOverview from './AccountOverview';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

const propTypes = {
    account: PropTypes.object
};

export default class Account extends React.Component {
    render() {
        return (
            <div className="usa-da-account-page">
                <MetaTags {...MetaTagHelper.federalAccountPageMetaTags} />
                <Header />
                <AccountHeader account={this.props.account} />
                <main
                    id="main-content"
                    className="main-content">
                    <AccountOverview account={this.props.account} />
                    <div className="filter-results">
                        <SearchSidebar />
                        <SearchResults />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

Account.propTypes = propTypes;
