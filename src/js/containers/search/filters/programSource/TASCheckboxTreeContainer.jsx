import React, { useEffect, useState } from 'react';
import { debounce, get } from 'lodash-es';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    autoCheckTasAfterExpand,
    expandTasNodeAndAllDescendantParents,
    getTasNodeFromTree,
    getTasAncestryPathForChecked
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';
import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors,
    stateEqualityCheck
} from 'helpers/checkboxTreeHelper';
import {
    setTasNodes,
    showTasTree,
    setExpandedTas,
    setCheckedTas,
    setUncheckedTas,
    setSearchedTas,
    setTasCounts
} from 'redux/actions/search/tasActions';
import { updateTAS } from 'redux/actions/search/searchFilterActions';

import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from
    'components/sharedComponents/EntityDropdownAutocomplete';
import { autocompletePlaceholder } from 'helpers/search/filterCheckboxHelper';
import { useFetchTas } from './useFetchTas';

const TASCheckboxTree = () => {
    const nodes = useSelector((state) => state.tas.tas.toJS());

    const [searchString, setSearchString] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isPreloading, setIsPreloading] = useState(false);
    const [isSearchPending, setIsSearchPending] = useState(false);
    const [preloadError, setPreloadError] = useState(null);
    const [activeRequest, setActiveRequest] = useState({ id: '', searchStr: '', isSearch: false });

    // state variables
    const expanded = useSelector((state) => state.tas.expanded.toJS());
    const searchExpanded = useSelector((state) => state.tas.searchExpanded.toJS());
    const checked = useSelector((state) => state.tas.checked.toJS());
    const unchecked = useSelector((state) => state.tas.unchecked.toJS());
    const counts = useSelector((state) => state.tas.counts.toJS());
    const {
        require: checkedFromHash,
        exclude: uncheckedFromHash,
        counts: countsFromHash
    } = useSelector((state) => state.appliedFilters.filters.tasCodes);
    const {
        require: checkedStaged,
        exclude: uncheckedStaged,
        counts: countsStaged
    } = useSelector((state) => state.filters.tasCodes);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const queryParam = activeRequest ?
        (activeRequest.isSearch ? `?depth=2&filter=${activeRequest.searchStr}` : activeRequest.id) :
        undefined;
    const {
        tasNodes, noResults, isSuccess, isLoading: queryIsLoading, isError: queryIsError, error: queryError
    } = useFetchTas(queryParam, activeRequest?.isSearch, !!activeRequest);

    const isLoading = queryIsLoading || isPreloading || isSearchPending;
    const isError = queryIsError || !!preloadError;
    const errorMessage = preloadError || (queryError ? get(queryError, 'message', 'Error fetching TAS.') : '');

    const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
        const newChecked = expandedLocal
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
                return !!checkedLocal.includes(expandedNode);
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                const node = getTasNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal.flat(), ...newChecked.flat()]);
    };

    // shared by the interactive fetch path and the hash-restoration preload batch
    const applyFetchedNodes = (id, isSearchFlag, fetchedNodes) => {
        const isPartialTree = (id !== '' || isSearchFlag);

        if (!isPartialTree) {
            // populating tree trunk
            dispatch(setTasNodes('', fetchedNodes));
            return;
        }

        // parsing the prepended agency
        // (format in url is agencyId/federalAccountId
        // when fetching federalAccount level data)
        const key = id.includes('/') ?
            id.split('/')[1] :
            id;

        if (isSearchFlag) {
            const searchExpandedNodes = expandTasNodeAndAllDescendantParents(fetchedNodes);
            dispatch(setSearchedTas(fetchedNodes));

            dispatch(setExpandedTas(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setTasNodes(key, fetchedNodes));
        }

        let modChecked = [];

        if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
            // key node is checked.  add children
            const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
            modChecked = [...filteredChecked, ...fetchedNodes.map((child) => child.value)];

            if (!checked.includes(key)) {
                // checked had child placeholder checked
                // parent should be checked
                modChecked = [...modChecked, key];
            }
        }

        const newChecked = modChecked?.length ?
            autoCheckTasAfterExpand(
                { children: fetchedNodes, value: key },
                modChecked,
                unchecked
            ) :
            checked;

        dispatch(setCheckedTas(newChecked));
    };

    const triggerFetch = (id = '', searchStr = '') => {
        setIsSearchPending(false);
        setActiveRequest({ id, searchStr, isSearch });
    };

    // fetches each ancestor branch one at a time so the tree is fully
    // populated before the restored checked/unchecked state is applied
    const preloadAncestors = async (params) => {
        setIsPreloading(true);
        try {
            for (const param of params) {
                const { data } = await queryClient.fetchQuery({
                    queryKey: ['tas', param],
                    queryFn: () => fetchTas(param).promise
                });
                applyFetchedNodes(param, false, cleanTasData(data.results));
            }
        }
        catch (e) {
            setPreloadError(get(e, 'message', 'Error fetching TAS.'));
        }
        finally {
            setIsPreloading(false);
        }
    };

    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        const treeDepth = selectedNode.ancestors?.length;

        if (shouldFetchChildren && !isSearch) {
            if (treeDepth >= 1) {
                if (treeDepth === 2) {
                    triggerFetch(
                        `${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`
                    );
                }
                else {
                    triggerFetch(`${selectedNode.ancestors[0]}/${expandedValue}`);
                }
            }
            else {
                triggerFetch(expandedValue);
            }
        }
        if (isSearch) {
            dispatch(setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedTas(newExpandedArray));
        }
    };

    const onClear = () => {
        setActiveRequest(null);
        dispatch(setExpandedTas([], 'SET_SEARCHED_EXPANDED'));
        dispatch(showTasTree());
        setIsSearch(false);
        setIsSearchPending(false);
        setSearchString('');
        setPreloadError(null);
    };

    const onSearchChange = debounce((text) => {
        triggerFetch('', text);
    }, 500);

    const onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(
            uncheckedNode,
            unchecked,
            checked,
            counts,
            nodes
        );

        dispatch(setCheckedTas(newChecked));
        dispatch(setTasCounts(newCounts));
        dispatch(setUncheckedTas(newUnchecked));
        dispatch(updateTAS(
            trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)),
            getTasAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        ));
    };

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1 ?
            newChecked.filter((id) => !id.includes('children_of_')) :
            newChecked;
        const [newCounts, newUnchecked] = incrementTasCountAndUpdateUnchecked(
            stateNewChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        dispatch(setCheckedTas(newChecked));
        dispatch(setTasCounts(newCounts));
        dispatch(setUncheckedTas(newUnchecked));

        dispatch(updateTAS(
            trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, nodes)),
            getTasAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        ));
    };

    const onCollapse = (newExpandedArray) => {
        if (isSearch) {
            dispatch(setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedTas(newExpandedArray));
        }
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            onClear();
        }

        setSearchString(text);
        if (text.length >= 3) {
            setIsSearch(true);
            setIsSearchPending(true);
            onSearchChange(text);
        }
    };

    useEffect(() => {
        if (!isLoading) dispatch(showTasTree());

        return () => {
            dispatch(showTasTree());
        };
    }, [dispatch]);

    // reacts to the interactive hook-driven fetch (root load / expand / search) succeeding
    useEffect(() => {
        if (!activeRequest || !isSuccess) return;

        applyFetchedNodes(activeRequest.id, activeRequest.isSearch, tasNodes);

        const wasRootFetch = activeRequest.id === '' && !activeRequest.isSearch;
        if (wasRootFetch && (checkedFromHash.length || checkedStaged.length)) {
            const useHash = stateEqualityCheck(checkedFromHash, checkedStaged);
            const checkedArray = useHash ? checkedFromHash : checkedStaged;
            const uncheckedArray = useHash ? uncheckedFromHash : uncheckedStaged;
            const countsToSet = useHash ? countsFromHash : countsStaged;

            dispatch(setTasCounts(countsToSet));

            const allUniqueAncestors = getUniqueAncestorPaths(checkedArray, uncheckedArray);
            // intentional: start the ancestor preload batch once the root fetch succeeds -
            // this depends on hash/staged Redux state the fetch itself has no knowledge of
            // eslint-disable-next-line react-hooks/set-state-in-effect
            preloadAncestors(allUniqueAncestors);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasNodes, isSuccess, activeRequest]);

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
                    checkedArray.map(
                        (ancestryPath) => ancestryPath[ancestryPath.length - 1]
                    ),
                    expanded,
                    nodes
                );

                dispatch(setCheckedTas(autoChecked));
                dispatch(setExpandedTas(
                    getUniqueAncestorPaths([...checkedArray, ...uncheckedArray])
                ));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes, checkedFromHash, checkedStaged, checked]);

    return (
        <div className="tas-checkbox">
            <EntityDropdownAutocomplete
                placeholder={autocompletePlaceholder}
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                isClearable
                loading={false}
                onClear={onClear}
                searchIcon />
            <CheckboxTree
                isError={isError}
                errorMessage={errorMessage}
                isLoading={isLoading}
                data={nodes.sort((a, b) => a.label.localeCompare(b.label))}
                checked={checked}
                searchString={searchString}
                noResults={noResults}
                expanded={isSearch ? searchExpanded : expanded}
                isSearch={isSearch}
                onUncheck={onUncheck}
                onCheck={onCheck}
                onExpand={onExpand}
                onCollapse={onCollapse} />
        </div>
    );
};

export default TASCheckboxTree;
