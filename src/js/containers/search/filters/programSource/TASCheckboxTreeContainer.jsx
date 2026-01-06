import React, { useEffect, useState, useRef } from 'react';
import { isCancel } from 'axios';
import { debounce, get, flattenDeep } from 'lodash-es';
import { useSelector, useDispatch } from 'react-redux';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    autoCheckTasAfterExpand,
    expandTasNodeAndAllDescendantParents,
    getTasNodeFromTree,
    getTasAncestryPathForChecked,
    shouldTasNodeHaveChildren
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';
import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors
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
    'components/search/filters/location/EntityDropdownAutocomplete';
import { autocompletePlaceholder } from "helpers/search/filterCheckboxHelper";

const TASCheckboxTree = () => {
    const [searchString, setSearchString] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);

    // state variables
    const nodes = useSelector((state) => state.tas.tas.toJS());
    const expanded = useSelector((state) => state.tas.expanded.toJS());
    const searchExpanded = useSelector((state) => state.tas.searchExpanded.toJS());
    const checked = useSelector((state) => state.tas.checked.toJS());
    const unchecked = useSelector((state) => state.tas.unchecked.toJS());
    const counts = useSelector((state) => state.tas.counts.toJS());
    const checkedFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.require);
    const uncheckedFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.exclude);
    const countsFromHash = useSelector((state) => state.appliedFilters.filters.tasCodes.counts);
    // const filters = useSelector((state) => state.appliedFilters.filter);

    const request = useRef(null);
    const dispatch = useDispatch();

    const autoCheckSearchResultDescendants = () => {
        const newChecked = expanded
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checked.includes(`children_of_${expandedNode}`)) return true;
                if (checked.includes(expandedNode)) return true;
                return false;
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                if (!expandedAndChecked) return acc;
                const node = getTasNodeFromTree(nodes, expandedAndChecked);
                if (shouldTasNodeHaveChildren(node)) {
                    return [...acc, ...node.children.map((tas) => tas.value)];
                }
                return acc;
            }, []);

        return new Set([...checked, ...newChecked]);
    };

    const fetchTasLocal = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (request.current) request.current.cancel();

        if (showNoResults) setShowNoResults(false);

        setIsLoading(true);
        const queryParam = isSearch
            ? `?depth=2&filter=${searchStr}`
            : id;

        request.current = fetchTas(queryParam);

        const isPartialTree = (id !== '' || isSearch);

        return request.current.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const tasNodes = cleanTasData(data.results);
                if (isPartialTree) {
                    // parsing the prepended agency (format in url is agencyId/federalAccountId when fetching federalAccount level data)
                    const key = id.includes('/')
                        ? id.split('/')[1]
                        : id;

                    if (isSearch) {
                        const searchExpandedNodes = expandTasNodeAndAllDescendantParents(tasNodes);
                        dispatch(setSearchedTas(tasNodes));
                        autoCheckSearchResultDescendants(
                            checked,
                            searchExpandedNodes,
                            tasNodes
                        );

                        dispatch(setExpandedTas(
                            expandTasNodeAndAllDescendantParents(searchExpandedNodes), 'SET_SEARCHED_EXPANDED')
                        );

                        if (tasNodes.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        dispatch(setTasNodes(key, tasNodes));
                    }

                    let modChecked = [];

                    if (checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        modChecked = [...filteredChecked, ...tasNodes.map((child) => child.value)];
                    }

                    const newChecked = checked.includes(`children_of_${key}`)
                        ? autoCheckTasAfterExpand(
                            { children: tasNodes, value: key },
                            modChecked,
                            unchecked
                        )
                        : checked;

                    dispatch(setCheckedTas(newChecked));
                }
                else {
                    // populating tree trunk
                    dispatch(setTasNodes('', tasNodes));
                }

                if (resolveLoadingIndicator) {
                    setIsLoading(false);
                }

                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log("error fetching TAS", e);
                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage(get(e, 'message', 'Error fetching TAS.'));
                }
                request.current = null;
            });
    };


    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        const treeDepth = selectedNode.ancestors?.length;
        if (shouldFetchChildren && !isSearch) {
            setIsLoading(true);
            if (treeDepth >= 1) {
                if (treeDepth === 2) {
                    fetchTasLocal(`${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`);
                }
                else {
                    fetchTasLocal(`${selectedNode.ancestors[0]}/${expandedValue}`);
                }
            }
            else {
                fetchTasLocal(expandedValue);
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
        if (request.current) request.current.cancel();
        dispatch(setExpandedTas([], 'SET_SEARCHED_EXPANDED'));
        dispatch(showTasTree());
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setIsError(false);
        setErrorMessage('');
        setShowNoResults(false);
    };

    const onSearchChange = debounce(() => {
        if (!searchString) return onClear();
        return fetchTasLocal('', searchString);
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
        const stateNewChecked = newChecked?.length > 1 ? newChecked.filter((id) => !id.includes("children_of_")) : newChecked;
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

    const setCheckedStateFromUrlHash = (newChecked) => {
        if (nodes.length > 0) {
            uncheckedFromHash.map((ancestryPath) => ancestryPath.pop());
            dispatch(setUncheckedTas(uncheckedFromHash));
            setTimeout(() => {
                const realCheckedWithPlaceholders = flattenDeep(newChecked
                    .map((check) => getAllDescendants(
                        getTasNodeFromTree(nodes, check), uncheckedFromHash)
                    )
                );
                dispatch(setCheckedTas(realCheckedWithPlaceholders));
                setIsLoading(false);
                setIsError(false);
            }, 100);
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
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (nodes.length !== 0 && checkedFromHash.length) {
            setCheckedStateFromUrlHash(checkedFromHash.map((ancestryPath) => ancestryPath.pop()));
            dispatch(setTasCounts(countsFromHash));
            dispatch(updateTAS(
                trimCheckedToCommonAncestors(getTasAncestryPathForChecked(checked, nodes)),
                getTasAncestryPathForChecked(unchecked, nodes),
                countsFromHash
            ));
            return Promise.resolve();
        }
        else if (nodes.length !== 0) {
            dispatch(showTasTree());
            return Promise.resolve();
        }

        fetchTasLocal('')
            .then(() => {
                if (checkedFromHash.length > 0) {
                    dispatch(setTasCounts(countsFromHash));
                    return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                        .reduce((prevPromise, param) => prevPromise
                        // fetch the all the ancestors of the checked nodes
                            .then(() => fetchTasLocal(param, null, false)), Promise.resolve([])
                        )
                        .then(() => {
                            setCheckedStateFromUrlHash(
                                checkedFromHash.map((ancestryPath) => ancestryPath.pop())
                            );

                            dispatch(setExpandedTas([
                                ...new Set(checkedFromHash.map((ancestryPath) => ancestryPath[0]))
                            ]));
                            setIsLoading(true);
                        })
                        .catch((e) => {
                            setIsLoading(false);
                            setIsError(true);
                            setErrorMessage(get(e, 'message', 'Error fetching TAS.'));
                        });
                }
                // just do this for consistent return.
                return Promise.resolve();
            });


        return () => {
            if (request.current) {
                request.current.cancel();
            }
            dispatch(showTasTree());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSearch && isLoading) {
            onSearchChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearch, searchString]);

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
                noResults={showNoResults}
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
