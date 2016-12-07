/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardType from 'components/search/filters/awardType/AwardType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

class AwardTypeContainer extends React.Component {
    render() {
        return (
            <AwardType {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ reduxFilters: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainer);
