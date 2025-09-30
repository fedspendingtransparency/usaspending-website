/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
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

const HomepageUpdate = () => {
    useEffect(() => {
        // ok to rewrite with each page reload
        // may need to check if timer already logged.
        Cookies.set('homepage_to_query_time', new Date().getTime(), { expires: 365 });
    }, []);

    return (
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
};

export default HomepageUpdate;
