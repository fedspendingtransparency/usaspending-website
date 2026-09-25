/**
 * NLInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React from 'react';

import PageWrapper from "../sharedComponents/PageWrapper";
import BannerPageHeader from '../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../helpers/metaTagHelper';

const NLInfoPage = () => {
    return (
        <PageWrapper
            pageName="smart-assist"
            classNames=""
            metaTagProps={smartAssistPageMetaTags}
            title="Smart Assist"
            noHeader>
            <main id="main-content" className="main-content">
                <BannerPageHeader 
                    className="nl-container"
                    kicker="RESOURCES"
                    title="Smart Assist"
                    body="Get quick answers to your questions about our AI-powered Smart Assist feature"
                    faIcon="sparkles"
                    primaryColor="#0081a1"
                    secondaryColor= "#0081a1"
                    overrideBackgroundColor="linear-gradient(91deg,#00687d 0%, #0081a1 35%, #005ea2 100%)"/>
            </main>
        </PageWrapper>
    )
}

export default NLInfoPage;