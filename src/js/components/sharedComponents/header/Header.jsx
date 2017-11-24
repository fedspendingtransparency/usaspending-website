import React from 'react';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import kGlobalConstants from 'GlobalConstants';

import WarningBanner from './WarningBanner';
import InfoBanner from './InfoBanner';
import NavBar from './NavBar';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBanner: true
        };
        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
    }
    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const yPos = document.querySelector('#main-content').getBoundingClientRect().top;
        window.scrollTo(0, yPos);
    }
    closeBanner() {
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
                <WarningBanner />
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

