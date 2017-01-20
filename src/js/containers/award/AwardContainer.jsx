/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Award from 'components/award/Award';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

class AwardContainer extends React.Component {
    render() {
        return (
            <Award {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ reduxFilters: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardContainer);
