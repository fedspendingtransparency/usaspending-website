/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import MobileTop from './MobileTop';
import MobileGlossaryButton from './MobileGlossaryButton';
import MobileProfiles from './MobileProfiles';

const propTypes = {
    hideMobileNav: PropTypes.func
};

export default class MobileNav extends React.Component {
    render() {
        return (
            <div className="mobile-nav">
                <MobileTop {...this.props} />
                <div className="nav-content">
                    <ul>
                        <li>
                            <MobileProfiles {...this.props} />
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
