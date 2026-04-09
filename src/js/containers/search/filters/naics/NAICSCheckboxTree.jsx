import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, get } from 'lodash-es';
import { isCancel } from 'axios';

import {
    cleanNaicsData,
    incrementNaicsCountAndUpdateUnchecked,
    decrementNaicsCountAndUpdateUnchecked,
    getNaicsNodeFromTree,
    autoCheckNaicsAfterExpand,
    expandNaicsAndAllDescendantParents,
    getFormatedNaicsDataForCheckboxTree,
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


const NAICSCheckboxTree = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);

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
                const node = getNaicsNodeFromTree(nodesLocal, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checkedLocal, ...newChecked]);
    };

    const fetchNAICS = (param = '', resolveLoading = true) => {
        if (request.current) request.current.cancel();

        if (showNoResults) setShowNoResults(false);

        setIsLoading(true);
        const queryParam = isSearch
            ? `?filter=${searchString}`
            : param;

        request.current = naicsRequest(queryParam);

        const isPartialTree = (param !== '' || isSearch);

        return request.current.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const naicsNodes = cleanNaicsData(data.results);

                if (isPartialTree) {
                    const key = param.includes('/')
                        ? param.split('/')[1]
                        : param;

                    if (isSearch) {
                        const searchExpandedNodes = expandNaicsAndAllDescendantParents(
                            naicsNodes,
                            'naics'
                        );
                        dispatch(setSearchedNaics(naicsNodes));
                        autoCheckResultDescendants(
                            checked,
                            searchExpandedNodes,
                            naicsNodes
                        );
                        dispatch(setExpandedNaics(searchExpandedNodes, 'SET_SEARCHED_EXPANDED'));

                        if (naicsNodes?.length === 0) {
                            setShowNoResults(true);
                        }
                    }
                    else {
                        dispatch(setNaicsNodes(key, naicsNodes));
                    }

                    // we've searched for a specific naics reference;
                    // ie '11' or '1111' and their immediate descendants should be checked.
                    let modChecked = [];
                    if (checked.includes(key) || checked.includes(`children_of_${key}`)) {
                        // key node is checked.  add children
                        const filteredChecked = checked.filter((ch) => ch !== `children_of_${key}`);
                        const filteredChildren = naicsNodes[0].children
                            .filter((child) => !child.isPlaceholder)
                            .map((child) => child.value);
                        modChecked = [...filteredChecked, ...filteredChildren];

                        if (!checked.includes(key)) {
                            // checked had child placeholder checked
                            // parent should be checked
                            modChecked = [...modChecked, key];
                        }
                    }

                    const newChecked = modChecked?.length
                        ? autoCheckNaicsAfterExpand(
                            naicsNodes[0],
                            modChecked,
                            unchecked
                        )
                        : checked;
                    dispatch(setCheckedNaics(newChecked));
                }
                else {
                    dispatch(setNaicsNodes(param, naicsNodes));
                }

                setIsLoading(resolveLoading ? false : isLoading);
                setIsError(false);
                setErrorMessage('');

                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
                    setIsError(true);
                    setErrorMessage(e.message);
                    setIsLoading(false);
                }
                request.current = null;
            });
    };

    const onClear = () => {
        if (request.current) {
            request.current.cancel();
        }

        dispatch(setExpandedNaics([], 'SET_SEARCHED_EXPANDED'));
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setShowNoResults(false);
        dispatch(showNaicsTree());
    };

    const onSearchChange = debounce(() => {
        if (!searchString) {
            onClear();
        }

        fetchNAICS();
    }, 500);

    const onCheck = (newChecked) => {
        // prevent double count
        const stateNewChecked = newChecked?.length > 1
            ? newChecked.filter((id) => !id.includes("children_of_"))
            : newChecked;
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
            fetchNAICS(value);
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
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (nodes.length !== 0) {
            dispatch(showNaicsTree());
        }
        else {
            fetchNAICS()
                .then(() => {
                    if (checkedFromHash.length > 0 && checked.length === 0) {
                        // initial load with hash.  reload or shared hash.
                        dispatch(setNaicsCounts(countsFromHash));
                        const allUniqueAncestors = getAllUniqueAncestors([
                            ...checkedFromHash,
                            ...uncheckedFromHash
                        ]);

                        // Sequentially populate tree.
                        return allUniqueAncestors
                            .reduce((prevPromise, ancestor) => prevPromise
                                .then(() => fetchNAICS(ancestor, false)), Promise.resolve()
                            )
                            .catch((e) => {
                                setIsLoading(false);
                                setIsError(true);
                                setErrorMessage(get(e, 'message', 'Error fetching NAICs.'));
                            });
                    }
                    // consistent return.
                    return Promise.resolve();
                });
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
            dispatch(showNaicsTree());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSearch && isLoading) {
            onSearchChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, isSearch]);


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
                    data={getFormatedNaicsDataForCheckboxTree(nodes)}
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    noResults={showNoResults}
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
