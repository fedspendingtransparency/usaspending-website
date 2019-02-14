/**
  * AwardAmountReferenceContainer.jsx
  * Created by David Trinh 2/8/2019
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AggregatedAwardAmounts from 'components/awardv2/visualizations/amounts/AggregatedAwardAmounts';

const propTypes = {
    awardId: PropTypes.string
};

//TODO write test for this container

export default class AwardAmountsContainer extends React.Component {
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

        this.awardRequest = SearchHelper.fetchAwardsAmount(id);

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
    }

    render() {
        return (
            <div>
                <AggregatedAwardAmounts awardAmounts={this.state.awardAmounts} loading={this.state.inFlight} error={this.state.error} />
            </div>
        );
    }
}

AwardAmountsContainer.propTypes = propTypes;
