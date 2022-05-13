/**
  * NAICSSearchContainer.jsx => NAICSCheckboxTree.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce, uniqueId } from 'lodash';
import { isCancel } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CSSOnlyTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';

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

import {
    getAllDescendants
} from 'helpers/checkboxTreeHelper';

import { naicsRequest } from 'helpers/searchHelper';

import {
    setNaicsNodes,
    setExpandedNaics,
    setCheckedNaics,
    setSearchedNaics,
    addCheckedNaics,
    showNaicsTree,
    setUncheckedNaics,
    setNaicsCounts
} from 'redux/actions/search/naicsActions';
import { updateNaics } from 'redux/actions/search/searchFilterActions';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    stageNaics: PropTypes.func,
    setNaicsNodes: PropTypes.func,
    setExpandedNaics: PropTypes.func,
    setCheckedNaics: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    addCheckedNaics: PropTypes.func,
    showNaicsTree: PropTypes.func,
    setUncheckedNaics: PropTypes.func,
    setNaicsCounts: PropTypes.func,
    expanded: PropTypes.arrayOf(PropTypes.string),
    checked: PropTypes.arrayOf(PropTypes.string),
    unchecked: PropTypes.arrayOf(PropTypes.string),
    checkedFromHash: PropTypes.arrayOf(PropTypes.string),
    uncheckedFromHash: PropTypes.arrayOf(PropTypes.string),
    countsFromHash: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        subLabel: PropTypes.string,
        count: PropTypes.string,
        value: PropTypes.string
    })),
    nodes: PropTypes.arrayOf(PropTypes.object),
    counts: PropTypes.arrayOf(PropTypes.object),
    searchExpanded: PropTypes.arrayOf(PropTypes.string),
    filters: PropTypes.object
};

const SearchTooltip = () => (
    <>
        <p>Filter the options below by typing any of the following:</p>
        <ul>
            <li>Any NAICS numeric code (or part thereof)</li>
            <li>Any NAICS label name (or part thereof)</li>
        </ul>
    </>
);

export class NAICSCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            searchString: '',
            requestType: 'initial'
        };
        this.request = null;
    }

    componentDidMount() {
        const { checkedFromHash, uncheckedFromHash, countsFromHash } = this.props;
        if (this.props.nodes.length !== 0 && checkedFromHash.length) {
            const newChecked = checkedFromHash
                .reduce((acc, checked) => {
                    if (checked.length === 6 && !uncheckedFromHash.includes(checked)) {
                        return [...acc, checked];
                    }
                    const node = getNaicsNodeFromTree(this.props.nodes, checked);
                    return [
                        ...acc,
                        ...getAllDescendants(node, uncheckedFromHash)
                    ];
                }, []);
            this.props.setCheckedNaics(newChecked);
            this.props.setNaicsCounts(countsFromHash);
            this.props.stageNaics(newChecked, [], countsFromHash);
            return Promise.resolve();
        }
        else if (this.props.nodes.length !== 0) {
            this.props.showNaicsTree();
            return Promise.resolve();
        }
        return this.fetchNAICS()
            .then(() => {
                if (checkedFromHash.length > 0) {
                    this.props.setNaicsCounts(countsFromHash);
                    this.props.setUncheckedNaics(uncheckedFromHash);
                    // Loading the checkbox tree from a url hash...
                    const allUniqueAncestors = [
                        ...checkedFromHash,
                        ...uncheckedFromHash
                    ].reduce((uniqueAncestors, code) => {
                        const highestAncestor = getHighestAncestorNaicsCode(code);
                        const immediateAncestor = getImmediateAncestorNaicsCode(code);
                        if (uniqueAncestors.includes(highestAncestor)) {
                            if (!uniqueAncestors.includes(immediateAncestor)) {
                                return uniqueAncestors.concat([immediateAncestor]);
                            }
                            return uniqueAncestors;
                        }
                        return uniqueAncestors.concat(
                            [highestAncestor, immediateAncestor]
                                .filter((ancestor) => {
                                    if (uniqueAncestors.includes(ancestor)) {
                                        return false;
                                    }
                                    return true;
                                })
                        );
                    }, []).sort((a, b) => {
                        if (b.length > a.length) return -1;
                        if (a.length > b.length) return 1;
                        return 0;
                    });

                    // Sequentially populate tree.
                    return allUniqueAncestors
                        .reduce((prevPromise, ancestor) => prevPromise
                            .then(() => this.fetchNAICS(ancestor, false)), Promise.resolve())
                    // Then populate the checked array w/ the real checked-nodes descendants
                        .then(() => {
                            this.setState({ isLoading: false });
                            const newChecked = checkedFromHash
                                .reduce((acc, checked) => {
                                    if (checked.length === 6 && !uncheckedFromHash.includes(checked)) {
                                        return [...acc, checked];
                                    }
                                    const node = getNaicsNodeFromTree(this.props.nodes, checked);
                                    return [
                                        ...acc,
                                        ...getAllDescendants(node, uncheckedFromHash)
                                    ];
                                }, []);
                            this.props.setCheckedNaics(newChecked);
                        });
                }
                if (this.props.nodes.length > 0) {
                    this.props.showNaicsTree();
                }
                // consistent return.
                return Promise.resolve();
            })
            .catch((e) => {
                console.log("Error: fetching naics on didMount", e);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.checked.length === 0 && prevProps.checked.length !== 0 && this.props.counts.length !== 0) {
            this.props.setNaicsCounts([]);
        }
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
        this.props.showNaicsTree();
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.props.setExpandedNaics([], 'SET_SEARCHED_EXPANDED');
        this.props.showNaicsTree();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            requestType: ''
        });
    };

    onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementNaicsCountAndUpdateUnchecked(
            newChecked,
            this.props.checked,
            this.props.unchecked,
            this.props.nodes,
            this.props.counts
        );

        this.props.setNaicsCounts(newCounts);
        this.props.setCheckedNaics(newChecked);
        this.props.setUncheckedNaics(newUnchecked);
        this.props.stageNaics(newChecked, newUnchecked, newCounts);

        if (this.hint) {
            this.hint.showHint();
        }
    };

    onUncheck = (newChecked, uncheckedNode) => {
        if (uncheckedNode.checked) {
            this.onCheck(newChecked);
        }
        else {
            const [newCounts, newUnchecked] = decrementNaicsCountAndUpdateUnchecked(
                uncheckedNode,
                this.props.unchecked,
                this.props.checked,
                this.props.counts,
                this.props.nodes
            );

            this.props.setUncheckedNaics(newUnchecked);
            this.props.stageNaics(newChecked, newUnchecked, newCounts);
            this.props.setCheckedNaics(newChecked);
            this.props.setNaicsCounts(newCounts);
        }
    };

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

    doesMeetMinimumCharsRequiredForNaicsSearch = (str = '', charMinimum = 2) => (
        str &&
        str.length >= charMinimum
    );

    handleTextInputChange = (e) => {
        e.persist();
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        const shouldTriggerSearch = this.doesMeetMinimumCharsRequiredForNaicsSearch(text);
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
                        if (!child.children) {
                            if (!this.props.unchecked.includes(child.value)) {
                                this.props.addCheckedNaics(child.value);
                            }
                        }
                        if (child.children) {
                            child.children.forEach((grandChild) => {
                                if (!this.props.unchecked.includes(grandChild.value)) {
                                    this.props.addCheckedNaics(grandChild.value);
                                }
                            });
                        }
                    });
                }
                else if (expandedNode.length === 6 && !this.props.unchecked.includes(expandedNode)) {
                    this.props.addCheckedNaics(node.value);
                }
            });
    };

    removeStagedNaics = (node) => {
        const newChecked = removeStagedNaicsFilter(this.props.nodes, this.props.checked, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    };

    fetchNAICS = (param = '', resolveLoading = true) => {
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
                    isLoading: resolveLoading ? false : this.state.isLoading,
                    isError: false,
                    errorMessage: '',
                    requestType: ''
                });
                this.request = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('Error NAICS Reponse : ', e);
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
        return this.props.nodes.length === 0;
    };

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
        const { searchString } = this.state;
        const { counts } = this.props;
        return (
            <div>
                <div className="naics-search-container">
                    <span className="checkbox-header">Search by Code or Name
                        <CSSOnlyTooltip definition={<SearchTooltip />} heading="NAICS Search" />
                    </span>
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
                    {counts.length !== 0 && (
                        <div
                            id="award-search-selected-locations"
                            className="selected-filters"
                            role="status">
                            {counts.map((node) => {
                                const label = `${node.value} - ${node.label} (${node.count})`;
                                return (
                                    <button
                                        key={uniqueId()}
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

NAICSCheckboxTree.propTypes = propTypes;

export default connect(
    (state) => ({
        nodes: state.naics.naics.toJS(),
        expanded: state.naics.expanded.toJS(),
        searchExpanded: state.naics.searchExpanded.toJS(),
        checked: state.naics.checked.toJS(),
        unchecked: state.naics.unchecked.toJS(),
        counts: state.naics.counts.toJS(),
        checkedFromHash: state.appliedFilters.filters.naicsCodes.require,
        uncheckedFromHash: state.appliedFilters.filters.naicsCodes.exclude,
        countsFromHash: state.appliedFilters.filters.naicsCodes.counts,
        filters: state.appliedFilters.filters
    }),
    (dispatch) => ({
        stageNaics: (checked, unchecked, counts) => dispatch(updateNaics(checked, unchecked, counts)),
        setNaicsNodes: (key, naics) => dispatch(setNaicsNodes(key, naics)),
        setExpandedNaics: (expanded, type) => dispatch(setExpandedNaics(expanded, type)),
        setCheckedNaics: (checkedNodes) => dispatch(setCheckedNaics(checkedNodes)),
        addCheckedNaics: (newCheckedNode) => dispatch(addCheckedNaics(newCheckedNode)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes)),
        showNaicsTree: () => dispatch(showNaicsTree()),
        setUncheckedNaics: (unchecked) => dispatch(setUncheckedNaics(unchecked)),
        setNaicsCounts: (newCounts) => dispatch(setNaicsCounts(newCounts))
    }))(NAICSCheckboxTree);
