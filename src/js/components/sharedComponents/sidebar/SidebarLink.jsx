/**
 * SidebarLink.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const propTypes = {
    section: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    onClick: PropTypes.func,
    location: PropTypes.object,
    overLine: PropTypes.string
};

export class SidebarLink extends React.Component {
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
        const currentRoute = this.props.location.pathname;
        // append the section as a query param
        const url = `${currentRoute}?section=${this.props.section}`;

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
            <Link
                className={`sidebar-link ${active}`}
                to={this.state.url}
                onClick={this.clickedLink}>
                {this.props.overLine ? (
                    <div className="sidebar-link__overline">{this.props.overLine}</div>
                ) : ''}
                {this.props.label}
            </Link>
        );
    }
}

SidebarLink.propTypes = propTypes;
export default withRouter(SidebarLink);
