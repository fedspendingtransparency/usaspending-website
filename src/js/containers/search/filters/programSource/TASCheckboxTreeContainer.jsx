import React, { useEffect, useState, useRef } from 'react';
import { isCancel } from 'axios';
import { debounce, get } from 'lodash-es';
import { useSelector, useDispatch } from 'react-redux';

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

    const request = useRef(null);
    const dispatch = useDispatch();

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
                    // parsing the prepended agency
                    // (format in url is agencyId/federalAccountId
                    // when fetching federalAccount level data)
                    const key = id.includes('/')
                        ? id.split('/')[1]
                        : id;

                    if (isSearch) {
                        const searchExpandedNodes = expandTasNodeAndAllDescendantParents(tasNodes);
                        dispatch(setSearchedTas(tasNodes));

                        dispatch(setExpandedTas(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));

                        if (tasNodes.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        dispatch(setTasNodes(key, tasNodes));
                    }

                    let modChecked = [];

                    if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        modChecked = [...filteredChecked, ...tasNodes.map((child) => child.value)];

                        if (!checked.includes(key)) {
                            // checked had child placeholder checked
                            // parent should be checked
                            modChecked = [...modChecked, key];
                        }
                    }

                    const newChecked = modChecked?.length
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

                setIsLoading(resolveLoadingIndicator ? false : isLoading);

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
            if (treeDepth >= 1) {
                if (treeDepth === 2) {
                    fetchTasLocal(
                        `${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`
                    );
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
        if (!searchString) {
            onClear();
        }

        fetchTasLocal('', searchString);
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
            newChecked.filter((id) => !id.includes("children_of_")) :
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
            setIsLoading(true);
        }
    };


    useEffect(() => {
        if (nodes.length !== 0) {
            dispatch(showTasTree());
        }
        else {
            fetchTasLocal()
                .then(() => {
                    if (checkedFromHash.length || checkedStaged.length) {
                        const useHash = stateEqualityCheck(checkedFromHash, checkedStaged);
                        const checkedArray = useHash ? checkedFromHash : checkedStaged;
                        const uncheckedArray = useHash ? uncheckedFromHash : uncheckedStaged;
                        const countsToSet = useHash ? countsFromHash : countsStaged;

                        dispatch(setTasCounts(countsToSet));

                        const allUniqueAncestors = getUniqueAncestorPaths(
                            checkedArray,
                            uncheckedArray
                        );
                        return allUniqueAncestors
                            .reduce((prevPromise, param) => prevPromise
                            // fetch the all the ancestors of the checked nodes
                                .then(() => fetchTasLocal(param, null, false)), Promise.resolve([])
                            )
                            .catch((e) => {
                                setIsLoading(false);
                                setIsError(true);
                                setErrorMessage(get(e, 'message', 'Error fetching TAS.'));
                            });
                    }

                    // just do this for consistent return.
                    return Promise.resolve();
                });
        }

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

    useEffect(() => {
        if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
            let checkedArray = checkedFromHash;
            let uncheckedArray = uncheckedFromHash;

            if (!checked.length) {
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
