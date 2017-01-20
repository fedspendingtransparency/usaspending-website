/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardInfo from 'components/award/AwardInfo';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

class AwardInfoContainer extends React.Component {
    render() {
        return (
            <AwardInfo {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ reduxFilters: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardInfoContainer);
