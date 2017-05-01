/**
 * MoreResources.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import { hashHistory } from 'react-router';

const propTypes = {
    items: React.PropTypes.array
};

export default class MoreResources extends React.Component {
    transformLink(url) {
        // check if the link is a local guide reference
        if (url.indexOf('?guide=') !== 0) {
            // it is not
            return url;
        }

        // it is a local guide reference, get the current URL
        const currentPath = hashHistory.getCurrentLocation().pathname;

        const localUrl = `#${currentPath}${url}`;
        return localUrl;
    }

    render() {
        const resources = this.props.items.map((item, index) => (
            <li key={index}>
                <a href={this.transformLink(item.url)}>
                    {item.label}
                </a>
            </li>
        ));

        return (
            <div className="guide-resources">
                <h3 className="title">
                    More Resources
                </h3>
                <hr />
                <ul>
                    {resources}
                </ul>
            </div>
        );
    }
}

MoreResources.propTypes = propTypes;
