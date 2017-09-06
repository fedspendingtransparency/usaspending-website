/**
 * SearchSection.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';
import Router from 'containers/router/Router';
import { BuildingMag, Explorer, AwardSearch } from
    'components/sharedComponents/icons/home/HomeIcons';
import { AngleDown } from 'components/sharedComponents/icons/Icons';

export default class SearchSection extends React.Component {
    constructor(props) {
        super(props);

    }

    navigateTo(url) {
        Router.history.push(url);
    }

    render() {
        return (
            <div className="search-section-links-outer-wrap">
                <div className="search-section-links-wrap">
                    <h1 className="search-section-links-primary-text">
                        There&apos;s more to explore.
                    </h1>
                    <h2 className="search-section-links-sub-text">
                       Discover all the ways to explore U.S. government spending.
                    </h2>
                    <div className="search-section-ways">
                        <div className="way-item">
                            <div className="icon">
                                <BuildingMag
                                    alt="Profiles" />
                            </div>
                            <div className="title">
                                <h3>Profiles</h3>
                                <div className="description">
                                    Learn more about organizations and accounts
                                </div>
                            </div>
                            <div className="action">
                                <button
                                    className="action-button">
                                    Select an Option
                                </button>
                            </div>
                        </div>
                        <div className="way-item">
                            <div className="icon">
                                <Explorer
                                    alt="Explorer" />
                            </div>
                            <div className="title">
                                <h3>Explorer</h3>
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
                        <div className="way-item">
                            <div className="icon">
                                <AwardSearch
                                    alt="Award Search" />
                            </div>
                            <div className="title">
                                <h3>Award Search</h3>
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
                    </div>
                </div>
            </div>
        );
    }
}
