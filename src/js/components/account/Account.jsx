/**
 * Account.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';

import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import AccountHeader from './AccountHeader';
import AccountOverview from './AccountOverview';
import SearchSidebar from './SearchSidebar';

const propTypes = {
    account: React.PropTypes.object
};

export default class Account extends React.Component {
    render() {
        return (
            <div className="usa-da-account-page">
                <Header />
                <AccountHeader account={this.props.account} />
                <main
                    id="main-content"
                    className="main-content">

                    <AccountOverview account={this.props.account} />

                    <div className="filter-tas">
                        <SearchSidebar />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

Account.propTypes = propTypes;
