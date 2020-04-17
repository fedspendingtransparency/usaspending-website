/**
 * ProgramSourceContainer.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ProgramSourceSection from 'components/search/filters/programSource/ProgramSourceSection';

const propTypes = {
    selectedTreasuryComponents: PropTypes.object,
    selectedFederalComponents: PropTypes.object,
    appliedTreasuryComponents: PropTypes.object,
    selectedTasTreeItems: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        count: PropTypes.string,
        description: PropTypes.string
    })),
    appliedFederalComponents: PropTypes.object,
    updateFederalAccountComponents: PropTypes.func,
    updateTreasuryAccountComponents: PropTypes.func
};

export class ProgramSourceContainer extends React.Component {
    dirtyFilters() {
        if (is(this.props.selectedTreasuryComponents, this.props.appliedTreasuryComponents) &&
            is(this.props.selectedFederalComponents, this.props.appliedFederalComponents)) {
            return null;
        }
        return Symbol('dirty program sources');
    }

    render() {
        return (
            <ProgramSourceSection
                selectedTasTreeItems={this.props.selectedTasTreeItems}
                selectedTreasuryComponents={this.props.selectedTreasuryComponents}
                selectedFederalComponents={this.props.selectedFederalComponents}
                updateFederalAccountComponents={this.props.updateFederalAccountComponents}
                updateTreasuryAccountComponents={this.props.updateTreasuryAccountComponents}
                dirtyFilters={this.dirtyFilters()} />
        );
    }
}

ProgramSourceContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedTreasuryComponents: state.filters.treasuryAccounts,
        selectedFederalComponents: state.filters.federalAccounts,
        appliedTreasuryComponents: state.appliedFilters.filters.treasuryAccounts,
        appliedFederalComponents: state.appliedFilters.filters.federalAccounts,
        selectedTasTreeItems: state.tas.counts
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ProgramSourceContainer);
