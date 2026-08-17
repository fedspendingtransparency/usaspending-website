import React, { useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { debounce, get } from 'lodash-es';
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
    trimCheckedToCommonAncestors,
    stateEqualityCheck
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
    const {
        require: checkedFromHash,
        exclude: uncheckedFromHash,
        counts: countsFromHash
    } = useSelector((state) => state.appliedFilters.filters.pscCodes);
    const {
        require: checkedStaged,
        exclude: uncheckedStaged
    } = useSelector((state) => state.filters.pscCodes);


    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);

    const request = useRef(null);

    const autoCheckResultDescendants = (checkedLocal, expandedLocal, nodesLocal) => {
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

        setIsLoading(true);
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

                        dispatch(setExpandedPsc(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));

                        if (pscNodes.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        dispatch(setPscNodes(key, pscNodes));
                    }

                    let modChecked = [];

                    if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        modChecked = [...filteredChecked, ...pscNodes.map((child) => child.value)];

                        if (!checked.includes(key)) {
                            // checked had child placeholder checked
                            // parent should be checked
                            modChecked = [...modChecked, key];
                        }
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

                setIsLoading(resolveLoadingIndicator ? false : isLoading);

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

    // eslint-disable-next-line react-hooks/refs
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
        if (nodes.length !== 0) {
            dispatch(showPscTree());
        }
        else {
            fetchPscLocal()
                .then(() => {
                    if (checkedFromHash.length > 0) {
                        dispatch(setPscCounts(countsFromHash));

                        const allUniqueAncestors = getUniqueAncestorPaths(
                            checkedFromHash,
                            uncheckedFromHash
                        );

                        return allUniqueAncestors
                            .reduce((prevPromise, param) => prevPromise
                                // fetch the all the ancestors of the checked nodes
                                .then(() => fetchPscLocal(param, null, false)), Promise.resolve([])
                            )
                            .catch((e) => {
                                setIsLoading(false);
                                setIsError(true);
                                setErrorMessage(get(e, 'message', 'Error fetching PSC.'));
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

    useEffect(() => {
        if (nodes.length && (checkedFromHash.length || checkedStaged.length)) {
            let checkedArray = checkedFromHash;
            let uncheckedArray = uncheckedFromHash;

            if (!checked.length && checkedStaged.length) {
                if (!stateEqualityCheck(checkedFromHash, checkedStaged)) {
                    checkedArray = checkedStaged;
                    uncheckedArray = uncheckedStaged;
                }

                let autoChecked = autoCheckResultDescendants(
                    checkedArray.map((ancestor) => {
                        if (ancestor.includes('/')) {
                            return ancestor.split('/')[1];
                        }
                        return ancestor;
                    }),
                    expanded,
                    nodes
                );

                const allUniqueAncestors = getUniqueAncestorPaths(
                    checkedArray,
                    uncheckedArray
                );
                autoChecked = Array.from(autoChecked, (check) => check.at(-1));
                const toExpand = allUniqueAncestors.map((ancestor) => {
                    if (ancestor.includes('/')) {
                        return ancestor.split('/')[1];
                    }
                    return ancestor;
                });

                dispatch(setCheckedPsc(autoChecked));
                dispatch(setExpandedPsc(toExpand));
            }
        }
    }, [nodes, checkedFromHash, checkedStaged, checked]);

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
