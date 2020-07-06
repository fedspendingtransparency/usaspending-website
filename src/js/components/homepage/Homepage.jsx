/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Header from '../sharedComponents/header/Header';

import Hero from './hero/Hero';
import Features from './features/Features';
import Download from './download/Download';
import Community from './community/Community';

require('pages/homepage/homePage.scss');

export default class Homepage extends React.Component {
    render() {
        return (
            <div className="usa-da-home-page">
                <MetaTags {...MetaTagHelper.homePageMetaTags} />
                <Header />
                <main id="main-content" className="homepage-content">
                    <Hero />
                    <Features />
                    <Download />
                    <Community />
                </main>
                <Footer />
            </div>
        );
    }
}

