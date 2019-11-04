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

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object
};

export class NAICSContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            naics: [],
            isError: false,
            errorMessage: '',
            isLoading: false
        };
    }

    async componentDidMount() {
        await this.fetchNAICS();
    }

    request = null

    nodeKeys = {
        value: 'naics',
        label: 'naics_description'
    }

    fetchNAICS = async (param) => {
        this.setState({ isLoading: true });
        this.request = naicsRequest(param);
        try {
            const { data } = await this.request.promise;
            this.setState({
                naics: data.results,
                isLoading: false,
                isError: false,
                errorMessage: ''
            });
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            this.setState({
                isError: true,
                errorMessage: e.message,
                naics: [],
                isLoading: false
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
        const { isLoading, isError, naics } = this.state;
        if (isLoading && isError) return null;
        return (
            <CheckboxTree
                nodes={naics}
                nodeKeys={this.nodeKeys} />
        );
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const errorDiv = this.errorDiv();
        const checkboxDiv = this.checkboxDiv();
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
                {checkboxDiv}
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS,
        appliedNAICS: state.appliedFilters.filters.selectedNAICS
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(NAICSContainer);
