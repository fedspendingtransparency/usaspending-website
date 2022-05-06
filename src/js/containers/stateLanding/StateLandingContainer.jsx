/**
 * StateLandingContainer.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { isCancel } from 'axios';

import { Search } from 'js-search';
import { orderBy } from 'lodash';

import * as StateHelper from 'helpers/stateHelper';
import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';

import StateLandingContent from 'components/stateLanding/StateLandingContent';

export default class StateLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            total: 0,
            searchString: '',
            sortField: 'name',
            sortDirection: 'asc',
            fullData: [],
            results: []
        };

        this.request = null;
    }

    componentDidMount() {
        this.loadData();
    }

    setSearchString = (input) => {
        this.setState({
            searchString: input
        }, () => {
            this.performSearch();
        });
    };

    setSort = (field, direction) => {
        this.setState({
            sortField: field,
            sortDirection: direction
        }, () => {
            this.performSearch();
        });
    };

    loadData() {
        if (this.request) {
            // a request is in-flight, cancel it
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.request = StateHelper.fetchStateList();
        this.request.promise
            .then((res) => {
                this.parseData(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false,
                        error: true
                    });
                    console.error(err);
                }
            });
    }

    parseData(data) {
        let total = 0;
        const parsed = data.map((state) => {
            const item = Object.create(BaseStateLandingItem);
            item.populate(state);
            total += state.amount;
            return item;
        });

        this.setState({
            total,
            loading: false,
            error: false,
            fullData: parsed
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
    // perform a local search
        const search = new Search('fips');
        search.addIndex('name');
        search.addIndex('code');
        search.addDocuments(this.state.fullData);

        // return the full data set if no search string is provided
        let results = this.state.fullData;
        if (this.state.searchString) {
            results = search.search(this.state.searchString);
        }

        // now sort the results by the appropriate table column and direction
        const sortedResults = orderBy(results,
            [this.state.sortField], [this.state.sortDirection]);

        let orderedResults = sortedResults;

        if (this.state.sortField === 'name') {
            // Separate states and territories
            const states = sortedResults.filter((result) => result.type === 'state' || result.type === 'district');
            const territories = sortedResults.filter((result) => result.type === 'territory');
            orderedResults = states.concat(territories);
            if (this.state.sortDirection === 'desc') {
                orderedResults = territories.concat(states);
            }
        }

        this.setState({
            results: orderedResults
        });
    }

    render() {
        const resultsCount = this.state.results.length;
        let resultsText = `${resultsCount} results`;
        if (resultsCount === 1) {
            resultsText = `${resultsCount} result`;
        }

        return (
            <StateLandingContent
                setSearchString={this.setSearchString}
                setSort={this.setSort}
                resultsText={resultsText}
                {...this.state} />
        );
    }
}

