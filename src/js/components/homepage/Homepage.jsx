/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Q from 'q';

import * as HomepageHelper from 'helpers/homepageHelper';

import MapVisualizationContainer from 'containers/homepage/MapVisualizationContainer';
import Landing from './Landing';
import TreeMap from './visualizations/TreeMap';
import TreeMapIntro from './TreeMapIntro';
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
            breakdown: [],
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
                    breakdown: res.data.budgetBreakdown,
                    colors: res.data.treemapColors,
                    total: res.data.totalSpent
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
                    total={this.state.total}
                    categories={this.state.categories}
                    colors={this.state.colors}
                    descriptions={this.state.descriptions} />
                <MapVisualizationContainer />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
