/**
 * MobileDropdown.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import kGlobalConstants from 'GlobalConstants';
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
            hideList = 'mobile-dropdown__list_hide';
        }


        const items = this.props.items.map((item) => (
            <MobileDropdownItem
                key={item.url}
                comingSoon={!item.enabled}
                title={item.label}
                url={item.url}
                active={item.url === this.props.active}
                externalLink={item.externalLink}
                hideMobileNav={this.props.hideMobileNav} />
        ));

        return (
            <div className="mobile-dropdown">
                <button
                    className="mobile-dropdown__parent"
                    title={this.props.title || this.props.label}
                    onClick={this.toggleDropdown}>
                    <span className="mobile-dropdown__parent-label">
                        {
                            this.props.label === "Profiles" &&
                            kGlobalConstants.CARES_ACT_RELEASED &&
                            <div className="new-badge-outer">
                                <div className="new-badge-middle">
                                    <div className="new-badge-inner" />
                                </div>
                            </div>
                        }
                        {this.props.label}
                    </span>
                    <span className="mobile-dropdown__parent-icon">
                        {icon}
                    </span>
                </button>

                <ul className={`mobile-dropdown__list ${hideList}`}>
                    {items}
                </ul>
            </div>
        );
    }
}

MobileDropdown.propTypes = propTypes;
