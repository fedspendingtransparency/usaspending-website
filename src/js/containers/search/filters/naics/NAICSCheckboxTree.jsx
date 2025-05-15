/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';
import * as naicsHelper from 'helpers/naicsHelper';
import { getAllDescendants } from 'helpers/checkboxTreeHelper';
import { naicsRequest } from 'helpers/searchHelper';
import * as naicsActions from 'redux/actions/search/naicsActions';
import { updateNaics } from 'redux/actions/search/searchFilterActions';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';
import { bindActionCreators } from 'redux';

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
    searchExpanded: PropTypes.arrayOf(PropTypes.string)
};

const NAICSCheckboxTree = ({
    nodes,
    checked,
    unchecked,
    checkedFromHash,
    uncheckedFromHash,
    countsFromHash,
    counts,
    expanded,
    searchExpanded,
    stageNaics,
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    addCheckedNaics,
    showNaicsTree,
    setUncheckedNaics,
    setNaicsCounts
}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [requestType, setRequestType] = useState('initial');
    const requestRef = useRef(null);

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
                const node = naicsHelper.getNaicsNodeFromTree(nodes, expandedNode);
                if (node.children) {
                    node.children.forEach((child) => {
                        if (!child.children) {
                            if (!unchecked.includes(child.value)) {
                                addCheckedNaics(child.value);
                            }
                        }
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                if (!unchecked.includes(grandChild.value)) {
                                    addCheckedNaics(grandChild.value);
                                }
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6 && !unchecked.includes(expandedNode)) {
                    addCheckedNaics(node.value);
                }
            });
    };

    const fetchNAICS = (param = '', resolveLoading = true) => {
        if (requestRef.current) requestRef.current.cancel();
        const searchParam = (isSearch && searchString) ? `?filter=${searchString}` : null;

        if (requestType === 'initial' || requestType === 'search') setIsLoading(true);

        requestRef.current = naicsRequest(param || searchParam);

        return requestRef.current.promise
            .then(({ data: { results } }) => {
                if (isSearch) {
                    const visibleNaicsValues = naicsHelper.expandNaicsAndAllDescendantParents(results, 'naics');
                    setSearchedNaics(results);
                    autoCheckSearchedResultDescendants(visibleNaicsValues);
                    setExpandedNaics(visibleNaicsValues, 'SET_SEARCHED_EXPANDED');
                }
                else {
                    setNaicsNodes(param, results);
                }
                // we've searched for a specific naics reference; ie '11' or '1111' and their immediate descendants should be checked.
                if (checked.includes(`children_of_${param}`)) {
                    const newChecked = naicsHelper.autoCheckNaicsAfterExpand(
                        results[0],
                        checked,
                        unchecked
                    );
                    setCheckedNaics(newChecked);
                }

                setIsLoading(resolveLoading ? false : isLoading);
                setErrorMessage('');
                setRequestType('');

                requestRef.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
                    setErrorMessage(e.message);
                    setIsLoading(false);
                    setRequestType('');
                }
                requestRef.current = null;
                throw e;
            });
    };

    const onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = naicsHelper.incrementNaicsCountAndUpdateUnchecked(
            newChecked,
            checked,
            unchecked,
            nodes,
            counts
        );

        setNaicsCounts(newCounts);
        setCheckedNaics(newChecked);
        setUncheckedNaics(newUnchecked);
        stageNaics(newChecked, newUnchecked, newCounts);
    };

    const onUncheck = (newChecked, uncheckedNode) => {
        if (uncheckedNode.checked) {
            onCheck(newChecked);
        }
        else {
            const [newCounts, newUnchecked] = naicsHelper.decrementNaicsCountAndUpdateUnchecked(
                uncheckedNode,
                unchecked,
                checked,
                counts,
                nodes
            );

            setUncheckedNaics(newUnchecked);
            stageNaics(newChecked, newUnchecked, newCounts);
            setCheckedNaics(newChecked);
            setNaicsCounts(newCounts);
        }
    };

    const onClear = () => {
        if (requestRef.current) requestRef.current.cancel();
        setExpandedNaics([], 'SET_SEARCHED_EXPANDED');
        showNaicsTree();
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
        setRequestType('');
    };

    const onExpand = (value, newExpandedArray, fetch) => {
        if (fetch && !isSearch) {
            fetchNAICS(value);
        }
        if (isSearch) {
            setExpandedNaics(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedNaics(newExpandedArray);
        }
    };

    const onCollapse = (newExpandedArray) => {
        if (isSearch) {
            setExpandedNaics(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedNaics(newExpandedArray);
        }
    };

    const onSearchChange = debounce(() => {
        if (!searchString) return onClear();

        setRequestType('search');
        setIsSearch(true);
        setIsLoading(true);
        return fetchNAICS();
    }, 500);

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) return onClear();

        setSearchString(text);
        if (text.length >= 2) return onSearchChange();

        return null;
    };

    useEffect(() => {
        if (nodes.length !== 0 && checkedFromHash.length) {
            const newChecked = checkedFromHash
                .reduce((acc, item) => {
                    if (item.length === 6 && !uncheckedFromHash.includes(item)) {
                        return [...acc, item];
                    }
                    const node = naicsHelper.getNaicsNodeFromTree(nodes, item);
                    return [
                        ...acc,
                        ...getAllDescendants(node, uncheckedFromHash)
                    ];
                }, []);

            setCheckedNaics(newChecked);
            setNaicsCounts(countsFromHash);
            stageNaics(newChecked, [], countsFromHash);
            return;
        }
        else if (nodes.length !== 0) {
            showNaicsTree();
            return;
        }

        fetchNAICS()
            .then(() => {
                if (checkedFromHash.length > 0) {
                    setNaicsCounts(countsFromHash);
                    setUncheckedNaics(uncheckedFromHash);
                    // Loading the checkbox tree from a url hash...
                    const allUniqueAncestors = [
                        ...checkedFromHash,
                        ...uncheckedFromHash
                    ].reduce((uniqueAncestors, code) => {
                        const highestAncestor = naicsHelper.getHighestAncestorNaicsCode(code);
                        const immediateAncestor = naicsHelper.getImmediateAncestorNaicsCode(code);
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
                                .reduce((acc, item) => {
                                    if (item.length === 6 && !uncheckedFromHash.includes(item)) {
                                        return [...acc, item];
                                    }
                                    const node = naicsHelper.getNaicsNodeFromTree(nodes, item);
                                    return [
                                        ...acc,
                                        ...getAllDescendants(node, uncheckedFromHash)
                                    ];
                                }, []);
                            setCheckedNaics(newChecked);
                        });
                }
                console.log("Marko.");

                if (nodes.length > 0) {
                    console.log("I should be seen.");
                    showNaicsTree();
                }

                console.log("end of getNaicsData ==> showing tree now", nodes);

                // consistent return.
                return Promise.resolve();
            })
            .catch((e) => {
                setErrorMessage(e.message);
                setIsLoading(false);
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (checked.length === 0 && counts.length !== 0) {
            setNaicsCounts([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked.length, counts.length]);

    useEffect(() => () => {
        if (requestRef.current) requestRef.current.cancel();
        showNaicsTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showNoResults = () => {
        if (isLoading) return false;
        return nodes.length === 0;
    };

    const checkboxDiv = () => {
        const isError = errorMessage && errorMessage !== "";
        return (
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
    };

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

export default connect(
    (state) => ({
        nodes: state.naics.naics.toJS(),
        expanded: state.naics.expanded.toJS(),
        searchExpanded: state.naics.searchExpanded.toJS(),
        checked: state.naics.checked.toJS(),
        unchecked: state.naics.unchecked.toJS(),
        counts: state.naics.counts.toJS(),
        checkedFromHash: state.appliedFilters.filters.naicsCodes.require,
        uncheckedFromHash: state.appliedFilters.filters.naicsCodes.exclude,
        countsFromHash: state.appliedFilters.filters.naicsCodes.counts,
        filters: state.appliedFilters.filters
    }),
    (dispatch) => bindActionCreators(
        Object.assign(
            {},
            naicsActions,
            { updateNaics }
        ),
        dispatch
    )
)(NAICSCheckboxTree);
