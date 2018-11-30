/**
 * SidebarLink.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Router from 'containers/router/Router';

const propTypes = {
    section: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    onClick: PropTypes.func
};

export default class SidebarLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.clickedLink = this.clickedLink.bind(this);
    }

    componentDidMount() {
        this.prepareLink();
    }

    prepareLink() {
        // the URL base should be the current route
        const currentRoute = Router.state.path;
        // append the section as a query param
        const url = `#${currentRoute}?section=${this.props.section}`;

        this.setState({
            url
        });
    }

    clickedLink(e) {
        e.preventDefault();
        this.props.onClick(this.props.section);
    }

    render() {
        let active = '';
        if (this.props.active === this.props.section) {
            active = 'active';
        }

        return (
            <a
                className={`sidebar-link ${active}`}
                href={this.state.url}
                onClick={this.clickedLink}>
                {this.props.label}
            </a>
        );
    }
}

SidebarLink.propTypes = propTypes;
