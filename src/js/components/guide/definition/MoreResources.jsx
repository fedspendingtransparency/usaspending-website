/**
 * MoreResources.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { hashHistory } from 'react-router';

const propTypes = {
    resources: React.PropTypes.string
};

export default class MoreResources extends React.Component {
    constructor(props) {
        super(props);

        this.transformLink = this.transformLink.bind(this);
    }

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
        return (
            <div className="guide-resources">
                <h3 className="title">
                    More Resources
                </h3>
                <hr />
                <ReactMarkdown
                    source={this.props.resources}
                    transformLinkUri={this.transformLink} />
            </div>
        );
    }
}

MoreResources.propTypes = propTypes;
