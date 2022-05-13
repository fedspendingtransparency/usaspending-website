import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get, flattenDeep, uniqueId } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import {
    cleanPscData,
    incrementPscCountAndUpdateUnchecked,
    decrementPscCountAndUpdateUnchecked,
    removeStagedPscFilter,
    autoCheckPscAfterExpand,
    expandPscNodeAndAllDescendantParents,
    getPscNodeFromTree,
    getPscAncestryPathForChecked
} from 'helpers/pscHelper';
import { fetchPsc } from 'helpers/searchHelper';
import {
    getAllDescendants,
    removePlaceholderString,
    getUniqueAncestorPaths,
    trimCheckedToCommonAncestors
} from 'helpers/checkboxTreeHelper';

import {
    setPscNodes,
    showPscTree,
    setExpandedPsc,
    addCheckedPsc,
    setCheckedPsc,
    setUncheckedPsc,
    setSearchedPsc,
    setPscCounts
} from 'redux/actions/search/pscActions';
import { updatePSC } from 'redux/actions/search/searchFilterActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import { CSSOnlyTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';

const propTypes = {
    setPscNodes: PropTypes.func,
    setExpandedPsc: PropTypes.func,
    setCheckedPsc: PropTypes.func,
    setSearchedPsc: PropTypes.func,
    setPscCounts: PropTypes.func,
    stagePsc: PropTypes.func,
    addCheckedPsc: PropTypes.func,
    showPscTree: PropTypes.func,
    setUncheckedPsc: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    countsFromHash: PropTypes.arrayOf(PropTypes.shape({})),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({}))
};

const SearchTooltip = () => (
    <>
        <p>Filter the options below by typing any of the following:</p>
        <ul>
            <li>Any PSC numeric code (or part thereof)</li>
            <li>Any PSC label name (or part thereof)</li>
        </ul>
    </>
);

