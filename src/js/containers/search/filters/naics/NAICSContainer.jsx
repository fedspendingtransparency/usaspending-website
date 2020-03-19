/* eslint-disable no-param-reassign */
/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    debounce,
    cloneDeep,
    difference
} from 'lodash';
import { isCancel } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { naicsRequest } from 'helpers/naicsHelper';
import {
    expandAllNodes,
    getNodeFromTree,
    getImmediateAncestorNaicsCode,
    getHighestAncestorNaicsCode,
    getCountOfAllCheckedDescendants,
    removePlaceholderString
} from 'helpers/checkboxTreeHelper';

import { updateNaicsV2 } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked, setSearchedNaics, addChecked, showNaicsTree, setUnchecked } from 'redux/actions/search/naicsActions';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    stageNaics: PropTypes.func,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    setChecked: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    restoreHashedFilters: PropTypes.func,
    addChecked: PropTypes.func,
    showNaicsTree: PropTypes.func,
    setUnchecked: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.string),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.string),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    filters: PropTypes.object
};

export class NAICSContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            searchString: '',
            requestType: 'initial',
            stagedNaicsFilters: []
        };
        this.request = null;
    }

    componentDidMount() {
        const { checkedFromHash, uncheckedFromHash } = this.props;
        // always get da nodes first.
        return this.fetchNAICS()
            .then(() => {
                // lets load a stateful tree from the url, fun. timez.
                if (checkedFromHash.length > 0) {
                    // first, expand da nodes.
                    const checkedParentAndChildrenNodesFromHash = checkedFromHash
                        .filter((checked) => {
                            const parentKey = getHighestAncestorNaicsCode(checked);
                            const ancestorKey = getImmediateAncestorNaicsCode(checked);
                            if (checkedFromHash.includes(parentKey) || checkedFromHash.includes(ancestorKey)) {
                                return false;
                            }
                            return true;
                        })
                        .sort((a, b) => {
                            if (a.length > b.length) return 1;
                            if (b.length > a.length) return -1;
                            return 0;
                        });

                    const fetchAllNodesAndCheckTheirChildren = (iterable) => new Promise((resolve, reject) => {
                        iterable.reduce((prevPromise, checked, i, arr) => prevPromise
                            .then(() => {
                                if (i === arr.length - 1) {
                                    const newChecked = [];
                                    const param = checked.length === 6 ? getImmediateAncestorNaicsCode(checked) : checked;
                                    // last thing to fetch
                                    return this.fetchNAICS(param)
                                        .then(() => {
                                            iterable.forEach((code) => {
                                                const node = getNodeFromTree(this.props.nodes, code);
                                                if (code.length === 6) {
                                                    if (!uncheckedFromHash.includes(code)) {
                                                        newChecked.push(code);
                                                    }
                                                }
                                                else {
                                                    node.children
                                                        .forEach((child) => {
                                                            if (child.value.length === 4) {
                                                                child.children.forEach((grand) => {
                                                                    // add the grand-children.
                                                                    if (!uncheckedFromHash.includes(removePlaceholderString(grand.value))) {
                                                                        newChecked.push(grand.value);
                                                                    }
                                                                });
                                                            }
                                                            // or we're already looking at the grandchildren
                                                            else if (!uncheckedFromHash.includes(removePlaceholderString(child.value))) {
                                                                newChecked.push(child.value);
                                                            }
                                                        });
                                                }
                                            });
                                            resolve(newChecked);
                                        });
                                }
                                if (checked.length === 6) {
                                    return this.fetchNAICS(getImmediateAncestorNaicsCode(checked));
                                }
                                return this.fetchNAICS(checked);
                            })
                            .catch((e) => {
                                console.log("Error on fetching NAICS Data from hash url", e);
                                reject(e);
                            }), Promise.resolve('first'));
                    });

                    return fetchAllNodesAndCheckTheirChildren(checkedParentAndChildrenNodesFromHash)
                        .then((newChecked) => {
                            this.updateCountOfSelectedTopTierNaicsCodes(newChecked);
                            this.props.restoreHashedFilters({
                                ...this.props.filters,
                                // counts should live in redux.
                                naics_codes: {
                                    ...this.props.filters.naics_codes,
                                    counts: this.state.stagedNaicsFilters
                                }
                            });
                        });
                }
                // don't fetch anything more, no hash to load tree from; return a resolved promise for consistent return.
                return Promise.resolve();
            })
            .catch((e) => {
                console.log("Error on componentDidMount: ", e);
            });
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.showNaicsTree();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            requestType: ''
        });
    }

    onCheck = async (checkedNodes, node) => {
        this.updateCountOfSelectedTopTierNaicsCodes(checkedNodes, node);
        if (this.hint) {
            this.hint.showHint();
        }
    }

    onUncheck = (checked, node) => {
        const { stagedNaicsFilters } = this.state;
        const { nodes } = this.props;
        const { value } = node;
        const countOfUncheckedNode = getNodeFromTree(nodes, value).count || 1;
        const parentKey = getHighestAncestorNaicsCode(value);
        const ancestorKey = getImmediateAncestorNaicsCode(value);
        const shouldRemoveNode = stagedNaicsFilters.some((selectedNode) => (
            !node.checked &&
            selectedNode.value === parentKey &&
            selectedNode.count <= countOfUncheckedNode
        ));
        let newStagedFilterState;
        if (shouldRemoveNode) {
            newStagedFilterState = stagedNaicsFilters.filter((selectedNode) => selectedNode.value !== parentKey);
        }
        else {
            newStagedFilterState = stagedNaicsFilters.map((selectedNode) => {
                const newCount = selectedNode.count - countOfUncheckedNode;
                if (selectedNode.value === parentKey) {
                    return { ...selectedNode, count: newCount };
                }
                return selectedNode;
            });
        }
        // we only update the unchecked array if an ancestor is checked
        const shouldUpdateUnchecked = (
            checked.includes(parentKey) ||
            checked.includes(`children_of_${parentKey}`) ||
            checked.includes(ancestorKey) ||
            checked.includes(`children_of_${ancestorKey}`)
        );

        const newUnchecked = shouldUpdateUnchecked
            ? [...this.props.unchecked, value]
            : this.props.unchecked;
        if (shouldUpdateUnchecked) this.props.setUnchecked(newUnchecked);

        this.props.stageNaics(checked, newUnchecked, newStagedFilterState);
        this.props.setChecked(checked);

        this.setState({ stagedNaicsFilters: newStagedFilterState });
    }

    onExpand = (value, expanded, fetch) => {
        if (fetch && !this.state.isSearch) {
            this.fetchNAICS(value);
        }
        if (this.state.isSearch) {
            this.props.setExpanded(expanded, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpanded(expanded);
        }
    };

    onCollapse = (expanded) => {
        if (this.state.isSearch) {
            this.props.setExpanded(expanded, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpanded(expanded);
        }
    };

    getCountWithPlaceholderOffset = (key, codesUnderPlaceholder) => {
        // when the placeholder is counted, adjust the count to offset for the 'nodes under this placeholder' which will be counted.
        const hasSelectedButNotCounted = codesUnderPlaceholder.some((obj) => obj.placeholder === key);

        if (hasSelectedButNotCounted) {
            const nodesUnderPlaceholder = codesUnderPlaceholder
                .filter((code) => code.placeholder === key);
            const aggregateOffsetOfNodesUnderPlaceholder = nodesUnderPlaceholder
                .map((obj) => getNodeFromTree(this.props.nodes, obj.code))
                .reduce((agg, nodeTobeCounted) => {
                    if (nodeTobeCounted.count === 0) {
                        return agg + 1;
                    }
                    return agg + nodeTobeCounted.count;
                }, 0);

            return aggregateOffsetOfNodesUnderPlaceholder;
        }
        return 0;
    };

    removeFromUnchecked = (checkedCode, unchecked = this.props.unchecked) => {
        // we only want to remove from unchecked if...
        const key = checkedCode.includes('children_of_')
            ? checkedCode.split('children_of_')[1]
            : checkedCode;
        const ancestorKey = getImmediateAncestorNaicsCode(key);
        const parentKey = getHighestAncestorNaicsCode(key);
        const parentNode = getNodeFromTree(this.props.nodes, parentKey);
        const ancestorNode = getNodeFromTree(this.props.nodes, ancestorKey);
        const currentNode = getNodeFromTree(this.props.nodes, key);
        console.log("current Node", currentNode, checkedCode);
        const { count } = currentNode;

        const uncheckedCodeToBeRemoved = unchecked
            .reduce((acc, uncheckedCode) => {
                if (uncheckedCode === checkedCode) {
                    // (a) the unchecked array has the code/placeholder code we're currently checking.
                    return checkedCode;
                }
                if (uncheckedCode === key) {
                    // (a) applies here too.
                    return key;
                }
                if (uncheckedCode === parentKey) {
                    // (b) an ancestor of the code we're currently checking is in the unchecked array
                    // AND the checked array has the other ancestors too.
                    const countOfCheckedNode = count === 0 ? 1 : count;
                    const countOfCheckedAncestors = getCountOfAllCheckedDescendants(this.props.nodes, parentKey, this.props.checked);
                    if ((countOfCheckedAncestors + countOfCheckedNode) === parentNode.count) {
                        return parentKey;
                    }
                }
                if (uncheckedCode === ancestorKey) {
                    // (b) applies here too
                    const countOfCheckedNode = count === 0 ? 1 : count;
                    const countOfCheckedAncestors = getCountOfAllCheckedDescendants(this.props.nodes, ancestorKey, this.props.checked);
                    if ((countOfCheckedAncestors + countOfCheckedNode) === ancestorNode.count) {
                        return ancestorKey;
                    }
                }
                return acc;
            }, null);

        if (uncheckedCodeToBeRemoved) {
            return uncheckedCodeToBeRemoved;
        }
        return null;
    }

    updateCountOfSelectedTopTierNaicsCodes = (checked = []) => {
        const newChecked = difference(checked, this.props.checked);
        const nodes = cloneDeep(this.props.nodes);
        // child place holders reflect the count of their immediate ancestor
        const placeHoldersToBeCounted = checked
            .filter((naicsCode) => naicsCode.includes('children_of_'));

        const codesUnderPlaceholder = [];
        const codesWithoutPlaceholder = [];

        checked
            .filter((naicsCode) => !naicsCode.includes('children_of_'))
            .forEach((naicsCode) => {
                const immediateAncestorCode = getImmediateAncestorNaicsCode(naicsCode); // 1111
                const highestAncestorCode = getHighestAncestorNaicsCode(naicsCode); // 11
                if (placeHoldersToBeCounted.includes(`children_of_${immediateAncestorCode}`)) {
                    codesUnderPlaceholder.push({ code: naicsCode, placeholder: immediateAncestorCode });
                }
                else if (placeHoldersToBeCounted.includes(`children_of_${highestAncestorCode}`)) {
                    codesUnderPlaceholder.push({ code: naicsCode, placeholder: highestAncestorCode });
                }
                else if (placeHoldersToBeCounted.includes(`children_of_${naicsCode}`)) {
                    codesUnderPlaceholder.push({ code: naicsCode, placeholder: naicsCode });
                }
                else {
                    codesWithoutPlaceholder.push(naicsCode);
                }
            });

        const codesToBeRemovedFromUnchecked = [];

        const parentNaicsWithCounts = [...new Set([...newChecked])]
            .reduce((newState, code) => {
                const isPlaceholder = code.includes('children_of_');
                const key = isPlaceholder
                    ? code.split('children_of_')[1]
                    : code;
                const parentKey = getHighestAncestorNaicsCode(key);

                // may need to remove this node or an ancestor node from the unchecked array
                const shouldCodeBeRemoved = this.removeFromUnchecked(code);
                if (shouldCodeBeRemoved) {
                    codesToBeRemovedFromUnchecked.push(shouldCodeBeRemoved);
                }

                const currentNode = getNodeFromTree(nodes, key);
                const parentNode = getNodeFromTree(nodes, parentKey);

                const indexInArray = newState.findIndex((node) => node.value === parentKey);
                const isParentInArray = indexInArray > -1;

                const offsetCount = this.getCountWithPlaceholderOffset(key, codesUnderPlaceholder);
                const originalCount = currentNode.count === 0
                    ? 1
                    : currentNode.count;
                const amountToIncrement = originalCount - offsetCount;

                if (!isParentInArray) {
                    newState.push({
                        ...parentNode,
                        count: amountToIncrement
                    });
                }
                else if (isParentInArray) {
                    newState[indexInArray].count += amountToIncrement;
                }
                if (isParentInArray && parentNode.count < newState[indexInArray].count) {
                    newState[indexInArray].count = parentNode.count;
                }
                else if (isParentInArray && newState[indexInArray].count < 1) {
                    newState[indexInArray].count = 1;
                }
                return newState;
            }, [...this.state.stagedNaicsFilters]);

        const newUnchecked = this.props.unchecked
            .filter((uncheckedNode) => {
                if (codesToBeRemovedFromUnchecked.includes(uncheckedNode)) return false;
                return true;
            });

        this.setState({ stagedNaicsFilters: parentNaicsWithCounts });
        this.props.setChecked(checked);
        this.props.setUnchecked(newUnchecked);
        this.props.stageNaics(checked, newUnchecked, parentNaicsWithCounts);
    }

    removeSelectedFilter = (node) => {
        const newChecked = this.props.checked
            .map((checked) => removePlaceholderString(checked))
            .filter((checked) => `${checked[0]}${checked[1]}` !== node.value);

        this.onUncheck(newChecked, { ...node, checked: false });
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true, isLoading: true }, this.onSearchChange);
    }

    autoCheckImmediateChildrenAfterDynamicExpand = (parentNode) => {
        const value = parentNode.naics;
        // deselect placeholder values for node!
        const removeParentPlaceholders = this.props.checked
            .filter((checked) => !checked.includes(`children_of_${value}`));

        const newValues = parentNode
            .children
            .filter((child) => !this.props.unchecked.includes(child.naics))
            .map((child) => {
                // at child level, check all grand children w/ the placeholder
                if (child.naics.length === 4) return `children_of_${child.naics}`;
                return child.naics;
            });

        this.props.setChecked([...new Set([...removeParentPlaceholders, ...newValues])]);
    }

    autoCheckSearchedResultDescendants = (checked, expanded) => {
        const { nodes } = this.props;
        const placeholderNodes = checked
            .filter((node) => node.includes('children_of_'))
            .map((node) => node.split('children_of_')[1]);

        // this will never have grandchildren
        const expandedNodesWithMockAncestorChecked = expanded
            .filter((naicsCode) => {
                const parentKey = getHighestAncestorNaicsCode(naicsCode);
                const isCheckedByPlaceholder = (
                    placeholderNodes.includes(parentKey) || // ie 11
                    placeholderNodes.includes(naicsCode) // ie 1123
                );
                const isUnchecked = (
                    this.props.unchecked.includes(naicsCode)
                );
                return (isCheckedByPlaceholder && !isUnchecked);
            });

        expandedNodesWithMockAncestorChecked
            .forEach((expandedNode) => {
                // use reusable recursive fn here...?
                const node = getNodeFromTree(nodes, expandedNode);
                if (node.children) {
                    node.children.forEach((child) => {
                        if (!child.children) this.props.addChecked(child.value);
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                this.props.addChecked(grandChild.value);
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6) {
                    this.props.addChecked(node.value);
                }
            });
    };

    fetchNAICS = (param = '') => {
        if (this.request) this.request.cancel();
        const { requestType, isSearch, searchString } = this.state;
        const { checked } = this.props;
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            this.setState({ isLoading: true });
        }

        this.request = naicsRequest(param || searchParam);

        return this.request.promise
            .then(({ data: { results } }) => {
                if (isSearch) {
                    const visibleNaicsValues = expandAllNodes(results, 'naics');
                    this.props.setSearchedNaics(results);
                    this.autoCheckSearchedResultDescendants(checked, visibleNaicsValues);
                    this.props.setExpanded(visibleNaicsValues, 'SET_SEARCHED_EXPANDED');
                }
                else {
                    this.props.setNaics(param, results);
                }
                // we've searched for a specific naics reference; ie '11' or '1111' and their immediate descendants should be checked.
                if (checked.includes(`children_of_${param}`)) {
                    this.autoCheckImmediateChildrenAfterDynamicExpand(results[0], param);
                }

                this.setState({
                    isLoading: false,
                    isError: false,
                    errorMessage: '',
                    requestType: ''
                });
                this.request = null;
            })
            .catch((e) => {
                console.log('Error NAICS Reponse : ', e);
                if (!isCancel(e)) {
                    this.setState({
                        isError: true,
                        errorMessage: e.message,
                        isLoading: false,
                        requestType: ''
                    });
                }
                this.request = null;
            });
    };

    loadingDiv = () => {
        if (this.state.isLoading) {
            return (
                <div className="naics-filter-message-container">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="naics-filter-message-container__text">Loading your data...</div>
                </div>
            );
        }
        return null;
    }

    errorDiv = () => {
        const { isError, errorMessage } = this.state;
        if (isError && errorMessage) {
            return (
                <div className="naics-filter-message-container">
                    <div className="naics-filter-message-container__text">
                        {errorMessage}
                    </div>
                </div>
            );
        }
        return null;
    }

    noResultsDiv = () => {
        const showNoResults = (
            this.props.nodes.length === 0 ||
            (this.state.isSearch && this.props.searchExpanded.length === 0)
        );
        if (this.state.isLoading) return null;
        if (showNoResults) {
            return (
                <div className="naics-filter-message-container">
                    <FontAwesomeIcon icon="ban" />
                    <div className="naics-filter-message-container__text">
                        No Results
                    </div>
                </div>
            );
        }
        return null;
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            searchString,
            isSearch
        } = this.state;
        const {
            checked,
            nodes,
            expanded,
            searchExpanded
        } = this.props;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                limit={3}
                data={nodes}
                expanded={isSearch ? searchExpanded : expanded}
                checked={checked}
                searchText={searchString}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onUncheck={this.onUncheck}
                onCheck={this.onCheck} />
        );
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const noResultsDiv = this.noResultsDiv();
        const errorDiv = this.errorDiv();
        const { searchString, stagedNaicsFilters } = this.state;
        return (
            <div>
                <div className="naics-search-container">
                    <EntityDropdownAutocomplete
                        placeholder="Type to find codes"
                        searchString={searchString}
                        enabled
                        openDropdown={this.onSearchClick}
                        toggleDropdown={this.toggleDropdown}
                        handleTextInputChange={this.handleTextInputChange}
                        context={{}}
                        loading={false}
                        handleOnKeyDown={this.handleOnKeyDown}
                        isClearable
                        onClear={this.onClear} />
                    {loadingDiv}
                    {noResultsDiv}
                    {errorDiv}
                    {this.checkboxDiv()}
                    {this.props.checked.length !== 0 && stagedNaicsFilters.length !== 0 && (
                        <div
                            id="award-search-selected-locations"
                            className="selected-filters"
                            role="status">
                            {stagedNaicsFilters.map((node) => {
                                const label = `${node.value} - ${node.label} (${node.count})`;
                                return (
                                    <button
                                        className="shown-filter-button"
                                        value={label}
                                        onClick={() => this.removeSelectedFilter(node)}
                                        title="Click to remove."
                                        aria-label={`Applied filter: ${label}`}>
                                        {label}
                                        <span className="close">
                                            <FontAwesomeIcon icon="times" />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <SubmitHint ref={(component) => {
                        this.hint = component;
                    }} />
                </div>
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        nodes: state.naics.naics.toJS(),
        expanded: state.naics.expanded.toJS(),
        searchExpanded: state.naics.searchExpanded.toJS(),
        checked: state.naics.checked.toJS(),
        unchecked: state.naics.unchecked.toJS(),
        checkedFromHash: state.appliedFilters.filters.naics_codes.require,
        uncheckedFromHash: state.appliedFilters.filters.naics_codes.exclude,
        filters: state.appliedFilters.filters
    }),
    (dispatch) => ({
        stageNaics: (checked, unchecked, counts) => dispatch(updateNaicsV2(checked, unchecked, counts)),
        setNaics: (key, naics) => dispatch(setNaics(key, naics)),
        setExpanded: (expanded, type) => dispatch(setExpanded(expanded, type)),
        setChecked: (checkedNodes) => dispatch(setChecked(checkedNodes)),
        addChecked: (newCheckedNode) => dispatch(addChecked(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree()),
        setUnchecked: (unchecked) => dispatch(setUnchecked(unchecked)),
        restoreHashedFilters: (filters) => dispatch(restoreHashedFilters(filters))
    }))(NAICSContainer);
