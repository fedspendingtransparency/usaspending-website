/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Q from 'q';

import * as HomepageHelper from 'helpers/homepageHelper';

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
            total: ''
        };

        this.loadHomepageData = this.loadHomepageData.bind(this);
    }

    componentWillMount() {
        this.loadHomepageData();
    }

    loadHomepageData() {
        const deferred = Q.defer();

        // get the homepage info
        HomepageHelper.fetchFile('graphics/homepage.json').promise
            .then((res) => {
                // set to state
                this.setState({
                    categories: res.data.budgetCategories,
                    descriptions: res.data.categoryDescriptions,
                    colors: res.data.treemapColors,
                    breakdown: res.data.budgetBreakdown,
                    breakdownColors: res.data.breakdownColors,
                    tooltipStyles: res.data.tooltipStyles,
                    total: res.data.totalSpent,
                    states: res.data.states
                }, () => {
                    deferred.resolve();
                });
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
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
                    states={this.state.states} />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
