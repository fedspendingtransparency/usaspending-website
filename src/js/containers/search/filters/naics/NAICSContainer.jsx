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
    difference,
    isEqual
} from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { expandAllNodes, getNodeFromTree, getImmediateAncestorNaicsCode, getHighestAncestorNaicsCode } from 'helpers/checkboxTreeHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateNaics } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked, setSearchedNaics, addChecked, showNaicsTree } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    updateNaics: PropTypes.func,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    setChecked: PropTypes.func,
    removeNAICS: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    addChecked: PropTypes.func,
    showNaicsTree: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string)
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
            selectedNaicsData: []
        };
        this.request = null;
    }

    componentDidMount() {
        this.updateCountOfSelectedTopTierNaicsCodes(this.props.checked);
        return this.fetchNAICS();
    }
    
    componentDidUpdate(prevProps) {
        if (this.hint) {
            if (!isEqual(this.props.checked, prevProps.checked)) {
                this.hint.showHint();
            }
        }
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
        this.props.updateNaics(checkedNodes);
    }

    onUncheck = (checked, node) => {
        const { selectedNaicsData } = this.state;
        const { nodes } = this.props;
        const { value } = node;
        const count = getNodeFromTree(nodes, value).count || 1;
        const parentKey = getHighestAncestorNaicsCode(value);
        const shouldRemoveNode = selectedNaicsData.some((selectedNode) => (
            !node.checked &&
            selectedNode.value === parentKey &&
            selectedNode.count === count
        ));
        if (shouldRemoveNode) {
            this.setState({
                selectedNaicsData: selectedNaicsData.filter((selectedNode) => selectedNode.value !== parentKey)
            });
        }
        else {
            this.setState({
                selectedNaicsData: selectedNaicsData.map((selectedNode) => {
                    const newCount = selectedNode.count - count;
                    if (selectedNode.value === parentKey) {
                        return { ...selectedNode, count: newCount };
                    }
                    return selectedNode;
                })
            });
        }

        this.props.setChecked(checked);
        this.props.updateNaics(checked);
    }

    onExpand = (value, expanded, fetch) => {
        if (fetch && !this.state.isSearch) this.fetchNAICS(value);
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

        const parentNaicsWithCounts = [...new Set([...newChecked])]
            .reduce((newState, code) => {
                const isPlaceholder = code.includes('children_of_');
                const key = isPlaceholder
                    ? code.split('children_of_')[1]
                    : code;
                const parentKey = getHighestAncestorNaicsCode(key);
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
            }, [...this.state.selectedNaicsData]);

        this.setState({ selectedNaicsData: parentNaicsWithCounts });
        this.props.setChecked(checked);
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true }, this.onSearchChange);
    };

    autoCheckChildrenOfParent = (parentNode) => {
        const value = parentNode.naics;
        // deselect placeholder values for node!
        const removeParentPlaceholders = this.props.checked
            .filter((checked) => !checked.includes(`children_of_${value}`));

        const newValues = parentNode
            .children
            .map((child) => {
                if (child.naics.length === 4) return `children_of_${child.naics}`;
                return child.naics;
            });

        this.props.setChecked([...new Set([...removeParentPlaceholders, ...newValues])]);
    }

    transformMockCheckedToRealChecked = (checked, expanded) => {
        const { nodes } = this.props;
        const checkedMockNodes = checked
            .filter((node) => node.includes('children_of_'))
            .map((node) => node.split('children_of_')[1]);

        const expandedNodesWithMockAncestorChecked = expanded
            .filter((naicsCode) => {
                const parentKey = getHighestAncestorNaicsCode(naicsCode);
                const ancestorKey = getImmediateAncestorNaicsCode(naicsCode);
                if (checkedMockNodes.includes(parentKey) || checkedMockNodes.includes(ancestorKey) || checkedMockNodes.includes(naicsCode)) {
                    return true;
                }
                return false;
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
                if (expandedNode.length === 6) {
                    this.props.addChecked(node.value);
                }
            });
    };

    fetchNAICS = async (param = '') => {
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

        try {
            const { data } = await this.request.promise;

            if (isSearch) {
                const visibleNaicsValues = expandAllNodes(data.results, 'naics');
                this.props.setSearchedNaics(data.results);
                this.transformMockCheckedToRealChecked(checked, visibleNaicsValues);
                this.props.setExpanded(visibleNaicsValues, 'SET_SEARCHED_EXPANDED');
            }
            else {
                this.props.setNaics(param, data.results);
            }
            // we've searched for a specific naics reference; ie '11' or '1111'
            if (checked.includes(`children_of_${param}`)) {
                this.autoCheckChildrenOfParent(data.results[0], param);
            }

            this.setState({
                isLoading: false,
                isError: false,
                errorMessage: '',
                requestType: ''
            });
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            if (!isCancel(e)) {
                this.setState({
                    isError: true,
                    errorMessage: e.message,
                    isLoading: false,
                    requestType: ''
                });
            }
        }
        this.request = null;
    };

    loadingDiv = () => {
        if (!this.state.isLoading) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="naics-filter-message-container__text">Loading your data...</div>
            </div>
        );
    }

    errorDiv = () => {
        const { isError, errorMessage } = this.state;
        if (!isError) return null;
        return (
            <div className="naics-filter-message-container">
                <div className="naics-filter-message-container__text">
                    {errorMessage}
                </div>
            </div>
        );
    }

    noResultsDiv = () => {
        const { isError, isLoading, isSearch } = this.state;
        if (isError || isLoading) return null;
        if ((isSearch && this.props.searchExpanded.length === 0) || this.props.nodes.length === 0) {
            return (
                <div className="naics-filter-message-container">
                    <FontAwesomeIcon icon="ban" />
                    <div className="naics-filter-message-container__text">
                        No Results
                    </div>
                </div>
            );
        }
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
        const { searchString, selectedNaicsData } = this.state;
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
                    TEST
                    {this.checkboxDiv()}
                    {this.props.checked.length !== 0 && selectedNaicsData.length !== 0 && (
                        <div
                            id="award-search-selected-locations"
                            className="selected-filters"
                            role="status">
                            {selectedNaicsData.map((node) => {
                                const label = `${node.value} - ${node.label} (${node.count})`;
                                console.log("label", label);
                                return (
                                    <button
                                        className="shown-filter-button"
                                        value={label}
                                        onClick={this.props.removeLocation}
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
        checked: state.naics.checked.toJS()
        // searchedNodes: state.naics.searchedNaics.toJS()
    }),
    (dispatch) => ({
        updateNaics: (checked) => dispatch(updateNaics(checked)),
        setNaics: (key, naics) => dispatch(setNaics(key, naics)),
        setExpanded: (expanded, type) => dispatch(setExpanded(expanded, type)),
        setChecked: (checkedNodes) => dispatch(setChecked(checkedNodes)),
        addChecked: (newCheckedNode) => dispatch(addChecked(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree())
    }))(NAICSContainer);
