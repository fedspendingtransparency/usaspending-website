/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiscalYearPicker } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import { showModal } from 'redux/actions/modal/modalActions';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from
    'helpers/fiscalYearHelper';
import { recipientPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import useJumpToSection from "../../hooks/useJumpToSection";
import { LoadingWrapper } from "components/sharedComponents/Loading";
import PageWrapper from 'components/sharedComponents/PageWrapper';
import Error from 'components/sharedComponents/Error';
import ShareIcon508 from "components/sharedComponents/buttons/ShareIcon508";
import ProfileBackLink from 'components/sharedComponents/ProfileBackLink';
import ChildRecipientModalContainer from 'containers/recipient/modal/ChildRecipientModalContainer';
import { AlternateNamesRecipientModalContainer } from
    'containers/recipient/modal/AlternateNamesRecipientModalContainer';
import RecipientContent from './RecipientContent';

const recipientSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'transactions-over-time',
        label: 'Transactions Over Time'
    },
    {
        section: 'top-five',
        label: 'Top 5'
    }
];

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
    // const history = useNavigate();
    // const query = useQueryParams();
    const [isChildModalVisible, showChildModal] = useState(false);
    const [isAlternateModalVisible, showAlternateRecipientModal] = useState(false);
    // const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const showAlternateModal = () => showAlternateRecipientModal(true);
    const hideAlternateModal = () => showAlternateRecipientModal(false);
    const showChildRecipientModal = () => showChildModal(true);
    const hideChildRecipientModal = () => showChildModal(false);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const slug = `recipient/${encodeURIComponent(id)}/${encodeURIComponent(recipient.fy)}`;
    const emailArgs = {
        subject: encodeURIComponent(`USAspending.gov Recipient Profile: ${recipient.overview.name}`),
        body: encodeURIComponent(
            `View the spending activity for this recipient on USAspending.gov: ${getBaseUrl(slug)}`
        )
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    const jumpToSection = useJumpToSection("#recipient-", recipientSections, loading);

    let content = (
        <RecipientContent
            id={id}
            showChildRecipientModal={showChildRecipientModal}
            showAlternateNamesRecipientModal={showAlternateModal}
            recipient={recipient}
            loading={loading}
            error={error} />
    );

    if (error) {
        content = (<Error
            title="Invalid Recipient"
            message="The recipient ID provided is invalid. Please check the ID and try again." />);
    }

    const backgroundColor = "#1a4480";

    return (
        <PageWrapper
            pageName="recipient"
            classNames="usa-da-recipient-page"
            title={recipient.overview.name}
            loading={loading}
            metaTagProps={recipient.overview.id && !loading ? recipientPageMetaTags(recipient.overview) : {}}
            toolBarComponents={[
                <FiscalYearPicker
                    backgroundColor={backgroundColor}
                    selectedFy={recipient?.fy}
                    handleFyChange={pickedFy}
                    options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())}
                    key="page-wrapper__fiscal-year-picker" />,
                <ShareIcon508
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)}
                    key="page-wrapper__share-icon" />
            ]}
            sections={recipientSections}
            jumpToSection={jumpToSection}
            inPageNav>
            <main id="main-content" className="main-content">
                <ProfileBackLink
                    label="Back to Recipient Profile Page"
                    url="/recipient" />
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
