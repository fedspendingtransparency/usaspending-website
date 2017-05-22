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
                    <li className="breadcrumb-arrow">
                        <Icons.AngleRight />
                    </li>
                    <li>
                        <a
                            href="#/about"
                            role="button"
                            title="About Us"
                            aria-label="About Us">
                            About Us
                        </a>
                    </li>
                    <li className="breadcrumb-arrow">
                        <Icons.AngleRight />
                    </li>
                    <li>
                        {this.props.title}
                    </li>
                </ul>
            </div>
        );
    }
}

Breadcrumb.propTypes = propTypes;
