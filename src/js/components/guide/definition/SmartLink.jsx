/**
 * SmartLink.jsx
 * Created by Kevin Li 5/17/17
 */

import React from 'react';
import Router from 'containers/router/Router';

const propTypes = {
    href: React.PropTypes.string,
    children: React.PropTypes.node
};

export default class SmartLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            href: '',
            isLocal: false
        };
    }

    componentWillMount() {
        this.transformLink(this.props.href);
    }

    componentWillUpdate(nextProps) {
        if (nextProps !== this.props) {
            this.transformLink(nextProps.href);
        }
    }

    transformLink(url) {
        let href = url;
        let isLocal = false;

        // check if the link is a local guide reference
        if (url.indexOf('?guide=') > -1) {
            // it is a local guide reference, get the current URL
            const currentPath = Router.state.path;
            href = `#${currentPath}${url}`;
            isLocal = true;
        }
        else if (url.indexOf('#') === 0 || url.indexOf('/') === 0) {
            // link internal to the web site but not a guide reference
            // don't open these in a new window, but keep the URL as provided
            isLocal = true;
        }

        this.setState({
            href,
            isLocal
        });
    }

    render() {
        if (this.state.isLocal) {
            return (
                <a
                    href={this.state.href}>
                    {this.props.children}
                </a>
            );
        }

        // external links should open in a new window
        return (
            <a
                href={this.state.href}
                target="_blank"
                rel="noopener noreferrer">
                {this.props.children}
            </a>
        );
    }
}

SmartLink.propTypes = propTypes;
