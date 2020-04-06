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
    removeStagedNaicsFilter
} from 'helpers/naicsHelper';

import {
    removePlaceholderString,
    expandAllNodes
} from 'helpers/checkboxTreeHelper';

import { naicsRequest } from 'helpers/searchHelper';

import {
    setNaics,
    setExpanded,
    setChecked,
    setSearchedNaics,
    addChecked,
    showNaicsTree,
    setUnchecked
} from 'redux/actions/search/naicsActions';
import { updateNaicsV2 } from 'redux/actions/search/searchFilterActions';
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

/*
    * TODO:
    * 1. move checked, expanded, nodes, unchecked to local state.
    * 2. move stagedNaicsFilters to redux.
*/

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
        if (this.props.nodes.length) return Promise.resolve();
        return this.fetchNAICS()
            .then(() => {
                if (checkedFromHash.length > 0) {
                    // lets load a stateful tree from the url...
                    const fetchAllNodesAndCheckTheirChildren = (iterable) => new Promise((resolve, reject) => {
                        iterable.reduce((prevPromise, checked, i, arr) => prevPromise
                            .then(() => {
                                // last node fetched
                                if (i === arr.length - 1) {
                                    const newChecked = [];
                                    const param = checked.length === 6
                                        ? getImmediateAncestorNaicsCode(checked)
                                        : checked;
                                    return this.fetchNAICS(param)
                                        .then(() => {
                                            iterable.forEach((code) => {
                                                if (code.length === 6) {
                                                    if (!uncheckedFromHash.includes(code)) {
                                                        // this should never happen, but if code is in unchecked and checked, give priority to unchecked array.
                                                        newChecked.push(code);
                                                    }
                                                }
                                                else {
                                                    getNaicsNodeFromTree(this.props.nodes, code)
                                                        .children
                                                        .forEach((child) => {
                                                            if (child.value.length === 4) {
                                                                child.children.forEach((grand) => {
                                                                    // add the grand-children.
                                                                    const isUncheckedByAncestor = (
                                                                        uncheckedFromHash.includes(removePlaceholderString(grand.value)) ||
                                                                        uncheckedFromHash.includes(child.value)
                                                                    );
                                                                    if (!isUncheckedByAncestor) {
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
                                                const uncheckedGrandChildrenWithoutImmediateAncestorChecked = uncheckedFromHash
                                                    .filter((naicsCode) => {
                                                        const ancestorKey = getImmediateAncestorNaicsCode(naicsCode);
                                                        if (naicsCode.length === 6 && !checkedFromHash.includes(ancestorKey)) return true;
                                                        return false;
                                                    });
                                                if (uncheckedGrandChildrenWithoutImmediateAncestorChecked.length > 0) {
                                                    // we gotta fetch the immediate ancestor to count this properly
                                                    uncheckedGrandChildrenWithoutImmediateAncestorChecked
                                                        .map((naicsCode) => getImmediateAncestorNaicsCode(naicsCode))
                                                        .forEach((ancestorKey, index, src) => {
                                                            this.fetchNAICS(ancestorKey)
                                                                .then(() => {
                                                                    getNaicsNodeFromTree(this.props.nodes, ancestorKey)
                                                                        .children
                                                                        .forEach((grand) => {
                                                                            const isUncheckedByAncestor = (
                                                                                uncheckedFromHash.includes(ancestorKey) ||
                                                                                uncheckedFromHash.includes(grand.value)
                                                                            );
                                                                            if (!isUncheckedByAncestor) {
                                                                                // we're removing the placeholder, so add the
                                                                                // real grandchildren to the checked array now
                                                                                // that we have them.
                                                                                newChecked.push(grand.value);
                                                                            }
                                                                        });
                                                                    if (index === src.length - 1) {
                                                                        const newCheckedWithoutAncestorPlaceholder = newChecked
                                                                            // we've actually replaced the placeholder with the real deal, so remove it.
                                                                            .filter((naicsCode) => naicsCode !== `children_of_${ancestorKey}`);
                                                                        resolve(newCheckedWithoutAncestorPlaceholder);
                                                                    }
                                                                });
                                                        });
                                                }
                                                else {
                                                    resolve(newChecked);
                                                }
                                            });
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

                    return fetchAllNodesAndCheckTheirChildren(checkedFromHash)
                        .then((data) => {
                            // remove duplicate values
                            const newChecked = [...new Set(data)];
                            const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
                                newChecked,
                                this.props.checked,
                                this.props.unchecked,
                                this.props.nodes,
                                this.state.stagedNaicsFilters
                            );
                            this.setState({ stagedNaicsFilters: newCounts });
                            this.props.setUnchecked(newUnchecked);
                            this.props.setChecked(newChecked);
                            this.props.restoreHashedFilters({
                                ...this.props.filters,
                                // counts should live in redux.
                                naicsCodes: {
                                    ...this.props.filters.naicsCodes,
                                    counts: newCounts
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
        this.props.setChecked(newChecked);
        this.props.setUnchecked(newUnchecked);
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

        this.props.setUnchecked(newUnchecked);
        this.props.stageNaics(newChecked, newUnchecked, stagedNaicsFilters);
        this.props.setChecked(newChecked);

        this.setState({ stagedNaicsFilters });
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
                        openDropdown={this.onSearchClick}
                        toggleDropdown={this.toggleDropdown}
                        handleTextInputChange={this.handleTextInputChange}
                        context={{}}
                        loading={false}
                        handleOnKeyDown={this.handleOnKeyDown}
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
        setNaics: (key, naics) => dispatch(setNaics(key, naics)),
        setExpanded: (expanded, type) => dispatch(setExpanded(expanded, type)),
        setChecked: (checkedNodes) => dispatch(setChecked(checkedNodes)),
        addChecked: (newCheckedNode) => dispatch(addChecked(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree()),
        setUnchecked: (unchecked) => dispatch(setUnchecked(unchecked)),
        restoreHashedFilters: (filters) => dispatch(restoreHashedFilters(filters))
    }))(NAICSContainer);
