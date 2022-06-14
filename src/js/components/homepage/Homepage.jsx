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

require('pages/homepageUpdate/homepageUpdate.scss');

const Homepage = () => (
    <PageWrapper
        pageName="Homepage"
        classNames="usa-da-home-page"
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
