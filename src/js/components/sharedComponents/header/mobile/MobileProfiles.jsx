/**
 * MobileProfiles.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleUp, AngleDown } from 'components/sharedComponents/icons/Icons';

import ProfileComingSoon from '../ProfileComingSoon';

const propTypes = {
    hideMobileNav: PropTypes.func
};

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
                        <li className="coming-soon">
                            <a
                                href="#/agency"
                                className="profile-item"
                                onClick={this.props.hideMobileNav}>
                                Agencies
                            </a>
                            <div className="coming-soon-wrapper">
                                <ProfileComingSoon />
                            </div>
                        </li>
                        <li className="coming-soon">
                            <a
                                href="#/recipient"
                                className="profile-item"
                                onClick={this.props.hideMobileNav}>
                                Recipients
                            </a>
                            <div className="coming-soon-wrapper">
                                <ProfileComingSoon />
                            </div>
                        </li>
                        <li className="coming-soon">
                            <a
                                href="#/federal_account"
                                className="profile-item"
                                onClick={this.props.hideMobileNav}>
                                Federal Accounts
                            </a>
                            <div className="coming-soon-wrapper">
                                <ProfileComingSoon />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

MobileProfiles.propTypes = propTypes;
