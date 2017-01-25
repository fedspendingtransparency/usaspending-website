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

const propTypes = {
    setSelectedAward: React.PropTypes.func,
    location: React.PropTypes.object
};

class AwardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.getSelectedAward = this.getSelectedAward.bind(this);
    }

    getSelectedAward() {
        const input = this.props.location.query.id;

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

                // Add search results to Redux
                this.props.setSelectedAward(awardData);
            });
    }

    render() {
        return (
            <Award
                {...this.props}
                getSelectedAward={this.getSelectedAward} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.award.selectedAward }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
