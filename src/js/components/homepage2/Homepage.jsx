/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import Hero from './hero/Hero';
import Features from './features/Features';

require('pages/homepage2/homePage.scss');

export default class Homepage extends React.Component {
    render() {
        return (
            <div className="usa-da-home-page-2">
                <MetaTags {...MetaTagHelper.homePageMetaTags} />
                <Header />
                <GlossaryContainer />
                <main id="main-content">
                    <Hero />
                    <Features />
                </main>
                <Footer />
            </div>
        );
    }
}

