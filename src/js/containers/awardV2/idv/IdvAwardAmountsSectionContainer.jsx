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

const propTypes = {
    award: PropTypes.object,
    setCounts: PropTypes.func,
    jumpToSection: PropTypes.func
};

export class IdvAmountsContainer extends React.Component {
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
            .then((res) => {
                this.parseAward(res.data);

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

    parseAward(data) {
        const awardAmounts = Object.create(BaseAwardAmounts);
        awardAmounts.populate(data, 'idv');
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

    render() {
        return (
            <div>
                <AggregatedAwardAmounts {...this.state} jumpToSection={this.props.jumpToSection} />
            </div>
        );
    }
}

IdvAmountsContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.awardV2 }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(IdvAmountsContainer);
