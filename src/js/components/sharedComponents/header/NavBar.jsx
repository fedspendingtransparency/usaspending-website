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
                                        href="mailto:usaspending.help-submitonly@fiscal.treasury.gov?subject=Help"
                                        title="Help">
                                        Help
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=" https://usaspending-help.zendesk.com/hc/en-us"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Community">
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/#/about"
                                        rel="noopener noreferrer"
                                        title="About">
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
                                <li className="coming-soon">
                                    <a
                                        className="usa-nav-link"
                                        href="#/"
                                        title="Explore The Data">
                                        <span>Explore The Data</span>
                                    </a>
                                    <ComingSoonLabel />
                                </li>
                                <li>
                                    <a
                                        className="usa-nav-link"
                                        href="https://api.usaspending.gov/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Developers">
                                        <span>Developers</span>
                                    </a>
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
