/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';
import { explorerPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import PageWrapper from 'components/sharedComponents/PageWrapper';

const propTypes = {
    children: PropTypes.element,
    showShareIcon: PropTypes.bool
};

const defaultProps = {
    showShareIcon: false
};

require('pages/explorer/explorerPage.scss');

const slug = 'explorer';
const emailSubject = 'USAspending.gov Federal Spending Explorer';

const ExplorerWrapperPage = (props) => {
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View the Spending Explorer on USAspending.gov: ${getBaseUrl(slug)}`
        });
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
                    url={getBaseUrl(slug)} /> : <></>
            ]}>
            <main
                id="main-content"
                className="main-content">
                {props.children}
            </main>
        </PageWrapper>
    );
};

ExplorerWrapperPage.propTypes = propTypes;
ExplorerWrapperPage.defaultProps = defaultProps;

export default ExplorerWrapperPage;
