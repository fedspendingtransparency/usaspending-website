/**
 * SearchSection.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';
import Router from 'containers/router/Router';
import { BuildingMag, Explorer, AwardSearch } from
    'components/sharedComponents/icons/home/HomeIcons';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

import { availableProfiles } from 'dataMapping/profiles/availableProfiles';

import HomepageProfileItem from './HomepageProfileItem';

export default class SearchSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(url) {
        Router.history.push(url);
    }

    toggleDropdown() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    mouseEnter() {
        this.setState({
            expanded: true
        });
    }

    mouseExit() {
        this.setState({
            expanded: false
        });
    }

    render() {
        let showDropdown = 'hide';
        if (this.state.expanded) {
            showDropdown = '';
        }

        const items = availableProfiles.map((profile) => (
            <HomepageProfileItem
                {...profile}
                key={profile.code}
                navigateTo={this.navigateTo} />
        ));

        return (
            <div
                className="search-section-links-outer-wrap">
                <div className="search-section-links-wrap">
                    <h3 className="search-section-links-primary-text">
                        There&apos;s more to explore.
                    </h3>
                    <h4 className="search-section-links-sub-text">
                       Discover all the ways to explore U.S. government spending.
                    </h4>
                    <div
                        className="search-section-ways"
                        role="list">
                        <div
                            className="way-item"
                            role="listitem">
                            <div className="icon">
                                <Explorer
                                    alt="Explorer" />
                            </div>
                            <div className="title">
                                <h5>Spending Explorer</h5>
                                <div className="description">
                                    Navigate the levels of government spending from top to bottom
                                </div>
                            </div>
                            <div className="action">
                                <button
                                    className="action-button"
                                    onClick={this.navigateTo.bind(null, "/explorer")}>
                                    Start Exploring
                                </button>
                            </div>
                        </div>
                        <div
                            className="way-item"
                            role="listitem">
                            <div className="icon">
                                <AwardSearch
                                    alt="Award Search" />
                            </div>
                            <div className="title">
                                <h5>Award Search</h5>
                                <div className="description">
                                    Search through awards and discover trends and connections
                                </div>
                            </div>
                            <div className="action">
                                <button
                                    className="action-button"
                                    onClick={this.navigateTo.bind(null, "/search")}>
                                    Start Search
                                </button>
                            </div>
                        </div>
                        <div
                            className="way-item"
                            role="listitem">
                            <div className="icon">
                                <BuildingMag
                                    alt="Profiles" />
                            </div>
                            <div className="title">
                                <h5>Profiles</h5>
                                <div className="description">
                                    Learn more about organizations and accounts
                                </div>
                            </div>
                            <div
                                className="action dropdown-wrap"
                                onMouseEnter={this.mouseEnter}
                                onMouseLeave={this.mouseExit}>
                                <button
                                    className="action-button"
                                    label="Select an Option"
                                    onClick={this.toggleDropdown}
                                    aria-expanded={this.state.expanded}>
                                    <div className="dropdown-content">
                                        <div className="label">
                                            Select an Option
                                        </div>
                                        <div className="dropdown-icon">
                                            <AngleDown alt="Select an Option" />
                                        </div>
                                    </div>
                                </button>

                                <ul className={`dropdown ${showDropdown}`}>
                                    {items}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
