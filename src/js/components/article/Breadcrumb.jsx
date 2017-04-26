/**
 * Breadcrumb.jsx
 * Created by Rickey An 4/26/17
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: React.PropTypes.string
};

export default class Breadcrumb extends React.Component {
    render() {
        return (
            <div className="breadcrumbs">
                    <ul>
                        <li>
                            <a href="#" role="button" title="Home" aria-label="Home">
                                Home
                            </a>
                        </li>
                        <div className="breadcrumb-arrow">
                            <Icons.AngleRight />
                        </div>
                        <li>
                            <a
                                href="#/about"
                                role="button"
                                title="About Us"
                                aria-label="About Us">
                                About Us
                            </a>
                        </li>
                        <svg
                            className="usa-da-icon-angle-right"
                            viewBox="0 0 512 512"
                            aria-label="Arrow Pointing Right Icon"
                            height="12">
                            <title>
                                Arrow Pointing Right Icon
                            </title>
                            <g>
                                <path d="M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506" />
                            </g>
                        </svg>
                        <li>
                            {this.props.title}
                        </li>
                    </ul>
                </div>
        );
    }
}

Breadcrumb.propTypes = propTypes;
