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

    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding_agency"
        };

        this.toggleAgency = this.toggleAgency.bind(this);
    }

    componentWillMount() {
        this.props.getSelectedAward();
    }

    toggleAgency(e) {
        this.setState({
            agencyType: `${e.target.value}_agency`
        });
    }

    render() {
        return (
            <AwardInfo
                {...this.props}
                toggleAgency={this.toggleAgency}
                agencyType={this.state.agencyType} />
        );
    }
}

AwardInfoContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedAward: state.award.selectedAward }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardInfoContainer);
