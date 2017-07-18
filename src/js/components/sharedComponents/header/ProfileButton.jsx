/**
 * ProfileButton.jsx
 * Created by Kevin Li 7/12/17
 */

import React from 'react';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

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

        return (
            <div
                onMouseEnter={this.expandMenu}
                onMouseLeave={this.collapseMenu}>
                <button
                    className={`usa-nav-profile-button ${active}`}
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
                <div className={`usa-nav-profile-list ${active}`}>
                    <div className="profile-list-wrapper">
                        <ul className="profile-list">
                            <li>
                                <a
                                    className="disabled"
                                    href="#/agency">
                                    Agencies
                                </a>
                            </li>
                            <li>
                                <a
                                    className="disabled"
                                    href="#/recipient">
                                    Recipients
                                </a>
                            </li>
                            <li>
                                <a
                                    className="disabled"
                                    href="#/federal_account">
                                    Federal Accounts
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

