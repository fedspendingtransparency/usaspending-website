/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiscalYearPicker } from 'data-transparency-ui';
import { find } from 'lodash-es';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { combineQueryParams, getQueryParamString } from '../../helpers/queryParams';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from
    '../../helpers/fiscalYearHelper';
import { recipientPageMetaTags } from '../../helpers/metaTagHelper';
import { LoadingWrapper } from "../../components/sharedComponents/Loading";
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import { stickyHeaderHeight } from '../../dataMapping/stickyHeader/stickyHeader';
import ChildRecipientModalContainer from '../../containers/recipient/modal/ChildRecipientModalContainer';
import { AlternateNamesRecipientModalContainer } from
    '../../containers/recipient/modal/AlternateNamesRecipientModalContainer';
import PageWrapper from '../../components/sharedComponents/PageWrapper';
import Error from '../../components/sharedComponents/Error';
import ShareIcon508 from "../../components/sharedComponents/buttons/ShareIcon508";
import ProfileBackLink from '../../components/sharedComponents/ProfileBackLink';

import { showModal } from '../../redux/actions/modal/modalActions';
import useQueryParams from "../../hooks/useQueryParams";
import RecipientContent from './RecipientContent';

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
    const history = useNavigate();
    const query = useQueryParams();
    const [isChildModalVisible, showChildModal] = useState(false);
    const [isAlternateModalVisible, showAlternateRecipientModal] = useState(false);
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
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
        body: encodeURIComponent(`View the spending activity for this recipient on USAspending.gov: ${getBaseUrl(slug)}`)
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

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

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(recipientSections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#recipient-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history({
            path: `${getQueryParamString(newQueryParams)}`
        }, { replace: true });

        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight);

        window.scrollTo({
            top: sectionTop - 55,
            left: 0,
            behavior: 'smooth'
        });
        setActiveSection(section);
    };
    useEffect(() => {
        if (!loading && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, loading]);

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
            activeSection={activeSection}
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
