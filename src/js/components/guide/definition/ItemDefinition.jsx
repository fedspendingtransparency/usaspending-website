/**
 * ItemDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { hashHistory } from 'react-router';

import MoreResources from './MoreResources';

const propTypes = {
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    resources: React.PropTypes.array
};

export default class ItemDefinition extends React.Component {
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
        let resources = null;
        if (this.props.resources.length > 0) {
            resources = <MoreResources items={this.props.resources} />;
        }

        return (
            <div className="definition-wrapper">
                <h2 className="term">
                    {this.props.value}
                </h2>

                <div className="definition-content">
                    <ReactMarkdown
                        source={this.props[this.props.type]}
                        transformLinkUri={this.transformLink} />
                </div>

                {resources}
            </div>
        );
    }
}

ItemDefinition.propTypes = propTypes;
