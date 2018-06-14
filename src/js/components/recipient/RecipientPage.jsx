/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { recipientPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';

import Error from 'components/sharedComponents/Error';

import RecipientHeader from './header/RecipientHeader';
import RecipientLoading from './RecipientLoading';
import RecipientContent from './RecipientContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    recipient: PropTypes.object
};

export default class RecipientPage extends React.Component {
    render() {
        let content = <RecipientContent {...this.props} />;
        if (this.props.loading) {
            content = (<RecipientLoading />);
        }
        else if (this.props.error) {
            content = (<Error
                title="Invalid Recipient"
                message="The recipient ID provided is invalid. Please check the ID and try again." />);
        }

        return (
            <div className="usa-da-recipient-page">
                <MetaTags {...recipientPageMetaTags} />
                <Header />
                <RecipientHeader />
                <main
                    id="main-content"
                    className="main-content">
                    {content}
                </main>
                <Footer />
            </div>
        );
    }
}

RecipientPage.propTypes = propTypes;
