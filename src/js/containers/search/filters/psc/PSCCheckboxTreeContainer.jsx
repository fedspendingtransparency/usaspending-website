import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { debounce, get, groupBy } from 'lodash';
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
    getAncestryPathOfNodes
} from 'helpers/pscHelper';
import { fetchPsc } from 'helpers/searchHelper';
import {
    getAllDescendants,
    removePlaceholderString
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
import { updatePSCV2 } from 'redux/actions/search/searchFilterActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';

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
    checkedFromHash: PropTypes.arrayOf(PropTypes.string),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.string),
    nodes: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    counts: PropTypes.arrayOf(PropTypes.shape({}))
};

export class PSCCheckboxTreeContainer extends React.Component {
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
        const { nodes, uncheckedFromHash, checkedFromHash } = this.props;
        if (
            nodes.length !== 0 &&
            !checkedFromHash &&
            !uncheckedFromHash
        ) {
            showPscTree();
            return Promise.resolve();
        }
        return this.fetchPsc('')
            .then(() => {
                if (checkedFromHash.length > 0) {
                    const uniqueAncestorsOfChecked = checkedFromHash
                        .reduce((listOfUniqueAncestors, ancestryPath) => {
                            const numberOfAncestors = ancestryPath.length - 1;
                            const uniqueAncestors = [...new Array(numberOfAncestors)]
                                .reduce((ancestors, _, i) => {
                                    const currentAncestor = ancestryPath[i];
                                    // already have this ancestor, move to the next.
                                    if (i === 0 && listOfUniqueAncestors.includes(currentAncestor)) {
                                        return ancestors;
                                    }
                                    // top level ancestor does not exist, add it and move to the next.
                                    if (i === 0 && !listOfUniqueAncestors.includes(currentAncestor)) {
                                        return ancestors.concat([currentAncestor]);
                                    }
                                    
                                    // ancestor string like parentX/parentY/parentZ
                                    const ancestorString = [...new Array(i + 1)]
                                        .reduce((str, __, index) => `${str}${ancestryPath[index]}/`, '');

                                    if (listOfUniqueAncestors.includes(ancestorString)) return ancestors;

                                    return ancestors.concat([ancestorString]);
                                }, []);

                            return listOfUniqueAncestors.concat(uniqueAncestors);
                        }, []);

                    return uniqueAncestorsOfChecked
                        .sort((param1, param2) => {
                            const a = param1.split('/').length;
                            const b = param2.split('/').length;
                            // smaller the length, the higher up on the tree. Fetch the highest nodes first.
                            if (b > a) return -1;
                            if (a > b) return 1;
                            return 0;
                        })
                        .reduce((prevPromise, param) => prevPromise
                            // fetch the all the ancestors of the checked nodes
                            .then(() => this.fetchPsc(param)), Promise.resolve([])
                        )
                        .then(() => {
                            // TODO: Add to checked/unchecked array and register counts.
                            // the tree is now guaranteed to be populated adequately such that we can register counts and full/half check the tree.
                            // const selectedNodesByTreeLevel = groupBy(checkedFromHash, (ancestryPath) => {
                            //     if (ancestryPath.length === 2) return 'branch';
                            //     return 'leaf';
                            // });
                            // const newChecked = Object.entries(selectedNodesByTreeLevel)
                            //     .reduce((acc, [location, array]) => {
                            //         if (location === 'branch') {
                            //             return [
                            //                 ...acc,
                            //                 ...array
                            //                     .map((ancestryPath) => ancestryPath[1])
                            //                     .reduce((grandChildren, node) => {
                            //                         if (this.props.nodes.length === 0) return grandChildren;
                            //                         const newGrandChildren = getPscNodeFromTree(this.props.nodes, node)
                            //                             .children
                            //                             .map((child) => child.value);
                            //                         return [...grandChildren, ...newGrandChildren];
                            //                     }, acc)
                            //             ];
                            //         }
                            //         return [
                            //             ...acc,
                            //             ...array
                            //                 .map((ancestryPath) => ancestryPath[2])
                            //         ];
                            //     }, [])
                            //     .filter((checked) => {
                            //         const inUncheckedArray = uncheckedFromHash.some((arr) => arr[arr.length - 1] === checked);
                            //         if (inUncheckedArray) return false;
                            //         return true;
                            //     });

                            // this.setCheckedStateFromUrlHash(newChecked);
                            this.props.setExpandedPsc(checkedFromHash.map((ancestryPath) => ancestryPath[0]));
                        });
                }
                // just do this for consistent return.
                return Promise.resolve();
            });
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
            getAncestryPathOfNodes(newChecked, this.props.nodes),
            getAncestryPathOfNodes(newUnchecked, this.props.nodes),
            newCounts
        );

        if (this.hint) {
            this.hint.showHint();
        }
    }

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
            getAncestryPathOfNodes(newChecked, this.props.nodes),
            getAncestryPathOfNodes(newUnchecked, this.props.nodes),
            newCounts
        );
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.fetchPsc('', this.state.searchString);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.showPscTree();
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
            this.props.setExpandedPsc(newExpandedArray, 'SET_SEARCHED_EXPANDED');
        }
        else {
            this.props.setExpandedPsc(newExpandedArray);
        }
    }

    removeSelectedFilter = (e, node) => {
        e.preventDefault();
        const newChecked = removeStagedPscFilter(this.props.nodes, this.props.checked, node.value);
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
                const node = getPscNodeFromTree(nodes, expandedAndChecked);
                return [
                    ...acc,
                    ...getAllDescendants(node)
                ];
            }, []);

        return new Set([...checked, ...newChecked]);
    }

    fetchPsc = (id = '', searchStr = '') => {
        if (this.request) this.request.cancel();
        if (id === '') {
            this.setState({ isLoading: true });
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
                    this.setState({ isLoading: false });
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
                    }
                    else {
                        this.props.setPscNodes(key, nodes);
                        this.props.setCheckedPsc(newChecked);
                    }
                }
                else {
                    // populating tree trunk
                    this.props.setPscNodes('', nodes);
                    this.setState({ isLoading: false });
                }
                this.request = null;
            })
            .catch((e) => {
                console.log("error fetching TAS", e);
                if (!isCancel(e)) {
                    this.setState({
                        isError: true,
                        errorMessage: get(e, 'message', 'Error fetching PSC.')
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
            <div className="psc-checkbox">
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
    // filters: state.appliedFilters.filters
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
    stagePsc: (require, exclude, counts) => dispatch(updatePSCV2(require, exclude, counts))
});

export default connect(mapStateToProps, mapDispatchToProps)(PSCCheckboxTreeContainer);
