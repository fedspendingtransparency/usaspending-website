import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    removeStagedTasFilter,
    autoCheckTasAfterExpand
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';

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

class TASCheckboxTree extends React.Component {
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
        if (shouldFetchChildren) {
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
        this.props.setExpandedTas(newExpandedArray);
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
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            requestType: ''
        });
    }

    onCollapse = (newExpandedArray) => {
        this.props.setExpandedTas(newExpandedArray);
    }

    removeSelectedFilter = (node) => {
        const newChecked = removeStagedTasFilter(this.props.nodes, this.props.checked, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    }

    fetchTas = (id = '') => {
        if (this.request) this.request.cancel();
        if (id === '') {
            this.setState({ isLoading: true });
        }
        this.request = fetchTas(id);
        const isPartialTree = id !== '';
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

                    this.props.setCheckedTas(newChecked);
                    this.props.setTasNodes(key, nodes);
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
                this.setState({ isError: true, errorMessage: e });
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
            counts
        } = this.props;
        const {
            isLoading,
            searchString,
            isError,
            errorMessage
        } = this.state;
        return (
            <div className="tas-checkbox">
                <span>Search by Federal Account, TAS, or Title.</span>
                <EntityDropdownAutocomplete
                    enabled
                    isClearable
                    placeholder="Type to filter results"
                    searchString={searchString}
                    handleTextInputChange={this.handleTextInputChange}
                    context={{}}
                    loading={false}
                    onClear={this.onClear} />
                <CheckboxTree
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    data={nodes}
                    checked={checked}
                    countLabel="TAS"
                    expanded={expanded}
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
