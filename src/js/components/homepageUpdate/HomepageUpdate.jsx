/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { Redirect } from "react-router-dom";

import GlobalConstants from "GlobalConstants";
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import Hero from '../homepage/hero/Hero';
import SummaryStats from "../homepage/SummaryStats";
import AwardSearch from "../homepage/AwardSearch/AwardSearch";
import HomepageExploreToggle from "./HomepageExploreToggle/HomepageExploreToggle";
import DownloadExplorePlaceholder from "../homepage/DownloadExplorePlaceholder/DownloadExplorePlaceholder";
import HomepageResources from "./HomepageResources/HomepageResources";
import ReadyToGetStarted from "./ReadyToGetStarted/ReadyToGetStarted";
import StayInTouch from "./StayInTouch/StayInTouch";
import HomepageFirstRow from "./HomepageFirstRow/HomepageFirstRow";

require('pages/homepage/homepageUpdate.scss');

const HomepageUpdate = () => {
    const isQAT = GlobalConstants.QAT;
    return (isQAT ?
        <PageWrapper
            pageName="Homepage"
            classNames="usa-da-home-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main id="main-content" className="main-content homepage-update-content">
                <Hero />
                <SummaryStats />
                <HomepageFirstRow />
                <AwardSearch />
                <HomepageExploreToggle />
                <DownloadExplorePlaceholder />
                <HomepageResources />
                <ReadyToGetStarted />
                <StayInTouch />
            </main>
        </PageWrapper>
        :
        <Redirect to="/404" />
    );
};

export default HomepageUpdate;
