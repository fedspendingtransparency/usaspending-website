/**
 * useCheckboxTree.jsx
 * Created by JD House 11/05/2026
*/

import { useEffect, useMemo, useRef, useState } from 'react';
import { cloneDeep, debounce, get } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors,
    stateEqualityCheck
} from 'helpers/checkboxTreeHelper';
import { useFetchCheckboxTree, cancellableQueryFn } from 'hooks/useFetchCheckboxTree';

// the last segment of an api path like "agencyCode/federalAccountCode"
const lastSegment = (path) => (path.includes('/') ? path.split('/').pop() : path);

/**
 * Shared container logic for the lazily-loaded, redux-backed checkbox trees (TAS, PSC, ...).
 * Everything that differs between trees is passed in via `config`:
 *
 * @param {Object} config
 * @param {string} config.stateKey - redux slice name, e.g. 'tas' (state.tas.tas, ...)
 * @param {string} config.filterKey - key in appliedFilters/filters, e.g. 'tasCodes'
 * @param {string} config.label - display name used in error messages
 * @param {Function} config.fetchFn - helper returning `{ promise, cancel }`
 * @param {Function} config.cleanFn - shapes api `results` into tree nodes
 * @param {Function} config.buildSearchQuery - (searchString) => query string for the api
 * @param {number} config.minSearchLength
 * @param {Object} config.actions - setNodes, showTree, setExpanded, setChecked,
 *   setUnchecked, setSearched, setCounts action creators
 * @param {Function} config.updateFilter - (require, exclude, counts) => staged filter action
 * @param {Object} config.helpers - getNodeFromTree, incrementCount, decrementCount,
 *   autoCheckAfterExpand, expandParents, getAncestryPath
 * @param {Function} [config.sortNodes] - comparator applied to the root nodes for display
 */
