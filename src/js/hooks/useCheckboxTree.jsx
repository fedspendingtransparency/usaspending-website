import { useEffect, useMemo, useState } from 'react';
import { debounce, get } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors,
    stateEqualityCheck
} from 'helpers/checkboxTreeHelper';
import { useFetchCheckboxTree } from 'hooks/useFetchCheckboxTree';

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
    const nodes = useSelector((state) => state[stateKey][stateKey].toJS());
    const expanded = useSelector((state) => state[stateKey].expanded.toJS());
    const searchExpanded = useSelector((state) => state[stateKey].searchExpanded.toJS());
    const checked = useSelector((state) => state[stateKey].checked.toJS());
    const unchecked = useSelector((state) => state[stateKey].unchecked.toJS());
    const counts = useSelector((state) => state[stateKey].counts.toJS());
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
    const applyFetchedNodes = (id, isSearchFlag, newNodes) => {
        const isPartialTree = (id !== '' || isSearchFlag);

        if (!isPartialTree) {
            // populating tree trunk
            dispatch(actions.setNodes('', newNodes));
            return;
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

        if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
            // key node is checked.  add children
            const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
            modChecked = [...filteredChecked, ...newNodes.map((child) => child.value)];

            if (!checked.includes(key)) {
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
            checked;

        dispatch(actions.setChecked(newChecked));
    };

    // fetches each ancestor branch one at a time so the tree is fully
    // populated before the restored checked/unchecked state is applied
    const preloadAncestors = async (params) => {
        setIsPreloading(true);
        try {
            for (const param of params) {
                const { data } = await queryClient.fetchQuery({
                    queryKey: [stateKey, param],
                    queryFn: () => fetchFn(param).promise
                });
                applyFetchedNodes(param, false, cleanFn(data.results));
            }
        }
        catch (e) {
            setPreloadError(get(e, 'message', `Error fetching ${label}.`));
        }
        finally {
            setIsPreloading(false);
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
    };

    useEffect(() => {
        if (!isLoading) dispatch(actions.showTree());

        return () => {
            debouncedSearch.cancel();
            dispatch(actions.showTree());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // reacts to the hook-driven fetch (root load / expand / search) succeeding
    useEffect(() => {
        if (!activeRequest || !isSuccess) return;

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

    return {
        searchString,
        onClear,
        handleTextInputChange,
        // spread onto <CheckboxTree />
        treeProps: {
            data: sortNodes ? [...nodes].sort(sortNodes) : nodes,
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
