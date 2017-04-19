/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Q from 'q';

import * as HomepageHelper from 'helpers/homepageHelper';

import MapVisualizationContainer from 'containers/homepage/MapVisualizationContainer';
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
            breakdownTotal: ''
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
                    breakdownDescriptions: res.data.budgetDescriptions,
                    breakdownColors: res.data.breakdownColors,
                    total: res.data.totalSpent,
                    breakdownTotal: res.data.budgetTotal
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
                    descriptions={this.state.breakdownDescriptions}
                    total={this.state.breakdownTotal}
                    colors={this.state.breakdownColors} />
                <MapTopBar />
                <MapVisualizationContainer />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
