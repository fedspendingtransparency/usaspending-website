/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';
import { explorerPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import AnimatedAboutTheDataWrapper from "../aboutTheDataUpdated/AnimatedAboutTheDataWrapper";
import ATDButton from "../sharedComponents/aboutTheData/ATDButton";

const propTypes = {
    children: PropTypes.element,
    showShareIcon: PropTypes.bool,
    showAboutTheDataIcon: PropTypes.bool
};

const defaultProps = {
    showShareIcon: false,
    showAboutTheDataIcon: false
};

require('pages/explorer/explorerPage.scss');

const slug = 'explorer';
const emailSubject = 'USAspending.gov Federal Spending Explorer';

const ExplorerWrapperPage = (props) => {
    const [atdOpen, setATDOpen] = useState(false);
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View the Spending Explorer on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };

    const handleATDButtonClick = () => {
        setATDOpen(!atdOpen);
    };

    const onClose = () => {
        setATDOpen(false);
        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
    };

    return (
        <PageWrapper
            pageName="Spending Explorer"
            classNames="usa-da-explorer-page"
            title="Spending Explorer"
            metaTagProps={explorerPageMetaTags}
            toolBarComponents={[
                props.showShareIcon ? <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} /> : <></>,
                !props.showAboutTheDataIcon ?
                    <ATDButton onClick={handleATDButtonClick} /> : <></>
            ]}>
            <main
                id="main-content"
                className="main-content">
                {props.children}
                <AnimatedAboutTheDataWrapper onClose={onClose} open={atdOpen} />
            </main>
        </PageWrapper>
    );
};

ExplorerWrapperPage.propTypes = propTypes;
ExplorerWrapperPage.defaultProps = defaultProps;

export default ExplorerWrapperPage;
