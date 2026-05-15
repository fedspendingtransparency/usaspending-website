/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import {
    filterStoreVersion, requiredTypes, initialState
} from 'redux/reducers/search/searchFiltersReducer';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import {
    setAppliedFilterEmptiness, resetAppliedFilters
} from 'redux/actions/search/appliedFilterActions';
import {
    areFiltersDifferent,
    areFiltersEmpty, areFiltersEqual,
    areFiltersSelected,
    generateUrlHash, getObjFromQueryParams,
    restoreUrlHash
} from "helpers/searchHelper";
import * as DownloadHelper from 'helpers/downloadHelper';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import useQueryParams from "hooks/useQueryParams";
import SearchPage from 'components/search/SearchPage';
import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

require('pages/search/searchPage.scss');

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
    //  a URL hash contains data that no longer applies to the current site
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

const SearchContainer = () => {
    const [downloadAvailable, setDownloadAvailable] = useState(false);
    const location = useLocation();
    const { hash: urlHash } = getObjFromQueryParams(location.search);
    const query = useQueryParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchURLParams, setSearchURLParams] = useSearchParams();
    const {
        filters: stagedFilters,
        download,
        appliedFilters: {
            filters: appliedFilters,
            _empty: areAppliedFiltersEmpty
        }
    } = useSelector((state) => state);
    const [downloadInFlight, setDownloadInFlight] = useState(false);
    const [generateHashInFlight, setGenerateHashInFlight] = useState(false);

    const [awardsCount, setAwardsCount] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [subawardsCount, setSubawardsCount] = useState(0);

    const request = useRef(null);
    const requestAwards = useRef(null);
    const requestTransactions = useRef(null);
    const requestSubawards = useRef(null);
    const areAppliedFiltersEmptyRef = useRef();
    const prevAppliedFiltersRef = useRef();

    const setDownloadAvailabilityAwards = useCallback((filters = stagedFilters) => {
        setDownloadInFlight(true);

        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();
        // generate the API parameters
        const apiParams = {
            filters: searchParams,
            spending_level: "awards",
            auditTrail: 'Download Availability Count Awards'
        };

        requestAwards.current = DownloadHelper.requestDownloadCount(apiParams);
        requestAwards.current.promise
            .then((res) => {
                setDownloadInFlight(false);
                setAwardsCount(res.data.calculated_count);
            })
            .catch(() => {
                setDownloadInFlight(false);
                requestAwards.current = null;
            });
    }, [stagedFilters]);

    const setDownloadAvailabilityTransactions = useCallback((filters = stagedFilters) => {
        setDownloadInFlight(true);

        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();
        // generate the API parameters
        const apiParams = {
            filters: searchParams,
            spending_level: "transactions",
            auditTrail: 'Download Availability Count Transactions'
        };

        requestTransactions.current = DownloadHelper.requestDownloadCount(apiParams);
        requestTransactions.current.promise
            .then((res) => {
                setDownloadInFlight(false);
                setTransactionsCount(res.data.calculated_count);
            })
            .catch(() => {
                setDownloadInFlight(false);
                requestTransactions.current = null;
            });
    }, [stagedFilters]);

    const setDownloadAvailabilitySubawards = useCallback((filters = stagedFilters) => {
        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();
        // generate the API parameters
        if (appliedFilters.filterNewAwardsOnlyActive || filters.filterNewAwardsOnlyActive) {
            setDownloadInFlight(false);
            setSubawardsCount(0);
        }
        else {
            const apiParams = {
                filters: searchParams,
                spending_level: "subawards",
                auditTrail: 'Download Availability Count Subawards'
            };

            setDownloadInFlight(true);
            requestSubawards.current = DownloadHelper.requestDownloadCount(apiParams);
            requestSubawards.current.promise
                .then((res) => {
                    setDownloadInFlight(false);
                    setSubawardsCount(res.data.calculated_count);
                })
                .catch(() => {
                    setDownloadInFlight(false);
                    requestSubawards.current = null;
                });
        }
    }, [stagedFilters, appliedFilters]);

    const downloadButtonEnabled = useCallback(() => {
        if (
            (awardsCount === 0 || awardsCount >= 500000) &&
            (transactionsCount === 0 || transactionsCount >= 500000) &&
            (subawardsCount === 0 || subawardsCount >= 500000)
        ) {
            setDownloadAvailable(false);
        }
        else if (awardsCount !== 0 || transactionsCount !== 0 || subawardsCount !== 0) {
            setDownloadAvailable(true);
        }
    }, [transactionsCount, awardsCount, subawardsCount]);

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
            areFiltersEqual(stagedFilters, initialState)
        );
        if (shouldFetchRemoteFilters) {
            if (request.current) {
                request.current.cancel();
            }
            request.current = restoreUrlHash({
                hash: urlHash
            });
            request.current.promise
                .then((res) => {
                    const filtersInImmutableStructure = parseRemoteFilters(res.data.filter);
                    if (filtersInImmutableStructure) {
                        // apply the filters to both the staged and applied stores
                        dispatch(restoreHashedFilters(filtersInImmutableStructure));
                        dispatch(setAppliedFilterEmptiness(false));

                        setDownloadAvailabilityAwards(filtersInImmutableStructure);
                        setDownloadAvailabilitySubawards(filtersInImmutableStructure);
                        setDownloadAvailabilityTransactions(filtersInImmutableStructure);
                    }
                    request.current = null;
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        // eslint-disable-next-line no-console
                        console.error('Error fetching filters from hash: ', err);
                        // remove hash since corresponding filter selections aren't retrievable.
                        searchURLParams.delete("hash");
                        setSearchURLParams(searchURLParams);
                        request.current = null;
                    }
                });
        }
        else if (areFiltersSelected(appliedFilters) && areFiltersEmpty(stagedFilters)) {
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
            searchURLParams.delete("hash");
            setSearchURLParams(searchURLParams);
            dispatch(resetAppliedFilters());
            dispatch(clearAllFilters());
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

        request.current = generateUrlHash({
            filters: appliedFilters,
            version: filterStoreVersion
        });
        request.current.promise
            .then((res) => {
                // update the URL with the received hash
                const newQueryParams = combineQueryParams(query, { hash: res.data.hash });
                navigate(`${'/search'}${getQueryParamString(newQueryParams)}`, { replace: true });

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
         * (2) Subsequent Searches: same as above except:
         *      (a) urlHash is present and
         *      (b) previous search was not empty
         * NOTE: additional logic is necessary to avoid false positive where we're loading a previous hash
         * */
        const filtersChangedAndAreSelected = (
            areFiltersSelected(appliedFilters) &&
            areFiltersDifferent(appliedFilters, prevAppliedFilters)
        );
        if ((!urlHash && filtersChangedAndAreSelected) || (urlHash && filtersChangedAndAreSelected && areFiltersSelected(prevAppliedFilters))) {
            generateHash();

            setDownloadAvailabilityAwards();
            setDownloadAvailabilityTransactions();
            setDownloadAvailabilitySubawards();
        }
        else if (!urlHash) {
            dispatch(resetAppliedFilters());
            dispatch(clearAllFilters());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters, urlHash]);

    useEffect(() => {
        if (
            areFiltersDifferent(appliedFilters, stagedFilters) &&
            areFiltersDifferent(prevAppliedFilters, appliedFilters)
        ) {
            dispatch(restoreHashedFilters(appliedFilters));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters, stagedFilters]);

    useEffect(() => {
        downloadButtonEnabled();
    }, [transactionsCount, subawardsCount, awardsCount, appliedFilters, downloadButtonEnabled]);
    return (
        <SearchPage
            download={download}
            appliedFilters={appliedFilters}
            downloadAvailable={downloadAvailable}
            downloadInFlight={downloadInFlight}
            noFiltersApplied={areAppliedFiltersEmpty}
            hash={urlHash}
            awardsCount={awardsCount}
            transactionsCount={transactionsCount}
            subawardsCount={subawardsCount}
            queryParam={location.state} />
    );
};

export default SearchContainer;

export const SearchContainerRedirectv2 = () => <></>;

