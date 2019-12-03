/**
 * StateLanding.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';

import { stateLandingPageMetaTags } from 'helpers/metaTagHelper'; 

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'components/sharedComponents/Footer';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';

require('pages/stateLanding/stateLandingPage.scss');

export default class StateLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-state-landing">
                <MetaTags {...stateLandingPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            State Profiles
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <div className="landing-page">
                        <div className="landing-page__overview">
                            <h2
                                className="landing-page__title">
                                Find a State Profile.
                            </h2>
                            <div className="landing-page__description">
                                Find insights into the awards that fall within a particular U.S. state or territory with the tools and data breakdowns found in our State Profile pages.
                            </div>
                        </div>
                        <StateLandingContainer />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
