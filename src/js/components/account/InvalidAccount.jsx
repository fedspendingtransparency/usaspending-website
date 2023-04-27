/**
 * InvalidAccount.jsx
 * Created by Kevin Li 3/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';
import Error from '../sharedComponents/Error';

const propTypes = {
    account: PropTypes.object
};

export default class InvalidAccount extends React.Component {
    render() {
        return (
            <div className="usa-da-account-page">
                <Header />
                <main
                    id="main-content"
                    className="main-content">
                    <div className="wrapper">
                        <Error
                            title="Invalid Federal Account"
                            message="The federal account ID provided is invalid.
                            Please check the ID and try again." />
                    </div>
                </main>
                <Footer pageName="Invalid Account" />
            </div>
        );
    }
}

InvalidAccount.propTypes = propTypes;
