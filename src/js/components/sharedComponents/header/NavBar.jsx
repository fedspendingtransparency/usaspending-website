import React from 'react';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import SearchBar from './searchBar/SearchBar';
import NavBarGlossaryLink from './NavBarGlossaryLink';
import ProfileButton from './ProfileButton';

const NavBar = () => (
    <div className="nav-container">
        <div className="logo">
            <div className="usa-logo" id="logo">
                <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                    <span className="logo-sr">USAspending.gov</span>
                </a>
            </div>
        </div>
        <div className="mobile-menu">
            <button className="usa-menu-btn">
                <span className="nav-lines" />
            </button>
        </div>
        <nav role="navigation">
            <div className="menu-container">
                <div className="upper-menu">
                    <ul className="small-menu">
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
                <div className="lower-menu">
                    <ul className="nav-menu">
                        <li className="profile-item">
                            <ProfileButton />
                        </li>
                        <li className="menu-item">
                            <a
                                className="usa-nav-link"
                                href="#/search"
                                title="Search &amp; Download">
                                <span>Search &amp; Download</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <SearchBar />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
);

export default NavBar;
