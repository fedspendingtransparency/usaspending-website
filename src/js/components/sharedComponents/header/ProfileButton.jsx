/**
 * ProfileButton.jsx
 * Created by Kevin Li 7/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

import { availableProfiles } from 'dataMapping/profiles/availableProfiles';

import ProfileItem from './ProfileItem';

const propTypes = {
    homepage: PropTypes.bool
};

export default class ProfileButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.clickedButton = this.clickedButton.bind(this);
        this.expandMenu = this.expandMenu.bind(this);
        this.collapseMenu = this.collapseMenu.bind(this);
    }

    clickedButton() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    expandMenu() {
        this.setState({
            expanded: true
        });
    }

    collapseMenu() {
        this.setState({
            expanded: false
        });
    }

    render() {
        let active = '';
        if (this.state.expanded) {
            active = 'active';
        }

        let homepage = '';
        if (this.props.homepage) {
            homepage = 'homepage';
        }

        const items = availableProfiles.map((profile) => (
            <ProfileItem
                {...profile}
                key={profile.code} />
        ));

        return (
            <div
                onMouseEnter={this.expandMenu}
                onMouseLeave={this.collapseMenu}>
                <button
                    className={`usa-nav-profile-button ${homepage} ${active}`}
                    title="Profiles: Learn more about organizations and accounts"
                    onClick={this.clickedButton}>
                    <div className="profile-button-content">
                        <div className="profile-button-label">
                            Profiles
                        </div>
                        <div className="profile-button-icon">
                            <AngleDown alt="Profile menu" />
                        </div>
                    </div>
                </button>
                <div className={`usa-nav-profile-list ${active} ${homepage}`}>
                    <div className="profile-list-wrapper">
                        <ul className="profile-list">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileButton.propTypes = propTypes;
