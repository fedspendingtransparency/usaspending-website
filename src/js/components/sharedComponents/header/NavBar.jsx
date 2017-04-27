import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import * as Icons from '../icons/Icons';
import SearchBar from './searchBar/SearchBar';

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
                                    <button
                                        aria-label="Show Guide"
                                        className="header-guide-button">
                                        <div className="guide-button-content">
                                            <span className="guide-button-icon">
                                                <Icons.Guide alt="Guide" />
                                            </span>
                                            Guide
                                        </div>
                                    </button>
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
                                <li className="coming-soon">
                                    <a className="usa-nav-link" href="#/">
                                        <span>Developers</span>
                                    </a>
                                    <ComingSoonLabel />
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
