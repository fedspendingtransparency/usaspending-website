/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import CovidHighlights from 'containers/homepage/CovidHighlights';
import Header from 'containers/shared/HeaderContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Features from './features/Features';
import Download from './download/Download';
import Community from './community/Community';
import CovidVaccineLink from "./CovidVaccineLink";

require('pages/homepage/homePage.scss');

const Homepage = () => (
    <div className="usa-da-home-page">
        <MetaTags {...MetaTagHelper.homePageMetaTags} />
        <Header />
        <main id="main-content" className="homepage-content">
            <CovidVaccineLink />
            <CovidHighlights />
            <Features />
            <Download />
            <Community />
        </main>
        <GlobalModalContainer />
        <Footer pageName="Homepage" />
    </div>
);

export default Homepage;
