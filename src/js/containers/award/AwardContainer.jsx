/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import _ from 'lodash';

import Award from 'components/award/Award';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import AwardSummary from 'models/results/award/AwardSummary';

const propTypes = {
    award: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    setSelectedAward: React.PropTypes.func,
    params: React.PropTypes.object
};

class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noAward: false
        };
    }

    componentDidMount() {
        this.getSelectedAward();
    }

    componentDidUpdate() {
        if (this.props.award.selectedAward) {
            const currentId = _.toString(this.props.award.selectedAward.id);
            if (currentId !== this.props.params.awardId) {
                this.getSelectedAward();
            }
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
                    noAward: false
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
                        noAward: true
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
