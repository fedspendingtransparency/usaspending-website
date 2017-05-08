/**
 * MoreResources.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';

const propTypes = {
    resources: React.PropTypes.string,
    transformLink: React.PropTypes.func
};

export default class MoreResources extends React.Component {
    render() {
        return (
            <div className="guide-resources">
                <h3 className="title">
                    More Resources
                </h3>
                <hr />
                <ReactMarkdown
                    source={this.props.resources}
                    transformLinkUri={this.props.transformLink} />
            </div>
        );
    }
}

MoreResources.propTypes = propTypes;
