/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { Redirect, useLocation, useParams } from 'react-router-dom';

import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { filterStoreVersion, requiredTypes, initialState } from 'redux/reducers/search/searchFiltersReducer';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterEmptiness, resetAppliedFilters } from 'redux/actions/search/appliedFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import * as DownloadHelper from 'helpers/downloadHelper';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';

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
        console.info("version mismatch");
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
    const { hash: urlHash } = SearchHelper.getObjFromQueryParams(useLocation().search);
    const query = useQueryParams();

    const dispatch = useDispatch();
    const {
        filters: stagedFilters,
        download,
        appliedFilters: {
            filters: appliedFilters,
            _empty: areAppliedFiltersEmpty,
            _complete: areFiltersApplied
        }
    } = useSelector((state) => state);
    const [downloadAvailable, setDownloadAvailable] = useState(false);
    const [downloadInFlight, setDownloadInFlight] = useState(false);
    const [generateHashInFlight, setGenerateHashInFlight] = useState(false);
    const request = useRef(null);
    const areAppliedFiltersEmptyRef = useRef();
    const prevAppliedFiltersRef = useRef();

    const setDownloadAvailability = useCallback((filters = stagedFilters) => {
        setDownloadInFlight(true);

        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            filters: searchParams,
            auditTrail: 'Download Availability Count'
        };

        request.current = DownloadHelper.requestDownloadCount(apiParams);
        request.current.promise
            .then((res) => {
                setDownloadAvailable(!res.data.transaction_rows_gt_limit);
                setDownloadInFlight(false);
            })
            .catch(() => {
                setDownloadInFlight(false);
                request.current = null;
            });
    }, [stagedFilters]);

    useEffect(() => {
        areAppliedFiltersEmptyRef.current = areAppliedFiltersEmpty;
        prevAppliedFiltersRef.current = appliedFilters;
    }, [areAppliedFiltersEmpty, appliedFilters]);

    const { current: prevAreAppliedFiltersEmpty } = areAppliedFiltersEmptyRef;
    const { current: prevAppliedFilters } = prevAppliedFiltersRef;

    useEffect(() => {
        // receiving filters from previous search via hash.
        const shouldFetchRemoteFilters = (
            urlHash &&
            SearchHelper.areFiltersEqual(stagedFilters, initialState)
        );
        if (shouldFetchRemoteFilters) {
            if (request.current) {
                request.current.cancel();
            }
            request.current = SearchHelper.restoreUrlHash({
                hash: urlHash
            });
            request.current.promise
                .then((res) => {
                    const filtersInImmutableStructure = parseRemoteFilters(res.data.filter);
                    if (filtersInImmutableStructure) {
                        // apply the filters to both the staged and applied stores
                        dispatch(restoreHashedFilters(filtersInImmutableStructure));
                        dispatch(setAppliedFilterEmptiness(false));
                        // set download availability
                        setDownloadAvailability(filtersInImmutableStructure);
                    }
                    request.current = null;
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        // eslint-disable-next-line no-console
                        console.error('Error fetching filters from hash: ', err);
                        // remove hash since corresponding filter selections aren't retrievable.
                        history.push('/search');
                        request.current = null;
                    }
                });
        }
        else if (SearchHelper.areFiltersSelected(appliedFilters) && SearchHelper.areFiltersEmpty(stagedFilters)) {
            dispatch(restoreHashedFilters(appliedFilters));
        }
        else if (!urlHash) {
            dispatch(resetAppliedFilters());
            dispatch(clearAllFilters());
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
            // clear selected filters so we don't fetch previous search
            // only when query hash is defined b/c if it's a urlHash, we can't know if
            // we're remounting w/ the query hash or going somewhere else
            dispatch(resetAppliedFilters());
            dispatch(clearAllFilters());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (areAppliedFiltersEmpty && prevAreAppliedFiltersEmpty === false) {
            // all the filters were cleared, reset to a blank hash
            history.replace({
                pathname: '/search',
                search: ''
            });
            setDownloadAvailable(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areAppliedFiltersEmpty, urlHash]);

    const generateHash = useCallback(() => {
    // POST an API request to retrieve the Redux state
        if (generateHashInFlight) {
            return;
        }
        setGenerateHashInFlight(true);
        // this triggers the loading indicator
        dispatch(setAppliedFilterEmptiness(false));

        request.current = SearchHelper.generateUrlHash({
            filters: appliedFilters,
            version: filterStoreVersion
        });
        request.current.promise
            .then((res) => {
                // update the URL with the received hash
                const newQueryParams = combineQueryParams(query, { hash: res.data.hash });
                history.replace({
                    pathname: `/search/`,
                    search: getQueryParamString(newQueryParams)
                });
                setGenerateHashInFlight(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    setGenerateHashInFlight(false);
                    request.current = null;
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters, generateHashInFlight]);

    useEffect(() => {
    /**
         * Conditions where we generate a new hash:
         * (1) First Search: applied filters have changed & are no longer empty
         * (2) Subsequent Searches: same as above except: (a) urlHash is present and (b) previous search was not empty
         * NOTE: additional logic is necessary to avoid false positive where we're loading a previous hash
         * */
        const filtersChangedAndAreSelected = (
            SearchHelper.areFiltersSelected(appliedFilters) &&
            SearchHelper.areFiltersDifferent(appliedFilters, prevAppliedFilters)
        );

        if ((!urlHash && filtersChangedAndAreSelected) || (urlHash && filtersChangedAndAreSelected && SearchHelper.areFiltersSelected(prevAppliedFilters))) {
            generateHash();
            setDownloadAvailability();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters, urlHash]);

    useEffect(() => {
        if (SearchHelper.areFiltersDifferent(appliedFilters, stagedFilters) && SearchHelper.areFiltersDifferent(prevAppliedFilters, appliedFilters)) {
            dispatch(restoreHashedFilters(appliedFilters));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters, stagedFilters]);

    return (
        <SearchPage
            hash={urlHash}
            filters={stagedFilters}
            appliedFilters={appliedFilters}
            noFiltersApplied={areAppliedFiltersEmpty}
            downloadAvailable={downloadAvailable}
            downloadInFlight={downloadInFlight}
            download={download}
            requestsComplete={areFiltersApplied} />
    );
};

SearchContainer.propTypes = propTypes;
export default SearchContainer;

export const SearchContainerRedirect = () => {
    const { urlHash: pathHash } = useParams();
    return (
        <Redirect
            to={{
                pathname: '/search/',
                search: `?${new URLSearchParams({ hash: pathHash }).toString()}`
            }} />
    );
};

SearchContainer.propTypes = {
    history: PropTypes.object.isRequired
};
