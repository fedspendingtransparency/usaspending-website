import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal from 'react-aria-modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Analytics from 'helpers/analytics/Analytics';
import { searchOptions, downloadOptions, resourceOptions } from 'dataMapping/navigation/menuOptions';
import EmailSignUp from 'components/homepageUpdate/EmailSignUp';

import Dropdown from './DropdownStripe';
import MobileNav from './mobile/MobileNav';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

export default class NavBarStripe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMobileNav: false,
            showStayInTouchModal: false
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
    toggleModal = () => {
        this.setState({ showStayInTouchModal: !this.state.showStayInTouchModal });
    };


    render() {
        const navHomePage = window.location.href;
        let bananas = '';
        if (navHomePage === "http://localhost:3000/") {
            bananas = "site-navigation_home-page";
        }
        console.log(navHomePage);
        return (
            <nav
                className={`site-navigation  ${bananas}`}
                aria-label="Site navigation">
                <Modal
                    className="email-sign-up__modal"
                    mounted={this.state.showStayInTouchModal}
                    onExit={this.toggleModal}
                    titleText="Stay in Touch"
                    dialogClass="stay-in-touch-modal"
                    verticallyCenter
                    escapeExits>
                    <div className="usa-dt-modal">
                        <div className="usa-dt-modal__header">
                            <h1 className="usa-dt-modal__title">
                                Stay in touch
                            </h1>
                            <button
                                className="usa-dt-modal__close-button"
                                onClick={this.toggleModal}
                                title="Close"
                                aria-label="Close">
                                <FontAwesomeIcon icon="times" size="lg" />
                            </button>
                        </div>
                        <div className="usa-dt-modal__body">
                            <EmailSignUp closeModal={this.toggleModal} />
                        </div>
                    </div>
                </Modal>
                <div className="site-navigation__wrapper">
                    <div className="site-navigation__logo site-logo">
                        <div className="site-logo__wrapper" id="logo">
                            <Link
                                className="site-logo__link"
                                to="/"
                                title="USAspending.gov Home"
                                aria-label="USAspending.gov Home"
                                onClick={clickedHeaderLink.bind(null, '/')}>
                                <img
                                    className="site-logo__image"
                                    src="img/logo.png"
                                    srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                                    alt="USAspending.gov" />
                            </Link>
                        </div>
                    </div>
                    <div className="site-navigation__mobile mobile-hamburger">
                        <div className="mobile-hamburger__wrapper">
                            <button
                                className="mobile-hamburger__button"
                                onClick={this.toggleMobileNav}>
                                <span className="mobile-hamburger__meat-buns" />
                            </button>
                        </div>
                    </div>
                    <div className="mobile-nav-animations">
                        <TransitionGroup>
                            {this.state.showMobileNav && (
                                <CSSTransition
                                    classNames="mobile-nav-slide"
                                    timeout={{ enter: 225, exit: 195 }}
                                    exit>
                                    <MobileNav hideMobileNav={this.hideMobileNav} />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </div>
                    <div className="site-navigation__menu full-menu">
                        <ul
                            className="full-menu__list"
                            role="menu">
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Link
                                    className="full-menu__link"
                                    to="/explorer"
                                    title="Spending Explorer: Navigate the levels of government spending from top to bottom"
                                    onClick={clickedHeaderLink.bind(null, '/explorer')}>
                                    Search Award Data
                                </Link>
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Explore The Data"
                                    label="Explore the data"
                                    items={searchOptions} />
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Download"
                                    label="Download The Data"
                                    items={downloadOptions} />
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Resources"
                                    label="Find Resources"
                                    items={resourceOptions} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

