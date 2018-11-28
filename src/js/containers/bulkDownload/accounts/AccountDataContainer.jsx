/**
 * AccountDataContainer.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import AccountDataContent from 'components/bulkDownload/accounts/AccountDataContent';

const propTypes = {
    updateDownloadFilter: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    bulkDownload: PropTypes.object,
    clickedDownload: PropTypes.func
};

export class AccountDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agencies: {
                cfoAgencies: [],
                otherAgencies: []
            },
            federalAccounts: [],
            budgetFunctions: [],
            budgetSubfunctions: []
        };

        this.agencyListRequest = null;
        this.federalAccountListRequest = null;

        this.budgetFunctionListRequest = null;
        this.budgetSubfunctionListRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.clearAccountFilters = this.clearAccountFilters.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.setFederalAccountList = this.setFederalAccountList.bind(this);
        this.setBudgetFunctionList = this.setBudgetFunctionList.bind(this);
        this.setBudgetSubfunctionList = this.setBudgetSubfunctionList.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
        this.setBudgetFunctionList();
    }

    setAgencyList() {
        if (this.agencyListRequest) {
            this.agencyListRequest.cancel();
        }

        // perform the API request
        this.agencyListRequest = BulkDownloadHelper.requestAgenciesList({
            agency: 0
        });

        this.agencyListRequest.promise
            .then((res) => {
                const cfoAgencies = res.data.agencies.cfo_agencies;
                const otherAgencies = res.data.agencies.other_agencies;
                this.setState({
                    agencies: {
                        cfoAgencies,
                        otherAgencies
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                this.agencyListRequest = null;
            });
    }

    setFederalAccountList(agencyCode) {
        if (agencyCode !== '') {
            if (this.federalAccountListRequest) {
                this.federalAccountListRequest.cancel();
            }


            this.federalAccountListRequest = BulkDownloadHelper.requestFederalAccountList({
                agency_identifier: agencyCode
            });

            this.federalAccountListRequest.promise
                .then((res) => {
                    const federalAccounts = res.data.results;
                    this.setState({
                        federalAccounts
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.federalAccountListRequest = null;
                });
        }
        else {
            this.setState({
                federalAccounts: []
            }, () => {
                this.resetFederalAccount();
            });
        }
    }

    setBudgetFunctionList() {
        if (this.budgetFunctionListRequest) {
            this.budgetFunctionListRequest.cancel();
        }

        // perform the API request
        this.budgetFunctionListRequest = BulkDownloadHelper.requestBudgetFunctionList();

        this.budgetFunctionListRequest.promise
            .then((res) => {
                const budgetFunctions = res.data.results;
                this.setState({
                    budgetFunctions
                });
            })
            .catch((err) => {
                console.log(err);
                this.budgetFunctionListRequest = null;
            });
    }

    setBudgetSubfunctionList(budgetFunction) {
        if (budgetFunction !== '') {
            if (this.budgetSubfunctionListRequest) {
                this.budgetSubfunctionListRequest.cancel();
            }

            this.budgetSubfunctionListRequest = BulkDownloadHelper.requestBudgetSubfunctionList({
                budget_function: budgetFunction
            });

            this.budgetSubfunctionListRequest.promise
                .then((res) => {
                    const budgetSubfunctions = res.data.results;
                    this.setState({
                        budgetSubfunctions
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.budgetSubfunctionListRequest = null;
                });
        }
        else {
            this.setState({
                budgetSubfunctions: []
            }, () => {
                this.resetBudgetSubfunction();
            });
        }
    }

    updateFilter(name, value) {
        this.props.updateDownloadFilter({
            dataType: 'accounts',
            name,
            value
        });
    }

    resetFederalAccount() {
        this.updateFilter('federalAccount', {
            id: '',
            name: 'Select a Federal Account'
        });
    }


    clearAccountFilters() {
        this.props.clearDownloadFilters('accounts');
    }

    resetBudgetSubfunction() {
        this.updateFilter('budgetSubfunction', {
            code: '',
            title: 'Select a Budget Sub-Function'
        });
    }

    render() {
        return (
            <AccountDataContent
                accounts={this.props.bulkDownload.accounts}
                federalAccounts={this.state.federalAccounts}
                setFederalAccountList={this.setFederalAccountList}
                updateFilter={this.updateFilter}
                clearAccountFilters={this.clearAccountFilters}
                agencies={this.state.agencies}
                budgetFunctions={this.state.budgetFunctions}
                budgetSubfunctions={this.state.budgetSubfunctions}
                setBudgetSubfunctionList={this.setBudgetSubfunctionList}
                clickedDownload={this.props.clickedDownload} />
        );
    }
}

AccountDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AccountDataContainer);
