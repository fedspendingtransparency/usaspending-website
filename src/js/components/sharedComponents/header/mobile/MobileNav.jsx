/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import Router from 'containers/router/Router';

import { searchOptions, profileOptions } from 'dataMapping/navigation/menuOptions';

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
                <MobileTop {...this.props} />
                <div className="nav-content">
                    <ul>
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
                            <MobileDropdown
                                {...this.props}
                                label="Award Search"
                                items={searchOptions}
                                active={this.state.url} />
                            <div className="nav-link-decorator" />
                        </li>
                        <li>
                            <MobileDropdown
                                {...this.props}
                                label="Profiles"
                                items={profileOptions}
                                active={this.state.url} />
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
