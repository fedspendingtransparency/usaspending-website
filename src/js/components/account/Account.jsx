/**
 * Account.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';

import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import AccountHeader from './AccountHeader';

const propTypes = {

};

export default class Account extends React.Component {
    render() {
        return (
            <div className="usa-da-account-page">
                <Header />
                <main id="main-content">
                    <div className="account-contents">
                        <AccountHeader />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

Account.propTypes = propTypes;
