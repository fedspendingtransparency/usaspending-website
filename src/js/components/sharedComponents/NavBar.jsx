import React from 'react';
import * as Icons from './icons/Icons';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="usa-nav-container">
                <div className="usa-navbar">
                    <button className="usa-menu-btn">Menu</button>
                    <div className="usa-logo" id="logo">
                        <em className="usa-logo-text">
                            <a href="#" title="Home" aria-label="Home">USAspending.gov</a>
                        </em>
                    </div>
                </div>
                <nav role="navigation" className="usa-nav">
                    <ul className="usa-nav-primary">
                        <li>
                            <a className="usa-nav-link" href="#">
                                <span>The Data</span>
                            </a>
                        </li>
                        <li>
                            <a className="usa-nav-link" href="#">
                                <span>How the US Spends Money</span>
                            </a>
                        </li>
                        <li>
                            <a className="usa-nav-link" href="#">
                                <span>Get the Data</span>
                            </a>
                        </li>
                        <li>
                            <a className="usa-nav-link" href="#">
                                <span>Help</span>
                            </a>
                        </li>
                        <li>
                            <button
                                className="usa-nav-link usa-da-icon
                                usa-header-search-button" href="#">
                                <Icons.Search />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
