/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import Header from 'containers/shared/HeaderContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Download from './download/Download';
import Community from './community/Community';
import Hero from './hero/Hero';
import Covid from './covid/Covid';
import GettingStarted from './gettingStarted/GettingStarted';

require('pages/homepageUpdate/homepageUpdate.scss');

const HomepageUpdate = () => (
    <div className="usa-da-home-page">
        <MetaTags {...MetaTagHelper.homePageMetaTags} />
        <Header />
        <main id="main-content" className="homepage-content">
            <Hero />
            <Covid />
            <GettingStarted />
            <Download />
            <Community />
        </main>
        <GlobalModalContainer />
        <Footer pageName="Homepage" />
    </div>
);

export default HomepageUpdate;
