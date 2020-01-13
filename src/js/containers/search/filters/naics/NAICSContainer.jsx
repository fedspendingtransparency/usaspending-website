/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import { debounce } from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    nodes: PropTypes.object,
    expanded: PropTypes.object,
    checked: PropTypes.object
};

const nodeKeys = {
    value: 'naics',
    label: 'naics_description'
};

export class NAICSContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            naics: [],
            expanded: [],
            checked: [],
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            searchString: '',
            requestType: 'initial',
            fromRedux: false
        };
    }

    componentDidMount() {
        const { nodes, expanded, checked } = this.props;
        if (nodes.size > 0) {
            return this.setStateFromRedux(nodes, expanded, checked);
        }
        return this.fetchNAICS();
    }

    onSearchChange = debounce(() => {
        this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => this.setState({
        isSearch: false,
        searchString: '',
        naics: this.props.nodes.toJS(),
        fromRedux: true
    });


    onExpand = (node, expanded) => {
        this.fetchNAICS(node.value);
        this.props.setExpanded(expanded);
    };

    onCollapse = (expanded) => {
        this.props.setExpanded(expanded);
    };

    setRedux = (naics) => this.props.setNaics(naics);

    setStateFromRedux = (naics, expanded, checked) => {
        this.setState({
            naics: naics.toJS(),
            expanded: expanded.toJS(),
            checked: checked.toJS(),
            requestType: '',
            fromRedux: true
        });
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) return this.setState({ searchString: '', isSearch: false });
        return this.setState({ searchString: text, isSearch: true }, this.onSearchChange);
    };

    request = null

    fetchNAICS = async (param) => {
        if (this.request) this.request.cancel();
        const {
            requestType,
            fromRedux,
            isSearch,
            searchString
        } = this.state;
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            this.setState({ isLoading: true });
        }
        if (fromRedux) this.setState({ fromRedux: false });

        this.request = naicsRequest(param || searchParam);
        try {
            const { data } = await this.request.promise;
            this.setState({
                naics: data.results,
                isLoading: false,
                isError: false,
                errorMessage: '',
                requestType: ''
            });
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            if (!isCancel(e)) {
                this.setState({
                    isError: true,
                    errorMessage: e.message,
                    naics: [],
                    isLoading: false,
                    requestType: ''
                });
            }
        }
    };

    selectNAICS = (naics, isValid) => {
        // If naics exists and is valid
        if (naics !== null && isValid) {
            const updateParams = {};
            updateParams.naics = naics;
            this.props.updateSelectedNAICS(updateParams);
        }
    }

    removeNAICS = (naics) => {
        const updateParams = {};
        updateParams.naics = naics;
        this.props.updateSelectedNAICS(updateParams);
    }

    dirtyFilters = () => {
        if (is(this.props.selectedNAICS, this.props.appliedNAICS)) {
            return null;
        }
        return Symbol('dirty NAICS');
    }

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
        const { isError, isLoading, naics } = this.state;
        if (isError || isLoading || naics.length > 0) return null;
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
            naics,
            expanded,
            checked,
            fromRedux,
            searchString
        } = this.state;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                fromRedux={fromRedux}
                limit={3}
                nodes={naics}
                expanded={expanded}
                checked={checked}
                nodeKeys={nodeKeys}
                isSearch={isSearch}
                searchText={searchString}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onCheck={this.onCheck}
                setRedux={this.setRedux}
                updateRedux={this.setRedux} />
        );
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
                </div>
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS,
        appliedNAICS: state.appliedFilters.filters.selectedNAICS,
        nodes: state.naics.naics,
        expanded: state.naics.expanded,
        checked: state.naics.checked
    }),
    (dispatch) => bindActionCreators(
        Object.assign(
            {},
            searchFilterActions,
            { setNaics },
            { setExpanded },
            { setChecked }
        )
        ,
        dispatch
    ))(NAICSContainer);
