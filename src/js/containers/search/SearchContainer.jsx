/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { QAT, LLM_HEADER_VALUE } from 'GlobalConstants';
import { combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import {
    filterStoreVersion, initialState
} from 'redux/reducers/search/searchFiltersReducer';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import {
    setAppliedFilterEmptiness, resetAppliedFilters
} from 'redux/actions/search/appliedFilterActions';
import { setSmartAssistIsVisible } from 'redux/actions/search/searchViewActions';
import {
    areFiltersDifferent,
    areFiltersEmpty, areFiltersEqual,
    areFiltersSelected,
    generateUrlHash, getObjFromQueryParams
} from 'helpers/searchHelper';
import useQueryParams from 'hooks/useQueryParams';
import SearchPage from 'components/search/SearchPage';
import useRequestDownloadCount from './useRequestDownloadCount';
import useFetchSearchFilters from './useFetchSearchFilters';

require('pages/search/searchPage.scss');

const SearchContainer = () => {
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
        },
        spending_level
    } = useSelector((state) => state);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
    const [generateHashInFlight, setGenerateHashInFlight] = useState(false);

    const request = useRef(null);
    const areAppliedFiltersEmptyRef = useRef(null);
    const prevAppliedFiltersRef = useRef(null);

    const {
        awardsCount,
        subawardsCount,
        transactionsCount,
        downloadInFlight,
        downloadAvailable
    } = useRequestDownloadCount(
        appliedFilters, urlHash, areAppliedFiltersEmpty, spendingLevel
    );

    const {
        filters: remoteFilters,
        isCorrupt,
        error: fetchFiltersError
    } = useFetchSearchFilters(urlHash, areFiltersEqual(stagedFilters, initialState));

    useEffect(() => {
        if (remoteFilters) {
            // apply the filters to both staged and applied redux stores
            dispatch(restoreHashedFilters(remoteFilters));
            dispatch(setAppliedFilterEmptiness(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteFilters]);

    useEffect(() => {
        areAppliedFiltersEmptyRef.current = areAppliedFiltersEmpty;
        prevAppliedFiltersRef.current = appliedFilters;
    }, [areAppliedFiltersEmpty, appliedFilters]);

    useEffect(() => {
        if (QAT || (Object.prototype.hasOwnProperty.call(query, 'smart-assist') && query['smart-assist'] === LLM_HEADER_VALUE)) {
            dispatch(setSmartAssistIsVisible(true));
        }
    }, []);

    const { current: prevAreAppliedFiltersEmpty } = areAppliedFiltersEmptyRef;
    const { current: prevAppliedFilters } = prevAppliedFiltersRef;

    useEffect(() => {
        const shouldFetchRemoteFilters = (
            urlHash &&
            areFiltersEqual(stagedFilters, initialState)
        );

        // when shouldFetchRemoteFilters is set to true, useFetchSearchFilters does the fetch
        if (!shouldFetchRemoteFilters) {
            if (areFiltersSelected(appliedFilters) && areFiltersEmpty(stagedFilters)) {
                dispatch(restoreHashedFilters(appliedFilters));
            }
            else if (!urlHash) {
                dispatch(resetAppliedFilters());
                dispatch(clearAllFilters());
            }
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
        if (isCorrupt) {
            console.error('Error fetching filters from hash');
            // corrupt hash redirect to error page
            navigate('/hash-error', { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCorrupt]);

    useEffect(() => {
        if (fetchFiltersError) {
            console.error('Error fetching filters from hash: ', fetchFiltersError);
            // remove hash since corresponding filter selections are not retrievable
            searchURLParams.delete('hash');
            setSearchURLParams(searchURLParams);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFiltersError]);

    useEffect(() => {
        if (areAppliedFiltersEmpty && prevAreAppliedFiltersEmpty === false) {
            // all the filters were cleared, reset to a blank hash
            searchURLParams.delete('hash');
            setSearchURLParams(searchURLParams);
            dispatch(resetAppliedFilters());
            dispatch(clearAllFilters());
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
         * NOTE: additional logic is necessary to avoid
         *      false positive where we're loading a previous hash
         * */
        const filtersChangedAndAreSelected = (
            areFiltersSelected(appliedFilters) &&
            areFiltersDifferent(appliedFilters, prevAppliedFilters)
        );
        if (
            (!urlHash && filtersChangedAndAreSelected) ||
            (
                urlHash &&
                filtersChangedAndAreSelected &&
                areFiltersSelected(prevAppliedFilters)
            )
        ) {
            generateHash();
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
            queryParam={location.state}
            spending_level={spending_level} />
    );
};

export default SearchContainer;

export const SearchContainerRedirectv2 = () => <></>;
