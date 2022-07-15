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
import * as awardActions from 'redux/actions/award/awardActions';

import BaseFederalAccountFunding from 'models/v2/award/BaseFederalAccountFunding';
import FederalAccountTable from 'components/award/table/FederalAccountTable';
import { fetchFederalAccountFunding } from '../../../helpers/awardHistoryHelper';
import UnlinkedAwardWarning from "../../../components/sharedComponents/UnlinkedAwardWarning";

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
            error: false,
            nextPage: false,
            page: 1,
            sort: {
                field: null,
                direction: 'asc'
            },
            tableInstance: `${uniqueId()}`,
            fundingResults: [],
            unlinked: false
        };

        this.fedAccountRequest = null;

        this.nextPage = this.nextPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    async componentDidMount() {
        await this.setDefaultSort(this.props.category);
        this.fetchSubmissions(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id) {
            this.fetchSubmissions(1, true);
        }
        if (this.props.category !== prevProps.category) {
            this.setDefaultSort(this.props.category);
        }
    }

    componentWillUnmount() {
        if (this.fedAccountRequest) {
            this.fedAccountRequest.cancel();
        }
    }

    setDefaultSort(category = this.props.category) {
        if (category === 'idv') {
            this.setState((prevState) => ({ sort: { ...prevState.sort, field: 'piid' } }));
        }
        else {
            this.setState((prevState) => ({ sort: { ...prevState.sort, field: 'reporting_fiscal_date' } }));
        }
    }

    fetchSubmissions(page = 1, reset = false, award = this.props.award) {
        if (!award.id) {
            return;
        }

        if (this.fedAccountRequest) {
            // a request is in-flight, cancel it
            this.fedAccountRequest.cancel();
        }

        this.setState({
            inFlight: true,
            error: false
        });

        // generate the params
        const params = {
            award_id: award.id,
            page,
            sort: this.state.sort.field,
            order: this.state.sort.direction,
            limit: pageLimit
        };

        this.fedAccountRequest = (award.category === 'idv')
            ? IdvHelper.fetchAwardFedAccountFunding(params)
            : fetchFederalAccountFunding(params);

        this.fedAccountRequest.promise
            .then((res) => {
                this.parseFundingData(res.data, reset);
            })
            .catch((err) => {
                this.fedAccountRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }

    parseFundingData(data, reset, category = this.props.category) {
        if (!data.results.length) {
            this.setState({
                unlinked: true
            });
        }
        const fundingResults = data.results
            .map((item) => {
                const fundingResult = Object.create(BaseFederalAccountFunding);
                fundingResult.populate(item, category);
                return fundingResult;
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
        this.setState({ sort }, () => {
            this.fetchSubmissions(1, true);
        });
    }

    render() {
        return (
            <>
                {this.state.unlinked ? (
                    <UnlinkedAwardWarning topMargin widerLayout />
                )
                    :
                    <FederalAccountTable
                        {...this.props}
                        {...this.state}
                        changeSort={this.changeSort}
                        nextPage={this.nextPage} />
                }
            </>
        );
    }
}

FederalAccountTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(FederalAccountTableContainer);
