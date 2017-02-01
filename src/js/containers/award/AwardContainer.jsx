/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Award from 'components/award/Award';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import IndividualAward from 'models/results/award/IndividualAward';

const propTypes = {
    setSelectedAward: React.PropTypes.func,
    params: React.PropTypes.object,
    award: React.PropTypes.object
};

class AwardContainer extends React.Component {

    componentDidMount() {
        this.getSelectedAward();
    }

    componentDidUpdate() {
        if (this.props.params.awardId !== this.props.award.selectedAward.piid) {
            this.getSelectedAward();
        }
    }

    getSelectedAward() {
        const input = this.props.params.awardId;

        if (this.selectedAwardRequest) {
            // A request is currently in-flight, cancel it
            this.selectedAwardRequest.cancel();
        }

        const selectedAwardParams = {
            filters: [
                {
                    field: "piid",
                    value: input,
                    operation: "equals"
                }
            ]
        };

        this.selectedAwardRequest = SearchHelper.fetchAward(selectedAwardParams);

        this.selectedAwardRequest.promise
            .then((res) => {
                const data = res.data;
                const awardData = data.results[0];
                const award = new IndividualAward(awardData);

                // Add search results to Redux
                this.props.setSelectedAward(award);
            });
    }

    render() {
        return (
            <Award
                {...this.props} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
