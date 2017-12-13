import React from 'react';
import Cookies from 'js-cookie';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import kGlobalConstants from 'GlobalConstants';

import WarningBanner from './WarningBanner';
import InfoBanner from './InfoBanner';
import NavBar from './NavBar';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBanner: false
        };
        // bind functions
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
    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const yPos = document.querySelector('#main-content').getBoundingClientRect().top;
        window.scrollTo(0, yPos);
    }
    closeBanner() {
        // set a cookie to hide the banner in the future
        Cookies.set('usaspending_info_banner', 'hide', { expires: 730 });
        this.setState({
            showBanner: false
        });
    }
    render() {
        let banner = (
            <InfoBanner
                closeBanner={this.closeBanner} />
        );
        if (!this.state.showBanner) {
            banner = null;
        }
        else if (kGlobalConstants.IN_BETA) {
            banner = (
                <WarningBanner
                    closeBanner={this.closeBanner} />
            );
        }
        return (
            <div className="site-header">
                <a
                    href="#main-content"
                    className="skip-nav"
                    onClick={this.skippedNav}>
                        Skip to main content
                </a>
                <header>
                    {banner}
                    <NavBar />
                </header>
                <GlossaryContainer />
            </div>
        );
    }
}

