/**
 * StateLandingContainer.jsx
 * Created by Kevin Li 5/23/18
 */

import React, { useState, useRef, useEffect } from 'react';
import { isCancel } from 'axios';
import { Search } from 'js-search';
import { orderBy } from 'lodash-es';

import { fetchStateList } from 'apis/state';
import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';
import StateLandingContent from 'components/stateLanding/StateLandingContent';

const StateLandingContainer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(0);
    const [searchString, setSearchString] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [fullData, setFullData] = useState([]);
    const [results, setResults] = useState([]);

    const request = useRef(null);

    const setSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };

    const loadData = () => {
        if (request.current) {
            // a request is in-flight, cancel it
            request.current.cancel();
        }

        setLoading(true);
        setError(false);

        request.current = fetchStateList();
        request.current.promise
            .then((res) => {
                parseData(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setLoading(false);
                    setError(true);
                    console.error(err);
                }
            });
    };

    const parseData = (data) => {
        let totalLocal = 0;
        const parsed = data.map((state) => {
            const item = Object.create(BaseStateLandingItem);
            item.populate(state);
            totalLocal += state.amount;
            return item;
        });

        setTotal(totalLocal);
        setLoading(false);
        setError(false);
        setFullData(parsed);
    };

    const performSearch = () => {
        // perform a local search
        const search = new Search('fips');
        search.addIndex('name');
        search.addIndex('code');
        search.addDocuments(fullData);

        // return the full data set if no search string is provided
        let results = fullData;
        if (searchString) {
            results = search.search(searchString);
        }

        // now sort the results by the appropriate table column and direction
        const sortedResults = orderBy(results, [sortField], [sortDirection]);

        let orderedResults = sortedResults;

        if (sortField === 'name') {
            // Separate states and territories
            const states = sortedResults.filter((result) => result.type === 'state' || result.type === 'district');
            const territories = sortedResults.filter((result) => result.type === 'territory');
            orderedResults = states.concat(territories);
            if (sortDirection === 'desc') {
                orderedResults = territories.concat(states);
            }
        }

        setResults(orderedResults);
    };

    const resultsCount = results.length;

    let resultsText = `${resultsCount} results`;

    if (resultsCount === 1) {
        resultsText = `${resultsCount} result`;
    }

    useEffect(() => {
        performSearch();
    }, [searchString, fullData, sortField, sortDirection]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <StateLandingContent
            setSearchString={setSearchString}
            resultsText={resultsText}
            setSort={setSort}
            loading={loading}
            error={error}
            total={total}
            results={results}
            sortField={sortField}
            sortDirection={sortDirection}
            searchString={searchString} />
    );
};

export default StateLandingContainer;
