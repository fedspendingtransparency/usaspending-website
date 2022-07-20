/**
 * Homepage.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React from 'react';

import Download from './download/Download';
import Community from './community/Community';
import Hero from './hero/Hero';
import HomepageCovidContainer from '../../containers/homepage/HomepageCovidContainer';
import GettingStarted from './gettingStarted/GettingStarted';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";

require('pages/homepage/homepage.scss');

const Homepage = () => (
    <PageWrapper
        pageName="Homepage"
        classNames="usa-da-home-page"
        title="Government Spending Open Data | USAspending"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main id="main-content" className="main-content homepage-content">
            <Hero />
            <HomepageCovidContainer />
            <GettingStarted />
            <Download />
            <Community />
        </main>
    </PageWrapper>);

export default Homepage;
