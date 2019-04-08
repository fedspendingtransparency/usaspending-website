/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Award from 'components/award/Award';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import BaseContract from 'models/v2/awards/BaseContract';
import BaseFinancialAssistance from 'models/v2/awards/BaseFinancialAssistance';

require('pages/award/awardPage.scss');

const propTypes = {
    setSelectedAward: PropTypes.func,
    awardId: PropTypes.string
};

export class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;

        this.state = {
            noAward: false,
            inFlight: false
        };
    }

    componentDidMount() {
        this.getSelectedAward(this.props.awardId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.awardId !== prevProps.awardId) {
            this.getSelectedAward(this.props.awardId);
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getSelectedAward(id) {
        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        this.awardRequest = SearchHelper.fetchAward(id);

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
                        noAward: true
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
            noAward: false
        });

        if (data.category === 'contract' || data.category === 'idv') {
            const contract = Object.create(BaseContract);
            contract.populate(data);
            this.props.setSelectedAward(contract);
        }
        else {
            const financialAssistance = Object.create(BaseFinancialAssistance);
            financialAssistance.populate(data);
            this.props.setSelectedAward(financialAssistance);
        }
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
