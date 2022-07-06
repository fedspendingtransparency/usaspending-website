/**
 * WOSBPage.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { ShareIcon } from 'data-transparency-ui';
import PageWrapper from "../sharedComponents/PageWrapper";
import { wosbPageMetaTags } from "../../helpers/metaTagHelper";

require('pages/wosbPage/wosbPage.scss');

const WOSBPage = () => {
    const slug = 'data-dives/women-owned-small-businesses-federal-contracting';
    const emailArgs = {
        subject: 'Women-Owned Small Businesses (WOSB) | USAspending.gov',
        body: `Dive into the data with the interactive tools on USAspending.gov to learn about women-owned small businesses in federal contracting: ${getBaseUrl(slug)}`
    };

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, slug, emailArgs);
    };

    const HeadingContentObject = {
        heading: 'Women-Owned Small Businesses (WOSB)',
        tag: 'Partner Collaboration',
        date: 'May 11, 2022',
        numberOfPosts: '3',
        intro: 'Learn about the federal government\'s progress toward helping Women-Owned Small Businesses win federal contracts.',
        note: (
            <p>The data represented in these charts includes only <b>prime award spending</b>, or agreements between the federal government and a non-federal recipient. The charts <b>do not include</b> sub-award spending, which are agreements between the recipient of a prime award and another entity to perform some of the work for the prime award.</p>
        )
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
                <div content={HeadingContentObject}>HEADING PLACEHOLDER</div>
                <div>CONTENT PLACEHOLDER</div>
            </main>
        </PageWrapper>
    );
};

export default WOSBPage;
