/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

//import LocationSearch from 'components/search/filters/location/LocationSearch';

const propTypes = {

};

class RecipientSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
    }

    render() {
        return (
            <RecipientSearch
                {...this.props} />
        );
    }
}

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
