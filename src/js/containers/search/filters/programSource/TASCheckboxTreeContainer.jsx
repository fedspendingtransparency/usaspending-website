import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    removeStagedTasFilter,
    autoCheckTasAfterExpand,
    getTasNodeFromTree
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';
import { expandNodeAndAllDescendants, removePlaceholderString } from 'helpers/checkboxTreeHelper';

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

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import ProgramSourceInfoTooltip from 'components/search/filters/programSource/ProgramSourceInfoTooltip';

const propTypes = {
    setTasNodes: PropTypes.func,
    setExpandedTas: PropTypes.func,
    setCheckedTas: PropTypes.func,
    setSearchedTas: PropTypes.func,
    setTasCounts: PropTypes.func,
    // restoreHashedFilters: PropTypes.func,
    addCheckedTas: PropTypes.func,
    showTasTree: PropTypes.func,
    setUncheckedTas: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.string),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.string),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({}))
};

const SearchNote = () => (
    <div className="tas-checkbox-tt">
        <p>Filter the options below by typing any of the following:</p>
        <ul>
            <li>Any part of an agency name</li>
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
            errorMessage: ''
        };
        this.request = null;
    }

    async componentDidMount() {
        if (this.props.nodes.length === 0) {
            return this.fetchTas('');
        }
        return Promise.resolve();
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

        if (this.hint) {
            this.hint.showHint();
        }
    }

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
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.fetchTas('', this.state.searchString);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.showTasTree();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            isError: false,
            errorMessage: ''
        });
    }

    onCollapse = (newExpandedArray) => {
        if (this.state.isSearch) {
            this.props.setExpandedTas(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedTas(newExpandedArray);
        }
    }

    removeSelectedFilter = (e, node) => {
        e.preventDefault();
        const newChecked = removeStagedTasFilter(this.props.nodes, this.props.checked, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    }

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
                const node = getTasNodeFromTree(nodes, expandedAndChecked);
                return [...acc, ...node.children.map((tas) => tas.value)];
            }, []);

        return new Set([...checked, ...newChecked]);
    }

    fetchTas = (id = '', searchStr = '') => {
        if (this.request) this.request.cancel();
        if (id === '') {
            this.setState({ isLoading: true });
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
                    this.setState({ isLoading: false });
                    const newChecked = this.props.checked.includes(`children_of_${key}`)
                        ? autoCheckTasAfterExpand(
                            { children: nodes, value: key },
                            this.props.checked,
                            this.props.unchecked
                        )
                        : this.props.checked;
                    if (this.state.isSearch) {
                        this.props.setSearchedTas(nodes);
                        const searchExpandedNodes = expandNodeAndAllDescendants(nodes);
                        this.props.setExpandedTas(expandNodeAndAllDescendants(nodes), 'SET_SEARCHED_EXPANDED');
                        const nodesCheckedByPlaceholderOrAncestor = this.autoCheckSearchResultDescendants(
                            this.props.checked,
                            searchExpandedNodes,
                            nodes
                        );
                        this.props.setCheckedTas(nodesCheckedByPlaceholderOrAncestor);
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
                console.log("error fetching TAS", e);
                if (!isCancel(e)) {
                    this.setState({
                        isError: true,
                        errorMessage: get(e, 'message', 'Error fetching TAS.')
                    });
                }
            });
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({
            searchString: text,
            isSearch: true,
            isLoading: true
        }, this.onSearchChange);
    }

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
            isSearch
        } = this.state;
        return (
            <div className="tas-checkbox">
                <span className="tas-checkbox__header">
                    Search by Federal Account, TAS, or Agency Owner
                    <ProgramSourceInfoTooltip
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
                    data={nodes}
                    checked={checked}
                    searchText={searchString}
                    countLabel="TAS"
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
    counts: state.tas.counts.toJS()
    // checkedFromHash: state.appliedFilters.filters.tasCodes.require,
    // uncheckedFromHash: state.appliedFilters.filters.tasCodes.exclude,
    // filters: state.appliedFilters.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTasNodes: (key, nodes) => dispatch(setTasNodes(key, nodes)),
    showTasTree: () => dispatch(showTasTree()),
    setExpandedTas: (expanded, type) => dispatch(setExpandedTas(expanded, type)),
    addCheckedTas: (nodeValue) => dispatch(addCheckedTas(nodeValue)),
    setCheckedTas: (nodes) => dispatch(setCheckedTas(nodes)),
    setUncheckedTas: (nodes) => dispatch(setUncheckedTas(nodes)),
    setSearchedTas: (nodes) => dispatch(setSearchedTas(nodes)),
    setTasCounts: (newCounts) => dispatch(setTasCounts(newCounts))
});

export default connect(mapStateToProps, mapDispatchToProps)(TASCheckboxTree);
