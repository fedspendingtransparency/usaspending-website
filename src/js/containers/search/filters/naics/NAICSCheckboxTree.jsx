import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash-es';
import { isCancel } from 'axios';

import {
    incrementNaicsCountAndUpdateUnchecked,
    decrementNaicsCountAndUpdateUnchecked,
    getImmediateAncestorNaicsCode,
    getNaicsNodeFromTree,
    autoCheckNaicsAfterExpand,
    expandNaicsAndAllDescendantParents,
    getHighestAncestorNaicsCode,
    getFormatedNaicsDataForCheckboxTree
} from 'helpers/naicsHelper';
import {
    getAllDescendants
} from 'helpers/checkboxTreeHelper';
import { naicsRequest } from 'helpers/searchHelper';
import {
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    addCheckedNaics,
    showNaicsTree,
    setUncheckedNaics,
    setNaicsCounts
} from 'redux/actions/search/naicsActions';
import { updateNaics } from 'redux/actions/search/searchFilterActions';
import NewCheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';


const NAICSCheckboxTree = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [requestType, setRequestType] = useState('initial');
    const [showNoResults, setShowNoResults] = useState(false);

    const nodes = useSelector((state) => state.naics.naics.toJS());
    const expanded = useSelector((state) => state.naics.expanded.toJS());
    const searchExpanded = useSelector((state) => state.naics.searchExpanded.toJS());
    const checked = useSelector((state) => state.naics.checked.toJS());
    const unchecked = useSelector((state) => state.naics.unchecked.toJS());
    const counts = useSelector((state) => state.naics.counts.toJS());
    const checkedFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.require);
    const uncheckedFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.exclude);
    const countsFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.counts);

    const dispatch = useDispatch();
    const request = useRef(null);

    const autoCheckSearchedResultDescendants = (visibleNaicsValues) => {
        const placeholderNodes = checked
            .filter((node) => node.includes('children_of_'))
            .map((node) => node.split('children_of_')[1]);

        // this will never have grandchildren
        const expandedNodesWithMockAncestorChecked = visibleNaicsValues
            .filter((naicsCode) => {
                const parentKey = `${naicsCode[0]}${naicsCode[1]}`;
                const isCheckedByPlaceholder = (
                    placeholderNodes.includes(parentKey) || // ie 11
                    placeholderNodes.includes(naicsCode) // ie 1123
                );
                const isUnchecked = (
                    unchecked.includes(naicsCode)
                );
                return (isCheckedByPlaceholder && !isUnchecked);
            });

        expandedNodesWithMockAncestorChecked
            .forEach((expandedNode) => {
                // use reusable recursive fn here...?
                const node = getNaicsNodeFromTree(nodes, expandedNode);
                if (node.children) {
                    node.children.forEach((child) => {
                        if (!child.children) {
                            if (!unchecked.includes(child.value)) {
                                dispatch(addCheckedNaics(child.value));
                            }
                        }
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                if (!unchecked.includes(grandChild.value)) {
                                    dispatch(addCheckedNaics(grandChild.value));
                                }
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6 && !unchecked.includes(expandedNode)) {
                    dispatch(addCheckedNaics(node.value));
                }
            });
    };

    const fetchNAICS = (param = '', resolveLoading = true) => {
        if (request.current) {
            request.current.cancel();
        }

        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;

        if (requestType === 'initial' || requestType === 'search') {
            setIsLoading(true);
        }

        request.current = naicsRequest(param || searchParam);

        return request.current.promise
            .then(({ data: { results } }) => {
                if (isSearch) {
                    const visibleNaicsValues = expandNaicsAndAllDescendantParents(results, 'naics');
                    dispatch(setSearchedNaics(results));
                    autoCheckSearchedResultDescendants(checked, visibleNaicsValues);
                    dispatch(setExpandedNaics(visibleNaicsValues, 'SET_SEARCHED_EXPANDED'));
                }
                else {
                    dispatch(setNaicsNodes(param, results));
                }
                // we've searched for a specific naics reference; ie '11' or '1111'
                // and their immediate descendants should be checked.
                if (checked.includes(`children_of_${param}`)) {
                    const newChecked = autoCheckNaicsAfterExpand(
                        results[0],
                        checked,
                        unchecked
                    );
                    dispatch(setCheckedNaics(newChecked));
                }
                setIsLoading(resolveLoading ? false : isLoading);
                setIsError(false);
                setErrorMessage('');
                setRequestType('');

                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
                    setIsError(true);
                    setErrorMessage(e.message);
                    setIsLoading(false);
                    setRequestType('');
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
        setRequestType('');
        dispatch(showNaicsTree());
    };

    const onSearchChange = debounce(() => {
        if (!searchString) {
            onClear();
        }

        setRequestType('search');
        fetchNAICS();
    }, 500);

    const onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
            newChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        dispatch(setNaicsCounts(newCounts));
        dispatch(setCheckedNaics(newChecked));
        dispatch(setUncheckedNaics(newUnchecked));
        dispatch(updateNaics(newChecked, newUnchecked, newCounts));
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
        if (nodes.length !== 0 && checkedFromHash.length) {
            const newChecked = checkedFromHash
                .reduce((acc, checkedNaic) => {
                    if (checkedNaic.length === 6 && !uncheckedFromHash.includes(checkedNaic)) {
                        return [...acc, checkedNaic];
                    }
                    const node = getNaicsNodeFromTree(nodes, checkedNaic);
                    return [
                        ...acc,
                        ...getAllDescendants(node, uncheckedFromHash)
                    ];
                }, []);
            dispatch(setCheckedNaics(newChecked));
            dispatch(setNaicsCounts(countsFromHash));
            dispatch(updateNaics(newChecked, [], countsFromHash));
        }
        else if (nodes.length !== 0) {
            dispatch(showNaicsTree());
        }
        else {
            fetchNAICS()
                .then(() => {
                    if (checkedFromHash.length > 0) {
                        dispatch(setNaicsCounts(countsFromHash));
                        dispatch(setUncheckedNaics(uncheckedFromHash));
                        // Loading the checkbox tree from a url hash...
                        const allUniqueAncestors = [
                            ...checkedFromHash,
                            ...uncheckedFromHash
                        ].reduce((uniqueAncestors, code) => {
                            const highestAncestor = getHighestAncestorNaicsCode(code);
                            const immediateAncestor = getImmediateAncestorNaicsCode(code);
                            if (uniqueAncestors.includes(highestAncestor)) {
                                if (!uniqueAncestors.includes(immediateAncestor)) {
                                    return uniqueAncestors.concat([immediateAncestor]);
                                }
                                return uniqueAncestors;
                            }
                            return uniqueAncestors.concat(
                                [highestAncestor, immediateAncestor]
                                    .filter((ancestor) => {
                                        if (uniqueAncestors.includes(ancestor)) {
                                            return false;
                                        }
                                        return true;
                                    })
                            );
                        }, []).sort((a, b) => {
                            if (b.length > a.length) return -1;
                            if (a.length > b.length) return 1;
                            return 0;
                        });

                        // Sequentially populate tree.
                        return allUniqueAncestors
                            .reduce((prevPromise, ancestor) => prevPromise
                                .then(() => fetchNAICS(ancestor, false)), Promise.resolve())
                            // Then populate the checked array w/ the real checked-nodes descendants
                            .then(() => {
                                setIsLoading(false);
                                const newChecked = checkedFromHash
                                    .reduce((acc, checkedNaic) => {
                                        if (checkedNaic.length === 6 && !uncheckedFromHash.includes(checkedNaic)) {
                                            return [...acc, checkedNaic];
                                        }
                                        const node = getNaicsNodeFromTree(nodes, checkedNaic);
                                        return [
                                            ...acc,
                                            ...getAllDescendants(node, uncheckedFromHash)
                                        ];
                                    }, []);
                                dispatch(setCheckedNaics(newChecked));
                            });
                    }
                    // consistent return.
                    return Promise.resolve();
                })
                .catch((e) => {
                    console.log("Error: fetching naics on didMount", e);
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
        if (checked.length === 0 && counts.length !== 0) {
            dispatch(setNaicsCounts([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, counts]);

    useEffect(() => {
        if (
            (nodes.length !== 0 && !isSearch) ||
            searchExpanded.length !== 0
        ) {
            setShowNoResults(false);
        }
        else {
            setShowNoResults(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes, searchExpanded]);

    return (
        <div>
            <div className="naics-search-container">
                <EntityDropdownAutocomplete
                    placeholder="Search filters..."
                    searchString={searchString}
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    loading={false}
                    isClearable
                    onClear={onClear}
                    searchIcon />
                <NewCheckboxTree
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
