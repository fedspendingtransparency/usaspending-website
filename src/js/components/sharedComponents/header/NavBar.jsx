import React from 'react';

import GuideButtonWrapperContainer from 'containers/guide/GuideButtonWrapperContainer';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import SearchBar from './searchBar/SearchBar';
import NavBarGuideLink from './NavBarGuideLink';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="nav-container">
                <div className="logo">
                    <div className="usa-logo" id="logo">
                        <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                            <span className="logo-sr">USAspending.gov</span>
                        </a>
                    </div>
                </div>
                <div className="mobile-menu">
                    <button className="usa-menu-btn">Menu</button>
                </div>
                <nav role="navigation">
                    <div className="menu-container">
                        <div className="upper-menu">
                            <ul className="small-menu">
                                <li>
                                    <a
                                        href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Help
                                    </a>
                                </li>
                                <li>
                                    <a href="/#/about">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <GuideButtonWrapperContainer child={NavBarGuideLink} />
                                </li>
                            </ul>
                        </div>
                        <div className="lower-menu">
                            <ul className="nav-menu">
                                <li className="coming-soon menu-link">
                                    <div className="link-content">
                                        <a className="usa-nav-link" href="#/">
                                            <span>Explore The Data</span>
                                        </a>
                                        <ComingSoonLabel />
                                    </div>
                                </li>
                                <li className="menu-link">
                                    <div className="link-content">
                                        <a
                                            className="usa-nav-link"
                                            href="https://api.usaspending.gov/"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <span>Developers</span>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <SearchBar />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
