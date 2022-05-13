import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get, uniqueId, flattenDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    removeStagedTasFilter,
    autoCheckTasAfterExpand,
    expandTasNodeAndAllDescendantParents,
    getTasNodeFromTree,
    getTasAncestryPathForChecked,
    shouldTasNodeHaveChildren
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';
import {
    removePlaceholderString,
    getUniqueAncestorPaths,
    getAllDescendants,
    trimCheckedToCommonAncestors,
    doesMeetMinimumCharsRequiredForSearch
} from 'helpers/checkboxTreeHelper';
import {
    setTasNodes,
    showTasTree,
    setExpandedTas,
    addCheckedTas,
    setCheckedTas,
    setUncheckedTas,
    setSearchedTas,
    setTasCounts
} from 'redux/actions/search/tasActions';
import { updateTAS } from 'redux/actions/search/searchFilterActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import { CSSOnlyTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';

const propTypes = {
    setTasNodes: PropTypes.func,
    setExpandedTas: PropTypes.func,
    setCheckedTas: PropTypes.func,
    setSearchedTas: PropTypes.func,
    setTasCounts: PropTypes.func,
    addCheckedTas: PropTypes.func,
    showTasTree: PropTypes.func,
    setUncheckedTas: PropTypes.func,
    stageTas: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    filters: PropTypes.object
};

const SearchNote = () => (
    <div className="tas-checkbox-tt">
        <p>
            The following nested hierarchy shows Agency, Federal Accounts owned by that Agency, and Treasury Account Symbols (TAS) within each Federal Account.
        </p>
        <br />
        <p>Filter the options below by typing any of the following:</p>
        <ul>
            <li>Any part of an Agency name</li>
            <li>Any part of a Federal Account symbol or title</li>
            <li>Any part of a Treasury Account Symbol or title.</li>
        </ul>
    </div>
);

