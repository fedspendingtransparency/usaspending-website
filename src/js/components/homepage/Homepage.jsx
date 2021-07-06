/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import CovidHighlights from 'containers/homepage/CovidHighlights';
import Header from 'containers/shared/HeaderContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Features from './features/Features';
import Download from './download/Download';
import Community from './community/Community';

require('pages/homepage/homePage.scss');

const im = {
    srcSet: 'img/homepage-award-search.webp 1x, img/homepage-award-search@2x.webp 2x',
    src: 'img/homepage-award-search.png',
    alt: 'Screenshot of the Award Search page, showing a map data visualization'
};

const Homepage = () => {
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.value));
        }
    };
    return (
        <div className="usa-da-home-page">
            <MetaTags {...MetaTagHelper.homePageMetaTags} />
            <Header />
            <div>
                <picture className="covid-19-vaccine-link">
                    <source srcSet={im.srcSet} type="image/webp" />
                    <source srcSet={im.src} type="image/png" />
                    <img src={im.src} alt={im.alt} />
                </picture>
                <strong>We Can Do this.</strong>
                Find COVID-19 vaccines near you.
                <button
                    value="https://www.vaccines.gov/ "
                    role="link"
                    className="usa-button-link"
                    onClick={onExternalLinkClick}>
                    Visit Vaccines.gov
                </button>
            </div>
            <main id="main-content" className="homepage-content">
                <CovidHighlights />
                <Features />
                <Download />
                <Community />
            </main>
            <GlobalModalContainer />
            <Footer />
        </div>
    );
};

export default Homepage;
