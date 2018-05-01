/**
 * AwardIDSearchContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrderedMap, is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardIDSearch from 'components/search/filters/awardID/AwardIDSearch';

const propTypes = {
    selectedAwardIDs: PropTypes.object,
    appliedAwardIDs: PropTypes.object,
    updateGenericFilter: PropTypes.func
};

export class AwardIDSearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.awardIDObj = {};
        // Bind function
        this.toggleAwardID = this.toggleAwardID.bind(this);
    }

    toggleAwardID(awardID) {
        if (this.props.selectedAwardIDs.has(awardID)) {
            this.removeAwardID(awardID);
        }
        else {
            this.addAwardID(awardID);
        }
    }

    addAwardID(id) {
        Object.assign(this.awardIDObj, { [id]: id });
        this.props.updateGenericFilter({
            type: 'selectedAwardIDs',
            value: new OrderedMap(this.awardIDObj)
        });
    }

    removeAwardID() {
        this.props.updateGenericFilter({
            type: 'selectedAwardIDs',
            value: new OrderedMap()
        });
    }

    dirtyFilters() {
        if (is(this.props.selectedAwardIDs, this.props.appliedAwardIDs)) {
            return null;
        }
        return Symbol('dirty award ID');
    }

    render() {
        return (
            <AwardIDSearch
                dirtyFilters={this.dirtyFilters()}
                selectedAwardIDs={this.props.selectedAwardIDs}
                toggleAwardID={this.toggleAwardID} />
        );
    }
}

AwardIDSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedAwardIDs: state.filters.selectedAwardIDs,
        appliedAwardIDs: state.appliedFilters.filters.selectedAwardIDs
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardIDSearchContainer);

