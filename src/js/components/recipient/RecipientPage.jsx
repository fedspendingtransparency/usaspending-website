/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShareIcon, FiscalYearPicker } from 'data-transparency-ui';
import { find, throttle } from 'lodash';
import { useHistory } from "react-router-dom";
import { useQueryParams } from 'helpers/queryParams';
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from 'helpers/fiscalYearHelper';
import { recipientPageMetaTags } from 'helpers/metaTagHelper';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import ChildRecipientModalContainer from 'containers/recipient/modal/ChildRecipientModalContainer';
import { AlternateNamesRecipientModalContainer } from 'containers/recipient/modal/AlternateNamesRecipientModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import Error from 'components/sharedComponents/Error';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

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
    const history = useHistory();
    const query = useQueryParams();
    const [isChildModalVisible, showChildModal] = useState(false);
    const [isAlternateModalVisible, showAlternateRecipientModal] = useState(false);
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
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
        history.replace(`?section=${sectionObj.section}`);

        // add offsets
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);
        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(throttle(() => {
        // this allows the page to jump to a section on page load, when
        // using a link to open the page
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                setActiveSection(urlSection);
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

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

    const backgroundColor = {
        backgroundColor: "#1a4480"
    };


    return (
        <PageWrapper
            pageName="Recipient Profile"
            classNames="usa-da-recipient-page"
            overLine="Recipient Profile"
            title={recipient.overview.name}
            metaTagProps={recipient.overview.id && !loading ? recipientPageMetaTags(recipient.overview) : {}}
            toolBarComponents={[
                <FiscalYearPicker
                    backgroundColor={backgroundColor}
                    selectedFy={recipient?.fy}
                    handleFyChange={pickedFy}
                    options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())} />,
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}
            sections={recipientSections}
            activeSection={activeSection}
            jumpToSection={jumpToSection}>
            <>
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
