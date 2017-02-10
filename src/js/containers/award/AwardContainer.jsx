/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Award from 'components/award/Award';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import AwardSummary from 'models/results/award/AwardSummary';

const propTypes = {
    setSelectedAward: React.PropTypes.func,
    params: React.PropTypes.object
};

class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.searchRequest = null;

        this.state = {
            noAward: false,
            awardId: null
        };
    }

    componentDidMount() {
        this.getSelectedAward();
    }

    componentDidUpdate() {
        if (this.state.awardId !== this.props.params.awardId) {
            this.getSelectedAward();
        }
    }

    getSelectedAward() {
        const input = this.props.params.awardId;
        if (this.selectedAwardRequest) {
            // A request is currently in-flight, cancel it
            this.selectedAwardRequest.cancel();
        }
        this.selectedAwardRequest = SearchHelper.fetchAward(input);
        this.selectedAwardRequest.promise
            .then((res) => {
                this.setState({
                    noAward: false,
                    awardId: this.props.params.awardId
                });
                const data = res.data;
                const award = new AwardSummary(data);

                // Add search results to Redux
                this.props.setSelectedAward(award);
            })
            .catch((error) => {
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.selectedAwardRequest = null;
                    this.setState({
                        noAward: true,
                        awardId: this.props.params.awardId
                    });
                }
                else {
                    // Request failed
                    this.selectedAwardRequest = null;
                }
            });
    }

    render() {
        return (
            <Award
                {...this.props}
                noAward={this.state.noAward} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
