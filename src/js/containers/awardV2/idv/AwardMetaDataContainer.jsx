import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import { fetchAwardFundingSummary, fetchAwardFederalAccounts } from 'helpers/idvHelper';
import FederalAccountsSection from 'components/awardv2/idv/federalAccounts/FederalAccountsSection';
import FederalAccountSummary from 'models/v2/awardsV2/FederalAccountSummary';

const propTypes = {
    awardId: PropTypes.string,
    jumpToFederalAccountsHistory: PropTypes.func
};

const defaultProps = {
    awardId: "0"
};

export class AwardMetaDataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTransactionObligatedAmount: 0,
            awardingAgencyCount: 0,
            federalAccountCount: 0,
            limit: 10,
            sort: 'total_transaction_obligated_amount',
            page: 1,
            order: 'desc',
            total: 0,
            inFlight: true,
            inFlightTreemap: true,
            error: false,
            errorTreemap: true,
            federalAccounts: [],
            allFederalAccounts: []
        };
        this.awardMetaDataRequest = null;
        this.federalAccountsRequest = null;
        this.allFederalAccountsRequest = null;

        this.changePage = this.changePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    async componentDidMount() {
        await this.getAwardMetaData();
        await this.getAllFederalAccounts();
        await this.getFederalAccounts();
        
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.awardId !== this.props.awardId) {
            await this.getAwardMetaData();
            await this.getAllFederalAccounts();
            await this.getFederalAccounts();
            
        }
    }

    async getAwardMetaData() {
        if (this.awardMetaDataRequest) {
            this.awardMetaDataRequest.cancel();
        }
        this.awardMetaDataRequest = fetchAwardFundingSummary(this.props.awardId);
        try {
            const { data } = await this.awardMetaDataRequest.promise;
            Object.keys(data).forEach((key) => {
                if (data[key] === 0) {
                    data[key] = "N/A";
                }
            });
            this.setState({
                totalTransactionObligatedAmount: data.total_transaction_obligated_amount,
                awardingAgencyCount: data.awarding_agency_count,
                federalAccountCount: data.federal_account_count
            });
        }
        catch (error) {
            this.setState({
                totalTransactionObligatedAmount: "N/A",
                awardingAgencyCount: "N/A",
                federalAccountCount: "N/A"
            });
        }
    }

    async getAllFederalAccounts() {
        if (this.allFederalAccountsRequest) {
            this.allFederalAccountsRequest.cancel();
        }
        this.setState({ inFlightTreemap: true, errorTreemap: false });
        /* eslint disable-next-line */
        async function* paginationFunction(awardId) {
            let hasNext = true;
            const limit = 10;
            const sort = 'total_transaction_obligated_amount';
            let page = 1;
            const order = 'desc';
            while (hasNext) {
                this.allFederalAccountsRequest = fetchAwardFederalAccounts({
                  limit, sort, page, order, award_id: awardId
                });
                const response = await this.allFederalAccountsRequest.promise;
                hasNext = response.data.page_metadata.hasNext;
                page++;
                yield response.data;
            }
        };
        async function handleResponse(awardId) {
            const iterator = paginationFunction(awardId);
            const allFederalAccounts = [];
            let totalAccounts = 0;
            for await (const federalAccounts of iterator) {
                allFederalAccounts.push(...federalAccounts.results);
                totalAccounts = federalAccounts.page_metadata.count;
            }
            return { allFederalAccounts, totalAccounts };
        };
        try {
            const allFederalAccounts = await handleResponse(this.props.awardId);
            this.parseAllFederalAccounts(allFederalAccounts);
        }
        catch (e) {
            if (!isCancel(e)) this.setState({ inflight: false, error: true });
            console.log(' Error : ', e);
        }
    }

    async getFederalAccounts() {
        if (this.federalAccountsRequest) {
            this.federalAccountsRequest.cancel();
        }
        const {
            limit, sort, page, order
        } = this.state;
        const params = {
            limit, sort, page, order, award_id: this.props.awardId
        };
        this.setState({ inFlight: true, error: false });
        this.federalAccountsRequest = fetchAwardFederalAccounts(params);
        try {
            const data = await this.federalAccountsRequest.promise;
            this.parseFederalAccounts(data.data);
        }
        catch (e) {
            if (!isCancel(e)) this.setState({ inflight: false, error: true });
            console.log(' Error : ', e);
        }
    }

    parseFederalAccounts(response) {
        const federalAccounts = response.results.map((account) => {
            const newAccount =
            new FederalAccountSummary(account, this.state.totalTransactionObligatedAmount);
            return newAccount;
        });
        this.setState({
            total: response.page_metadata.count,
            federalAccounts,
            inFlight: false,
            error: false
        });
    }

    parseAllFederalAccounts(data) {
        const allFederalAccounts = data.allFederalAccounts.reduce((result, account) => {
            if (account.total_transaction_obligated_amount > 0) {
                result.push(new FederalAccountSummary(account, this.state.totalTransactionObligatedAmount));
            }
            return result;
        }, []);
        this.setState({
            total: data.totalAccounts,
            allFederalAccounts,
            inFlightTreemap: false,
            errorTreemap: false
        });
    }

    updateSort(sort, order) {
        this.setState({ sort, order }, () => this.getFederalAccounts());
    }

    changePage(page) {
        this.setState({ page }, () => this.getFederalAccounts());
    }

    render() {
        return (
            <FederalAccountsSection
                {...this.state}
                changePage={this.changePage}
                updateSort={this.updateSort}
                changeView={this.changeView}
                jumpToFederalAccountsHistory={this.props.jumpToFederalAccountsHistory} />
        );
    }
}

AwardMetaDataContainer.propTypes = propTypes;
AwardMetaDataContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id
});

export default connect(mapStateToProps, null)(AwardMetaDataContainer);
