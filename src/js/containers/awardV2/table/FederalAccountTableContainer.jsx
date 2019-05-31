/**
 * FederalAccountTableContainer.jsx
 * Created by Kwadwo Opoku-Debrah 02/15/2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import * as IdvHelper from 'helpers/idvHelper';
import * as awardActions from 'redux/actions/awardV2/awardActions';

import BaseFederalAccountFunding from 'models/v2/awardsV2/BaseFederalAccountFunding';
import FederalAccountTable from 'components/awardv2/table/FederalAccountTable';

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string
};

const pageLimit = 15;

export class FederalAccountTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            nextPage: false,
            page: 1,
            sort: {
                field: 'piid',
                direction: 'asc'
            },
            tableInstance: `${uniqueId()}`,
            fundingResults: []
        };

        this.fedAccountRequest = null;

        this.nextPage = this.nextPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.fetchSubmissions(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id) {
            this.fetchSubmissions(1, true);
        }
    }

    componentWillUnmount() {
        if (this.fedAccountRequest) {
            this.fedAccountRequest.cancel();
        }
    }

    fetchSubmissions(page = 1, reset = false) {
        if (!this.props.award.id) {
            return;
        }

        if (this.fedAccountRequest) {
            // a request is in-flight, cancel it
            this.fedAccountRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        // generate the params
        const params = {
            award_id: this.props.award.id,
            page,
            sort: this.state.sort.field,
            order: this.state.sort.direction,
            limit: pageLimit
        };

        this.fedAccountRequest = IdvHelper.fetchAwardFedAccountFunding(params);

        this.fedAccountRequest.promise
            .then((res) => {
                this.parseFundingData(res.data, reset);
            })
            .catch((err) => {
                this.fedAccountRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseFundingData(data, reset) {
        const fundingResults = [];
        data.results.forEach((item) => {
            const fundingResult = Object.create(BaseFederalAccountFunding);
            fundingResult.populate(item);
            fundingResults.push(fundingResult);
        });

        // update the metadata
        const meta = data.page_metadata;
        const newState = {
            page: meta.page,
            nextPage: meta.hasNext,
            inFlight: false
        };

        if (reset) {
            newState.tableInstance = `${uniqueId()}`;
            newState.fundingResults = fundingResults;
        }
        else {
            // append to the current results
            newState.fundingResults = this.state.fundingResults.concat(fundingResults);
        }

        this.setState(newState);
    }

    nextPage() {
        if (!this.state.nextPage || this.state.inFlight) {
            return;
        }

        const nextPage = this.state.page + 1;
        this.setState({
            page: nextPage
        });
        this.fetchSubmissions(nextPage, false);
    }

    changeSort(sort) {
        this.setState({
            sort
        }, () => {
            this.fetchSubmissions(1, true);
        });
    }

    render() {
        return (
            <FederalAccountTable
                {...this.props}
                {...this.state}
                changeSort={this.changeSort}
                nextPage={this.nextPage} />
        );
    }
}

FederalAccountTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.awardV2 }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(FederalAccountTableContainer);
