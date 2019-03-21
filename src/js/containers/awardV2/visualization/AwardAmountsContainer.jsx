/**
  * AwardAmountsContainer.jsx
  * Created by David Trinh 2/8/2019
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as IdvHelper from 'helpers/idvHelper';
import * as awardActions from 'redux/actions/awardV2/awardActions';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AggregatedAwardAmounts from 'components/awardv2/visualizations/amounts/AggregatedAwardAmounts';

const propTypes = {
    award: PropTypes.object,
    setCounts: PropTypes.func,
    jumpToSection: PropTypes.func
};

export class AwardAmountsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;

        this.state = {
            error: false,
            inFlight: true,
            awardAmounts: null
        };
    }

    componentDidMount() {
        this.getSelectedAward(this.props.award.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id) {
            this.getSelectedAward(this.props.award.id);
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

        this.awardRequest = IdvHelper.fetchAwardAmounts(id);

        this.awardRequest.promise
            .then((results) => {
                const awardData = results.data;

                this.parseAward(awardData);

                this.setState({
                    inFlight: false
                });

                // operation has resolved
                this.awardRequest = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    this.awardRequest = null;
                    this.setState({
                        error: true
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
            error: false
        });
        const awardAmounts = Object.create(BaseAwardAmounts);
        awardAmounts.populate(data);
        this.setState({
            awardAmounts
        });

        // Store the counts in Redux for use in the referenced awards table
        // and related awards section
        this.props.setCounts({
            idvs: data.idv_count,
            contracts: data.contract_count,
            total: data.idv_count + data.contract_count
        });
    }

    render() {
        return (
            <div>
                <AggregatedAwardAmounts
                    {...this.state}
                    loading={this.state.inFlight}
                    jumpToSection={this.props.jumpToSection} />
            </div>
        );
    }
}

AwardAmountsContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.awardV2 }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardAmountsContainer);
