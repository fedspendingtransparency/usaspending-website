/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

class TopFilterBarContainer extends React.Component {
    render() {
        return (
            <TopFilterBar {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ filters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
