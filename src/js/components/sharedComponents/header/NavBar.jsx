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
                        <a href="/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
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
                                    <a className="disabled" href="/#/" disabled>
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
                                <li className="coming-soon">
                                    <a className="usa-nav-link" href="#/">
                                        <span>Explore The Data</span>
                                    </a>
                                    <ComingSoonLabel />
                                </li>
                                <li>
                                    <a className="usa-nav-link" href="https://api.usaspending.gov">
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