export const useCheckboxTree = ({
    stateKey, filterKey, label, fetchFn, cleanFn, buildSearchQuery, minSearchLength,
    actions, updateFilter, helpers, sortNodes
}) => {
    // select the (referentially stable) immutable values and convert in useMemo, so the
    // component only re-renders when the slice actually changes
    const nodesImm = useSelector((state) => state[stateKey][stateKey]);
    const expandedImm = useSelector((state) => state[stateKey].expanded);
    const searchExpandedImm = useSelector((state) => state[stateKey].searchExpanded);
    const checkedImm = useSelector((state) => state[stateKey].checked);
    const uncheckedImm = useSelector((state) => state[stateKey].unchecked);
    const countsImm = useSelector((state) => state[stateKey].counts);
    const nodes = useMemo(() => nodesImm.toJS(), [nodesImm]);
    const expanded = useMemo(() => expandedImm.toJS(), [expandedImm]);
    const searchExpanded = useMemo(() => searchExpandedImm.toJS(), [searchExpandedImm]);
    const checked = useMemo(() => checkedImm.toJS(), [checkedImm]);
    const unchecked = useMemo(() => uncheckedImm.toJS(), [uncheckedImm]);
    const counts = useMemo(() => countsImm.toJS(), [countsImm]);
    const {
        require: checkedFromHash,
        exclude: uncheckedFromHash,
        counts: countsFromHash
    } = useSelector((state) => state.appliedFilters.filters[filterKey]);
    const {
        require: checkedStaged,
        exclude: uncheckedStaged,
        counts: countsStaged
    } = useSelector((state) => state.filters[filterKey]);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [searchString, setSearchString] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isPreloading, setIsPreloading] = useState(false);
    const [isSearchPending, setIsSearchPending] = useState(false);
    const [preloadError, setPreloadError] = useState(null);
    const [activeRequest, setActiveRequest] = useState(
        () => (nodes.length ? null : { id: '', searchStr: '', isSearch: false })
    );

    // bumped on clear/unmount to abandon an in-progress ancestor preload
    const preloadRunId = useRef(0);
    // the last activeRequest whose result was applied, so a background refetch
    // of the same request can't re-apply (and reset) the tree
    const appliedRequest = useRef(null);
    const checkedRef = useRef(checked);
    useEffect(() => {
        checkedRef.current = checked;
    }, [checked]);

    const queryParam = activeRequest ?
        (activeRequest.isSearch ? buildSearchQuery(activeRequest.searchStr) : activeRequest.id) :
        undefined;
    const {
        nodes: fetchedNodes, noResults, isSuccess, isLoading: queryIsLoading,
        isError: queryIsError, error: queryError
    } = useFetchCheckboxTree({
        queryKeyPrefix: stateKey,
        fetchFn,
        cleanFn,
        queryParam,
        isSearch: activeRequest?.isSearch,
        enabled: !!activeRequest
    });

    const isLoading = queryIsLoading || isPreloading || isSearchPending;
    const isError = queryIsError || !!preloadError;
    const errorMessage = preloadError ||
        (queryError ? get(queryError, 'message', `Error fetching ${label}.`) : '');

    const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
        const newChecked = expandedLocal
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
                return !!checkedLocal.includes(expandedNode);
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                const node = helpers.getNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal.flat(), ...newChecked.flat()]);
    };

    // shared by the interactive fetch path and the hash-restoration preload batch
    // `checked` can be passed in so a batch of applications builds on the previous
    // result instead of the (stale) value from the render that started the batch.
    // Returns the resulting checked array.
    const applyFetchedNodes = (id, isSearchFlag, fetchedNodesIn, checkedIn = checked) => {
        // clone: the fetched nodes may be react-query cache objects that reducers must not mutate
        const newNodes = cloneDeep(fetchedNodesIn);
        const isPartialTree = (id !== '' || isSearchFlag);

        if (!isPartialTree) {
            // populating tree trunk
            dispatch(actions.setNodes('', newNodes));
            return checkedIn;
        }

        // ids are prefixed with their ancestors (ancestor/ancestor/node)
        const key = lastSegment(id);

        if (isSearchFlag) {
            const searchExpandedNodes = helpers.expandParents(newNodes);
            dispatch(actions.setSearched(newNodes));
            dispatch(actions.setExpanded(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(actions.setNodes(key, newNodes));
        }

        let modChecked = [];

        if (checkedIn.includes(key) || checkedIn.includes(`children_of_${key}`)) {
            // key node is checked.  add children
            const filteredChecked = checkedIn.filter((ch) => ch !== `children_of_${key}`);
            modChecked = [...filteredChecked, ...newNodes.map((child) => child.value)];

            if (!checkedIn.includes(key)) {
                // checked had child placeholder checked
                // parent should be checked
                modChecked = [...modChecked, key];
            }
        }

        const newChecked = modChecked?.length ?
            helpers.autoCheckAfterExpand(
                { children: newNodes, value: key },
                modChecked,
                unchecked
            ) :
            checkedIn;

        dispatch(actions.setChecked(newChecked));
        return newChecked;
    };

    // fetches each ancestor branch one at a time so the tree is fully
    // populated before the restored checked/unchecked state is applied
    const preloadAncestors = async (params) => {
        preloadRunId.current += 1;
        const runId = preloadRunId.current;
        const isStale = () => runId !== preloadRunId.current;

        setIsPreloading(true);
        let runningChecked = checkedRef.current;
        try {
            for (const param of params) {
                // reuse anything already cached rather than refetching
                const { data } = await queryClient.ensureQueryData({
                    queryKey: [stateKey, param],
                    queryFn: cancellableQueryFn(fetchFn, param)
                });
                if (isStale()) return;
                runningChecked = applyFetchedNodes(
                    param, false, cleanFn(data.results), runningChecked
                );
            }
        }
        catch (e) {
            if (!isStale()) setPreloadError(get(e, 'message', `Error fetching ${label}.`));
        }
        finally {
            if (!isStale()) setIsPreloading(false);
        }
    };

    // only touches (stable) state setters, so one debounced instance can live for the
    // whole life of the component and actually coalesce keystrokes
    const debouncedSearch = useMemo(() => debounce((text) => {
        setIsSearchPending(false);
        setActiveRequest({ id: '', searchStr: text, isSearch: true });
    }, 500), []);

    const setExpandedForMode = (newExpandedArray) => {
        if (isSearch) {
            dispatch(actions.setExpanded(newExpandedArray, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(actions.setExpanded(newExpandedArray));
        }
    };

    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        if (shouldFetchChildren && !isSearch) {
            const id = [...(selectedNode.ancestors || []), expandedValue].join('/');
            setIsSearchPending(false);
            setActiveRequest({ id, searchStr: '', isSearch: false });
        }
        setExpandedForMode(newExpandedArray);
    };

    const onCollapse = (newExpandedArray) => setExpandedForMode(newExpandedArray);

    const updateSelections = (newChecked, newUnchecked, newCounts) => {
        dispatch(actions.setChecked(newChecked));
        dispatch(actions.setCounts(newCounts));
        dispatch(actions.setUnchecked(newUnchecked));
        dispatch(updateFilter(
            trimCheckedToCommonAncestors(helpers.getAncestryPath(newChecked, nodes)),
            helpers.getAncestryPath(newUnchecked, nodes),
            newCounts
        ));
    };

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1 ?
            newChecked.filter((id) => !id.includes('children_of_')) :
            newChecked;
        const [newCounts, newUnchecked] = helpers.incrementCount(
            stateNewChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        updateSelections(newChecked, newUnchecked, newCounts);
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = helpers.decrementCount(
            uncheckedNode,
            unchecked,
            checked,
            counts,
            nodes
        );

        updateSelections(newChecked, newUnchecked, newCounts);
    };

    const onClear = () => {
        preloadRunId.current += 1;
        setIsPreloading(false);
        debouncedSearch.cancel();
        setActiveRequest(null);
        dispatch(actions.setExpanded([], 'SET_SEARCHED_EXPANDED'));
        dispatch(actions.showTree());
        setIsSearch(false);
        setIsSearchPending(false);
        setSearchString('');
        setPreloadError(null);
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            onClear();
            return;
        }

        setSearchString(text);
        if (text.length >= minSearchLength) {
            setIsSearch(true);
            setIsSearchPending(true);
            debouncedSearch(text);
        }
        else {
            // below the minimum: drop any pending/active search and show the full tree,
            // keeping the typed text in the box
            debouncedSearch.cancel();
            setIsSearchPending(false);
            setIsSearch(false);
            setActiveRequest(null);
            dispatch(actions.setExpanded([], 'SET_SEARCHED_EXPANDED'));
            dispatch(actions.showTree());
        }
    };

    useEffect(() => {
        if (!isLoading) dispatch(actions.showTree());

        return () => {
            preloadRunId.current += 1;
            debouncedSearch.cancel();
            dispatch(actions.showTree());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // reacts to the hook-driven fetch (root load / expand / search) succeeding
    useEffect(() => {
        if (!activeRequest || !isSuccess) return;
        // apply each request once; ignore background refetches of the same request
        if (appliedRequest.current === activeRequest) return;
        appliedRequest.current = activeRequest;

        applyFetchedNodes(activeRequest.id, activeRequest.isSearch, fetchedNodes);

        const wasRootFetch = activeRequest.id === '' && !activeRequest.isSearch;
        if (wasRootFetch && (checkedFromHash.length || checkedStaged.length)) {
            const useHash = stateEqualityCheck(checkedFromHash, checkedStaged);
            const checkedArray = useHash ? checkedFromHash : checkedStaged;
            const uncheckedArray = useHash ? uncheckedFromHash : uncheckedStaged;
            const countsToSet = useHash ? countsFromHash : countsStaged;

            dispatch(actions.setCounts(countsToSet));

            const allUniqueAncestors = getUniqueAncestorPaths(checkedArray, uncheckedArray);
            // intentional: start the ancestor preload batch once the root fetch succeeds -
            // this depends on hash/staged Redux state the fetch itself has no knowledge of
            // eslint-disable-next-line react-hooks/set-state-in-effect
            preloadAncestors(allUniqueAncestors);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedNodes, isSuccess, activeRequest]);

    // restores checked/expanded state from the hash or staged filters once nodes exist
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
                    checkedArray.map((ancestryPath) => ancestryPath[ancestryPath.length - 1]),
                    expanded,
                    nodes
                );

                // getUniqueAncestorPaths returns API-call-shaped paths (slash-joined,
                // e.g. "agencyCode/federalAccountCode") - the expanded array needs the
                // bare node value at each level instead
                const toExpand = getUniqueAncestorPaths([...checkedArray, ...uncheckedArray])
                    .map(lastSegment);

                dispatch(actions.setChecked(autoChecked));
                dispatch(actions.setExpanded(toExpand));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes, checkedFromHash, checkedStaged, checked]);

    const sortedNodes = useMemo(
        () => (sortNodes ? [...nodes].sort(sortNodes) : nodes),
        [nodes, sortNodes]
    );

    return {
        searchString,
        onClear,
        handleTextInputChange,
        // spread onto <CheckboxTree />
        treeProps: {
            data: sortedNodes,
            checked,
            expanded: isSearch ? searchExpanded : expanded,
            isSearch,
            isLoading,
            isError,
            errorMessage,
            noResults,
            searchString,
            onCheck,
            onUncheck,
            onExpand,
            onCollapse
        }
    };
};

export default useCheckboxTree;
