/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setNaics, updateNaics } from 'redux/actions/search/naicsActions';

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';
import { createCheckboxTreeDataStrucure } from 'helpers/checkboxTreeHelper';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object,
    setNaics: PropTypes.func,
    updateNaics: PropTypes.func,
    nodes: PropTypes.object
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
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            requestType: 'initial'
        };
    }

    async componentDidMount() {
        const { nodes } = this.props;
        if (this.props.nodes.length > 0) return this.setNaics(nodes);
        return this.fetchNAICS();
    }

    onExpand = (node) => {
        this.fetchNAICS(node.value);
    };

    setNaics = (naics) => this.setState({ naics });

    setRedux = (naics) => this.props.setNaics(naics);

    request = null

    fetchNAICS = async (param) => {
        if (this.state.requestType === 'initial') this.setState({ isLoading: true });
        this.request = naicsRequest(param);
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
            this.setState({
                isError: true,
                errorMessage: e.message,
                naics: [],
                isLoading: false,
                requestType: ''
            });
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

    loadingDiv() {
        if (!this.state.isLoading) return null;
        return (
            <div className="container-is-loading">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="container-is-loading__text">Loading your data...</div>
            </div>
        );
    }

    errorDiv() {
        if (!this.state.isError) return null;
        return (
            <div className="container-is-loading">
                <div className="container-is-loading__text">
                    this.state.errorMessage
                </div>
            </div>
        );
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            isSearch,
            naics
        } = this.state;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                nodes={naics}
                nodeKeys={nodeKeys}
                isSearch={isSearch}
                onExpand={this.onExpand}
                updateRedux={this.setRedux} />
        );
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const errorDiv = this.errorDiv();
        return (
            <div>
                <NAICSSearch
                    className="naics-search-container"
                    selectedNAICS={this.props.selectedNAICS}
                    dirtyFilters={this.dirtyFilters()}
                    selectNAICS={this.selectNAICS}
                    removeNAICS={this.removeNAICS} />
                {loadingDiv}
                {errorDiv}
                {this.checkboxDiv()}
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS,
        appliedNAICS: state.appliedFilters.filters.selectedNAICS,
        nodes: state.naics
    }),
    (dispatch) => bindActionCreators(
        Object.assign(
            {},
            searchFilterActions,
            { setNaics },
            { updateNaics }
        )
        ,
        dispatch
    ))(NAICSContainer);
