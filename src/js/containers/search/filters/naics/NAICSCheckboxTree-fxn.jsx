import React, { useEffect, useState } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { isCancel } from 'axios';
import * as naicsHelper from 'helpers/naicsHelper';
import { getAllDescendants } from 'helpers/checkboxTreeHelper';
import { naicsRequest } from 'helpers/searchHelper';
import * as naicsActions from 'redux/actions/search/naicsActions';
import * as searchActions from 'redux/actions/search/searchFilterActions';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import EntityDropdownAutocomplete from 'components/search/filters/location/EntityDropdownAutocomplete';

const propTypes = {
    updateNaics: PropTypes.func,
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
    filters: PropTypes.object
};


const NAICSCheckboxTree = ({
    updateNaics,
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    addCheckedNaics,
    showNaicsTree,
    setUncheckedNaics,
    setNaicsCounts,
    expanded,
    checked,
    unchecked,
    checkedFromHash,
    uncheckedFromHash,
    countsFromHash,
    nodes,
    counts,
    searchExpanded
}) => {
    // const { filters } = useSelector((state) => state.appliedFilters.filters);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    let request = null;

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
        if (request) request.cancel();

        const searchParam = (isSearch && searchString) ? `?filter=${searchString}` : null;

        setIsLoading(true);

        request = naicsRequest(param || searchParam);

        return request.promise
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

                if (nodes.length > 0) {
                    console.log("nodes length greater than 0 here");
                    showNaicsTree();
                }

                setIsLoading(resolveLoading ? false : isLoading);
                setIsError(false);
                setErrorMessage('');
                request = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
                    setIsError(true);
                    setErrorMessage(e.message);
                    setIsLoading(false);
                }
                request = null;
            });
    };

    const onClear = () => {
        if (request) request.cancel();

        setExpandedNaics([], 'SET_SEARCHED_EXPANDED');
        showNaicsTree();
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
    };

    const onCheck = (newCheckers) => {
        const [newCounts, newUnchecked] = naicsHelper.incrementNaicsCountAndUpdateUnchecked(
            newCheckers,
            checked,
            unchecked,
            nodes,
            counts
        );

        setNaicsCounts(newCounts);
        setCheckedNaics(newCheckers);
        setUncheckedNaics(newUnchecked);
        updateNaics(newCheckers, newUnchecked, newCounts);
    };

    const onUncheck = (newUncheckers, uncheckedNode) => {
        if (uncheckedNode.checked) {
            onCheck(newUncheckers);
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
            updateNaics(newUncheckers, newUnchecked, newCounts);
            setCheckedNaics(newUncheckers);
            setNaicsCounts(newCounts);
        }
    };

    const onCollapse = (ex) => {
        if (isSearch) {
            setExpandedNaics(ex, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedNaics(ex);
        }
    };

    const doesMeetMinimumCharsRequiredForNaicsSearch = (str = '', charMinimum = 2) => (
        str &&
        str.length >= charMinimum
    );

    const handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            return onClear();
        }
        const shouldTriggerSearch = doesMeetMinimumCharsRequiredForNaicsSearch(text);
        if (shouldTriggerSearch) {
            setIsSearch(true);
            setIsLoading(true);
        }

        setSearchString(text);
        return true;
    };

    const onSearchChange = debounce(() => {
        if (!searchString) return onClear();
        return fetchNAICS();
    }, 500);

    const onExpand = (value, newExpanded, fetch) => {
        if (fetch && !isSearch) {
            fetchNAICS(value);
        }
        if (isSearch) {
            setExpandedNaics(newExpanded, 'SET_SEARCHED_EXPANDED');
        }
        else {
            setExpandedNaics(newExpanded);
        }
    };

    useEffect(() => {
        console.log("Use Effect line 263");
        if (nodes.length !== 0 && checkedFromHash.length) {
            const newChecked = checkedFromHash
                .reduce((acc, item) => {
                    if (item.length === 6 && !uncheckedFromHash.includes(item)) {
                        return [...acc, item];
                    }
                    const checkedNode = naicsHelper.getNaicsNodeFromTree(nodes, item);
                    return [
                        ...acc,
                        ...getAllDescendants(checkedNode, uncheckedFromHash)
                    ];
                }, []);
            setCheckedNaics(newChecked);
            setNaicsCounts(countsFromHash);
            updateNaics(newChecked, [], countsFromHash);
            return Promise.resolve();
        }
        else if (nodes.length !== 0) {
            console.log("Use Effect line 282");
            showNaicsTree();
            return Promise.resolve();
        }

        return fetchNAICS()
            .then(() => {
                console.log("Use Effect line 289");
                if (checkedFromHash.length > 0) {
                    setNaicsCounts(countsFromHash);
                    setUncheckedNaics(uncheckedFromHash);
                    // Loading the checkbox tree from a url hash...
                    const allUniqueAncestors = [
                        ...checkedFromHash,
                        ...uncheckedFromHash
                    ].reduce((uniqueAncestors, item) => {
                        const highestAncestor = naicsHelper.getHighestAncestorNaicsCode(item);
                        const immediateAncestor = naicsHelper.getImmediateAncestorNaicsCode(item);
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
                            const newCheckers = checkedFromHash
                                .reduce((acc, item) => {
                                    if (item.length === 6 && !uncheckedFromHash.includes(item)) {
                                        return [...acc, item];
                                    }
                                    const uniqueNode = naicsHelper.getNaicsNodeFromTree(nodes, item);
                                    return [
                                        ...acc,
                                        ...getAllDescendants(uniqueNode, uncheckedFromHash)
                                    ];
                                }, []);
                            setCheckedNaics(newCheckers);
                        });
                }
                console.log("did I get here");
                console.log("nodes ===== ", nodes);
                if (nodes.length > 0) {
                    showNaicsTree();
                }
                // consistent return.
                return Promise.resolve();
            })
            .catch((e) => {
                setIsLoading(false);
                setIsError(true);
                setErrorMessage(e.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSearch) onSearchChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    const checkboxDiv = (showNoResults) => (
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


    const showNoResults = () => {
        if (isLoading) return false;
        return nodes.length === 0;
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
                {checkboxDiv(showNoResults)}
            </div>
        </div>
    );
};

NAICSCheckboxTree.propTypes = propTypes;
// const combiedActions = Object.assign({}, naicsActions, searchActions.updateNaics);

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
    (dispatch) => ({
        updateNaics: (checked, unchecked, counts) => dispatch(searchActions.updateNaics(checked, unchecked, counts)),
        setNaicsNodes: (key, naics) => dispatch(naicsActions.setNaicsNodes(key, naics)),
        setExpandedNaics: (expanded, type) => dispatch(naicsActions.setExpandedNaics(expanded, type)),
        setCheckedNaics: (checkedNodes) => dispatch(naicsActions.setCheckedNaics(checkedNodes)),
        addCheckedNaics: (newCheckedNode) => dispatch(naicsActions.addCheckedNaics(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(naicsActions.setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(naicsActions.showNaicsTree()),
        setUncheckedNaics: (unchecked) => dispatch(naicsActions.setUncheckedNaics(unchecked)),
        setNaicsCounts: (newCounts) => dispatch(naicsActions.setNaicsCounts(newCounts))
    }))(NAICSCheckboxTree);
