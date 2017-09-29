/**
 * MobileNav.jsx
 * Created by Kevin Li 9/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import MobileTop from './MobileTop';

const propTypes = {
    hideMobileNav: PropTypes.func
};

export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedProfile: false
        };
    }

    render() {
        return (
            <div className="mobile-nav">
                <MobileTop {...this.props} />
                <div className="nav-content">
                    <ul>
                        <li>
                            <a
                                className="nav-link"
                                href="#/explorer"
                                title="Spending Explorer">
                                Spending Explorer
                            </a>
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="#/search"
                                title="Award Search">
                                Award Search
                            </a>
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="#/about"
                                title="About">
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                className="nav-link"
                                href="https://usaspending-help.zendesk.com/hc/en-us"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Help">
                                Help
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

MobileNav.propTypes = propTypes;
