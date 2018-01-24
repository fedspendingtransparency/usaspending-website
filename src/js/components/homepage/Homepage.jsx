/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Cookies from 'js-cookie';
import { isCancel } from 'axios';

import * as HomepageHelper from 'helpers/homepageHelper';
import * as MetaTagHelper from 'helpers/metaTagHelper';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';

import HomepageStateModel from 'models/homepage/HomepageStateModel';
import MetaTags from '../sharedComponents/metaTags/MetaTags';

import MapVisualizationWrapper from './visualizations/geo/MapVisualizationWrapper';
import Landing from './Landing';
import TreeMap from './visualizations/treemap/TreeMap';
import TreeMapIntro from './TreeMapIntro';
import MapTopBar from './MapTopBar';
import CategoryMap from './visualizations/categoryMap/CategoryMap';
import SearchSection from './SearchSection';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

require('pages/homepage/homePage.scss');

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {
                children: []
            },
            breakdown: {
                children: []
            },
            colors: [],
            total: '',
            mapData: {
                total: {
                    states: [],
                    values: [],
                    total: 0
                },
                capita: {
                    states: [],
                    values: [],
                    ranks: [],
                    populations: []
                },
                table: []
            },
            showBanner: false
        };

        this.dataRequests = [];
        this.mounted = false;

        this.skippedNav = this.skippedNav.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
    }

    componentWillMount() {
        this.mounted = true;
        this.loadHomepageData();
        // check if the info banner cookie exists
        if (!Cookies.get('usaspending_info_banner')) {
            // cookie does not exist, show the banner
            this.setState({
                showBanner: true
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    closeBanner() {
        // set a cookie to hide the banner in the future
        Cookies.set('usaspending_info_banner', 'hide', { expires: 730 });
        this.setState({
            showBanner: false
        });
    }

    loadHomepageData() {
        if (this.dataRequests.length > 0) {
            // there are in-flight requests, cancel them
            this.dataRequests.forEach((request) => {
                request.cancel();
            });
        }

        this.dataRequests = [];
        const requestPromises = [];

        const files = ['homepage.json', 'homepage_map.json'];

        files.forEach((file) => {
            const filePath = `graphics/${file}`;
            const request = HomepageHelper.fetchFile(filePath);
            this.dataRequests.push(request);
            requestPromises.push(request.promise);
        });

        // get the homepage info and the map data
        Promise.all(requestPromises)
            .then((responses) => {
                this.parseHomepageData(responses[0]);
                this.parseMapData(responses[1]);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseHomepageData(res) {
        this.setState({
            categories: res.data.budgetCategories,
            descriptions: res.data.categoryDescriptions,
            colors: res.data.treemapColors,
            breakdown: res.data.budgetBreakdown,
            breakdownColors: res.data.breakdownColors,
            tooltipStyles: res.data.tooltipStyles,
            total: res.data.totalSpent,
            totalNumber: res.data.totalSpentNumber,
            states: res.data.states,
            alternateColors: res.data.alternateColors,
            subfunctions: res.data.subfunctions
        });
    }

    parseMapData(res) {
        const total = {
            states: [],
            values: [],
            total: 0
        };

        const capita = {
            states: [],
            values: [],
            ranks: [],
            populations: []
        };

        const table = [];

        res.data.states.children.forEach((state) => {
            total.states.push(state.StateAbbrev);
            total.values.push(state.TotalAmount);
            total.total += state.TotalAmount;

            capita.states.push(state.StateAbbrev);
            capita.values.push(state.PerCapitaAmount);
            capita.ranks.push(state.PerCapitaRank);
            capita.populations.push(state.TotalStatePopulation);

            const instance = new HomepageStateModel(state);
            table.push(instance);
        });

        this.setState({
            mapData: {
                total,
                capita,
                table
            }
        });
    }

    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const mainContent = document.getElementById('main-content');
        const mainFocus = document.getElementById('main-focus');
        const yPos = mainContent.getBoundingClientRect().top;
        window.scrollTo(0, yPos);
        // focus on the element
        if (mainFocus) {
            mainFocus.focus();
        }
    }

    render() {
        return (
            <div className="usa-da-home-page">
                <div className="site-header">
                    <a
                        href="#main-content"
                        className="skip-nav"
                        onClick={this.skippedNav}>
                            Skip to main content
                    </a>
                </div>
                <MetaTags {...MetaTagHelper.homePageMetaTags} />
                <Header />
                <GlossaryContainer />
                <Landing
                    total={this.state.total} />
                <main>
                    <TreeMapIntro />
                    <TreeMap
                        categories={this.state.categories}
                        colors={this.state.colors}
                        descriptions={this.state.descriptions}
                        subfunctions={this.state.subfunctions}
                        alternateColors={this.state.alternateColors}
                        total={this.state.total}
                        totalNumber={this.state.totalNumber}
                        tooltipStyles={this.state.tooltipStyles} />
                    <CategoryMap
                        breakdown={this.state.breakdown}
                        colors={this.state.breakdownColors}
                        tooltipStyles={this.state.tooltipStyles} />
                    <MapTopBar />
                    <MapVisualizationWrapper
                        data={this.state.mapData} />
                    <SearchSection />
                </main>
                <Footer />
            </div>
        );
    }
}