export class TASCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchString: '',
            isError: false,
            errorMessage: '',
            showNoResults: false
        };
        this.request = null;
    }

    async componentDidMount() {
        const {
            checkedFromHash,
            uncheckedFromHash,
            countsFromHash
        } = this.props;
        if (this.props.nodes.length !== 0 && checkedFromHash.length) {
            this.setCheckedStateFromUrlHash(checkedFromHash.map((ancestryPath) => ancestryPath.pop()));
            this.props.setTasCounts(countsFromHash);
            this.props.stageTas(
                trimCheckedToCommonAncestors(getTasAncestryPathForChecked(this.props.checked, this.props.nodes)),
                getTasAncestryPathForChecked(this.props.unchecked, this.props.nodes),
                countsFromHash
            );
            return Promise.resolve();
        }
        else if (this.props.nodes.length !== 0) {
            this.props.showTasTree();
            return Promise.resolve();
        }
        return this.fetchTas('')
            .then(() => {
                if (checkedFromHash.length > 0) {
                    this.props.setTasCounts(countsFromHash);
                    return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                        .reduce((prevPromise, param) => prevPromise
                        // fetch the all the ancestors of the checked nodes
                            .then(() => this.fetchTas(param, null, false)), Promise.resolve([])
                        )
                        .then(() => {
                            this.setCheckedStateFromUrlHash(checkedFromHash.map((ancestryPath) => ancestryPath.pop()));
                            this.props.setExpandedTas([
                                ...new Set(checkedFromHash.map((ancestryPath) => ancestryPath[0]))
                            ]);
                        })
                        .catch((e) => {
                            this.setState({
                                isLoading: false,
                                isError: true,
                                errorMessage: get(e, 'message', 'Error fetching TAS.')
                            });
                        });
                }
                // just do this for consistent return.
                return Promise.resolve();
            });
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
        this.props.showTasTree();
    }

    onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        if (shouldFetchChildren && !this.state.isSearch) {
            if (selectedNode.treeDepth === 1) {
                const selectedAgency = this.props.nodes
                    .find((agency) => agency.children.some((federalAccount) => federalAccount.value === expandedValue));
                const agencyAndFederalAccountString = `${selectedAgency.value}/${expandedValue}`;
                this.fetchTas(agencyAndFederalAccountString);
            }
            else {
                this.fetchTas(expandedValue);
            }
        }
        if (this.state.isSearch) {
            this.props.setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedTas(newExpandedArray);
        }
    };

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.fetchTas('', this.state.searchString);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.setExpandedTas([], 'SET_SEARCHED_EXPANDED');
        this.props.showTasTree();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            isError: false,
            errorMessage: '',
            showNoResults: false
        });
    };

    onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(
            uncheckedNode,
            this.props.unchecked,
            this.props.checked,
            this.props.counts,
            this.props.nodes
        );

        this.props.setCheckedTas(newChecked);
        this.props.setTasCounts(newCounts);
        this.props.setUncheckedTas(newUnchecked);
        this.props.stageTas(
            trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, this.props.nodes)),
            getTasAncestryPathForChecked(newUnchecked, this.props.nodes),
            newCounts
        );
    };

    onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementTasCountAndUpdateUnchecked(
            newChecked,
            this.props.checked,
            this.props.unchecked,
            this.props.nodes,
            this.props.counts
        );

        this.props.setCheckedTas(newChecked);
        this.props.setTasCounts(newCounts);
        this.props.setUncheckedTas(newUnchecked);

        this.props.stageTas(
            trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, this.props.nodes)),
            getTasAncestryPathForChecked(newUnchecked, this.props.nodes),
            newCounts
        );

        if (this.hint) {
            this.hint.showHint();
        }
    };

    onCollapse = (newExpandedArray) => {
        if (this.state.isSearch) {
            this.props.setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedTas(newExpandedArray);
        }
    };

    setCheckedStateFromUrlHash = (newChecked) => {
        if (this.props.nodes.length > 0) {
            const uncheckedFromHash = this.props.uncheckedFromHash.map((ancestryPath) => ancestryPath.pop());
            this.props.setUncheckedTas(uncheckedFromHash);
            const realCheckedWithPlaceholders = flattenDeep(newChecked
                .map((checked) => getAllDescendants(getTasNodeFromTree(this.props.nodes, checked), uncheckedFromHash))
            );
            this.props.setCheckedTas(realCheckedWithPlaceholders);
            this.setState({ isLoading: false, isError: false });
        }
    };

    removeSelectedFilter = (e, node) => {
        e.preventDefault();
        const newChecked = removeStagedTasFilter(this.props.nodes, this.props.checked, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    };

    autoCheckSearchResultDescendants = (checked, expanded, nodes) => {
        const newChecked = expanded
            .filter((expandedNode) => {
                // if node is checked by an immediate placeholder, consider it checked.
                if (checked.includes(`children_of_${expandedNode}`)) return true;
                if (checked.includes(expandedNode)) return true;
                return false;
            })
            .map((node) => removePlaceholderString(node))
            .reduce((acc, expandedAndChecked) => {
                if (!expandedAndChecked) return acc;
                const node = getTasNodeFromTree(nodes, expandedAndChecked);
                if (shouldTasNodeHaveChildren(node)) {
                    return [...acc, ...node.children.map((tas) => tas.value)];
                }
                return acc;
            }, []);

        return new Set([...checked, ...newChecked]);
    };

    fetchTas = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (this.request) this.request.cancel();
        if (id === '') {
            this.setState({ isLoading: true });
        }
        if (this.state.showNoResults) {
            this.setState({ showNoResults: false });
        }
        const queryParam = this.state.isSearch
            ? `?depth=2&filter=${searchStr}`
            : id;
        this.request = fetchTas(queryParam);
        const isPartialTree = (
            id !== '' ||
            this.state.isSearch
        );
        return this.request.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const nodes = cleanTasData(data.results);
                if (isPartialTree) {
                    // parsing the prepended agency (format in url is agencyId/federalAccountId when fetching federalAccount level data)
                    const key = id.includes('/')
                        ? id.split('/')[1]
                        : id;
                    if (resolveLoadingIndicator) {
                        this.setState({ isLoading: false });
                    }
                    const newChecked = this.props.checked.includes(`children_of_${key}`)
                        ? autoCheckTasAfterExpand(
                            { children: nodes, value: key },
                            this.props.checked,
                            this.props.unchecked
                        )
                        : this.props.checked;
                    if (this.state.isSearch) {
                        this.props.setSearchedTas(nodes);
                        const searchExpandedNodes = expandTasNodeAndAllDescendantParents(nodes);
                        this.props.setExpandedTas(expandTasNodeAndAllDescendantParents(nodes), 'SET_SEARCHED_EXPANDED');
                        const nodesCheckedByPlaceholderOrAncestor = this.autoCheckSearchResultDescendants(
                            this.props.checked,
                            searchExpandedNodes,
                            nodes
                        );
                        this.props.setCheckedTas(nodesCheckedByPlaceholderOrAncestor);
                        if (nodes.length === 0) {
                            this.setState({ showNoResults: true });
                        }
                    }
                    else {
                        this.props.setTasNodes(key, nodes);
                        this.props.setCheckedTas(newChecked);
                    }
                }
                else {
                    // populating tree trunk
                    this.props.setTasNodes('', nodes);
                    this.setState({ isLoading: false });
                }
                this.request = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log("error fetching TAS", e);
                    this.setState({
                        isError: true,
                        isLoading: false,
                        errorMessage: get(e, 'message', 'Error fetching TAS.')
                    });
                }
                this.request = null;
            });
    };

    handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        const shouldTriggerSearch = doesMeetMinimumCharsRequiredForSearch(text);
        if (shouldTriggerSearch) {
            return this.setState({
                searchString: text,
                isSearch: true,
                isLoading: true
            }, this.onSearchChange);
        }
        return this.setState({
            searchString: text
        });
    };

    render() {
        const {
            nodes,
            checked,
            expanded,
            counts,
            searchExpanded
        } = this.props;
        const {
            isLoading,
            searchString,
            isError,
            errorMessage,
            isSearch,
            showNoResults
        } = this.state;
        return (
            <div className="tas-checkbox">
                <span className="checkbox-header">
                    Search by Agency, Federal Account, or Treasury Account
                    <CSSOnlyTooltip
                        definition={<SearchNote />}
                        heading="Find a Treasury Account" />
                </span>
                <EntityDropdownAutocomplete
                    placeholder="Type to filter results"
                    searchString={searchString}
                    enabled
                    handleTextInputChange={this.handleTextInputChange}
                    context={{}}
                    isClearable
                    loading={false}
                    onClear={this.onClear} />
                <CheckboxTree
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    data={nodes.sort((a, b) => a.label.localeCompare(b.label))}
                    checked={checked}
                    searchText={searchString}
                    countLabel="TAS"
                    noResults={showNoResults}
                    expanded={isSearch ? searchExpanded : expanded}
                    onUncheck={this.onUncheck}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    onCollapse={this.onCollapse} />
                {counts.length > 0 && (
                    <div
                        className="selected-filters"
                        role="status">
                        {counts.map((node) => {
                            const label = `${node.value} - ${node.label} (${node.count})`;
                            return (
                                <button
                                    key={uniqueId()}
                                    className="shown-filter-button"
                                    value={label}
                                    onClick={(e) => this.removeSelectedFilter(e, node)}
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
        );
    }
}

TASCheckboxTree.propTypes = propTypes;

const mapStateToProps = (state) => ({
    nodes: state.tas.tas.toJS(),
    expanded: state.tas.expanded.toJS(),
    searchExpanded: state.tas.searchExpanded.toJS(),
    checked: state.tas.checked.toJS(),
    unchecked: state.tas.unchecked.toJS(),
    counts: state.tas.counts.toJS(),
    checkedFromHash: state.appliedFilters.filters.tasCodes.require,
    uncheckedFromHash: state.appliedFilters.filters.tasCodes.exclude,
    countsFromHash: state.appliedFilters.filters.tasCodes.counts,
    filters: state.appliedFilters.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTasNodes: (key, nodes) => dispatch(setTasNodes(key, nodes)),
    showTasTree: () => dispatch(showTasTree()),
    setExpandedTas: (expanded, type) => dispatch(setExpandedTas(expanded, type)),
    addCheckedTas: (nodeValue) => dispatch(addCheckedTas(nodeValue)),
    setCheckedTas: (nodes) => dispatch(setCheckedTas(nodes)),
    setUncheckedTas: (nodes) => dispatch(setUncheckedTas(nodes)),
    setSearchedTas: (nodes) => dispatch(setSearchedTas(nodes)),
    setTasCounts: (newCounts) => dispatch(setTasCounts(newCounts)),
    stageTas: (require, exclude, counts) => dispatch(updateTAS(require, exclude, counts))
});

export default connect(mapStateToProps, mapDispatchToProps)(TASCheckboxTree);
