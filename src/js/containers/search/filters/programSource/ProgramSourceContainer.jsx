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
    checkboxTreeSelections: PropTypes.arrayOf(PropTypes.string),
    appliedTreasuryComponents: PropTypes.object,
    appliedCheckboxTreeSelections: PropTypes.arrayOf(PropTypes.string),
    updateTreasuryAccountComponents: PropTypes.func
};

export class ProgramSourceContainer extends React.Component {
    dirtyFilters() {
        if (is(this.props.selectedTreasuryComponents, this.props.appliedTreasuryComponents)) {
            return null;
        }
        return Symbol('dirty program sources');
    }

    render() {
        return (
            <ProgramSourceSection
                {...this.props}
                dirtyFilters={this.dirtyFilters()} />
        );
    }
}

ProgramSourceContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        checkboxTreeSelections: state.filters.tasCodes.toObject().require,
        appliedCheckboxTreeSelections: state.appliedFilters.filters.tasCodes.toObject().require,
        selectedTreasuryComponents: state.filters.treasuryAccounts,
        appliedTreasuryComponents: state.appliedFilters.filters.treasuryAccounts
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ProgramSourceContainer);
