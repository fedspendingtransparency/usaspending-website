import React from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    cleanTasData,
    incrementTasCountAndUpdateUnchecked,
    decrementTasCountAndUpdateUnchecked,
    removeStagedTasFilter
} from 'helpers/tasHelper';
import { fetchTas } from 'helpers/searchHelper';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';

export default class TASCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            unchecked: [],
            counts: [],
            nodes: [],
            isLoading: true,
            searchString: '',
            isError: false,
            errorMessage: ''
        };
        this.request = null;
    }

    async componentDidMount() {
        return this.fetchTas('');
    }

    onExpand = (expandedValue, newExpandedArray, shouldFetchChildren, selectedNode) => {
        if (shouldFetchChildren) {
            if (selectedNode.treeDepth === 1) {
                const selectedAgency = this.state.nodes
                    .find((agency) => agency.children.some((federalAccount) => federalAccount.value === expandedValue));
                const agencyAndFederalAccountString = `${selectedAgency.value}/${expandedValue}`;
                this.fetchTas(agencyAndFederalAccountString, 1);
            }
            else {
                this.fetchTas(expandedValue);
            }
        }
        this.setState({
            expanded: newExpandedArray
        });
    };

    onCheck = (newChecked) => {
        const [newCounts, newUnchecked] = incrementTasCountAndUpdateUnchecked(
            newChecked,
            this.state.checked,
            this.state.unchecked,
            this.state.nodes,
            this.state.counts
        );

        this.setState({
            checked: newChecked,
            counts: newCounts,
            unchecked: newUnchecked
        });

        if (this.hint) {
            this.hint.showHint();
        }
    }

    onUncheck = (newChecked, uncheckedNode) => {
        const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(
            uncheckedNode,
            this.state.unchecked,
            this.state.checked,
            this.state.counts,
            this.state.nodes
        );

        this.setState({ checked: newChecked, counts: newCounts, unchecked: newUnchecked });
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
        this.setState({ expanded: newExpandedArray });
    }

    removeSelectedFilter = (node) => {
        const newChecked = removeStagedTasFilter(this.state.nodes, this.state.counts, node.value);
        this.onUncheck(newChecked, { ...node, checked: false });
    }

    fetchTas = (id = '', depth = 0) => {
        if (this.request) this.request.cancel();
        this.request = fetchTas(id);
        const isPartialTree = id !== '';
        return this.request.promise
            .then(({ data }) => {
                // dynamically populating tree branches
                const nodes = cleanTasData(data.results);
                if (isPartialTree) {
                    const key = depth === 0
                        ? id
                        : id.split('/')[1];
                    this.setState({
                        isLoading: false,
                        nodes: this.state.nodes
                            .map((agency) => {
                                if (agency.value === key) {
                                    // agency was fetched, response data populates agency's federal accounts
                                    return { ...agency, children: nodes };
                                }
                                return {
                                    ...agency,
                                    children: agency.children.map((federalAccount) => {
                                        if (federalAccount.value === key) {
                                            // federal account was fetched, response data populates federal account's TAS accounts
                                            return { ...federalAccount, children: nodes };
                                        }
                                        return federalAccount;
                                    })
                                };
                            })
                    });
                }
                else {
                    // populating tree trunk
                    this.setState({ isLoading: false, nodes });
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
            isLoading,
            searchString,
            isError,
            errorMessage,
            counts
        } = this.state;
        return (
            <div className="tas-checkbox">
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
