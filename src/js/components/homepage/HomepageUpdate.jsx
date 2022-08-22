/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';

import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import Hero from './hero/Hero';
import FeaturedContent from './FeaturedContent/FeaturedContent';
import WordOfTheDay from './WordOfTheDay/WordOfTheDay';
import SummaryStats from "./SummaryStats";
import AwardSearch from "./AwardSearch/AwardSearch";
import HomepageExploreToggle from "./HomepageExploreToggle/HomepageExploreToggle";
import DownloadExplorePlaceholder from "./DownloadExplorePlaceholder/DownloadExplorePlaceholder";
import HomepageResources from "./HomepageResources/HomepageResources";
import ReadyToGetStarted from "./ReadyToGetStarted/ReadyToGetStarted";
import StayInTouch from "./StayInTouch/StayInTouch";

require('pages/homepage/homepageUpdate.scss');

const Homepage = () => (
    <PageWrapper
        pageName="Homepage"
        classNames="usa-da-home-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main id="main-content" className="main-content homepage-update-content">
            <Hero />
            <SummaryStats />
            <FlexGridRow className="homepage-update__feature-row">
                <FlexGridCol width={8} >
                    <FeaturedContent />
                </FlexGridCol>
                <FlexGridCol width={4} >
                    <WordOfTheDay />
                </FlexGridCol>
            </FlexGridRow>
            <AwardSearch />
            <HomepageExploreToggle />
            <DownloadExplorePlaceholder />
            <HomepageResources />
            <ReadyToGetStarted />
            <StayInTouch />
        </main>
    </PageWrapper>);

export default Homepage;
