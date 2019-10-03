/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';

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
            const { results } = await this.request.promise;
            this.setState({
                naics: results,
                isLoading: false,
                isError: false,
                errorMessage: ''
            });
        }
        catch (e) {
            console.dir(' Error NAICS Reponse : ', e);
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

    render() {
        const { naics } = this.state;
        return (
            <div>
                <NAICSSearch
                    className="naics-search-container"
                    selectedNAICS={this.props.selectedNAICS}
                    dirtyFilters={this.dirtyFilters()}
                    selectNAICS={this.selectNAICS}
                    removeNAICS={this.removeNAICS} />
                <CheckboxTree
                    nodes={naics}
                    nodeKeys={this.nodeKeys} />
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
