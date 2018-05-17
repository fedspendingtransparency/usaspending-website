/**
 * AwardBreakdownContainer.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { reduce } from 'lodash';

import * as StateHelper from 'helpers/stateHelper';

import AwardBreakdownTreeMap from 'components/state/visualizations/awardBreakdown/AwardBreakdownTreeMap';
import AwardBreakdownTable from "../../../../components/state/visualizations/awardBreakdown/AwardBreakdownTable";

const propTypes = {
    stateProfile: PropTypes.object
};

export class AwardBreakdownContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            inFlight: true,
            awardBreakdown: {
                children: []
            },
            totalAmount: 0,
            hasNegatives: false
        };

        this.searchRequest = null;
    }

    componentDidMount() {
        this.fetchAwardBreakdown(this.props.stateProfile.id, this.props.stateProfile.fy);
    }

    componentDidUpdate(prevProps) {
        if (this.props.stateProfile.id !== prevProps.stateProfile.id || this.props.stateProfile.fy !== prevProps.stateProfile.fy) {
            this.fetchAwardBreakdown(this.props.stateProfile.id, this.props.stateProfile.fy);
        }
    }

    fetchAwardBreakdown(id, fy) {
        if (!id || id === '' || !fy || fy === '') {
            // invalid ID or fiscal year
            return;
        }

        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.searchRequest = StateHelper.fetchAwardBreakdown(id, fy);

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum all amounts in the returned award types
                const totalAmount = reduce(
                    res.data.results,
                    (sum, awardType) => sum + parseFloat(awardType.amount),
                    0
                );

                // Sum only the positive amounts in the returned award types
                const positiveAmount = reduce(
                    res.data.results,
                    (sum, awardType) => {
                        if (parseFloat(awardType.amount) >= 0) {
                            return sum + parseFloat(awardType.amount);
                        }
                        return sum;
                    },
                    0
                );

                const hasNegatives = positiveAmount > totalAmount;

                this.setState({
                    awardBreakdown: {
                        children: res.data.results
                    },
                    totalAmount,
                    hasNegatives
                });
            })
            .catch((err) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    render() {
        return (
            <div className="award-breakdown__content">
                <AwardBreakdownTreeMap
                    activeFY={this.props.stateProfile.fy}
                    awardBreakdown={this.state.awardBreakdown}
                    totalAmount={this.state.totalAmount}
                    hasNegatives={this.state.hasNegatives} />
                <AwardBreakdownTable
                    awardBreakdown={this.state.awardBreakdown.children} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    })
)(AwardBreakdownContainer);

AwardBreakdownContainer.propTypes = propTypes;
