/**
 * AgencyContainer.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Agency from 'components/search/filters/agency/Agency';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

class AgencyContainer extends React.Component {

    render() {
        return (
            <Agency />
        );
    }
}

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
