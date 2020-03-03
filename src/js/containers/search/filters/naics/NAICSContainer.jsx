/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    debounce,
    isEqual,
    cloneDeep
} from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { expandAllNodes, getNodeFromTree, getImmediateAncestorNaicsCode, getHighestAncestorNaicsCode } from 'helpers/checkboxTreeHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateNaics } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked, setSearchedNaics, addChecked, showNaicsTree } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SelectedNaic from 'components/search/filters/naics/SelectNaic';

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
        // show staged filters
        this.selectNaicsData(this.props.checked);
        return this.fetchNAICS();
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

    /**
     * onCheck
     * - updates redux checked and updates naics search filters in redux
     * @param {string[]} checked - and array of checked values
     * @returns {null}
     */
    onCheck = async (checkedNodes) => {
        this.selectNaicsData(checkedNodes);
        this.props.updateNaics(checkedNodes);
    }

    onUncheck = (checked, node) => {
        // TODO: Unchecking parent, checked in default view, in search view. Senario 6 in DEV-4621 (https://federal-spending-transparency.atlassian.net/browse/DEV-4621)
        const { selectedNaicsData } = this.state;
        const { nodes } = this.props;
        const { value } = node;
        const count = getNodeFromTree(nodes, value).count || 1;
        const parentKey = getHighestAncestorNaicsCode(value);
        const immediateAncestorCode = getImmediateAncestorNaicsCode(value);
        // manually update count for unchecked nodes under a child placeholder. This is a complicated edge case.
        const shouldUpdateCount = checked.some((code) => (
            code.includes(`children_of_${parentKey}`) ||
            code.includes(`children_of_${immediateAncestorCode}`)
        ));
        const shouldRemoveNode = selectedNaicsData.some((selectedNode) => {
            return (
                !node.checked &&
                selectedNode.count === count
            );
        });
        if (shouldUpdateCount) {
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
        else if (shouldRemoveNode) {
            this.setState({
                selectedNaicsData: selectedNaicsData.filter((selectedNode) => selectedNode.value !== node.value)
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

    getParentNode = (param) => {
        if (param.length === 2) {
            return this.props.nodes.find((node) => node.value === param);
        }
        if (param.length === 4) {
            return this.props.nodes
                .find((node) => node.value === `${param[0]}${param[1]}`).children
                .find(((node) => node.value === param));
        }
        return '';
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
        // deselect placeholder values!
        const noPlaceHolderCheckedValues = this.props.checked
            .filter((checked) => !checked.includes(`children_of_${value}`));

        const newValues = parentNode
            .children
            .map((child) => {
                if (value.length === 2) return `children_of_${child.naics}`;
                return child.naics;
            });

        this.props.setChecked([...new Set([...noPlaceHolderCheckedValues, ...newValues])]);
    }

    transformMockCheckedToRealChecked = (checked, expanded) => {
        const { nodes } = this.props;

        const checkedMockNodes = checked
            .filter((node) => node.includes('children_of_'))
            .map((node) => node.split('children_of_')[1]);

        const checkedMockChildren = checkedMockNodes
            .filter((node) => node.length === 2);

        const checkedMockGrandChildren = checkedMockNodes
            .filter((node) => node.length === 4);

        const expandedNodesWithMockAncestorChecked = expanded
            .filter((expandedNode) => {
                const grandParentOfExpanded = `${expandedNode[0]}${expandedNode[1]}`;
                if (checkedMockChildren.includes(grandParentOfExpanded)) {
                    return true;
                }
                const parentOfExpanded = `${grandParentOfExpanded}${expandedNode[2]}${expandedNode[3]}`;
                if (expandedNode.length > 2 && checkedMockGrandChildren.includes(parentOfExpanded)) {
                    return true;
                }
                return false;
            });

        expandedNodesWithMockAncestorChecked
            .forEach((expandedChild) => {
                // use reusable recursive fn here...?
                const node = getNodeFromTree(nodes, expandedChild);
                this.props.addChecked(node.value);
                if (node.children) {
                    node.children.forEach((child) => {
                        this.props.addChecked(child.value);
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                this.props.addChecked(grandChild.value);
                            });
                        }
                    });
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
        const { isError, isLoading } = this.state;
        if (isError || isLoading || this.props.nodes.length > 0) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="ban" />
                <div className="naics-filter-message-container__text">
                    No Results
                </div>
            </div>
        );
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            searchString,
            isSearch
        } = this.state;
        const { checked, nodes, expanded, searchExpanded } = this.props;
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

    selectNaicsData = (checked = []) => {
        // an array of objects w/ shape { value, label, count } representing all naics codes selected per top-parent category  . Only show top level parents
        // child place holders reflect the count of their immediate ancestor
        const placeHoldersToBeCounted = checked
            .filter((naicsCode) => naicsCode.includes('children_of_'));
        const codesUnderPlaceholder = [];
        const codesWithoutPlaceholder = [];

        checked
            .filter((naicsCode) => !naicsCode.includes('children_of_'))
            .forEach((naicsCode) => {
                const immediateAncestorCode = getImmediateAncestorNaicsCode(naicsCode);
                const highestAncestorCode = getHighestAncestorNaicsCode(naicsCode);

                const codeWillBeCountedByPlaceholder = (
                    placeHoldersToBeCounted.includes(`children_of_${immediateAncestorCode}`) ||
                    placeHoldersToBeCounted.includes(`children_of_${highestAncestorCode}`)
                );
                if (codeWillBeCountedByPlaceholder) codesUnderPlaceholder.push(naicsCode);
                else {
                    codesWithoutPlaceholder.push(naicsCode);
                }
            });

        const checkedWithoutNodesUnderPlaceholder = [...new Set([...codesWithoutPlaceholder, ...placeHoldersToBeCounted])]
            .reduce((acc, code) => {
                const key = code.includes('children_of_')
                    ? code.split('children_of_')[1]
                    : code;
                const parentKey = getHighestAncestorNaicsCode(key);
                const parentNode = cloneDeep(getNodeFromTree(this.props.nodes, parentKey));
                const countFromNodeToBeAdded = getNodeFromTree(this.props.nodes, key).count || 1;
                const indexOfParent = acc.findIndex((node) => node.value === parentKey);
                const isParentSelected = indexOfParent >= 0;

                if (!isParentSelected && key.length === 2) {
                    acc.push(parentNode);
                    return acc;
                }
                else if (!isParentSelected && key.length === 4) {
                    acc.push({
                        ...parentNode,
                        count: countFromNodeToBeAdded
                    });
                    return acc;
                }
                else if (!isParentSelected && key.length === 6) {
                    acc.push({
                        ...parentNode,
                        count: 1
                    });
                    return acc;
                }
                else if (isParentSelected && key.length === 2) {
                    acc[indexOfParent].count = parentNode.count;
                    return acc;
                }
                else if (isParentSelected && key.length === 4) {
                    acc[indexOfParent].count += countFromNodeToBeAdded;
                    if (parentNode.count <= acc[indexOfParent].count) {
                        acc[indexOfParent].count = parentNode.count;
                        return acc;
                    }
                    return acc;
                }
                else if (isParentSelected && key.length === 6) {
                    acc[indexOfParent].count += countFromNodeToBeAdded;
                    // never increment count above count of parent.
                    if (parentNode.count <= acc[indexOfParent].count) {
                        acc[indexOfParent].count = parentNode.count;
                        return acc;
                    }
                    return acc;
                }
                return acc;
            }, []);

        this.setState({ selectedNaicsData: checkedWithoutNodesUnderPlaceholder });
        this.props.setChecked(checked);
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
                    {this.checkboxDiv()}
                    {this.props.checked.length !== 0 && selectedNaicsData.length !== 0 && (
                        <SelectedNaic
                            selectedNAICS={selectedNaicsData}
                            removeNAICS={this.props.removeNAICS} />
                    )}
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
