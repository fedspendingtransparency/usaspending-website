/**
 * AwardIDSearchContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardIDSearch from 'components/search/filters/awardID/AwardIDSearch';

const propTypes = {
    selectedAwardIDs: PropTypes.object,
    updateGenericFilter: PropTypes.func
};

const ga = require('react-ga');

export class AwardIDSearchContainer extends React.Component {
    static logIdEvent(id, type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Toggled Award ${type} Filter`,
            label: id
        });
    }

    constructor(props) {
        super(props);

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
        this.props.updateGenericFilter({
            type: 'selectedAwardIDs',
            value: new OrderedMap({
                [id]: id
            })
        });

        // Analytics
        AwardIDSearchContainer.logIdEvent(id, 'Apply Award ID');
    }

    removeAwardID(id) {
        this.props.updateGenericFilter({
            type: 'selectedAwardIDs',
            value: new OrderedMap()
        });

        // Analytics
        AwardIDSearchContainer.logIdEvent(id, 'Remove Award ID');
    }

    render() {
        return (
            <AwardIDSearch
                {...this.props}
                toggleAwardID={this.toggleAwardID} />
        );
    }
}

AwardIDSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedAwardIDs: state.filters.selectedAwardIDs }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardIDSearchContainer);

