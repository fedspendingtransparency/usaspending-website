import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

import * as Icons from '../icons/Icons';

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
                        <ul className="nav-menu">
                            <li className="coming-soon">
                                <a className="usa-nav-link" href="#/">
                                    <span>Explore The Data</span>
                                </a>
                                <ComingSoonLabel />
                            </li>
                            <li>
                                <a className="usa-nav-link" href="https://api.usaspending.gov/">
                                    <span>Developers</span>
                                </a>
                            </li>
                            <li>
                                <a className="usa-nav-link" href="#/about">
                                    <span>About</span>
                                </a>
                            </li>
                            <li className="coming-soon">
                                <a className="usa-nav-link" href="#/">
                                    <span>Support</span>
                                </a>
                                <ComingSoonLabel />
                            </li>
                            <li className="search-item">
                                <button className="search-button">
                                    <Icons.Search />
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
