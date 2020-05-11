/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { recipientPageMetaTags } from 'helpers/metaTagHelper';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";

import ChildRecipientModalContainer from 'containers/recipient/modal/ChildRecipientModalContainer';
import RecipientContent from './RecipientContent';
import { AlternateNamesRecipientModalContainer } from '../../containers/recipient/modal/AlternateNamesRecipientModalContainer';


const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    recipient: PropTypes.object,
    pickedFy: PropTypes.func
};

export default class RecipientPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showChildRecipientModal: false,
            showAlternateNamesRecipientModal: false
        };
    }

    showAlternateNamesRecipientModal = () => this.setState({ showAlternateNamesRecipientModal: true });

    hideAlternateNamesRecipientModal = () => this.setState({ showAlternateNamesRecipientModal: false });

    showChildRecipientModal = () => this.setState({ showChildRecipientModal: true });

    hideChildRecipientModal = () => this.setState({ showChildRecipientModal: false });

    render() {
        let content = (
            <RecipientContent
                showChildRecipientModal={this.showChildRecipientModal}
                showAlternateNamesRecipientModal={this.showAlternateNamesRecipientModal}
                {...this.props} />
        );
        if (this.props.error) {
            content = (<Error
                title="Invalid Recipient"
                message="The recipient ID provided is invalid. Please check the ID and try again." />);
        }

        return (
            <div className="usa-da-recipient-page">
                <MetaTags {...recipientPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Recipient Profile
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug={'slug'}
                            url={'url'}
                            email={{
                                subject: `Check out Agency  on USAspending.gov!`,
                                body: `Here is the url: `
                            }} />
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <LoadingWrapper isLoading={this.props.loading}>
                        {content}
                        <ChildRecipientModalContainer
                            mounted={this.state.showChildRecipientModal}
                            hideModal={this.hideChildRecipientModal}
                            recipient={this.props.recipient} />
                        <AlternateNamesRecipientModalContainer
                            mounted={this.state.showAlternateNamesRecipientModal}
                            hideModal={this.hideAlternateNamesRecipientModal}
                            recipient={this.props.recipient} />
                    </LoadingWrapper>
                </main>
                <Footer />
            </div>
        );
    }
}

RecipientPage.propTypes = propTypes;
