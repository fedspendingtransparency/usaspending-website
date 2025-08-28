/**
 * AwardBreakdownContainer.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { reduce } from 'lodash-es';

import * as StateHelper from 'helpers/stateHelper';

import AwardBreakdownTreeMap from 'components/state/visualizations/awardBreakdown/AwardBreakdownTreeMap';
import AwardBreakdownTable from 'components/state/visualizations/awardBreakdown/AwardBreakdownTable';
import BaseAwardBreakdownRow from 'models/v2/state/BaseAwardBreakdownRow';

const propTypes = {
    stateProfile: PropTypes.object,
    toggleState: PropTypes.bool
};

export class AwardBreakdownContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            inFlight: true,
            awardBreakdown: [],
            rows: [],
            totalAmount: 0,
            hasNegatives: false,
            data: []
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

        if (this.props.toggleState !== prevProps.toggleState) {
            this.parseData(this.state.data);
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
                    inFlight: false,
                    data: res.data
                });

                this.parseData(res.data);
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

    parseData(results) {
        const amountType = this.props.toggleState ? "total_outlays" : "amount";
        // Sum all amounts in the returned award types
        const totalAmount = reduce(
            results,
            (sum, awardType) => sum + parseFloat(awardType[amountType]),
            0
        );

        // Sum only the positive amounts in the returned award types
        const positiveAmount = reduce(
            results,
            (sum, awardType) => {
                if (parseFloat(awardType.amount) >= 0) {
                    return sum + parseFloat(awardType[amountType]);
                }
                return sum;
            },
            0
        );

        const hasNegatives = positiveAmount > totalAmount;

        // Sort the results by amount
        const sortedResults = results.sort((rowA, rowB) =>
            rowB[amountType] - rowA[amountType]
        );

        const rows = sortedResults.map((result) => {
            const row = Object.create(BaseAwardBreakdownRow);
            row.populate(result);
            return row;
        });

        this.setState({
            awardBreakdown: results,
            rows,
            totalAmount,
            hasNegatives
        });
    }

    render() {
        return (
            <div className="award-breakdown__content">
                <AwardBreakdownTreeMap
                    activeFY={this.props.stateProfile.fy}
                    awardBreakdown={this.state.awardBreakdown}
                    totalAmount={this.state.totalAmount}
                    toggleState={this.props.toggleState} />
                <AwardBreakdownTable
                    awardBreakdown={this.state.rows}
                    hasNegatives={this.state.hasNegatives}
                    toggleState={this.props.toggleState} />
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
