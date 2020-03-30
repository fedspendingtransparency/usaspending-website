import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { cleanTasData } from 'helpers/checkboxTreeHelper';
import { fetchTas } from 'helpers/searchHelper';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';

export default class TASCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
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

    onCheck = () => console.log("check");

    onUncheck = () => console.log("uncheck");

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
            errorMessage
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
                    expanded={expanded}
                    onUncheck={this.onUncheck}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    onCollapse={this.onCollapse} />
            </div>
        );
    }
}
