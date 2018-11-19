/**
  * AwardDescriptionContainer.jsx
  * Created by Kwadwo Opoku-Debrah 09/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import DetailRow from 'components/award/DetailRow';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

const propTypes = {
    selectedAward: PropTypes.object,
    title: PropTypes.string,
    maxChars: PropTypes.number
};

export class AwardDescriptionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.transactionDescriptionRequest = null;

        this.state = {
            inFlight: false,
            lastDescription: null
        };
    }

    componentDidMount() {
        this.setAwardDescription(this.props.selectedAward.internalId);
    }

    setAwardDescription(id) {
        const params = {
            award_id: this.props.selectedAward.internalId,
            order: 'desc',
            sort: 'action_date',
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: id
                }
            ],
            limit: 1,
            page: 1
        };

        this.setState({
            inFlight: true
        });

        this.transactionDescriptionRequest = SearchHelper.fetchAwardTransaction(params);

        this.transactionDescriptionRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false,
                    lastDescription: res.data.results[0].description || this.props.selectedAward.description
                });
            })
            .catch((err) => {
                this.transactionDescriptionRequest = null;
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }


    render() {
        return (
            <DetailRow
                title={this.props.title}
                value={this.state.lastDescription}
                overflow={this.state.lastDescription ? this.state.lastDescription.length > this.props.maxChars : false} />
        );
    }
}

AwardDescriptionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardDescriptionContainer);
