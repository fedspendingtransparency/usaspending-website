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
    term: React.PropTypes.string,
    data_act_term: React.PropTypes.string,
    resources: React.PropTypes.string
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
        if (this.props.resources && this.props.resources !== '') {
            resources = (<MoreResources
                resources={this.props.resources}
                transformLink={this.transformLink} />);
        }

        let term = this.props.term;
        if (this.props.type === 'official' && this.props.data_act_term !== '') {
            term = this.props.data_act_term;
        }

        return (
            <div className="definition-wrapper">
                <h2 className="term">
                    {term}
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
