/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { is } from 'immutable';
import { useParams } from 'react-router-dom';

import { filterStoreVersion, requiredTypes, initialState } from
    'redux/reducers/search/searchFiltersReducer';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import {
    setAppliedFilterEmptiness,
    setAppliedFilterCompletion
} from 'redux/actions/search/appliedFilterActions';
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

const SearchContainer = ({ history }) => {
    const { urlHash } = useParams();
    const dispatch = useDispatch();
    const { filters, download, appliedFilters } = useSelector((state) => state);
    const [downloadAvailable, setDownloadAvailable] = useState(false);
    const [downloadInFlight, setDownloadInFlight] = useState(false);
    const [inFlight, setInFlight] = useState(false);
    const [stateHash, setStateHash] = useState('');

    const applyFilters = (data) => {
        const newFilters = data.filters;
        const version = data.version;

        if (version !== filterStoreVersion) {
            // versions don't match, don't populate the filters
            // TODO: Kevin Li - figure out how we want to deal with Redux structure changes when
            // a URL hash contains data that no longer applies to the current site
            console.log("version mismatch");
            return;
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

        // apply the filters to both the staged and applied stores
        dispatch(restoreHashedFilters(reduxValues));

        // send the prepopulated filters (received from the hash) to Google Analytics
        const events = convertFiltersToAnalyticEvents(reduxValues);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);

        setInFlight(false);
    };

    const determineIfUnfiltered = () => {
        // check to see if we are applying any filters
        // if there are no filters, we shouldn't generate a hash
        let unfiltered = true;

        // make a copy of the initial and actual Redux filter states
        const currentState = Object.assign({}, appliedFilters.filters);
        const unfilteredState = Object.assign({}, initialState);
        if (currentState.timePeriodType === 'fy') {
            // if the time period is fiscal year, we don't care about the date range values, even
            // if they're provided because the date range tab isn't selected
            delete unfilteredState.timePeriodStart;
            delete unfilteredState.timePeriodEnd;
            delete currentState.timePeriodStart;
            delete currentState.timePeriodEnd;
        }
        else if (currentState.timePeriodEnd === 'dr') {
            // if the time period is date range, we don't care about the fiscal year values, even
            // if they're provided because the fiscal year tab isn't selected
            delete unfilteredState.timePeriodFY;
            delete currentState.timePeriodFY;
        }

        // we need to iterate through each of the filter Redux keys in order to perform equality
        // comparisons on Immutable children (via the Immutable is() function)
        const filterKeys = Object.keys(unfilteredState);

        for (let i = 0; i < filterKeys.length; i++) {
            const key = filterKeys[i];
            const unfilteredValue = unfilteredState[key];
            const currentValue = currentState[key];
            if (!is(unfilteredValue, currentValue)) {
                // it doesn't match, we can stop looping - filters have been applied
                unfiltered = false;
                break;
            }
        }

        return unfiltered;
    };

    const requestFilters = () => {
        // POST an API request to retrieve the Redux state
        SearchHelper.restoreUrlHash({
            hash: urlHash
        }).promise
            .then((res) => {
                dispatch(setAppliedFilterEmptiness(false));
                applyFilters(res.data.filter);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    setInFlight(false);
                    // nuke the hash since it isn't working
                    setStateHash('');
                    dispatch(setAppliedFilterEmptiness(true));
                    dispatch(setAppliedFilterCompletion(true));
                    history.push('/search');
                }
            });
    };

    const receiveHash = () => {
        if (!urlHash || urlHash === '') {
            setInFlight(false);
            history.push('/search');
            return;
        }

        // this is a hash that has been provided to the search page via the URL. The filters have
        // not yet been applied, so update the container's state and then parse the hash into its
        // original filter set.
        setStateHash(urlHash);
        setInFlight(true);
        requestFilters();
    };

    const provideHash = (newHash) => {
        // this is a hash that represents the current filter set. The filters are already applied
        // by way of user interaction. Now update the component state and URL with the hash so the
        // URL can be shared with others. Update the state first (to prevent the hash from being
        // re-parsed as an inbound/received hash), then replace the URL instead of pushing to
        // prevent hash changes from being added to the browser history. This keeps the back button
        // working as expected.
        dispatch(setAppliedFilterEmptiness(false));
        setInFlight(false);
        setStateHash(newHash);
        history.push(`/search/${newHash}`);
    };

    const generateHash = () => {
        const unfiltered = determineIfUnfiltered();
        if (unfiltered) {
            // all the filters were cleared, reset to a blank hash
            dispatch(setAppliedFilterEmptiness(true));
            dispatch(setAppliedFilterCompletion(true));
            history.push('/search');
            return;
        }

        // POST an API request to retrieve the Redux state
        SearchHelper.generateUrlHash({
            filters: appliedFilters.filters,
            version: filterStoreVersion
        }).promise
            .then((res) => {
                // update the URL with the received hash
                const newHash = res.data.hash;
                provideHash(newHash);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    };

    const requestDownloadAvailability = () => {
        if (determineIfUnfiltered()) {
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
    };

    useEffect(() => {
        if (!inFlight) {
            // the filters changed and it's not because of an inbound/outbound URL hash change
            generateHash();
        }
        requestDownloadAvailability();
    }, [appliedFilters.filters]);

    useEffect(() => {
        // When the URL hash changes
        if (urlHash !== stateHash) {
            receiveHash(urlHash || '');
        }
    }, [urlHash]);

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
