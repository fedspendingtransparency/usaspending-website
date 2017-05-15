/**
 * AccountAwardsContainer.jsx
 * Created by Kevin Li 4/13/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import Immutable from 'immutable';

import TableSearchFields from 'dataMapping/search/tableSearchFields';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import * as SearchHelper from 'helpers/searchHelper';

import AccountAwardSearchOperation from 'models/account/queries/AccountAwardSearchOperation';
import SearchSortOrder from 'models/search/SearchSortOrder';
import AwardSummary from 'models/results/award/AwardSummary';

import AccountAwardsSection from 'components/account/awards/AccountAwardsSection';

import * as accountActions from 'redux/actions/account/accountActions';

const propTypes = {
    account: React.PropTypes.object,
    awards: React.PropTypes.instanceOf(Immutable.OrderedSet),
    meta: React.PropTypes.object,
    filters: React.PropTypes.object,
    order: React.PropTypes.object,
    setAccountAwardType: React.PropTypes.func,
    setAccountAwards: React.PropTypes.func,
    appendAccountAwards: React.PropTypes.func,
    setAccountAwardOrder: React.PropTypes.func
};

const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts',
        enabled: true
    },
    {
        label: 'Grants',
        internal: 'grants',
        enabled: true
    },
    {
        label: 'Direct Payments',
        internal: 'direct_payments',
        enabled: true
    },
    {
        label: 'Loans',
        internal: 'loans',
        enabled: true
    },
    {
        label: 'Insurance',
        internal: 'insurance',
        enabled: true
    }
];

export class AccountAwardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            inFlight: false
        };

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        this.pickDefaultTab();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filters !== prevProps.filters) {
            this.pickDefaultTab();
        }
        else if (this.props.order !== prevProps.order) {
            this.loadData();
        }

        if (prevProps.meta.type !== this.props.meta.type) {
            // table type changed, update columns
            this.showColumns(this.props.meta.type);
        }
    }

    pickDefaultTab() {
        // get the award counts for the current filter set
        if (this.tabCountRequest) {
            this.tabCountRequest.cancel();
        }

        const searchParams = new AccountAwardSearchOperation(this.props.account.id);
        searchParams.fromState(this.props.filters);
        this.tabCountRequest = SearchHelper.fetchAwardCounts({
            aggregate: 'count',
            group: 'type',
            field: 'total_obligation',
            filters: searchParams.toParams()
        });

        this.tabCountRequest.promise
            .then((res) => {
                this.parseTabCounts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseTabCounts(data) {
        // determine which types have award results
        const availableTypes = {};
        data.results.forEach((type) => {
            const count = parseFloat(type.aggregate);
            if (count > 0) {
                availableTypes[type.type] = count;
            }
        });

        // sum the types up by group
        const availableGroups = {};
        Object.keys(awardTypeGroups).forEach((group) => {
            availableGroups[group] = 0;
            awardTypeGroups[group].forEach((type) => {
                if ({}.hasOwnProperty.call(availableTypes, type)) {
                    availableGroups[group] += availableTypes[type];
                }
            });
        });

        let firstAvailable = 0;
        for (let i = 0; i < tableTypes.length; i++) {
            const type = tableTypes[i].internal;
            if (availableGroups[type] > 0) {
                firstAvailable = i;
                i = tableTypes.length + 1;
            }
        }

        // select the first available tab
        this.switchTab(tableTypes[firstAvailable].internal);
    }

    showColumns(tableType) {
         // calculate the column metadata to display in the table
        const columns = [];
        let sortOrder = TableSearchFields.defaultSortDirection;
        let columnWidths = TableSearchFields.columnWidths;

        if (tableType === 'loans') {
            sortOrder = TableSearchFields.loans.sortDirection;
            columnWidths = TableSearchFields.loans.columnWidths;
        }

        const tableSettings = TableSearchFields[tableType];

        tableSettings._order.forEach((col) => {
            const column = {
                columnName: col,
                displayName: tableSettings[col],
                width: columnWidths[col],
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        }, () => {
            this.loadData();
        });
    }

    switchTab(tab) {
        this.props.setAccountAwardType(tab);
        this.showColumns(tab);
        const currentSortField = this.props.order.field;

        // check if the current sort field is available in the table type
        if (!Object.hasOwnProperty.call(TableSearchFields[tab], currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = TableSearchFields[tab]._defaultSortField;
            let direction = TableSearchFields.defaultSortDirection[field];
            if (tab === 'loans') {
                direction = TableSearchFields.loans.sortDirection[field];
            }

            this.props.setAccountAwardOrder({
                field,
                direction
            });
        }
    }

    loadData(page = 1) {
        if (this.request) {
            this.request.cancel();
        }

        // create a search operation instance from the Redux filters using the account ID
        const searchOperation = new AccountAwardSearchOperation(this.props.account.id);
        searchOperation.fromState(this.props.filters);
        searchOperation.awardType = awardTypeGroups[this.props.meta.type];

        // parse the redux search order into the API-consumable format
        const searchOrder = new SearchSortOrder();
        searchOrder.parseReduxState(this.props.meta.type, this.props.order);

        const params = {
            page,
            fields: TableSearchFields[this.props.meta.type]._requestFields,
            filters: searchOperation.toParams(),
            order: searchOrder.toParams(),
            limit: 60,
            auditTrail: 'Awards table'
        };

        this.request = SearchHelper.performSearch(params);

        this.setState({
            inFlight: true
        });

        this.request.promise
            .then((res) => {
                this.request = null;

                this.setState({
                    inFlight: false
                });

                this.parseData(res.data, page);
            })
            .catch((err) => {
                this.request = null;
                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseData(data, page) {
        const hasNext = data.page_metadata.has_next_page;

        const awards = [];
        data.results.forEach((item) => {
            const award = new AwardSummary(item);
            awards.push(award);
        });

        this.request = null;

        this.setState({
            inFlight: false
        });

        if (page > 1) {
            this.props.appendAccountAwards({
                awards,
                hasNext,
                page
            });
        }
        else {
            this.props.setAccountAwards({
                awards,
                hasNext
            });
        }
    }

    loadNextPage() {
        if (!this.props.meta.hasNext) {
            return;
        }

        this.loadData(this.props.meta.page + 1);
    }

    render() {
        return (
            <AccountAwardsSection
                batch={this.props.meta.batch}
                inFlight={this.state.inFlight}
                results={this.props.awards.toArray()}
                resultsMeta={this.props.meta}
                columns={this.state.columns}
                tableTypes={tableTypes}
                currentType={this.props.meta.type}
                switchTab={this.switchTab}
                loadNextPage={this.loadNextPage} />
        );
    }
}

AccountAwardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        account: state.account.account,
        filters: state.account.filters,
        awards: state.account.awards,
        meta: state.account.awardsMeta,
        order: state.account.awardsOrder
    }),
    (dispatch) => bindActionCreators(accountActions, dispatch)
)(AccountAwardsContainer);
