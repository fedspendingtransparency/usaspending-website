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

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object
};

export class NAICSContainer extends React.Component {
    // constructor(props) {
    //     super(props);

        // this.selectNAICS = this.selectNAICS.bind(this);
        // this.removeNAICS = this.removeNAICS.bind(this);
    // }

    getNAICS = () => [{
        value: 'mars',
        label: 'Mars',
        children: [
            {
                value: 'purple',
                label: 'Purple'
            },
            {
                value: 'phobos',
                label: 'Phobos',
                children: [
                    {
                        value: 'jim',
                        label: 'Jim'
                    },
                    {
                        value: 'bob',
                        label: 'Bob'
                    },
                    {
                        value: 'sammy',
                        label: 'Sammy',
                        children: [
                            {
                                value: 'jj',
                                label: 'JJ'
                            },
                            {
                                value: 'cooper',
                                label: 'Cooper'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        value: 'jupiter',
        label: 'Jupiter',
        children: [
            {
                value: 'dontknow',
                label: 'DontKnow',
                children: [
                    {
                        value: 'blue',
                        label: 'Blue'
                    },
                    {
                        value: 'yellow',
                        label: 'Yellow'
                    }
                ]
            },
            {
                value: 'Who',
                label: 'Who',
                children: [
                    {
                        value: 'yes',
                        label: 'Yes',
                        children: [
                            {
                                value: 'deimos',
                                label: 'Deimos'
                            }
                        ]
                    }
                ]
            }
        ]
    }];

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
        return (
            <div>
                <NAICSSearch
                    className="naics-search-container"
                    selectedNAICS={this.props.selectedNAICS}
                    dirtyFilters={this.dirtyFilters()}
                    selectNAICS={this.selectNAICS}
                    removeNAICS={this.removeNAICS} />
                <CheckboxTree
                    nodes={this.getNAICS()} />
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
