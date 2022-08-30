/**
 * HomepageExploreToggle.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useState } from 'react';
import { FlexGridRow, FlexGridCol, Tabs } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExploreDataPlaceholder from "../ExploreDataPlaceholder/ExploreDataPlaceholder";
import AccessDataPlaceholder from "../AccessDataPlaceholder/AccessDataPlaceholder";

const toggleTabs = [
    {
        internal: 'explore',
        label: [(
            <div className="homepage-explore-toggle__text-container">
                <div className="homepage-explore-toggle__icon-container">
                    <FontAwesomeIcon icon="chart-pie" className="homepage-explore-toggle__icon" />
                </div>
                <div className="homepage-explore-toggle__text">EXPLORE THE DATA</div>
            </div>
        )]
    },
    {
        internal: 'access',
        label: [(
            <div className="homepage-explore-toggle__text-container">
                <div className="homepage-explore-toggle__icon-container">
                    <FontAwesomeIcon icon="file-download" className="homepage-explore-toggle__icon" />
                </div>
                <div className="homepage-explore-toggle__text">ACCESS THE DATA</div>
            </div>
        )]
    }
];

const HomepageExploreToggle = () => {
    const [activeTab, setActiveTab] = useState('explore');

    const changeActiveTab = () => {
        setActiveTab(activeTab === 'explore' ? 'access' : 'explore');
    };

    return (
        <section className="homepage-explore-toggle__section">
            <FlexGridRow className="grid-content">
                <div>
                    <Tabs active={activeTab} types={toggleTabs} switchTab={changeActiveTab} />
                </div>
            </FlexGridRow>
            {activeTab === 'explore' ?
                <ExploreDataPlaceholder />
                :
                <AccessDataPlaceholder />
            }
        </section>
    );
};

export default HomepageExploreToggle;
