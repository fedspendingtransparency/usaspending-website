/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import AwardType from 'components/search/filters/awardType/AwardType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    setAwardType: React.PropTypes.func,
    search: React.PropTypes.object
};

class AwardTypeContainer extends React.Component {
    render() {
        return (
            <AwardType {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ containerFilters: state.search.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainer);

AwardTypeContainer.propTypes = propTypes;
