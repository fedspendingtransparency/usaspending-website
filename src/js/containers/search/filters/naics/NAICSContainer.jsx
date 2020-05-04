/* eslint-disable no-param-reassign */
/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { isCancel } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    incrementNaicsCountAndUpdateUnchecked,
    decrementNaicsCountAndUpdateUnchecked,
    getImmediateAncestorNaicsCode,
    getNaicsNodeFromTree,
    removeStagedNaicsFilter,
    autoCheckNaicsAfterExpand,
    expandNaicsAndAllDescendantParents,
    getHighestAncestorNaicsCode
} from 'helpers/naicsHelper';

import { getAllDescendants } from 'helpers/checkboxTreeHelper';

import { naicsRequest } from 'helpers/searchHelper';

import {
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    addCheckedNaics,
    showNaicsTree,
    setUncheckedNaics
} from 'redux/actions/search/naicsActions';
import { updateNaicsV2 } from 'redux/actions/search/searchFilterActions';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    stageNaics: PropTypes.func,
    setNaicsNodes: PropTypes.func,
    setExpandedNaics: PropTypes.func,
    setCheckedNaics: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    restoreHashedFilters: PropTypes.func,
    addCheckedNaics: PropTypes.func,
    showNaicsTree: PropTypes.func,
    setUncheckedNaics: PropTypes.func,
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
        if (this.props.nodes.length !== 0 && !checkedFromHash && !uncheckedFromHash) return Promise.resolve();
        return this.fetchNAICS()
            .then(() => {
                if (checkedFromHash.length > 0) {
                    // Loading the checkbox tree from a url hash...
                    const uniqueAncestorsByTreeLocation = [
                        ...checkedFromHash,
                        ...uncheckedFromHash
                    ]
                        .reduce((acc, checked) => {
                            const ancestorNode = getImmediateAncestorNaicsCode(checked);
                            const highestAncestorNode = getHighestAncestorNaicsCode(checked);
                            if (ancestorNode === highestAncestorNode) {
                                return {
                                    ...acc,
                                    trunk: acc.trunk.add(highestAncestorNode)
                                };
                            }
                            return {
                                ...acc,
                                trunk: acc.trunk.add(highestAncestorNode),
                                branch: acc.branch.add(ancestorNode)
                            };
                        }, { trunk: new Set(), branch: new Set() });

                    // Sequentially populate tree.
                    return [...uniqueAncestorsByTreeLocation.trunk]
                        .reduce((prevPromise, trunkLevelAncestor) => prevPromise
                            .then(() => this.fetchNAICS(trunkLevelAncestor)), Promise.resolve())
                        .then(() => [...uniqueAncestorsByTreeLocation.branch]
                            .reduce((prevPromise, branchLevelAncestor) => prevPromise
                                .then(() => this.fetchNAICS(branchLevelAncestor)), Promise.resolve())
                        )
                        // Then populate the checked & unchecked arrays, along with their corresponding counts.
                        .then(() => {
                            const newChecked = checkedFromHash
                                .reduce((acc, checked) => {
                                    if (checked.length === 6 && !uncheckedFromHash.includes(checked)) {
                                        return [...acc, checked];
                                    }
                                    const node = getNaicsNodeFromTree(this.props.nodes, checked);
                                    return [
                                        ...acc,
                                        ...getAllDescendants(node)
                                            .filter((naicsCode) => !uncheckedFromHash.includes(naicsCode))
                                    ];
                                }, []);
                            const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
                                newChecked,
                                this.props.checked,
                                uncheckedFromHash,
                                this.props.nodes,
                                this.state.stagedNaicsFilters
                            );
                            // counts should live in redux.
                            this.setState({ stagedNaicsFilters: newCounts });
                            this.props.setUncheckedNaics(newUnchecked);
                            this.props.setCheckedNaics(newChecked);
                            this.props.restoreHashedFilters({
                                ...this.props.filters,
                                naicsCodes: {
                                    ...this.props.filters.naicsCodes,
                                    counts: newCounts
                                }
                            });
                        });
                }
                // consistent return.
                return Promise.resolve();
            })
            .catch((e) => {
                console.log("Error: fetching naics on didMount", e);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.checked.length === 0 && prevProps.checked.length !== 0 && this.state.stagedNaicsFilters.length !== 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ stagedNaicsFilters: [] });
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

    onCheck = (newChecked) => {
        const [stagedNaicsFilters, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
            newChecked,
            this.props.checked,
            this.props.unchecked,
            this.props.nodes,
            this.state.stagedNaicsFilters
        );

        this.setState({ stagedNaicsFilters });
        this.props.setCheckedNaics(newChecked);
        this.props.setUncheckedNaics(newUnchecked);
        this.props.stageNaics(newChecked, newUnchecked, stagedNaicsFilters);

        if (this.hint) {
            this.hint.showHint();
        }
    }

    onUncheck = (newChecked, uncheckedNode) => {
        const [stagedNaicsFilters, newUnchecked] = decrementNaicsCountAndUpdateUnchecked(
            uncheckedNode,
            this.props.unchecked,
            this.props.checked,
            this.state.stagedNaicsFilters,
            this.props.nodes
        );

        this.props.setUncheckedNaics(newUnchecked);
        this.props.stageNaics(newChecked, newUnchecked, stagedNaicsFilters);
        this.props.setCheckedNaics(newChecked);

        this.setState({ stagedNaicsFilters });
    }

    onExpand = (value, expanded, fetch) => {
        if (fetch && !this.state.isSearch) {
            this.fetchNAICS(value);
        }
        if (this.state.isSearch) {
            this.props.setExpandedNaics(expanded, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedNaics(expanded);
        }
    };

    onCollapse = (expanded) => {
        if (this.state.isSearch) {
            this.props.setExpandedNaics(expanded, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedNaics(expanded);
        }
    };

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true, isLoading: true }, this.onSearchChange);
    }

    autoCheckSearchedResultDescendants = (checked, expanded) => {
        const { nodes } = this.props;
        const placeholderNodes = checked
            .filter((node) => node.includes('children_of_'))
            .map((node) => node.split('children_of_')[1]);

        // this will never have grandchildren
        const expandedNodesWithMockAncestorChecked = expanded
            .filter((naicsCode) => {
                const parentKey = `${naicsCode[0]}${naicsCode[1]}`;
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
                const node = getNaicsNodeFromTree(nodes, expandedNode);
                if (node.children) {
                    node.children.forEach((child) => {
                        if (!child.children) this.props.addCheckedNaics(child.value);
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                this.props.addCheckedNaics(grandChild.value);
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6) {
                    this.props.addCheckedNaics(node.value);
                }
            });
    };

    removeStagedNaics = (node) => {
        const newChecked = removeStagedNaicsFilter(this.props.nodes, this.props.checked, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    }

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
                    const visibleNaicsValues = expandNaicsAndAllDescendantParents(results, 'naics');
                    this.props.setSearchedNaics(results);
                    this.autoCheckSearchedResultDescendants(checked, visibleNaicsValues);
                    this.props.setExpandedNaics(visibleNaicsValues, 'SET_SEARCHED_EXPANDED');
                }
                else {
                    this.props.setNaicsNodes(param, results);
                }
                // we've searched for a specific naics reference; ie '11' or '1111' and their immediate descendants should be checked.
                if (checked.includes(`children_of_${param}`)) {
                    const newChecked = autoCheckNaicsAfterExpand(
                        results[0],
                        this.props.checked,
                        this.props.unchecked
                    );
                    this.props.setCheckedNaics(newChecked);
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

    showNoResults = () => {
        if (this.state.isLoading) return false;
        return (
            this.props.nodes.length === 0 ||
            (this.state.isSearch && this.props.searchExpanded.length === 0)
        );
    }

    checkboxDiv(showNoResults) {
        const {
            isLoading,
            isError,
            errorMessage,
            searchString,
            isSearch
        } = this.state;
        const {
            checked,
            nodes,
            expanded,
            searchExpanded
        } = this.props;
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
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onUncheck={this.onUncheck}
                onCheck={this.onCheck} />
        );
    }

    render() {
        const showNoResults = this.showNoResults();
        const { searchString, stagedNaicsFilters } = this.state;
        return (
            <div>
                <div className="naics-search-container">
                    <EntityDropdownAutocomplete
                        placeholder="Type to find codes"
                        searchString={searchString}
                        enabled
                        handleTextInputChange={this.handleTextInputChange}
                        context={{}}
                        loading={false}
                        isClearable
                        onClear={this.onClear} />
                    {this.checkboxDiv(showNoResults)}
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
                                        onClick={() => this.removeStagedNaics(node)}
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
        checkedFromHash: state.appliedFilters.filters.naicsCodes.require,
        uncheckedFromHash: state.appliedFilters.filters.naicsCodes.exclude,
        filters: state.appliedFilters.filters
    }),
    (dispatch) => ({
        stageNaics: (checked, unchecked, counts) => dispatch(updateNaicsV2(checked, unchecked, counts)),
        setNaicsNodes: (key, naics) => dispatch(setNaicsNodes(key, naics)),
        setExpandedNaics: (expanded, type) => dispatch(setExpandedNaics(expanded, type)),
        setCheckedNaics: (checkedNodes) => dispatch(setCheckedNaics(checkedNodes)),
        addCheckedNaics: (newCheckedNode) => dispatch(addCheckedNaics(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree()),
        setUncheckedNaics: (unchecked) => dispatch(setUncheckedNaics(unchecked)),
        restoreHashedFilters: (filters) => dispatch(restoreHashedFilters(filters))
    }))(NAICSContainer);
