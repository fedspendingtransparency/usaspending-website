import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import kGlobalConstants from 'GlobalConstants';
import { searchOptions, profileOptions, downloadOptions } from 'dataMapping/navigation/menuOptions';

import NavBarGlossaryLink from './NavBarGlossaryLink';
import Dropdown from './Dropdown';
import MobileNav from './mobile/MobileNav';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMobileNav: false
        };

        this.siteBody = null;

        this.toggleMobileNav = this.toggleMobileNav.bind(this);
        this.hideMobileNav = this.hideMobileNav.bind(this);
    }

    componentDidMount() {
        this.siteBody = document.querySelector('body');
    }

    displayMobileNav() {
        // disable body scrolling
        this.siteBody.classList.add('show-mobile-nav');
        this.setState({
            showMobileNav: true
        });
    }

    hideMobileNav() {
        // re-enable body scrolling
        this.siteBody.classList.remove('show-mobile-nav');
        this.setState({
            showMobileNav: false
        });
    }

    toggleMobileNav() {
        if (this.state.showMobileNav) {
            this.hideMobileNav();
        }
        else {
            this.displayMobileNav();
        }
    }

    render() {
        let betaClass = '';
        if (kGlobalConstants.IN_BETA) {
            betaClass = 'beta';
        }

        let mobileNav = null;
        if (this.state.showMobileNav) {
            mobileNav = (
                <MobileNav
                    hideMobileNav={this.hideMobileNav} />
            );
        }

        return (
            <nav
                className="site-navigation"
                aria-label="Site navigation">
                <div className="site-navigation__wrapper">
                    <div className="logo">
                        <div className={`usa-logo ${betaClass}`} id="logo">
                            <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                                <span className="logo-sr">USAspending.gov</span>
                            </a>
                        </div>
                    </div>
                    <div className="mobile-menu">
                        <div className="mobile-button-wrapper">
                            <button
                                className="usa-menu-btn"
                                onClick={this.toggleMobileNav}>
                                <span className="nav-lines" />
                            </button>
                        </div>
                    </div>
                    <div className="mobile-nav-animations">
                        <CSSTransitionGroup
                            transitionName="mobile-nav-slide"
                            transitionLeaveTimeout={195}
                            transitionEnterTimeout={225}
                            transitionLeave>
                            {mobileNav}
                        </CSSTransitionGroup>
                    </div>
                    <div className="primary-menu">
                        <ul
                            className="nav-menu"
                            role="menu">
                            <li
                                className="menu-item"
                                role="menuitem">
                                <a
                                    className="usa-nav-link"
                                    href="#/explorer"
                                    title="Spending Explorer: Navigate the levels of government spending from top to bottom">
                                    <span>Spending Explorer</span>
                                </a>
                            </li>
                            <li
                                className="menu-item"
                                role="menuitem">
                                <Dropdown
                                    title="Award Search: Search through awards and discover trends and connections"
                                    label="Award Search"
                                    items={searchOptions} />
                            </li>
                            <li
                                className="menu-item"
                                role="menuitem">
                                <Dropdown
                                    title="Profiles: Learn more about organizations and accounts"
                                    label="Profiles"
                                    items={profileOptions} />
                            </li>
                            <li
                                className="menu-item"
                                role="menuitem">
                                <Dropdown
                                    title="Bulk Download"
                                    label="Bulk Download"
                                    items={downloadOptions} />
                            </li>
                            <li
                                className="menu-item"
                                role="menuitem">
                                <GlossaryButtonWrapperContainer child={NavBarGlossaryLink} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

