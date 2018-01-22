/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';
import Cookies from 'js-cookie';

import kGlobalConstants from 'GlobalConstants';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Footer from '../sharedComponents/Footer';
import WarningBanner from '../sharedComponents/header/WarningBanner';
import InfoBanner from '../sharedComponents/header/InfoBanner';

require('pages/homepage2/homePage.scss');

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBanner: false
        };

        this.skippedNav = this.skippedNav.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
    }

    componentWillMount() {
        // check if the info banner cookie exists
        if (!Cookies.get('usaspending_info_banner')) {
            // cookie does not exist, show the banner
            this.setState({
                showBanner: true
            });
        }
    }

    closeBanner() {
        // set a cookie to hide the banner in the future
        Cookies.set('usaspending_info_banner', 'hide', { expires: 730 });
        this.setState({
            showBanner: false
        });
    }

    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const mainContent = document.getElementById('main-content');
        const mainFocus = document.getElementById('main-focus');
        const yPos = mainContent.getBoundingClientRect().top;
        window.scrollTo(0, yPos);
        // focus on the element
        if (mainFocus) {
            mainFocus.focus();
        }
    }
    render() {
        let banner = (
            <InfoBanner
                closeBanner={this.closeBanner} />);
        if (kGlobalConstants.IN_BETA) {
            banner = (<WarningBanner
                closeBanner={this.closeBanner} />);
        }
        if (!this.state.showBanner) {
            banner = null;
        }
        return (
            <div className="usa-da-home-page-2">
                <div className="site-header">
                    <a
                        href="#main-content"
                        className="skip-nav"
                        onClick={this.skippedNav}>
                            Skip to main content
                    </a>
                </div>
                <MetaTags {...MetaTagHelper.homePageMetaTags} />
                <GlossaryContainer />
                {banner}
                <main />
                <Footer />
            </div>
        );
    }
}

