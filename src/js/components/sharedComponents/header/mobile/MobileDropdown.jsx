/**
 * MobileDropdown.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleUp, AngleDown } from 'components/sharedComponents/icons/Icons';


import MobileDropdownItem from './MobileDropdownItem';

const propTypes = {
    hideMobileNav: PropTypes.func,
    active: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default class MobileDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({
            expandedDropdown: !this.state.expandedDropdown
        });
    }

    closeDropdown() {
        this.setState({
            expandedDropdown: false
        });
    }

    render() {
        let icon = <AngleDown alt="Expand dropdown list" />;
        if (this.state.expandedDropdown) {
            icon = <AngleUp alt="Collapse dropdown list" />;
        }

        let hideList = '';
        if (!this.state.expandedDropdown) {
            hideList = 'hide';
        }


        const items = this.props.items.map((item) => (
            <MobileDropdownItem
                key={item.url}
                comingSoon={!item.enabled}
                title={item.label}
                url={item.url}
                active={item.url === this.props.active}
                hideMobileNav={this.props.hideMobileNav} />
        ));

        return (
            <div className="dropdown">
                <button
                    className="nav-button"
                    title={this.props.title || this.props.label}
                    onClick={this.toggleDropdown}>
                    <span className="label">
                        {this.props.label}
                    </span>
                    <span className="icon">
                        {icon}
                    </span>
                </button>

                <div className={`dropdown-list ${hideList}`}>
                    <ul className="dropdown-items">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

MobileDropdown.propTypes = propTypes;
