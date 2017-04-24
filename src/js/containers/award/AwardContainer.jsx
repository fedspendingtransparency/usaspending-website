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

export class AwardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.awardRequest = null;

        this.state = {
            noAward: false,
            awardId: null,
            inFlight: false
        };
    }

    componentDidMount() {
        this.getSelectedAward();
    }

    componentDidUpdate() {
        if (this.state.awardId && this.state.awardId !== this.props.params.awardId) {
            this.getSelectedAward();
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getSelectedAward() {
        const input = this.props.params.awardId;

        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }

        this.setState({
            inFlight: true,
            awardId: null
        });

        this.awardRequest = SearchHelper.fetchAward(input);

        this.awardRequest.promise
            .then((results) => {
                const awardData = results.data;

                this.setState({
                    inFlight: false
                });

                this.parseAward(awardData);

                // operation has resolved
                this.awardRequest = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.awardRequest = null;
                    this.setState({
                        noAward: true,
                        awardId: this.props.params.awardId
                    });
                }
                else {
                    // Request failed
                    this.awardRequest = null;
                    console.log(error);
                }
            });
    }

    parseAward(data) {
        this.setState({
            noAward: false,
            awardId: this.props.params.awardId
        });

        const award = new AwardSummary(data);
        // Add search results to Redux
        this.props.setSelectedAward(award);
    }

    render() {
        return (
            <Award
                {...this.props}
                inFlight={this.state.inFlight}
                noAward={this.state.noAward} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
