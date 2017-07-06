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

export class AwardIDSearchContainer extends React.Component {
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

