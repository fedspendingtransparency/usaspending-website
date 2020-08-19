/**
 * SmartLink.jsx
 * Created by Kevin Li 5/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object
};

export class SmartLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            href: '',
            isLocal: false
        };
    }

    componentDidMount() {
        this.transformLink(this.props.href);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.transformLink(this.props.href);
        }
    }

    transformLink(url) {
        let href = url;
        let isLocal = false;

        // check if the link is a local glossary reference
        if (url.indexOf('?glossary=') > -1) {
            // it is a local glossary reference, get the current URL
            const currentPath = this.props.location.pathname;
            href = `${currentPath}${url}`;
            isLocal = true;
        }
        else if (url.indexOf('/') === 0) {
            // link internal to the web site but not a glossary reference
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
                <Link
                    to={this.state.href}>
                    {this.props.children}
                </Link>
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
export default withRouter(SmartLink);
