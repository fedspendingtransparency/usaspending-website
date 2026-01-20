import React, { useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { debounce, get, flattenDeep } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';

import {
    cleanPscData,
    incrementPscCountAndUpdateUnchecked,
    decrementPscCountAndUpdateUnchecked,
    autoCheckPscAfterExpand,
    expandPscNodeAndAllDescendantParents,
    getPscNodeFromTree,
    getPscAncestryPathForChecked
} from 'helpers/pscHelper';
import { fetchPsc } from 'helpers/searchHelper';
import {
    getAllDescendants,
    removePlaceholderString,
    getUniqueAncestorPaths,
    trimCheckedToCommonAncestors
} from 'helpers/checkboxTreeHelper';
import { updatePSC } from 'redux/actions/search/searchFilterActions';
import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from 'components/sharedComponents/EntityDropdownAutocomplete';
import {
    setCheckedPsc,
    setExpandedPsc,
    setPscCounts,
    setPscNodes,
    setSearchedPsc, setUncheckedPsc, showPscTree
} from "redux/actions/search/pscActions";

const PSCCheckboxTreeContainer = () => {
    const nodes = useSelector((state) => state.psc.psc.toJS());
    const expanded = useSelector((state) => state.psc.expanded.toJS());
    const searchExpanded = useSelector((state) => state.psc.searchExpanded.toJS());
    const checked = useSelector((state) => state.psc.checked.toJS());
    const unchecked = useSelector((state) => state.psc.unchecked.toJS());
    const counts = useSelector((state) => state.psc.counts.toJS());
    const checkedFromHash = useSelector((state) => state.appliedFilters.filters.pscCodes.require);
    const uncheckedFromHash = useSelector((state) => state.appliedFilters.filters.pscCodes.exclude);
    const countsFromHash = useSelector((state) => state.appliedFilters.filters.pscCodes.counts);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);
    const [newCheck, setNewCheck] = useState([]);
    const [uncheckedFromHashLocal, setUncheckedFromHashLocal] = useState([]);

    const nodesRef = useRef(true);
    const request = useRef(null);

    const autoCheckSearchResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
        const newChecked = expandedLocal
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checkedLocal.includes(`children_of_${expandedNode}`)) return true;
                return !!checkedLocal.includes(expandedNode);
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                const node = getPscNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal, ...newChecked]);
    };


    const fetchPscLocal = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (request.current) {
            request.current.cancel();
        }

        if (showNoResults) {
            setShowNoResults(false);
        }

        const queryParam = (isSearch && searchStr.length > 0) ?
            `?depth=-1&filter=${searchStr}` :
            id;

        request.current = fetchPsc(queryParam);

        const isPartialTree = (
            id !== '' ||
            isSearch
        );

        return request.current.promise
            .then(({ data }) => {
                setIsLoading(true);

                // dynamically populating tree branches
                const pscNodes = cleanPscData(data.results);

                if (isPartialTree) {
                    // parsing the prepended agency
                    // (format in url is agencyId/federalAccountId
                    // when fetching federalAccount level data)
                    const key = id.includes('/') ? id.split('/').pop() : id;

                    if (isSearch) {
                        const searchExpandedNodes = expandPscNodeAndAllDescendantParents(pscNodes);
                        dispatch(setSearchedPsc(pscNodes));

                        autoCheckSearchResultDescendants(
                            checked,
                            searchExpandedNodes,
                            nodes
                        );

                        dispatch(setExpandedPsc(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));

                        if (pscNodes.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        dispatch(setPscNodes(key, pscNodes));
                    }

                    let modChecked = [];

                    if (checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        modChecked = [...filteredChecked, ...pscNodes.map((child) => child.value)];
                    }

                    const newChecked = modChecked?.length
                        ? autoCheckPscAfterExpand(
                            { children: pscNodes, value: key },
                            modChecked,
                            unchecked
                        )
                        : checked;

                    dispatch(setCheckedPsc(newChecked));
                }
                else {
                    // populating tree trunk
                    dispatch(setPscNodes('', pscNodes));
                }

                if (resolveLoadingIndicator) {
                    setIsLoading(false);
                }

                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log("error fetching PSC", e);

                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage(get(e, 'message', 'Error fetching PSC.'));
                }
                request.current = null;
            });
    };

    const onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        const treeDepth = selectedNode.ancestors?.length;

        if (shouldFetchChildren && !isSearch) {
            if (treeDepth >= 1) {
                if (treeDepth === 2) {
                    fetchPscLocal(
                        `${selectedNode.ancestors[0]}/${selectedNode.ancestors[1]}/${expandedValue}`
                    );
                }
                else {
                    fetchPscLocal(`${selectedNode.ancestors[0]}/${expandedValue}`);
                }
            }
            else {
                fetchPscLocal(expandedValue);
            }
        }
        if (isSearch) {
            dispatch(setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedPsc(newExpandedArray));
        }
    };

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1 ?
            newChecked.filter((id) => !id.includes("children_of_")) :
            newChecked;
        const [newCounts, newUnchecked] = incrementPscCountAndUpdateUnchecked(
            stateNewChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        dispatch(setCheckedPsc(newChecked));
        dispatch(setPscCounts(newCounts));
        dispatch(setUncheckedPsc(newUnchecked));
        dispatch(updatePSC(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)),
            getPscAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        ));
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementPscCountAndUpdateUnchecked(
            uncheckedNode,
            unchecked,
            checked,
            counts,
            nodes
        );

        dispatch(setCheckedPsc(newChecked));
        dispatch(setPscCounts(newCounts));
        dispatch(setUncheckedPsc(newUnchecked));
        dispatch(updatePSC(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, nodes)),
            getPscAncestryPathForChecked(newUnchecked, nodes),
            newCounts
        ));
    };

    const onClear = () => {
        if (request.current) {
            request.current.cancel();
        }

        dispatch(setExpandedPsc([], 'SET_SEARCHED_EXPANDED'));
        dispatch(showPscTree());

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

        fetchPscLocal('', searchString);
    }, 500);

    const onCollapse = (newExpandedArray) => {
        if (isSearch) {
            dispatch(setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED'));
        }
        else {
            dispatch(setExpandedPsc(newExpandedArray));
        }
    };

    const setCheckedStateFromUrlHash = (newChecked) => {
        setNewCheck(newChecked);
        setUncheckedFromHashLocal(uncheckedFromHash.map((ancestryPath) => ancestryPath.pop()));
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
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (nodes.length !== 0 && checkedFromHash.length) {
            setCheckedStateFromUrlHash(
                checkedFromHash.map((ancestryPath) => ancestryPath[ancestryPath.length - 1])
            );
            dispatch(setPscCounts(countsFromHash));
            dispatch(updatePSC(
                trimCheckedToCommonAncestors(getPscAncestryPathForChecked(checked, nodes)),
                getPscAncestryPathForChecked(unchecked, nodes),
                counts
            ));
        }
        else if (nodes.length !== 0) {
            dispatch(showPscTree());
        }
        else {
            fetchPscLocal('', null, false)
                .then(() => {
                    if (checkedFromHash.length > 0) {
                        dispatch(setPscCounts(countsFromHash));
                        return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                            .reduce((prevPromise, param) => prevPromise
                            // fetch the all the ancestors of the checked nodes
                                .then(() => fetchPscLocal(param, null, false)), Promise.resolve([])
                            )
                            .then(() => {
                                setCheckedStateFromUrlHash(
                                    checkedFromHash.map(
                                        (ancestryPath) => ancestryPath[ancestryPath.length - 1]
                                    )
                                );
                                dispatch(setExpandedPsc([
                                    ...new Set(
                                        checkedFromHash.map((ancestryPath) => ancestryPath[0])
                                    )
                                ]));
                            })
                            .catch((e) => {
                                setIsLoading(false);
                                setIsError(true);
                                setErrorMessage(get(e, 'message', 'Error fetching PSC.'));
                            });
                    }
                    setIsLoading(false);

                    // just do this for consistent return.
                    return Promise.resolve();
                });
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
            dispatch(showPscTree());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSearch && isLoading) {
            onSearchChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearch, searchString]);

    // for properly setting checked state from hash
    useEffect(() => {
        if (nodes.length > 0 && nodesRef.current) {
            const newCheckedWithPlaceholders = flattenDeep(newCheck
                .map((check) => getAllDescendants(
                    getPscNodeFromTree(nodes, check), uncheckedFromHashLocal)
                )
            );

            if (newCheckedWithPlaceholders.length > 0) {
                dispatch(setCheckedPsc(newCheckedWithPlaceholders));
                dispatch(setUncheckedPsc(uncheckedFromHashLocal));
                nodesRef.current = false;
            }

            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes]);

    return (
        <div className="search-option">
            <div className="psc-search-container">
                <EntityDropdownAutocomplete
                    placeholder="Type at least 2 letters..."
                    searchString={searchString}
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    isClearable
                    loading={false}
                    onClear={onClear}
                    searchIcon />
                <CheckboxTree
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    data={nodes}
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
        </div>
    );
};

export default PSCCheckboxTreeContainer;
