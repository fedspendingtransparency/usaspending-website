/**
  * NAICSSearchContainer.jsx => NAICSCheckboxTree.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { isCancel } from 'axios';

import {
    incrementNaicsCountAndUpdateUnchecked,
    decrementNaicsCountAndUpdateUnchecked,
    getImmediateAncestorNaicsCode,
    getNaicsNodeFromTree,
    autoCheckNaicsAfterExpand,
    expandNaicsAndAllDescendantParents,
    getHighestAncestorNaicsCode
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

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';

const propTypes = {
    stageNaics: PropTypes.func,
    setNaicsNodes: PropTypes.func,
    setExpandedNaics: PropTypes.func,
    setCheckedNaics: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    addCheckedNaics: PropTypes.func,
    showNaicsTree: PropTypes.func,
    setUncheckedNaics: PropTypes.func,
    setNaicsCounts: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.string),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.string),
    countsFromHash: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        subLabel: PropTypes.string,
        count: PropTypes.string,
        value: PropTypes.string
    })),
    nodes: PropTypes.arrayOf(PropTypes.object),
    counts: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    filters: PropTypes.object,
    searchV2: PropTypes.bool
};

const NAICSCheckboxTree = (props) => {
    // const { checkedFromHash, uncheckedFromHash, countsFromHash, nodes } = props;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [requestType, setRequestType] = useState('initial');
    const nodes = useSelector((state) => state.naics.naics.toJS());
    const expanded = useSelector((state) => state.naics.expanded.toJS());
    const searchExpanded = useSelector((state) => state.naics.searchExpanded.toJS());
    const checked = useSelector((state) => state.naics.checked.toJS());
    const counts = useSelector((state) => state.naics.counts.toJS());
    const unchecked = useSelector((state) => state.naics.unchecked.toJS());
    const checkedFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.require);
    const uncheckedFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.exclude);
    const countsFromHash = useSelector((state) => state.appliedFilters.filters.naicsCodes.counts);

    let requestRef = null;

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
                                props.addCheckedNaics(child.value);
                            }
                        }
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                if (!unchecked.includes(grandChild.value)) {
                                    props.addCheckedNaics(grandChild.value);
                                }
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6 && !unchecked.includes(expandedNode)) {
                    props.addCheckedNaics(node.value);
                }
            });
    };

    const fetchNAICS = (param = '', resolveLoading = true) => {
        if (requestRef) requestRef.cancel();
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            setIsLoading(true);
        }

        requestRef = naicsRequest(param || searchParam);

        return requestRef.promise
            .then(({ data: { results } }) => {
                if (isSearch) {
                    const visibleNaicsValues = expandNaicsAndAllDescendantParents(results, 'naics');
                    props.setSearchedNaics(results);
                    autoCheckSearchedResultDescendants(visibleNaicsValues);
                    props.setExpandedNaics(visibleNaicsValues, 'SET_SEARCHED_EXPANDED');
                }
                else {
                    props.setNaicsNodes(param, results);
                }
                // we've searched for a specific naics reference; ie '11' or '1111' and their immediate descendants should be checked.
                if (checked.includes(`children_of_${param}`)) {
                    const newChecked = autoCheckNaicsAfterExpand(
                        results[0],
                        checked,
                        unchecked
                    );
                    props.setCheckedNaics(newChecked);
                }

                setIsLoading(resolveLoading ? false : isLoading);
                setIsError(false);
                setErrorMessage('');
                setRequestType('');
                requestRef = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
                    setIsError(true);
                    setErrorMessage(e.message);
                    setIsLoading(false);
                    setRequestType('');
                }
                requestRef = null;
            });
    };

    const loadCheckedFromHash = () => {
        const newChecked = checkedFromHash
            .reduce((acc, hashChecked) => {
                if (hashChecked.length === 6 && !uncheckedFromHash.includes(hashChecked)) {
                    return [...acc, hashChecked];
                }
                const node = getNaicsNodeFromTree(nodes, hashChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node, uncheckedFromHash)
                ];
            }, []);
        props.setCheckedNaics(newChecked);

        props.setNaicsCounts(countsFromHash);
        props.stageNaics(newChecked, [], countsFromHash);
        return Promise.resolve();
    };

    const onClear = () => {
        if (requestRef) requestRef.cancel();
        props.setExpandedNaics([], 'SET_SEARCHED_EXPANDED');
        props.showNaicsTree();
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setRequestType('');
    };

    const onSearchChange = debounce(() => {
        if (!searchString) return onClear();

        setRequestType('search');
        setIsSearch(true);
        setIsLoading(true);
        return fetchNAICS();
    }, 500);

    const onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
            newChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        props.setNaicsCounts(newCounts);
        props.setCheckedNaics(newChecked);
        props.setUncheckedNaics(newUnchecked);
        props.stageNaics(newChecked, newUnchecked, newCounts);
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

            props.setUncheckedNaics(newUnchecked);
            props.stageNaics(newChecked, newUnchecked, newCounts);
            props.setCheckedNaics(newChecked);
            props.setNaicsCounts(newCounts);
        }
    };

    const onExpand = (value, expandedArr, fetch) => {
        if (fetch && !isSearch) {
            fetchNAICS(value);
        }
        if (isSearch) {
            props.setExpandedNaics(expandedArr, 'SET_SEARCHED_EXPANDED');
        }
        else {
            props.setExpandedNaics(expandedArr);
        }
    };

    const onCollapse = (expandedArr) => {
        if (isSearch) {
            props.setExpandedNaics(expandedArr, 'SET_SEARCHED_EXPANDED');
        }
        else {
            props.setExpandedNaics(expandedArr);
        }
    };

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) return onClear();

        setSearchString(text);

        if (text.length >= 2) {
            setIsSearch(true);
            return onSearchChange();
        }

        return null;
    };

    const showNoResults = () => {
        if (isLoading) return false;
        return nodes.length === 0;
    };

    useEffect(() => {
        console.log("nodes  ::::::::: ", nodes);

        if (nodes.length !== 0 && checkedFromHash.length) {
            loadCheckedFromHash();
        }
        else if (nodes.length !== 0) {
            props.showNaicsTree();
            // return Promise.resolve();
        }
        if (nodes.length === 0) {
            console.log("nodes.lenth === 0");
            fetchNAICS()
                .then(() => {
                    if (checkedFromHash.length > 0) {
                        props.setNaicsCounts(countsFromHash);
                        props.setUncheckedNaics(uncheckedFromHash);
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
                                loadCheckedFromHash();
                            });
                    }
                    console.log("nodes.length :::::: 0", props);
                    if (nodes.length > 0) {
                        props.showNaicsTree();
                    }
                    // consistent return.
                    return Promise.resolve();
                })
                .catch((e) => {
                    console.log("Error: fetching naics on didMount", e);
                });
        }

        return () => {
            if (requestRef) {
                requestRef.cancel();
            }
            props.showNaicsTree();
        };
    }, []);

    useEffect(() => {
        if (checked.length === 0 && counts.length !== 0) {
            props.setNaicsCounts([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked.length, counts.length]);


    const checkboxDiv = () => (
        <CheckboxTree
            limit={3}
            data={nodes}
            isError={isError}
            errorMessage={errorMessage}
            isLoading={isLoading}
            noResults={showNoResults}
            checked={checked}
            expanded={isSearch ? searchExpanded : expanded}
            searchText={searchString}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onUncheck={onUncheck}
            onCheck={onCheck} />
    );

    return (
        <div>
            <div className="naics-search-container">
                <EntityDropdownAutocomplete
                    placeholder="Type to find codes"
                    searchString={searchString}
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    loading={false}
                    isClearable
                    onClear={onClear} />
                {checkboxDiv()}
            </div>
        </div>
    );
};

NAICSCheckboxTree.propTypes = propTypes;

export default connect(null,
    (dispatch) => ({
        stageNaics: (checked, unchecked, counts) => dispatch(updateNaics(checked, unchecked, counts)),
        setNaicsNodes: (key, naics) => dispatch(setNaicsNodes(key, naics)),
        setExpandedNaics: (expanded, type) => dispatch(setExpandedNaics(expanded, type)),
        setCheckedNaics: (checkedNodes) => dispatch(setCheckedNaics(checkedNodes)),
        addCheckedNaics: (newCheckedNode) => dispatch(addCheckedNaics(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree()),
        setUncheckedNaics: (unchecked) => dispatch(setUncheckedNaics(unchecked)),
        setNaicsCounts: (newCounts) => dispatch(setNaicsCounts(newCounts))
    }))(NAICSCheckboxTree);
