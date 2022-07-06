/**
 * WOSBPage.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { ShareIcon } from 'data-transparency-ui';
import PageWrapper from "../sharedComponents/PageWrapper";
import { wosbPageMetaTags } from "../../helpers/metaTagHelper";

const WOSBPage = () => {
    const slug = 'data-dives/women-owned-small-businesses-federal-contracting';
    const emailArgs = {
        subject: 'Women-Owned Small Businesses (WOSB) | USAspending.gov',
        body: `Dive into the data with the interactive tools on USAspending.gov to learn about women-owned small businesses in federal contracting: ${getBaseUrl(slug)}`
    };

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, slug, emailArgs);
    };

    return (
        <PageWrapper
            pageName="WOSBPage"
            classNames="wosb-page"
            overLine="Data Dives"
            title="Women-Owned Small Businesses (WOSB)"
            metaTagProps={{ ...wosbPageMetaTags }}
            toolBarComponents={[
                <ShareIcon url={getBaseUrl(slug)} onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content wosb-content">
                <div>HEADING PLACEHOLDER</div>
                <div>CONTENT PLACEHOLDER</div>
            </main>
        </PageWrapper>
    );
};

export default WOSBPage;
