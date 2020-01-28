/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import { searchOptions, profileOptions, downloadOptions } from 'dataMapping/navigation/menuOptions';

import MobileTop from './MobileTop';
import MobileGlossaryButton from './MobileGlossaryButton';
import MobileDropdown from './MobileDropdown';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const propTypes = {
    hideMobileNav: PropTypes.func
};

export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.clickedLink = this.clickedLink.bind(this);
    }

    componentDidMount() {
        this.checkCurrentProfile();
    }

    clickedLink(e) {
        const route = e.target.name;
        clickedHeaderLink(route);
        this.props.hideMobileNav();
    }

    checkCurrentProfile() {
        // determine if we need to highlight a dropdown menu option
        // TODO - fix for BrowserRouter
        //const currentUrl = Router.history.location.pathname;
        const formattedUrl = ``;
        if (this.state.url !== formattedUrl) {
            this.setState({
                url: formattedUrl
            });
        }
    }

    render() {
        return (
            <div className="mobile-nav">
                <div className="mobile-nav__top">
                    <MobileTop {...this.props} />
                </div>
                <div className="mobile-nav-content">
                    <ul
                        className="mobile-nav-content__list">
                        <li className="mobile-nav-content__list-item">
                            <a
                                className="mobile-nav-content__link"
                                href="#/explorer"
                                title="Spending Explorer"
                                name="#/explorer"
                                onClick={this.clickedLink}>
                                Spending Explorer
                            </a>
                            <hr className="mobile-nav-content__divider" />
                        </li>
                        <li className="mobile-nav-content__list-item">
                            <MobileDropdown
                                {...this.props}
                                label="Award Search"
                                items={searchOptions}
                                active={this.state.url} />
                            <hr className="mobile-nav-content__divider" />
                        </li>
                        <li className="mobile-nav-content__list-item">
                            <MobileDropdown
                                {...this.props}
                                label="Profiles"
                                items={profileOptions}
                                active={this.state.url} />
                            <hr className="mobile-nav-content__divider" />
                        </li>
                        <li className="mobile-nav-content__list-item mobile-nav-content__list-item_no-phone">
                            <MobileDropdown
                                {...this.props}
                                label="Download Center"
                                items={downloadOptions}
                                active={this.state.url} />
                            <hr className="mobile-nav-content__divider" />
                        </li>
                        <li className="mobile-nav-content__list-item">
                            <GlossaryButtonWrapperContainer
                                child={MobileGlossaryButton}
                                hideMobileNav={this.props.hideMobileNav} />
                            <hr className="mobile-nav-content__divider" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

MobileNav.propTypes = propTypes;
