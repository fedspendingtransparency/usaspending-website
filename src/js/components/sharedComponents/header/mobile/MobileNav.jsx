/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import Router from 'containers/router/Router';

import MobileTop from './MobileTop';
import MobileGlossaryButton from './MobileGlossaryButton';
import MobileProfiles from './MobileProfiles';

const propTypes = {
    hideMobileNav: PropTypes.func
};

const profiles = ['/agency', '/recipient', '/federal_account'];

export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: ''
        };
    }
    componentDidMount() {
        this.checkCurrentProfile();
    }

    checkCurrentProfile() {
        // determine if we're on a profile page
        const currentUrl = Router.history.location.pathname;
        if (profiles.indexOf(currentUrl) > -1) {
            // the user is currently on a profile page
            const profileName = currentUrl.substring(1);
            if (this.state.profile !== profileName) {
                this.setState({
                    profile: profileName
                });
            }
        }
        else if (this.state.profile !== '') {
            // not on a profile page
            this.setState({
                profile: ''
            });
        }
    }

    render() {
        return (
            <div className="mobile-nav">
                <MobileTop {...this.props} />
                <div className="nav-content">
                    <ul>
                        <li>
                            <MobileProfiles
                                {...this.props}
                                active={this.state.profile} />
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="#/explorer"
                                title="Spending Explorer"
                                onClick={this.props.hideMobileNav}>
                                Spending Explorer
                            </a>
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="#/search"
                                title="Award Search"
                                onClick={this.props.hideMobileNav}>
                                Award Search
                            </a>
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="#/about"
                                title="About"
                                onClick={this.props.hideMobileNav}>
                                About
                            </a>
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="https://usaspending-help.zendesk.com/hc/en-us"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Help"
                                onClick={this.props.hideMobileNav}>
                                Help
                            </a>
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <GlossaryButtonWrapperContainer
                                child={MobileGlossaryButton}
                                hideMobileNav={this.props.hideMobileNav} />
                            <div className="nav-link-decorator" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

MobileNav.propTypes = propTypes;
