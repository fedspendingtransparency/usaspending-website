/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import Router from 'containers/router/Router';

import { searchOptions, profileOptions, downloadOptions } from 'dataMapping/navigation/menuOptions';

import MobileTop from './MobileTop';
import MobileGlossaryButton from './MobileGlossaryButton';
import MobileDropdown from './MobileDropdown';

const propTypes = {
    hideMobileNav: PropTypes.func
};

export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };
    }
    componentDidMount() {
        this.checkCurrentProfile();
    }

    checkCurrentProfile() {
        // determine if we need to highlight a dropdown menu option
        const currentUrl = Router.history.location.pathname;
        const formattedUrl = `#${currentUrl}`;
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
                                onClick={this.props.hideMobileNav}>
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
