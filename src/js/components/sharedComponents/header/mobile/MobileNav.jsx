/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import { searchOptions, profileOptions, downloadOptions, resourceOptions } from 'dataMapping/navigation/menuOptions';

import MobileTop from './MobileTop';
import MobileDropdown from './MobileDropdown';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const propTypes = {
    hideMobileNav: PropTypes.func,
    location: PropTypes.object
};

export class MobileNav extends React.Component {
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
        const currentUrl = this.props.location.pathname;
        if (this.state.url !== currentUrl) {
            this.setState({
                url: currentUrl
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
                            <Link
                                className="mobile-nav-content__link"
                                to="/explorer"
                                title="Spending Explorer"
                                name="explorer"
                                onClick={this.clickedLink}>
                                Spending Explorer
                            </Link>
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
                            <MobileDropdown
                                {...this.props}
                                label="Resources"
                                items={resourceOptions}
                                active={this.state.url} />
                            <hr className="mobile-nav-content__divider" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

MobileNav.propTypes = propTypes;
export default withRouter(MobileNav);
