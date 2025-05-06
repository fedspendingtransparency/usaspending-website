import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
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
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

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
    filters: PropTypes.object,
    searchV2: PropTypes.bool
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
    searchExpanded,
    searchV2
}) => {
    // const { filters } = useSelector((state) => state.appliedFilters.filters);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [hint, setHint] = useState(null);
    let request = null;

    const onClear = () => {
        if (request) request.cancel();

        setExpandedNaics([], 'SET_SEARCHED_EXPANDED');
        showNaicsTree();
        setIsSearch(false);
        setSearchString('');
        setIsLoading(false);
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
        updateNaics(newChecked, newUnchecked, newCounts);

        if (hint) {
            hint.showHint();
        }
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
            updateNaics(newChecked, newUnchecked, newCounts);
            setCheckedNaics(newChecked);
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
        console.log("fetchNAICS called");
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
        if (nodes.length !== 0 && checkedFromHash.length) {
            const newChecked = checkedFromHash
                .reduce((acc, selected) => {
                    if (selected.length === 6 && !uncheckedFromHash.includes(selected)) {
                        return [...acc, selected];
                    }
                    const node = naicsHelper.getNaicsNodeFromTree(nodes, selected);
                    return [
                        ...acc,
                        ...getAllDescendants(node, uncheckedFromHash)
                    ];
                }, []);
            setCheckedNaics(newChecked);
            setNaicsCounts(countsFromHash);
            updateNaics(newChecked, [], countsFromHash);
        }
        else if (nodes.length !== 0) {
            showNaicsTree();
        }

        if (request) request.cancel();

        return fetchNAICS()
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
                        return uniqueAncestors.concat([highestAncestor, immediateAncestor]
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
                                .reduce((acc, selected) => {
                                    if (selected.length === 6 && !uncheckedFromHash.includes(selected)) {
                                        return [...acc, selected];
                                    }
                                    const node = naicsHelper.getNaicsNodeFromTree(nodes, selected);
                                    return [
                                        ...acc,
                                        ...getAllDescendants(node, uncheckedFromHash)
                                    ];
                                }, []);
                            setCheckedNaics(newChecked);
                        });
                }
                if (nodes.length > 0) {
                    showNaicsTree();
                }
                return true;
            })
            .catch((e) => {
                console.log("Error: fetching naics on didMount", e);
            });
    }, []);

    useEffect(() => {
        if (searchString.length > 0 || isSearch || isLoading) {
            onSearchChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, isSearch, isLoading]);
    useEffect(() => {
        if (checked.length === 0 && counts.length !== 0) {
            setNaicsCounts([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, counts]);

    useEffect(() => {
        if (request) request.cancel();

        showNaicsTree();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                { !searchV2 &&
                    <SubmitHint ref={(component) => setHint(component)} />
                }
            </div>
        </div>
    );
};

NAICSCheckboxTree.propTypes = propTypes;
const combiedActions = Object.assign({}, naicsActions, searchActions.updateNaics);

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
    (dispatch) => bindActionCreators(combiedActions, dispatch)
)(NAICSCheckboxTree);
