/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { ShareIcon, FiscalYearPicker } from 'data-transparency-ui';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from 'helpers/fiscalYearHelper';
import { recipientPageMetaTags } from 'helpers/metaTagHelper';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import ChildRecipientModalContainer from 'containers/recipient/modal/ChildRecipientModalContainer';
import { AlternateNamesRecipientModalContainer } from 'containers/recipient/modal/AlternateNamesRecipientModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import RecipientContent from './RecipientContent';
// import RecipientInfoBanner from "./RecipientInfoBanner";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    recipient: PropTypes.object,
    pickedFy: PropTypes.func
};

export const RecipientPage = ({
    id,
    recipient,
    loading,
    error,
    pickedFy
}) => {
    const [isChildModalVisible, showChildModal] = useState(false);
    const [isAlternateModalVisible, showAlternateRecipientModal] = useState(false);

    const showAlternateModal = () => showAlternateRecipientModal(true);
    const hideAlternateModal = () => showAlternateRecipientModal(false);
    const showChildRecipientModal = () => showChildModal(true);
    const hideChildRecipientModal = () => showChildModal(false);

    const slug = `recipient/${id}/${recipient.fy}`;
    const emailArgs = {
        subject: `USAspending.gov Recipient Profile: ${recipient.overview.name}`,
        body: `View the spending activity for this recipient on USAspending.gov: ${getBaseUrl(slug)}`
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs);
    };

    const content = (
        <RecipientContent
            id={id}
            showChildRecipientModal={showChildRecipientModal}
            showAlternateNamesRecipientModal={showAlternateModal}
            recipient={recipient}
            loading={loading} />
    );
    if (error) {
        return (<Redirect to={{
            pathname: '/404',
            state: { recipientError: true }
        }} />);
    }


    return (
        <PageWrapper
            pageName="Recipient Profile"
            classNames="usa-da-recipient-page"
            overLine="Recipient Profile"
            title={recipient.overview.name}
            metaTagProps={recipient.overview.id && !loading ? recipientPageMetaTags(recipient.overview) : {}}
            toolBarComponents={[
                <FiscalYearPicker
                    selectedFy={recipient?.fy}
                    handleFyChange={pickedFy}
                    options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())} />,
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}>
            <>
                {/* <div className="info-banner-container">*/}
                {/*    <RecipientInfoBanner />*/}
                {/* </div>*/}
                <main id="main-content" className="main-content">
                    <LoadingWrapper isLoading={loading}>
                        {content}
                        <ChildRecipientModalContainer
                            mounted={isChildModalVisible}
                            hideModal={hideChildRecipientModal}
                            recipient={recipient} />
                        <AlternateNamesRecipientModalContainer
                            mounted={isAlternateModalVisible}
                            hideModal={hideAlternateModal}
                            recipient={recipient} />
                    </LoadingWrapper>
                </main>
            </>
        </PageWrapper>
    );
};

RecipientPage.propTypes = propTypes;
RecipientPage.defaultProps = {
    loading: true,
    error: false,
    id: '',
    recipient: {},
    pickedFy: () => { }
};

export default RecipientPage;
