import React from 'react';
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
                            <li>
                                <a className="usa-nav-link" href="#/">
                                    <span>Explore The Data</span>
                                </a>
                            </li>
                            <li>
                                <a className="usa-nav-link" href="#/">
                                    <span>Developers</span>
                                </a>
                            </li>
                            <li>
                                <a className="usa-nav-link" href="#/">
                                    <span>About</span>
                                </a>
                            </li>
                            <li>
                                <a className="usa-nav-link" href="#/">
                                    <span>Support</span>
                                </a>
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
