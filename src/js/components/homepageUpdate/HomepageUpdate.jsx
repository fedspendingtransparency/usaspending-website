/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import HeroUpdate from './heroUpdate/HeroUpdate';
import SummaryStats from "./SummaryStats";
import AwardSearch from "./AwardSearch/AwardSearch";
import HomepageExploreToggle from "./HomepageExploreToggle/HomepageExploreToggle";
import HomepageResources from "./HomepageResources/HomepageResources";
import ReadyToGetStarted from "./ReadyToGetStarted/ReadyToGetStarted";
import HomepageFirstRow from "./HomepageFirstRow/HomepageFirstRow";

require('pages/homepageUpdate/homepageUpdate.scss');

const HomepageUpdate = () => (
    <PageWrapper
        pageName="Homepage"
        classNames="usa-da-home-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main id="main-content" className="main-content homepage-update-content">
            <HeroUpdate />
            <SummaryStats />
            <HomepageFirstRow />
            <AwardSearch />
            <HomepageExploreToggle />
            <HomepageResources />
            <ReadyToGetStarted />
        </main>
    </PageWrapper>
);

export default HomepageUpdate;
