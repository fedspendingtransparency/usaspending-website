/**
 * HomepageExploreToggle.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useState } from 'react';
import { FlexGridRow, Tabs } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExploreTheData from "../ExploreTheData/ExploreTheData";
import Analytics from '../../../helpers/analytics/Analytics';

const exploreDataTitle = 'Browse ready-made analyses with our Spending Profiles';
const exploreData = [
    {
        fillColor: '#168092', // $theme-color-2
        headline: 'Tools for understanding agency spending',
        text: 'Use our interactive tools to find out how federal agencies are spending money',
        buttonText: 'Explore Agency Profiles',
        buttonLink: '/agency',
        buttonSize: 'sm',
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'explore agency profiles card'
        })
    },
    {
        fillColor: '#009ec1', // $theme-color-accent-12
        headline: 'Insights into federal award recipients',
        text: 'See who is receiving contracts, grants, loans, and other types of awards',
        buttonText: 'View Recipient Profiles',
        buttonLink: '/recipient',
        buttonSize: 'sm',
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'view recipient profiles card'
        })
    },
    {
        fillColor: '#005ea2', // $theme-color-6
        headline: 'Overview of federal awards made to states',
        text: 'Find data on contracts, grants, and other types of awards made in each state',
        buttonText: 'Browse State Profiles',
        buttonLink: '/state',
        buttonSize: 'sm',
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'browse state profiles card'
        })
    }
];

const accessDataTitle = 'Create your own analyses using USAspending data';
const accessData = [
    {
        fillColor: '#783cb9', // $violet-60v
        headline: 'Download prime and sub-award data',
        text: 'Create a custom download with details on specific awards',
        buttonText: 'Go to award data download',
        buttonLink: '/download_center/custom_award_data',
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'custom award data download card'
        })
    },
    {
        fillColor: '#4a50c4', // $theme-color-accent-14
        headline: 'Download all federal spending data',
        text: 'Our account data includes award and non-award spending',
        buttonText: 'Go to account data download',
        buttonLink: '/download_center/custom_account_data',
        buttonSize: 'sm',
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'account data download'
        })
    },
    {
        fillColor: '#0050d8', // $theme-color-accent-15
        headline: 'Use our API for your products',
        text: 'Our API is open, allowing you to create your own data visualizations',
        buttonText: 'View API endpoints',
        buttonLink: 'https://api.usaspending.gov/docs/endpoints',
        govLink: true,
        action: () => Analytics.event({
            event: 'homepage_explore-the-data',
            category: 'Homepage',
            action: 'Link',
            label: 'view api endpoints'
        })
    }
];

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
                <div className="homepage-explore-toggle__icon-container access">
                    <FontAwesomeIcon icon="file-download" className="homepage-explore-toggle__icon access" />
                </div>
                <div className="homepage-explore-toggle__text">DOWNLOAD THE DATA</div>
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
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FlexGridRow className="grid-content">
                    <div>
                        <Tabs active={activeTab} types={toggleTabs} switchTab={changeActiveTab} />
                    </div>
                </FlexGridRow>
                {activeTab === 'explore' ?
                    <ExploreTheData title={exploreDataTitle} cardObjects={exploreData} />
                    :
                    <ExploreTheData title={accessDataTitle} cardObjects={accessData} access />
                }
            </div>
        </section>
    );
};

export default HomepageExploreToggle;
