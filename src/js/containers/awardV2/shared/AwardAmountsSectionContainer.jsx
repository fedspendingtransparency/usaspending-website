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
import AggregatedAwardAmounts from 'components/awardv2/idv/amounts/AggregatedAwardAmounts';
import AwardAmountsSection from "../../../components/awardv2/shared/awardAmountsSection/index";

const propTypes = {
    award: PropTypes.object,
    setCounts: PropTypes.func,
    jumpToSection: PropTypes.func,
    tooltipProps: PropTypes.object
};

export class AwardAmountsSectionContainer extends React.Component {
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
        if (this.props.award.category === 'idv') {
            this.getIdvChildAwardAmounts(this.props.award.id);
        }
        else {
            this.parseAwardAmounts(this.props.award.overview, this.props.award.category);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id) {
            if (this.props.award.category === 'idv') {
                this.getIdvChildAwardAmounts(this.props.award.id);
            }
            else {
                this.parseAwardAmounts(this.props.award.overview);
            }
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getIdvChildAwardAmounts(id) {
        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }

        this.awardRequest = IdvHelper.fetchAwardAmounts(id);

        this.awardRequest.promise
            .then((res) => {
                this.parseAwardAmounts(res.data, 'idv');

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
                        error: true,
                        inFlight: false
                    });
                }
                else {
                    // Request failed
                    this.awardRequest = null;
                    console.log(error);
                }
            });
    }

    parseAwardAmounts(data, awardType = this.props.award.category) {
        if (awardType === 'idv') {
            const awardAmounts = Object.create(BaseAwardAmounts);
            awardAmounts.populate(data, awardType);
            this.setState({
                awardAmounts,
                error: false,
                inFlight: false
            });

            // Store the counts in Redux for use in the referenced awards table
            // and related awards section
            this.props.setCounts({
                child_awards: data.child_award_count,
                child_idvs: data.child_idv_count,
                grandchild_awards: data.grandchild_award_count,
                total: data.child_idv_count + data.child_award_count + data.grandchild_award_count
            });
        }
        else {
            this.setState({ awardAmounts: data });
        }
    }

    render() {
        if (this.props.award.category === 'idv' && this.state.awardAmounts) {
            return (
                <div>
                    <AggregatedAwardAmounts
                        inFlight={this.state.inFlight}
                        error={this.state.error}
                        awardAmounts={this.state.awardAmounts}
                        jumpToSection={this.props.jumpToSection} />
                </div>
            );
        }
        if (this.state.awardAmounts) {
            return (
                <AwardAmountsSection
                    tooltipProps={this.props.tooltipProps}
                    awardOverview={this.state.awardAmounts}
                    jumpToSection={this.props.jumpToSection} />
            );
        }
        return null;
    }
}

AwardAmountsSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.awardV2 }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardAmountsSectionContainer);
