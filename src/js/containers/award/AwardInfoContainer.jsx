/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardInfo from 'components/award/AwardInfo';

import * as awardActions from 'redux/actions/award/awardActions';

const propTypes = {
    getSelectedAward: React.PropTypes.func
};

class AwardInfoContainer extends React.Component {

    componentDidMount() {
        this.props.getSelectedAward();
    }
    render() {
        return (
            <AwardInfo {...this.props} />
        );
    }
}

AwardInfoContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.award.selectedAward }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardInfoContainer);
