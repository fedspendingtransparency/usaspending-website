/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import Analytics from 'helpers/analytics/Analytics';
import ResultsTableRow from '../../../models/v2/search/ResultsTableRow';

export default class ResultsTable extends React.Component {
    static propTypes = {
        results: PropTypes.array,
        columns: PropTypes.object,
        visibleWidth: PropTypes.number,
        loadNextPage: PropTypes.func,
        subaward: PropTypes.bool,
        spendingLevel: PropTypes.string,
        tableInstance: PropTypes.string,
        sort: PropTypes.object,
        updateSort: PropTypes.func,
        awardIdClick: PropTypes.func,
        subAwardIdClick: PropTypes.func,
        page: PropTypes.number,
        setPage: PropTypes.func,
        setResultLimit: PropTypes.func,
        total: PropTypes.number,
        isMobile: PropTypes.bool,
        federalAccountPage: PropTypes.bool,
        referenceData: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            currentRows: [],
            cols: this.prepareDTUIColumns(),
            windowHeight: 0,
            tableHeight: 0,
            activateRightFade: !props.isMobile,
            windowWidth: 0
        };

        this.prepareDTUIColumns = this.prepareDTUIColumns.bind(this);
        this.prepareDTUIRows = this.prepareDTUIRows.bind(this);
        this.measureHeight = this.measureHeight.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.assistanceListingFormat = this.assistanceListingFormat.bind(this);
    }

    componentDidMount() {
        this.measureHeight();
        window.addEventListener('resize', this.measureHeight);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            // table type has changed, reset the scroll
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }

        if (prevProps.isMobile !== this.props.isMobile) {
            if (this.props.isMobile) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    activateRightFade: false
                });
            }
            else {
                // eslint-disable-next-line react/no-did-update-set-state
                (this.setState({
                    activateRightFade: true
                }));
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureHeight);
    }

    assistanceListingFormat(assistanceListing) {
        // format for spending by award api
        if (assistanceListing?.length === 1) {
            const listing = assistanceListing[0];

            return `${listing.cfda_number} - ${listing.cfda_program_title}`;
        }
        else if (assistanceListing?.length > 1) {
            const listings = [];

            assistanceListing.forEach((listing) => {
                listings.push(`${listing.cfda_number} - ${listing.cfda_program_title}`);
            });

            return listings.join(', ');
        }

        return '--';
    }

    measureHeight() {
        const tableHeight = document.getElementById("advanced-search__table-wrapper").offsetHeight;
        this.setState({
            tableHeight,
            windowHeight: window.innerHeight
        });
    }

    prepareDTUIColumns() {
        const columnOrder = this.props.columns.visibleOrder;
        const orderedColumns = columnOrder.map((columnTitle) => {
            const column = this.props.columns.data[columnTitle];
            return column;
        });

        // the columns passed in don't have the right properties, if we
        // don't do this sort won't work
        const columns = orderedColumns.map((col) => ({
            title: col.columnName,
            displayName: col.displayName,
            columnWidth: col.width,
            right: col.right || false
        }));
        return columns;
    }

    clickHandler(linkName) {
        Analytics.event({
            category: 'Section table',
            action: `Clicked ${linkName}`
        });
    }

    prepareDTUIRows() {
        // limit = 10
        // page = 1, need 0-9
        // page = 2, need 10 - 19 etc
        // (page * limit) - 1 end
        // (page - 1) * limit start
        const arrayOfObjects = this.props.results;
        let values = null;

        // check for prime awards && loans
        if (
            this.props.spendingLevel === 'awards' ||
            this.props.federalAccountPage === true
        ) {
            if (this.props.currentType === "loans") {
                values = arrayOfObjects.map((obj) => {
                    const loanrow = Object.create(ResultsTableRow);
                    loanrow.populateLoan(obj);
                    return Object.values(loanrow);
                });
                return values;
            }
            else if (this.props.currentType === "direct_payments") {
                values = arrayOfObjects.map((obj) => {
                    const directPaymentRow = Object.create(ResultsTableRow);
                    directPaymentRow.populateDirectPayment(obj);
                    return Object.values(directPaymentRow);
                });
                return values;
            }

            // grants and other
            else if (this.props.currentType === "grants" || this.props.currentType === "other") {
                values = arrayOfObjects.map((obj) => {
                    const grantRow = Object.create(ResultsTableRow);
                    grantRow.populateGrant(obj);
                    return Object.values(grantRow);
                });

                return values;
            }

            // contracts and contract idvs
            values = arrayOfObjects.map((obj) => {
                const contractRow = Object.create(ResultsTableRow);
                contractRow.populateContract(obj);
                return Object.values(contractRow);
            });
            return values;
        }

        // check for transactions
        else if (this.props.spendingLevel === 'transactions') {
            // check for contract or contract idv
            if (this.props.currentType === "transaction_contracts" || this.props.currentType === "transaction_idvs" || this.props.currentType === "contracts") {
                values = arrayOfObjects.map((obj) => {
                    const transactionContractRow = Object.create(ResultsTableRow);
                    transactionContractRow.populateTransactionContract(obj);
                    return Object.values(transactionContractRow);
                });
            }
            else {
                values = arrayOfObjects.map((obj) => {
                    const transactionContractRow = Object.create(ResultsTableRow);
                    transactionContractRow.populateTransactionDefault(obj);
                    return Object.values(transactionContractRow);
                });
            }

            return values;
        }

        // subaward
        if (this.props.currentType === "subcontracts" || (this.props.columnType === "subawards" && this.props.currentType === "contracts")) {
            values = arrayOfObjects.map((obj) => {
                const subcontractRow = Object.create(ResultsTableRow);
                subcontractRow.populateSubcontract(obj);
                return Object.values(subcontractRow);
            });
        }

        else {
            values = arrayOfObjects.map((obj) => {
                const defaultRow = Object.create(ResultsTableRow);
                defaultRow.populateDefault(obj);
                return Object.values(defaultRow);
            });
        }

        return values;
    }

    render() {
        const cols = this.prepareDTUIColumns();
        const limitedRows = this.prepareDTUIRows();
        // for table height take the height of the viewport
        // subtract the sticky header part on the top of the page
        // tab height for the tables
        // 16 pixel space between the tabs
        // pagination on the bottom, so you can actually see the pages
        return (
            <>
                <div
                    className="advanced-search__table-wrapper"
                    id="advanced-search__table-wrapper"
                    style={this.props.resultsCount >= this.props.resultsLimit ? { height: '638px' } : {}}>
                    <Table
                        classNames="table-for-new-search-page award-results-table-dtui"
                        stickyFirstColumn={!this.props.isMobile}
                        columns={cols}
                        rows={limitedRows}
                        rowHeight={this.props.isMobile ? null : 58}
                        headerRowHeight={45}
                        highlightedColumns={this.props.subaward ? {
                            standardColumns: 9,
                            highlightedColumns: this.props.currentType === "subcontracts" ? 7 : 6
                        } : null}
                        currentSort={this.props.sort}
                        updateSort={this.props.updateSort}
                        isMobile={this.props.isMobile}
                        isStacked
                        newMobileView />

                </div>
                <Pagination
                    resultsText
                    limitSelector
                    hideLast={this.props.resultsCount >= 50000}
                    currentPage={this.props.page}
                    pageSize={this.props.resultsLimit}
                    changePage={this.props.setPage}
                    changeLimit={this.props.setResultLimit}
                    totalItems={this.props.resultsCount} />
            </>
        );
    }
}
