/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';

import { aboutPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import AboutHeader from './AboutHeader';
import AboutContent from './AboutContent';

require('pages/about/aboutPage.scss');

export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <MetaTags {...aboutPageMetaTags} />
                <Header />
                <AboutHeader />
                <main
                    id="main-content"
                    className="main-content">
                    <AboutContent />
                </main>
                <Footer />
            </div>
        );
    }
}
