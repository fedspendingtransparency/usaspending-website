/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import { isCancel } from 'axios';

import * as HomepageHelper from 'helpers/homepageHelper';

import HomepageStateModel from 'models/homepage/HomepageStateModel';

import MapVisualizationWrapper from './visualizations/geo/MapVisualizationWrapper';
import Landing from './Landing';
import TreeMap from './visualizations/treemap/TreeMap';
import TreeMapIntro from './TreeMapIntro';
import MapTopBar from './MapTopBar';
import CategoryMap from './visualizations/categoryMap/CategoryMap';
import LinksSection from './LinksSection';
import SearchSection from './SearchSection';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

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
            }
        };

        this.dataRequests = [];
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
        this.loadHomepageData();
    }

    componentWillUnmount() {
        this.mounted = false;
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
            total: res.data.totalSpent
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

    render() {
        return (
            <div className="usa-da-home-page">
                <Header />
                <Landing
                    total={this.state.total} />
                <TreeMapIntro />
                <TreeMap
                    categories={this.state.categories}
                    colors={this.state.colors}
                    descriptions={this.state.descriptions} />
                <CategoryMap
                    breakdown={this.state.breakdown}
                    colors={this.state.breakdownColors}
                    tooltipStyles={this.state.tooltipStyles} />
                <MapTopBar />
                <MapVisualizationWrapper
                    data={this.state.mapData} />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
