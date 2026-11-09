import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, get } from 'lodash-es';
import { useQueryClient } from '@tanstack/react-query';

import {
    cleanNaicsData,
    incrementNaicsCountAndUpdateUnchecked,
    decrementNaicsCountAndUpdateUnchecked,
    getNaicsNodeFromTree,
    autoCheckNaicsAfterExpand,
    expandNaicsAndAllDescendantParents,
    getFormattedNaicsDataForCheckboxTree,
    getAllUniqueAncestors
} from 'helpers/naicsHelper';
import {
    removePlaceholderString,
    getAllDescendants,
    stateEqualityCheck
} from 'helpers/checkboxTreeHelper';
import { naicsRequest } from 'helpers/searchHelper';
import {
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    showNaicsTree,
    setUncheckedNaics,
    setNaicsCounts
} from 'redux/actions/search/naicsActions';
import { updateNaics } from 'redux/actions/search/searchFilterActions';
import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from
    'components/sharedComponents/EntityDropdownAutocomplete';
import { useFetchNaics } from './useFetchNaics';

const NAICSCheckboxTree = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [isPreloading, setIsPreloading] = useState(false);
    const [isSearchPending, setIsSearchPending] = useState(false);
    const [preloadError, setPreloadError] = useState(null);

    const nodes = useSelector((state) => state.naics.naics.toJS());
    const expanded = useSelector((state) => state.naics.expanded.toJS());
    const searchExpanded = useSelector((state) => state.naics.searchExpanded.toJS());
    const checked = useSelector((state) => state.naics.checked.toJS());
    const unchecked = useSelector((state) => state.naics.unchecked.toJS());
    const counts = useSelector((state) => state.naics.counts.toJS());
    const {
        require: checkedFromHash,
        exclude: uncheckedFromHash,
        counts: countsFromHash
    } = useSelector((state) => state.appliedFilters.filters.naicsCodes);
    const {
        require: checkedStaged,
        exclude: uncheckedStaged
    } = useSelector((state) => state.filters.naicsCodes);

    // null = idle. Start with a root fetch only if the store is empty.
    const [activeRequest, setActiveRequest] = useState(
        () => (nodes.length ? null : { param: '', searchStr: '', isSearch: false })
    );

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const queryParam = activeRequest ?
        (activeRequest.isSearch ? `?filter=${activeRequest.searchStr}` : activeRequest.param) :
        undefined;

    const {
        naicsNodes, noResults, isSuccess,
        isLoading: queryIsLoading, isError: queryIsError, error: queryError
    } = useFetchNaics(queryParam, activeRequest?.isSearch, !!activeRequest);

    const isLoading = queryIsLoading || isPreloading || isSearchPending;
    const isError = queryIsError || !!preloadError;
    const errorMessage = preloadError ||
        (queryError ? get(queryError, 'message', 'Error fetching NAICS.') : '');

    const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
        const newChecked = expandedLocal
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
                return !!checkedLocal.includes(expandedNode);
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                const node = getNaicsNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal, ...newChecked]);
    };

    // shared by the interactive fetch path and the hash-restoration preload
    const applyFetchedNodes = (param, isSearchFlag, fetchedNodes) => {
        const isPartialTree = (param !== '' || isSearchFlag);

        if (!isPartialTree) {
            dispatch(setNaicsNodes(param, fetchedNodes));
            return;
        }

        const key = param.includes('/') ?
            param.split('/')[1] :
            param;

        if (isSearchFlag) {
            dispatch(setSearchedNaics(fetchedNodes));
            dispatch(setExpandedNaics(
                expandNaicsAndAllDescendantParents(fetchedNodes, 'naics'),
                'SET_SEARCHED_EXPANDED'
            ));
        }
        else {
            dispatch(setNaicsNodes(key, fetchedNodes));
        }

        // we've searched for a specific naics reference;
        // ie '11' or '1111' and their immediate descendants should be checked.
        let modChecked = [];
        if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
            const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
            const filteredChildren = fetchedNodes[0].children
                .filter((child) => !child.isPlaceholder)
                .map((child) => child.value);
            modChecked = [...filteredChecked, ...filteredChildren];

            if (!checked.includes(key)) {
                // checked had child placeholder checked; parent should be checked
                modChecked = [...modChecked, key];
            }
        }

        const newChecked = modChecked?.length ?
            autoCheckNaicsAfterExpand(
                fetchedNodes[0],
                modChecked,
                unchecked
            ) :
            checked;
        dispatch(setCheckedNaics(newChecked));
    };

    // `searching` is explicit because the debounced caller holds a stale closure of isSearch
    const triggerFetch = (param = '', searchStr = '', searching = isSearch) => {
        setIsSearchPending(false);
        setActiveRequest({ param, searchStr, isSearch: searching });
    };

    // fetches each ancestor branch one at a time so the tree is fully
    // populated before the restored checked/unchecked state is applied
    const preloadAncestors = async (params) => {
        setIsPreloading(true);
        try {
            for (const param of params) {
                const res = await queryClient.fetchQuery({
                    queryKey: ['naics', param],
                    queryFn: () => naicsRequest(param).promise
                });
                applyFetchedNodes(param, false, cleanNaicsData(res.data.results));
            }
        }
        catch (e) {
            setPreloadError(get(e, 'message', 'Error fetching NAICs.'));
        }
        finally {
            setIsPreloading(false);
        }
    };

    const onClear = () => {
        setActiveRequest(null);
        dispatch(setExpandedNaics([], 'SET_SEARCHED_EXPANDED'));
        dispatch(showNaicsTree());
        setIsSearch(false);
        setIsSearchPending(false);
        setSearchString('');
        setPreloadError(null);
    };

    const onSearchChange = useMemo(
        () => debounce((text) => triggerFetch('', text, true), 500),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1 ?
            newChecked.filter((id) => !id.includes('children_of_')) :
            newChecked;
        const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
            stateNewChecked,
            checked,
            unchecked,
            nodes,
            counts
        );
        dispatch(setNaicsCounts(newCounts));
        dispatch(setCheckedNaics(newChecked));
        dispatch(setUncheckedNaics(newUnchecked));
        dispatch(updateNaics(stateNewChecked, newUnchecked, newCounts));
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        if (uncheckedNode.checked) {
            onCheck(newChecked);
        }
        else {
            const [newCounts, newUnchecked] = decrementNaicsCountAndUpdateUnchecked(
                uncheckedNode,
                unchecked,
                checked,
                counts,
                nodes
            );

            dispatch(setUncheckedNaics(newUnchecked));
            dispatch(updateNaics(newChecked, newUnchecked, newCounts));
            dispatch(setCheckedNaics(newChecked));
            dispatch(setNaicsCounts(newCounts));
        }
    };

    const onExpand = (value, expandedArr, fetch) => {
        if (fetch && !isSearch) {
            triggerFetch(value);
        }
        if (isSearch) {
            dispatch(setExpandedNaics(expandedArr, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedNaics(expandedArr));
        }
    };

    const onCollapse = (expandedArr) => {
        if (isSearch) {
            dispatch(setExpandedNaics(expandedArr, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedNaics(expandedArr));
        }
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            onClear();
        }

        setSearchString(text);
        if (text.length >= 2) {
            setIsSearch(true);
            setIsSearchPending(true);
            onSearchChange(text);
        }
    };

    // cleanup only; the initial fetch is driven by activeRequest's initial state
    useEffect(() => {
        dispatch(showNaicsTree());
        return () => {
            onSearchChange.cancel();
            dispatch(showNaicsTree());
        };
    }, [dispatch, onSearchChange]);

    // apply successful fetches (root load / expand / search) to Redux
    useEffect(() => {
        if (!activeRequest || !isSuccess) return;

        applyFetchedNodes(activeRequest.param, activeRequest.isSearch, naicsNodes);

        const wasRootFetch = activeRequest.param === '' && !activeRequest.isSearch;
        if (wasRootFetch && checkedFromHash.length > 0 && checked.length === 0) {
            // initial load with hash. reload or shared hash.
            dispatch(setNaicsCounts(countsFromHash));
            // intentional: start the ancestor preload once the root fetch succeeds
            // eslint-disable-next-line react-hooks/set-state-in-effect
            preloadAncestors(getAllUniqueAncestors([...checkedFromHash, ...uncheckedFromHash]));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [naicsNodes, isSuccess, activeRequest]);

    useEffect(() => {
        if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
            let checkedArray = checkedFromHash;
            let uncheckedArray = uncheckedFromHash;

            if (!checked.length && checkedStaged.length) {
                if (!stateEqualityCheck(checkedFromHash, checkedStaged)) {
                    checkedArray = checkedStaged;
                    uncheckedArray = uncheckedStaged;
                }
                const autoChecked = autoCheckResultDescendants(
                    checkedArray,
                    expandNaicsAndAllDescendantParents(nodes, 'naics'),
                    nodes
                );

                dispatch(setCheckedNaics(autoChecked));
                dispatch(setExpandedNaics(
                    getAllUniqueAncestors([...checkedArray, ...uncheckedArray])
                ));
            }
        }
    }, [nodes, checkedFromHash, checkedStaged, checked]);

    return (
        <div className="search-option">
            <div className="naics-search-container">
                <EntityDropdownAutocomplete
                    placeholder="Type at least 2 letters..."
                    searchString={searchString}
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    loading={false}
                    isClearable
                    onClear={onClear}
                    searchIcon />
                <CheckboxTree
                    limit={3}
                    data={getFormattedNaicsDataForCheckboxTree(nodes)}
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    noResults={noResults}
                    checked={checked}
                    expanded={isSearch ? searchExpanded : expanded}
                    searchString={searchString}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    onUncheck={onUncheck}
                    onCheck={onCheck} />
            </div>
        </div>
    );
};

export default NAICSCheckboxTree;
