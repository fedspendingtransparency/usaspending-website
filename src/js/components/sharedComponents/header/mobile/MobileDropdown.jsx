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
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default class MobileDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedProfile: false
        };

        this.toggleProfile = this.toggleProfile.bind(this);
        this.closeProfile = this.closeProfile.bind(this);
    }

    toggleProfile() {
        this.setState({
            expandedProfile: !this.state.expandedProfile
        });
    }

    closeProfile() {
        this.setState({
            expandedProfile: false
        });
    }

    render() {
        let icon = <AngleDown alt="Expand profile list" />;
        if (this.state.expandedProfile) {
            icon = <AngleUp alt="Collapse profile list" />;
        }

        let hideList = '';
        if (!this.state.expandedProfile) {
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
            <div className="profiles">
                <button
                    className="nav-button"
                    title="Profiles"
                    onClick={this.toggleProfile}>
                    <span className="label">
                        {this.props.label}
                    </span>
                    <span className="icon">
                        {icon}
                    </span>
                </button>

                <div className={`profile-list ${hideList}`}>
                    <ul className="profile-items">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

MobileDropdown.propTypes = propTypes;