export class PSCCheckboxTreeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSearch: false,
            searchString: '',
            isError: false,
            errorMessage: '',
            showNoResults: false
        };
        this.request = null;
    }

    componentDidMount() {
        const {
            nodes,
            uncheckedFromHash,
            checkedFromHash,
            countsFromHash
        } = this.props;
        if (nodes.length !== 0 && checkedFromHash.length) {
            this.setCheckedStateFromUrlHash(
                checkedFromHash.map((ancestryPath) => ancestryPath[ancestryPath.length - 1])
            );
            this.props.setPscCounts(countsFromHash);
            this.props.stagePsc(
                trimCheckedToCommonAncestors(getPscAncestryPathForChecked(this.props.checked, this.props.nodes)),
                getPscAncestryPathForChecked(this.props.unchecked, this.props.nodes),
                this.props.counts
            );
            return Promise.resolve();
        }
        else if (nodes.length !== 0) {
            showPscTree();
            return Promise.resolve();
        }
        return this.fetchPsc('', null, false)
            .then(() => {
                if (checkedFromHash.length > 0) {
                    this.props.setPscCounts(countsFromHash);
                    return getUniqueAncestorPaths(checkedFromHash, uncheckedFromHash)
                        .reduce((prevPromise, param) => prevPromise
                        // fetch the all the ancestors of the checked nodes
                            .then(() => this.fetchPsc(param, null, false)), Promise.resolve([])
                        )
                        .then(() => {
                            this.setCheckedStateFromUrlHash(
                                checkedFromHash.map((ancestryPath) => ancestryPath[ancestryPath.length - 1])
                            );
                            this.props.setExpandedPsc([
                                ...new Set(checkedFromHash.map((ancestryPath) => ancestryPath[0]))
                            ]);
                        })
                        .catch((e) => {
                            this.setState({
                                isLoading: false,
                                isError: true,
                                errorMessage: get(e, 'message', 'Error fetching PSC.')
                            });
                        });
                }
                this.setState({ isLoading: false });

                // just do this for consistent return.
                return Promise.resolve();
            });
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
        this.props.showPscTree();
    }

    onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        if (shouldFetchChildren && !this.state.isSearch) {
            if (selectedNode.treeDepth >= 1) {
                const { parent } = selectedNode;
                if (selectedNode.treeDepth === 2) {
                    this.fetchPsc(`${parent.ancestors[0]}/${parent.value}/${expandedValue}`);
                }
                else {
                    this.fetchPsc(`${parent.value}/${expandedValue}`);
                }
            }
            else {
                this.fetchPsc(expandedValue);
            }
        }
        if (this.state.isSearch) {
            this.props.setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedPsc(newExpandedArray);
        }
    };

    onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementPscCountAndUpdateUnchecked(
            newChecked,
            this.props.checked,
            this.props.unchecked,
            this.props.nodes,
            this.props.counts
        );

        this.props.setCheckedPsc(newChecked);
        this.props.setPscCounts(newCounts);
        this.props.setUncheckedPsc(newUnchecked);
        this.props.stagePsc(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, this.props.nodes)),
            getPscAncestryPathForChecked(newUnchecked, this.props.nodes),
            newCounts
        );

        if (this.hint) {
            this.hint.showHint();
        }
    };

    onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementPscCountAndUpdateUnchecked(
            uncheckedNode,
            this.props.unchecked,
            this.props.checked,
            this.props.counts,
            this.props.nodes
        );

        this.props.setCheckedPsc(newChecked);
        this.props.setPscCounts(newCounts);
        this.props.setUncheckedPsc(newUnchecked);
        this.props.stagePsc(
            trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, this.props.nodes)),
            getPscAncestryPathForChecked(newUnchecked, this.props.nodes),
            newCounts
        );
    };

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.fetchPsc('', this.state.searchString);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.setExpandedPsc([], 'SET_SEARCHED_EXPANDED');
        this.props.showPscTree();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            isError: false,
            errorMessage: '',
            showNoResults: false
        });
    };

    onCollapse = (newExpandedArray) => {
        if (this.state.isSearch) {
            this.props.setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedPsc(newExpandedArray);
        }
    };

    setCheckedStateFromUrlHash = (newChecked) => {
        const { nodes } = this.props;
        const uncheckedFromHash = this.props.uncheckedFromHash.map((ancestryPath) => ancestryPath.pop());
        if (nodes.length > 0) {
            const newCheckedWithPlaceholders = flattenDeep(newChecked
                .map((checked) => getAllDescendants(getPscNodeFromTree(nodes, checked), uncheckedFromHash))
            );
            this.props.setCheckedPsc(newCheckedWithPlaceholders);
            this.props.setUncheckedPsc(uncheckedFromHash);
            this.setState({ isLoading: false });
        }
    };

    removeSelectedFilter = (e, node) => {
        e.preventDefault();
        const newChecked = removeStagedPscFilter(this.props.nodes, this.props.checked, node.value);
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
                const node = getPscNodeFromTree(nodes, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checked, ...newChecked]);
    };

    fetchPsc = (id = '', searchStr = '', resolveLoadingIndicator = true) => {
        if (this.request) this.request.cancel();
        if (id === '') {
            this.setState({ isLoading: true });
        }
        if (this.state.showNoResults) {
            this.setState({ showNoResults: false });
        }
        const queryParam = this.state.isSearch
            ? `?depth=-1&filter=${searchStr}`
            : id;
        this.request = fetchPsc(queryParam);
        const isPartialTree = (
            id !== '' ||
            this.state.isSearch
        );
        return this.request.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const nodes = cleanPscData(data.results);
                if (isPartialTree) {
                    // parsing the prepended agency (format in url is agencyId/federalAccountId when fetching federalAccount level data)
                    const key = id.includes('/')
                        ? id.split('/').pop()
                        : id;
                    if (resolveLoadingIndicator) {
                        this.setState({ isLoading: false });
                    }
                    const newChecked = this.props.checked.includes(`children_of_${key}`)
                        ? autoCheckPscAfterExpand(
                            { children: nodes, value: key },
                            this.props.checked,
                            this.props.unchecked
                        )
                        : this.props.checked;
                    if (this.state.isSearch) {
                        this.props.setSearchedPsc(nodes);
                        const searchExpandedNodes = expandPscNodeAndAllDescendantParents(nodes);
                        this.props.setExpandedPsc(searchExpandedNodes, 'SET_SEARCHED_EXPANDED');
                        const nodesCheckedByPlaceholderOrAncestor = this.autoCheckSearchResultDescendants(
                            this.props.checked,
                            searchExpandedNodes,
                            this.props.nodes
                        );
                        this.props.setCheckedPsc(nodesCheckedByPlaceholderOrAncestor);
                        if (nodes.length === 0) {
                            this.setState({ showNoResults: true });
                        }
                    }
                    else {
                        this.props.setPscNodes(key, nodes);
                        this.props.setCheckedPsc(newChecked);
                    }
                }
                else {
                    // populating tree trunk
                    this.props.setPscNodes('', nodes);
                    if (resolveLoadingIndicator) {
                        this.setState({ isLoading: false });
                    }
                }
                this.request = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log("error fetching PSC", e);
                    this.setState({
                        isError: true,
                        isLoading: false,
                        errorMessage: get(e, 'message', 'Error fetching PSC.')
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
        return this.setState({
            searchString: text,
            isSearch: true,
            isLoading: true
        }, this.onSearchChange);
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
            isSearch
        } = this.state;
        return (
            <div className="psc-checkbox">
                <span className="checkbox-header">Search by Code or Name <CSSOnlyTooltip definition={<SearchTooltip />} heading="PSC Search" /></span>
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
                    noResults={this.state.showNoResults}
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

PSCCheckboxTreeContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    nodes: state.psc.psc.toJS(),
    expanded: state.psc.expanded.toJS(),
    searchExpanded: state.psc.searchExpanded.toJS(),
    checked: state.psc.checked.toJS(),
    unchecked: state.psc.unchecked.toJS(),
    counts: state.psc.counts.toJS(),
    checkedFromHash: state.appliedFilters.filters.pscCodes.require,
    uncheckedFromHash: state.appliedFilters.filters.pscCodes.exclude,
    countsFromHash: state.appliedFilters.filters.pscCodes.counts
});

const mapDispatchToProps = (dispatch) => ({
    setPscNodes: (key, nodes) => dispatch(setPscNodes(key, nodes)),
    showPscTree: () => dispatch(showPscTree()),
    setExpandedPsc: (expanded, type) => dispatch(setExpandedPsc(expanded, type)),
    addCheckedPsc: (nodeValue) => dispatch(addCheckedPsc(nodeValue)),
    setCheckedPsc: (nodes) => dispatch(setCheckedPsc(nodes)),
    setUncheckedPsc: (nodes) => dispatch(setUncheckedPsc(nodes)),
    setSearchedPsc: (nodes) => dispatch(setSearchedPsc(nodes)),
    setPscCounts: (newCounts) => dispatch(setPscCounts(newCounts)),
    stagePsc: (require, exclude, counts) => dispatch(updatePSC(require, exclude, counts))
});

export default connect(mapStateToProps, mapDispatchToProps)(PSCCheckboxTreeContainer);
