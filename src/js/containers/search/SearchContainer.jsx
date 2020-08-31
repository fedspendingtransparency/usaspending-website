/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { useParams } from 'react-router-dom';

import { filterStoreVersion, requiredTypes, initialState } from 'redux/reducers/search/searchFiltersReducer';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import { setAppliedFilterEmptiness, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import * as DownloadHelper from 'helpers/downloadHelper';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

import SearchPage from 'components/search/SearchPage';

import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

require('pages/search/searchPage.scss');

const propTypes = {
    history: PropTypes.object
};

/**
 * Takes Filter Object from API and transforms it to Immutable Data Structures
 * @param {Object} data object to be transformed
 * @returns {Object} Object where every property is an immutable data structure
 */
export const parseRemoteFilters = (data) => {
    const newFilters = data.filters;
    const version = data.version;

    if (version !== filterStoreVersion) {
        // versions don't match, don't populate the filters
        // TODO: Kevin Li - figure out how we want to deal with Redux structure changes when
        // a URL hash contains data that no longer applies to the current site
        console.log("version mismatch");
        return null;
    }

    // convert values to Immutable object types as necessary
    const reduxValues = {};
    Object.keys(newFilters).forEach((key) => {
        const value = newFilters[key];
        if (requiredTypes[key]) {
            // Redux expects an Immutable-typed object
            const ObjType = requiredTypes[key];
            reduxValues[key] = new ObjType(value);
        }
        else {
            reduxValues[key] = value;
        }
    });

    // send the selected filters to Google Analytics
    const events = convertFiltersToAnalyticEvents(reduxValues);
    sendFieldCombinations(events);
    sendAnalyticEvents(events);
    return reduxValues;
};

const SearchContainer = ({ history }) => {
    const { urlHash } = useParams();
    const dispatch = useDispatch();
    const { filters, download, appliedFilters } = useSelector((state) => state);
    const [downloadAvailable, setDownloadAvailable] = useState(false);
    const [downloadInFlight, setDownloadInFlight] = useState(false);
    const [inFlight, setInFlight] = useState(false);

    const generateHash = useCallback(() => {
        setInFlight(true);
        // POST an API request to retrieve the Redux state
        SearchHelper.generateUrlHash({
            filters: appliedFilters.filters,
            version: filterStoreVersion
        }).promise
            .then((res) => {
                // update the URL with the received hash
                const newHash = res.data.hash;
                dispatch(setAppliedFilterEmptiness(false));
                history.replace(`/search/${newHash}`);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }, [dispatch, history, appliedFilters.filters]);

    const setDownloadAvailability = useCallback(() => {
        if (SearchHelper.areFiltersEqual(filters, appliedFilters.filters)) {
            // don't make an API call when it's a blank state
            setDownloadAvailable(false);
            setDownloadInFlight(false);
            return;
        }

        setDownloadInFlight(true);

        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            filters: searchParams,
            auditTrail: 'Download Availability Count'
        };

        DownloadHelper.requestDownloadCount(apiParams).promise
            .then((res) => {
                setDownloadAvailable(!res.data.transaction_rows_gt_limit);
                setDownloadInFlight(false);
            })
            .catch(() => {
                setDownloadInFlight(false);
            });
    }, [filters, appliedFilters.filters]);

    useEffect(() => {
        const areAppliedFiltersEmpty = SearchHelper.areFiltersEqual(appliedFilters.filters, initialState);
        if (areAppliedFiltersEmpty) {
            // all the filters were cleared, reset to a blank hash
            dispatch(setAppliedFilterEmptiness(true));
            dispatch(setAppliedFilterCompletion(true));
            history.replace('/search');
            return;
        }
        else if (!inFlight) {
            // generate hash for filter selections
            generateHash();
        }
        setDownloadAvailability();
    }, [dispatch, history, generateHash, setDownloadAvailability, appliedFilters.filters, inFlight]);

    useEffect(() => {
        if (!urlHash) {
            setInFlight(false);
            return;
        }

        if (SearchHelper.areFiltersEqual(filters, appliedFilters.filters)) return;
        // url has a hash apply filters retrieve filter selections via hash if necessary.
        SearchHelper.restoreUrlHash({
            hash: urlHash
        }).promise
            .then((res) => {
                dispatch(setAppliedFilterEmptiness(false));
                const filtersInImmutableStructure = parseRemoteFilters(res.data.filter);
                if (filtersInImmutableStructure) {
                    // apply the filters to both the staged and applied stores
                    dispatch(restoreHashedFilters(filtersInImmutableStructure));
                }
                setInFlight(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // eslint-disable-next-line no-console
                    console.error('Error fetching filters from hash: ', err);
                    setInFlight(false);
                    // remove hash since corresponding filter selections aren't retrievable.
                    dispatch(setAppliedFilterEmptiness(true));
                    dispatch(setAppliedFilterCompletion(true));
                    history.push('/search');
                }
            });
    }, [dispatch, history, urlHash, appliedFilters.filters]);

    return (
        <SearchPage
            hash={urlHash}
            filters={filters}
            noFiltersApplied={appliedFilters._empty}
            downloadAvailable={downloadAvailable}
            downloadInFlight={downloadInFlight}
            download={download}
            requestsComplete={appliedFilters._complete} />
    );
};

SearchContainer.propTypes = propTypes;
export default SearchContainer;
