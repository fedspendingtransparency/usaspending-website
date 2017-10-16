/**
 * MobileProfiles.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleUp, AngleDown } from 'components/sharedComponents/icons/Icons';

import MobileProfileItem from './MobileProfileItem';

const propTypes = {
    hideMobileNav: PropTypes.func,
    active: PropTypes.string
};

const profiles = [
    {
        url: '#/agency',
        code: 'agency',
        title: 'Agencies',
        comingSoon: false
    },
    {
        url: '#/recipient',
        code: 'recipient',
        title: 'Recipients',
        comingSoon: true
    },
    {
        url: '#/federal_account',
        code: 'federal_account',
        title: 'Federal Accounts',
        comingSoon: true
    }
];

export default class MobileProfiles extends React.Component {
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


        const items = profiles.map((profile) => (
            <MobileProfileItem
                key={profile.code}
                comingSoon={profile.comingSoon}
                title={profile.title}
                url={profile.url}
                active={profile.code === this.props.active}
                hideMobileNav={this.props.hideMobileNav} />
        ));

        return (
            <div className="profiles">
                <button
                    className="nav-button"
                    title="Profiles"
                    onClick={this.toggleProfile}>
                    <span className="label">
                        Profiles
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

MobileProfiles.propTypes = propTypes;
