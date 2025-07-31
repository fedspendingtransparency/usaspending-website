/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import Analytics from 'helpers/analytics/Analytics';
import { pickLocationFormat } from 'helpers/locationFormatter';
import { convertToTitleCase } from "helpers/searchHelper";
import { twoVariableFormat } from 'helpers/search/tables/tableUtilsHelper';
import ReadMore from 'components/sharedComponents/ReadMore';

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
                    const value = [];
                    value.push(
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${obj.generated_internal_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Award ID']);
                            }}>{obj['Award ID']}
                        </a> || '--',
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/recipient/${obj.recipient_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Recipient Name']);
                            }}>{obj['Recipient Name']}
                        </a> || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Subsidy Cost'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Loan Value'], 2, "--"),
                        <ReadMore
                            text={obj.Description || '--'}
                            limit={90} />,
                        obj['Contract Award Type'] || obj['Award Type'] || '--',
                        obj['Recipient UEI'] || 'UEI not provided',
                        pickLocationFormat(obj['Recipient Location']),
                        pickLocationFormat(obj['Primary Place of Performance']),
                        obj.def_codes || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/agency/${obj.agency_slug}`}
                            onClick={() => {
                                this.clickHandler(obj['Awarding Agency']);
                            }}>{obj['Awarding Agency']}
                        </a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        obj['Issued Date'] || '--',
                        <ReadMore
                            text={this.assistanceListingFormat(obj['Assistance Listings'])}
                            limit={90} />
                    );

                    return value;
                });
                return values;
            }
            else if (this.props.currentType === "direct_payments") {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${obj.generated_internal_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Award ID']);
                            }}>{obj['Award ID']}
                        </a> || '--',
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/recipient/${obj.recipient_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Recipient Name']);
                            }}>{obj['Recipient Name']}
                        </a> || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Award Amount'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Total Outlays'], 2, "--"),
                        <ReadMore
                            text={obj.Description || '--'}
                            limit={90} />,
                        <ReadMore
                            text={obj['Contract Award Type'] || obj['Award Type'] || '--'}
                            limit={65} />,
                        obj['Recipient UEI'] || 'UEI not provided',
                        pickLocationFormat(obj['Recipient Location']),
                        pickLocationFormat(obj['Primary Place of Performance']),
                        obj.def_codes || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/agency/${obj.agency_slug}`}
                            onClick={() => {
                                this.clickHandler(obj['Awarding Agency']);
                            }}>{obj['Awarding Agency']}
                        </a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        obj['Start Date'] || '--',
                        obj['End Date'] || '--',
                        <ReadMore
                            text={this.assistanceListingFormat(obj['Assistance Listings'])}
                            limit={90} />
                    );

                    return value;
                });
                return values;
            }

            // grants and other
            else if (this.props.currentType === "grants" || this.props.currentType === "other") {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${obj.generated_internal_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Award ID']);
                            }}>{obj['Award ID']}
                        </a> || '--',
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/recipient/${obj.recipient_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Recipient Name']);
                            }}>{obj['Recipient Name']}
                        </a> || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Award Amount'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Total Outlays'], 2, "--"),
                        <ReadMore
                            text={obj.Description || '--'}
                            limit={90} />,
                        obj['Contract Award Type'] || obj['Award Type'] || '--',
                        obj['Recipient UEI'] || 'UEI not provided',
                        pickLocationFormat(obj['Recipient Location']),
                        pickLocationFormat(obj['Primary Place of Performance']),
                        obj.def_codes || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                        MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/agency/${obj.agency_slug}`}
                            onClick={() => {
                                this.clickHandler(obj['Awarding Agency']);
                            }}>{obj['Awarding Agency']}
                        </a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        obj['Start Date'] || '--',
                        obj['End Date'] || obj['Last Date to Order'] || '--',
                        <ReadMore
                            text={this.assistanceListingFormat(obj['Assistance Listings'])}
                            limit={90} />
                    );

                    return value;
                });

                return values;
            }

            // contracts and contract idvs
            values = arrayOfObjects.map((obj) => {
                const value = [];
                value.push(
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${obj.generated_internal_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Award ID']);
                        }}>{obj['Award ID']}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/recipient/${obj.recipient_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Recipient Name']);
                        }}>{obj['Recipient Name']}
                    </a> || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['Award Amount'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Total Outlays'], 2, "--"),
                    <ReadMore
                        text={obj.Description || '--'}
                        limit={90} />,
                    obj['Contract Award Type'] || obj['Award Type'] || '--',
                    obj['Recipient UEI'] || 'UEI not provided',
                    pickLocationFormat(obj['Recipient Location']),
                    pickLocationFormat(obj['Primary Place of Performance']),
                    obj.def_codes || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Obligations'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['COVID-19 Outlays'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Obligations'], 2, "--"),
                    MoneyFormatter.formatMoneyWithPrecision(obj['Infrastructure Outlays'], 2, "--"),
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/agency/${obj.agency_slug}`}
                        onClick={() => {
                            this.clickHandler(obj['Awarding Agency']);
                        }}>{obj['Awarding Agency']}
                    </a> || '--',
                    obj['Awarding Sub Agency'] || '--',
                    obj['Start Date'] || '--',
                    obj['End Date'] || obj['Last Date to Order'] || '--',
                    <ReadMore
                        text={twoVariableFormat(obj.NAICS, 'code', 'description')}
                        limit={80} />,
                    <ReadMore
                        text={twoVariableFormat(obj.PSC, 'code', 'description')}
                        limit={80} />
                );

                return value;
            });
            return values;
        }

        // check for transactions
        else if (this.props.spendingLevel === 'transactions') {
            // check for contract or contract idv
            if (this.props.currentType === "transaction_contracts" || this.props.currentType === "transaction_idvs") {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${obj.generated_internal_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Award ID']);
                            }}>{obj['Award ID']}
                        </a> || '--',
                        obj.Mod || '--',
                        obj['Recipient Name'] || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Transaction Amount'], 2, "--"),
                        obj['Action Date'] || '--',
                        <ReadMore
                            text={obj['Transaction Description'] || '--'}
                            limit={90} />,
                        obj['Action Type'] || '--',
                        obj['Award Type'] || '--',
                        obj['Recipient UEI'] || 'UEI not provided',
                        pickLocationFormat(obj['Recipient Location']),
                        pickLocationFormat(obj['Primary Place of Performance']),
                        obj['Awarding Agency'] || '--',
                        obj['Awarding Sub Agency'] || '--',
                        <ReadMore
                            text={twoVariableFormat(obj.NAICS, 'code', 'description')}
                            limit={80} />,
                        <ReadMore
                            text={twoVariableFormat(obj.PSC, 'code', 'description')}
                            limit={80} />
                    );

                    return value;
                });
            }
            else {
                values = arrayOfObjects.map((obj) => {
                    const value = [];
                    value.push(
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${obj.generated_internal_id}`}
                            onClick={() => {
                                this.clickHandler(obj['Award ID']);
                            }}>{obj['Award ID']}
                        </a> || '--',
                        obj.Mod || '--',
                        obj['Recipient Name'] || '--',
                        MoneyFormatter.formatMoneyWithPrecision(obj['Transaction Amount'], 2, "--"),
                        obj['Action Date'] || '--',
                        <ReadMore
                            text={obj['Transaction Description'] || '--'}
                            limit={90} />,
                        obj['Action Type'] || '--',
                        obj['Award Type'] || '--',
                        obj['Recipient UEI'] || 'UEI not provided',
                        pickLocationFormat(obj['Recipient Location']),
                        pickLocationFormat(obj['Primary Place of Performance']),
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/agency/${obj.agency_slug}`}
                            onClick={() => {
                                this.clickHandler(obj['Awarding Agency']);
                            }}>{obj['Awarding Agency']}
                        </a> || '--',
                        obj['Awarding Sub Agency'] || '--',
                        twoVariableFormat(obj['Assistance Listing'], 'cfda_number', 'cfda_title')
                    );

                    return value;
                });
            }

            return values;
        }

        // subaward
        if (this.props.currentType === "subcontracts") {
            values = arrayOfObjects.map((obj) => {
                const value = [];
                value.push(
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${obj.prime_award_generated_internal_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Sub-Award ID']);
                        }}>{obj['Sub-Award ID']}
                    </a> || '--',
                    obj['Sub-Awardee Name'] || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['Sub-Award Amount'], 2, "--"),
                    obj['Sub-Award Date'] || '--',
                    <ReadMore
                        text={obj['Sub-Award Description'] || '--'}
                        limit={90} />,
                    obj['Sub-Recipient UEI'] || 'UEI not provided',
                    pickLocationFormat(obj['Sub-Recipient Location']),
                    pickLocationFormat(obj['Sub-Award Primary Place of Performance']),
                    convertToTitleCase(obj['Sub-Award Type']) || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${obj.prime_award_generated_internal_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Award ID']);
                        }}>{obj['Prime Award ID']}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/recipient/${obj.prime_award_recipient_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj['Prime Recipient Name']}
                    </a> || '--',
                    obj['Prime Award Recipient UEI'] || 'UEI not provided',
                    obj['Awarding Agency'] || '--',
                    obj['Awarding Sub Agency'] || '--',
                    <ReadMore
                        text={twoVariableFormat(obj.NAICS, 'code', 'description')}
                        limit={80} />,
                    <ReadMore
                        text={twoVariableFormat(obj.PSC, 'code', 'description')}
                        limit={80} />
                );

                return value;
            });
        }

        else {
            values = arrayOfObjects.map((obj) => {
                const value = [];
                value.push(
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${obj.prime_award_generated_internal_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Sub-Award ID']);
                        }}>{obj['Sub-Award ID']}
                    </a> || '--',
                    obj['Sub-Awardee Name'] || '--',
                    MoneyFormatter.formatMoneyWithPrecision(obj['Sub-Award Amount'], 2, "--"),
                    obj['Sub-Award Date'] || '--',
                    <ReadMore
                        text={obj['Sub-Award Description'] || '--'}
                        limit={90} />,
                    obj['Sub-Recipient UEI'] || 'UEI not provided',
                    pickLocationFormat(obj['Sub-Recipient Location']),
                    pickLocationFormat(obj['Sub-Award Primary Place of Performance']),
                    convertToTitleCase(obj['Sub-Award Type']) || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${obj.prime_award_generated_internal_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Award ID']);
                        }}>{obj['Prime Award ID']}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/recipient/${obj.prime_award_recipient_id}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj['Prime Recipient Name']}
                    </a> || '--',
                    obj['Prime Award Recipient UEI'] || 'UEI not provided',
                    obj['Awarding Agency'] || '--',
                    obj['Awarding Sub Agency'] || '--',
                    twoVariableFormat(obj["Assistance Listing"], 'cfda_number', 'cfda_program_title')
                );

                return value;
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
