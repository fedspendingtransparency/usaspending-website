/**
 * FeatureDropdown.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

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
    }

    toggleDropdown() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const items = this.props.items.map((item) => {
            if (item.enabled) {
                return (
                    <li
                        key={item.url}>
                        <a
                            href={item.url}
                            className="feature-dropdown-item">
                            {item.label}
                        </a>
                    </li>
                );
            }
            return (
                <li
                    key={item.url}
                    className="item-coming-soon">
                    {item.label}
                    <div className="dropdown-coming-soon">
                        Coming soon
                    </div>
                </li>
            );
        });


        let hideList = 'hide';
        if (this.state.expanded) {
            hideList = '';
        }

        return (
            <div className="feature-dropdown">
                <button
                    className="feature-dropdown-button"
                    onClick={this.toggleDropdown}>
                    {this.props.children}
                    <AngleDown alt="Arrow indicating a dropdown is available" />
                </button>
                <ul
                    className={`feature-dropdown-list ${hideList}`}>
                    {items}
                </ul>
            </div>
        );
    }
}

FeatureDropdown.propTypes = propTypes;
