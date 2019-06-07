/**
 * ProgramSourceContainer.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { is } from 'immutable';

import ProgramSourceSection from 'components/search/filters/programSource/ProgramSourceSection';

const propTypes = {
    selectedTreasurySources: PropTypes.object,
    selectedFederalSources: PropTypes.object,
    appliedTreasurySources: PropTypes.object,
    appliedFederalSources: PropTypes.object
};

export class ProgramSourceContainer extends React.Component {
    dirtyFilters() {
        if (is(this.props.selectedTreasurySources, this.props.appliedTreasurySources) &&
            is(this.props.selectedFederalSources, this.props.appliedFederalSources)) {
            return null;
        }
        return Symbol('dirty program sources');
    }

    render() {
        return (
            <ProgramSourceSection
                selectedTreasurySources={this.props.selectedTreasurySources}
                selectedFederalSources={this.props.selectedFederalSources}
                dirtyFilters={this.dirtyFilters()} />
        );
    }
}

ProgramSourceContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedTreasurySources: state.filters.selectedTreasurySources,
        selectedFederalSources: state.filters.selectedFederalSources,
        appliedTreasurySources: state.appliedFilters.filters.selectedTreasurySources,
        appliedFederalSources: state.appliedFilters.filters.selectedFederalSources
    })
)(ProgramSourceContainer);
