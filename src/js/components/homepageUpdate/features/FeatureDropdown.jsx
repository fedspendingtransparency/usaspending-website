/**
 * FeatureDropdown.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AngleDown } from 'components/sharedComponents/icons/Icons';
import Analytics from 'helpers/analytics/Analytics';

const clickedHomepageLink = (route) => {
    Analytics.event({
        event: 'homepage_link_click',
        category: 'Homepage - Link',
        action: route
    });
};

const propTypes = {
    children: PropTypes.node,
    items: PropTypes.array
};

export default class FeatureDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.expandDropdown = this.expandDropdown.bind(this);
        this.collapseDropdown = this.collapseDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    expandDropdown() {
        this.setState({
            expanded: true
        });
    }

    collapseDropdown() {
        this.setState({
            expanded: false
        });
    }

    render() {
        const items = this.props.items.map((item) => {
            if (item.enabled) {
                return (
                    <li
                        key={item.url}
                        tabIndex={-1}
                        className="feature-dropdown-item">
                        <Link
                            to={item.url}
                            className="feature-dropdown-item__link"
                            onClick={clickedHomepageLink.bind(null, item.url.replace('#', ''))}>
                            {item.label}
                        </Link>
                    </li>
                );
            }
            return (
                <li
                    key={item.url}
                    tabIndex={-1}
                    className="feature-dropdown-item feature-dropdown-item_coming-soon">
                    {item.label}
                    <div className="feature-dropdown-item__decorator">
                        Coming soon
                    </div>
                </li>
            );
        });


        let hideList = 'hide';
        let activeButton = '';
        if (this.state.expanded) {
            hideList = '';
            activeButton = 'feature-dropdown__button_active';
        }

        return (
            <div
                className="feature-dropdown"
                onMouseEnter={this.expandDropdown}
                onMouseLeave={this.collapseDropdown}>
                <div className="feature-dropdown__wrapper">
                    <button
                        className={`feature-dropdown__button ${activeButton}`}
                        aria-expanded={this.state.expanded}
                        onClick={this.toggleDropdown}>
                        {this.props.children}
                        <AngleDown alt="Arrow indicating a dropdown is available" />
                    </button>
                    <ul
                        className={`feature-dropdown__list ${hideList}`}
                        aria-hidden={!this.state.expanded}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

FeatureDropdown.propTypes = propTypes;
