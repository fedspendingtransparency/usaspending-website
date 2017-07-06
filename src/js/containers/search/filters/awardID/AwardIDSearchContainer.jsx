/**
 * AwardIDSearchContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardIDSearch from 'components/search/filters/awardID/AwardIDSearch';

const propTypes = {
    updateAwardIDs: PropTypes.func
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
        const updateParams = {
            awardID
        };
        this.props.updateAwardIDs(updateParams);

        // Analytics
        switch (awardID.awardIDType) {
            case 'PIID':
                AwardIDSearchContainer.logIdEvent(awardID.piid, 'PIID');
                break;
            case 'URI':
                AwardIDSearchContainer.logIdEvent(awardID.uri, 'URI');
                break;
            case 'FAIN':
                AwardIDSearchContainer.logIdEvent(awardID.fain, 'FAIN');
                break;
            default:
                AwardIDSearchContainer.logIdEvent(awardID.id, 'ID');
        }
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

