import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import NavBarGlossaryLink from './NavBarGlossaryLink';
import ProfileButton from './ProfileButton';
import MobileNav from './mobile/MobileNav';

const propTypes = {
    homepage: PropTypes.bool
};

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
        let homepageClass = '';
        if (this.props.homepage) {
            homepageClass = 'homepage';
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
                className="nav-container">
                <div className="logo">
                    <div className={`usa-logo ${homepageClass}`} id="logo">
                        <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                            <span className="logo-sr">USAspending.gov</span>
                        </a>
                    </div>
                </div>
                <div className="mobile-menu">
                    <div className="mobile-button-wrapper">
                        <button
                            className={`usa-menu-btn ${homepageClass}`}
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
                    <ul className="nav-menu">
                        <li className="menu-item">
                            <a
                                className={`usa-nav-link ${homepageClass}`}
                                href="#/explorer"
                                title="Spending Explorer: Navigate the levels of government spending from top to bottom">
                                <span>Spending Explorer</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a
                                className={`usa-nav-link ${homepageClass}`}
                                href="#/search"
                                title="Award Search: Search through awards and discover trends and connections">
                                <span>Award Search</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <ProfileButton homepage={this.props.homepage} />
                        </li>
                    </ul>
                </div>
                <div className="secondary-menu">
                    <ul className={`small-menu ${homepageClass}`}>
                        <li>
                            <a
                                href="/#/about"
                                rel="noopener noreferrer"
                                title="About">
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://usaspending-help.zendesk.com/hc/en-us"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Help">
                                Help
                            </a>
                        </li>
                        <li>
                            <GlossaryButtonWrapperContainer child={NavBarGlossaryLink} />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = propTypes;
