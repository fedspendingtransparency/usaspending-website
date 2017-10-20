/**
 * About.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import MastHead from './MastHead';
import Overview from './Overview';
import AboutData from './AboutData';
import NextSteps from './NextSteps';
import Introduction from './Introduction';

require('pages/about/aboutPage.scss');

export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <MetaTags {...MetaTagHelper.aboutPageMetaTags} />
                <Header />
                <main id="main-content">
                    <MastHead />
                    <Introduction />
                    <AboutData />
                    <Overview />
                    <div className="usa-da-about-inner">
                        <NextSteps />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
