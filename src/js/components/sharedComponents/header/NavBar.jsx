import React from 'react';
import PropTypes from 'prop-types';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import SearchBar from './searchBar/SearchBar';
import NavBarGlossaryLink from './NavBarGlossaryLink';
import ProfileButton from './ProfileButton';

const propTypes = {
    homepage: PropTypes.bool
};

const NavBar = (props) => {
    let homepageClass = '';
    if (props.homepage) {
        homepageClass = 'homepage';
    }

    return (
        <nav
            className="nav-container"
            role="navigation">
            <div className="logo">
                <div className={`usa-logo ${homepageClass}`} id="logo">
                    <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                        <span className="logo-sr">USAspending.gov</span>
                    </a>
                </div>
            </div>
            <div className="mobile-menu">
                <div className="mobile-button-wrapper">
                    <button className="usa-menu-btn">
                        <span className="nav-lines" />
                    </button>
                </div>
            </div>
            <div className="primary-menu">
                <ul className="nav-menu">
                    <li className="profile-item">
                        <ProfileButton homepage={props.homepage} />
                    </li>
                    <li className="menu-item">
                        <a
                            className={`usa-nav-link ${homepageClass}`}
                            href="#/explorer"
                            title="Explorer">
                            <span>Explorer</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a
                            className={`usa-nav-link ${homepageClass}`}
                            href="#/search"
                            title="Award Search">
                            <span>Award Search</span>
                        </a>
                    </li>
                </ul>
            </div>
            <SearchBar homepage={props.homepage} />
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
};

NavBar.propTypes = propTypes;

export default NavBar;
