/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    debounce,
    isEqual,
    difference
} from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateNaics } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked, setSearchedNaics } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SelectedNaic from 'components/search/filters/naics/SelectNaic';
import { createCheckboxTreeDataStructure } from 'helpers/checkboxTreeHelper';

const propTypes = {
    updateNaics: PropTypes.func,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    setChecked: PropTypes.func,
    removeNAICS: PropTypes.func,
    setSearchedNaics: PropTypes.func,
    expanded: PropTypes.array,
    checked: PropTypes.array,
    nodes: PropTypes.array,
    searchedNodes: PropTypes.array
};

const nodeKeys = {
    value: 'naics',
    label: 'naics_description'
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
            requestType: 'initial'
        };
        this.request = null;
    }

    componentDidMount() {
        // show staged filters
        this.selectNaicsData();
        return this.fetchNAICS();
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(this.props.checked, prevProps.checked)
            || !isEqual(this.props.nodes, prevProps.nodes)
        ) {
            // show stage filters
            this.selectNaicsData();
        }
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

    onExpand = (value, expanded, fetch) => {
        if (fetch) this.fetchNAICS(value);
        this.props.setExpanded(expanded);
    };

    onCollapse = (expanded) => {
        this.props.setExpanded(expanded);
    };
    /**
     * onCheck
     * - updates redux checked and updates naics search filters in redux
     * @param {string[]} checked - and array of checked values
     * @returns {null}
     */
    onCheck = async (checked) => {
        // sets checked in naics redux
        await this.props.setChecked(checked);
        // sets staged filters in search redux
        await this.props.updateNaics(checked);
    }


    getParentNode = (param) => {
        if (param.length === 2) {
            return this.props.nodes.find((node) => node.value === param);
        }
        if (param.length === 4) {
            return this.props.nodes
                .find((node) => node.value === `${param[0]}${param[1]}`).children
                .find(((node) => node.value === param));
        }
        return '';
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true }, this.onSearchChange);
    };

    fetchNAICS = async (param = '') => {
        if (this.request) this.request.cancel();
        const { requestType, isSearch, searchString } = this.state;
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            this.setState({ isLoading: true });
        }

        this.request = naicsRequest(param || searchParam);
        const parentNode = this.getParentNode(param);

        try {
            const { data } = await this.request.promise;
            // create the new node
            const updatedNodes = createCheckboxTreeDataStructure(
                3,
                nodeKeys,
                data.results,
                (param.length === 4),
                parentNode,
                isSearch
            );

            this.setState({
                isLoading: false,
                isError: false,
                errorMessage: '',
                requestType: ''
            });

            const codeForNodeWithNewChildren = isSearch ? '' : param;
            this.props.setNaics(codeForNodeWithNewChildren, updatedNodes);
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            if (!isCancel(e)) {
                this.setState({
                    isError: true,
                    errorMessage: e.message,
                    isLoading: false,
                    requestType: ''
                });
            }
        }
    };

    loadingDiv = () => {
        if (!this.state.isLoading) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="naics-filter-message-container__text">Loading your data...</div>
            </div>
        );
    }

    errorDiv = () => {
        const { isError, errorMessage } = this.state;
        if (!isError) return null;
        return (
            <div className="naics-filter-message-container">
                <div className="naics-filter-message-container__text">
                    {errorMessage}
                </div>
            </div>
        );
    }

    noResultsDiv = () => {
        const { isError, isLoading } = this.state;
        if (isError || isLoading || this.props.nodes.length > 0) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="ban" />
                <div className="naics-filter-message-container__text">
                    No Results
                </div>
            </div>
        );
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            isSearch,
            searchString
        } = this.state;
        const { checked, nodes, expanded } = this.props;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                limit={3}
                data={nodes}
                expanded={expanded}
                checked={checked}
                nodeKeys={nodeKeys}
                isSearch={isSearch}
                searchText={searchString}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onCheck={this.onCheck} />
        );
    }

    selectNaicsData = () => {
        const { nodes, checked } = this.props;
        const selectedNaicsData = checked
            .reduce((acc, value) => {
                const key = value.includes('childPlaceholder')
                    ? value.split('childPlaceholder')[0]
                    : value;
                 
                const parentKey = `${key[0]}${key[1]}`;
                const parentNode = nodes.find((node) => node.value === parentKey);
                const indexOfParent = acc.findIndex((node) => node.value === parentKey);
                const isParentSelected = indexOfParent >= 0;

                if (!isParentSelected && key.length === 2) {
                    acc.push(parentNode);
                    return acc;
                }
                else if (!isParentSelected && key.length === 4) {
                    acc.push({
                        ...parentNode,
                        count: parentNode.children.find((node) => node.value === key).count
                    });
                    return acc;
                }
                else if (!isParentSelected && key.length === 6) {
                    acc.push({
                        ...parentNode,
                        count: 1
                    });
                    return acc;
                }
                if (isParentSelected && key.length === 4) {
                    acc[indexOfParent].count += parentNode.children.find((node) => node.value === key).count;
                    return acc;
                }
                if (isParentSelected && key.length === 6) {
                    acc[indexOfParent].count++;
                    return acc;
                }
                return acc;
            }, []);
        // an array of objects representing naics tier one objects: { value, label, count }. Only show top level parents
        return selectedNaicsData;
    }

    selectedNaics = () => {
        if (!this.props.checked.size === 0) return null;
        // const { selectedNaicsData } = this.state;
        const selectedNaicsData = this.selectNaicsData();
        return (<SelectedNaic
            selectedNAICS={selectedNaicsData}
            removeNAICS={this.props.removeNAICS} />);
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const noResultsDiv = this.noResultsDiv();
        const errorDiv = this.errorDiv();
        const { searchString } = this.state;
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
                    {loadingDiv}
                    {noResultsDiv}
                    {errorDiv}
                    {this.checkboxDiv()}
                    {this.selectedNaics()}
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
        checked: state.naics.checked.toJS(),
        searchNodes: state.naics.searchedNaics.toJS()
    }),
    (dispatch) => ({
        updateNaics: (checked) => dispatch(updateNaics(checked)),
        setNaics: (key, naics) => dispatch(setNaics(key, naics)),
        setExpanded: (expanded) => dispatch(setExpanded(expanded)),
        setChecked: (checked) => dispatch(setChecked(checked)),
        setSearchedNaics: (nodes) => dispatch(setSearchedNaics(nodes))
    }))(NAICSContainer);
