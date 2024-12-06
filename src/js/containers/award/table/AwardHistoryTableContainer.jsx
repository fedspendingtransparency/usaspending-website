import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import { Table, Pagination, InformationBoxes } from "data-transparency-ui";

import ReadMore from "components/sharedComponents/ReadMore";
import * as awardActions from 'redux/actions/award/awardActions';
import { fetchAwardTransaction, performSubawardSearch } from 'helpers/searchHelper';
import { transactionsTableMapping, federalAccountsTableMapping, subawardTableMapping } from "dataMapping/award/transactionHistoryTable/tableMapping";
import BaseFederalAccountFunding, { AwardHistoryTransactionsTableRow } from "models/v2/award/BaseFederalAccountFunding";
import BaseSubawardRow from "models/v2/award/subawards/BaseSubawardRow";
import { fetchFederalAccountFunding } from "helpers/awardHistoryHelper";
import { fetchAwardFedAccountFunding } from 'helpers/idvHelper';
import { formatMoney } from 'helpers/moneyFormatter';

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string,
    activeTab: PropTypes.string,
    tabOptions: PropTypes.arrayOf(PropTypes.object)
};

const AwardHistoryTableContainer = ({
    award, category, activeTab, tabOptions
}) => {
    const [inFlight, setInFlight] = useState(false);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        field: 'modification_number',
        direction: 'asc'
    });
    const [error, setError] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState();
    const [totalItems, setTotalItems] = useState(0);
    const [pageLimit, setPageLimit] = useState(10);

    const tabCounts = useRef({});

    let request = null;
    const totalSubAwardLabel = 'Number of Sub-Award Transactions';
    const totalSubAwardAmountLabel = 'Sub-Award Obligations';

    const updateSort = (field, direction) => {
        setSort(Object.assign({
            field, direction
        }));
    };

    const parseTransactionsData = (data) => {
        if (category === 'idv' || category === 'loan' || category === 'contract') {
            setColumns(transactionsTableMapping[category]);
        }
        else {
            setColumns(transactionsTableMapping.assistance);
        }

        const transactions = data.map((item) => {
            const transaction = Object.create(AwardHistoryTransactionsTableRow);
            transaction.populate(item, category);

            return transaction;
        });

        const dtuiRows = transactions.map((obj) => {
            const value = [];
            if (category === 'idv' || category === 'contract') {
                value.push(
                    obj.modificationNumber || '--',
                    obj.actionDate || '--',
                    obj.federalActionObligation || '--',
                    <ReadMore
                        text={obj.actionTypeDescription || '--'}
                        limit={50} />,
                    <ReadMore
                        text={obj.description || '--'}
                        limit={50} />
                );
            }
            else if (category === 'loan') {
                value.push(
                    obj.modificationNumber || '--',
                    obj.cfdaNumber || '--',
                    obj.actionDate || '--',
                    obj.faceValue || '--',
                    obj.subsidy || '--',
                    <ReadMore
                        text={obj.actionTypeDescription || '--'}
                        limit={50} />,
                    <ReadMore
                        text={obj.description || '--'}
                        limit={50} />
                );
            }
            else {
                value.push(
                    obj.modificationNumber || '--',
                    obj.cfdaNumber || '--',
                    obj.actionDate || '--',
                    obj.federalActionObligation || '--',
                    <ReadMore
                        text={obj.actionTypeDescription || '--'}
                        limit={50} />,
                    <ReadMore
                        text={obj.description || '--'}
                        limit={50} />
                );
            }

            return value;
        });

        setRows(dtuiRows);
        setInFlight(false);
    };

    const parseFederalAccountData = (data) => {
        let dtuiRows;
        const federalAccounts = data
            .map((item) => {
                const account = Object.create(BaseFederalAccountFunding);
                account.populate(item, category);
                return account;
            });

        if (award.category === 'idv') {
            setColumns(federalAccountsTableMapping.idv);

            dtuiRows = federalAccounts.map((obj) => {
                const value = [];

                value.push(
                    obj.submissionDate || '--',
                    obj.id || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/agency/${obj.fundingAgencySlug}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.agency}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/agency/${obj.awardingAgencySlug}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.awardingAgencyName}
                    </a> || '--',
                    obj.disasterEmergencyFundCode || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/federal_account/${obj.federalAccountCode}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.fedAccount}
                    </a> || '--' || '--',
                    <ReadMore
                        text={obj.programActivity || '--'}
                        limit={50} /> || '--',
                    <ReadMore
                        text={obj.objectClass || '--'}
                        limit={50} /> || '--',
                    obj.fundingObligated || '--',
                    obj.grossOutlayAmount || '--'
                );

                return value;
            });
        }
        else {
            setColumns(federalAccountsTableMapping.otherFunding);

            dtuiRows = federalAccounts.map((obj) => {
                const value = [];

                value.push(
                    obj.submissionDate || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/federal_account/${obj.federalAccountCode}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.fedAccount}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/agency/${obj.fundingAgencySlug}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.agency}
                    </a> || '--',
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/agency/${obj.awardingAgencySlug}`}
                        onClick={() => {
                            this.clickHandler(obj['Prime Recipient Name']);
                        }}>{obj.awardingAgencyName}
                    </a> || '--',
                    obj.disasterEmergencyFundCode || '--',
                    <ReadMore
                        text={obj.programActivity || '--'}
                        limit={50} /> || '--',
                    <ReadMore
                        text={obj.objectClass || '--'}
                        limit={50} /> || '--',
                    obj.fundingObligated || '--',
                    obj.grossOutlayAmount || '--'
                );

                return value;
            });
        }

        setRows(dtuiRows);
        setInFlight(false);
    };

    const parseSubawardData = (data) => {
        setColumns(subawardTableMapping);

        const subawards = data
            .map((item) => {
                const fundingResult = Object.create(BaseSubawardRow);
                fundingResult.populate(item, category);
                return fundingResult;
            });

        const dtuiRows = subawards.map((obj) => {
            const value = [];

            value.push(
                obj.number || '--',
                <ReadMore
                    text={obj.recipient || '--'}
                    limit={50} />,
                obj.date || '--',
                formatMoney(obj._amount) || '--',
                <ReadMore
                    text={obj.description || '--'}
                    limit={50} />
            );

            return value;
        });

        setRows(dtuiRows);
        setInFlight(false);
    };

    const fetchData = (pageNumber = 1) => {
        if (!award.id) {
            return;
        }

        if (request) {
            request.cancel();
        }

        setInFlight(true);
        setError(false);

        const params = {
            award_id: award.id,
            page: pageNumber,
            sort: sort.field,
            order: sort.direction,
            limit: pageLimit
        };

        switch (activeTab) {
            case 'transaction': request = fetchAwardTransaction(params);
                break;
            case 'federal_account': request = (award.category === 'idv')
                ? fetchAwardFedAccountFunding(params)
                : fetchFederalAccountFunding(params);
                break;
            case 'subaward': request = performSubawardSearch(params);
                break;
            default: break;
        }

        request.promise
            .then((res) => {
                if (activeTab === 'transaction') {
                    parseTransactionsData(res.data.results);
                }
                else if (activeTab === 'federal_account') {
                    parseFederalAccountData(res.data.results);
                }
                else {
                    parseSubawardData(res.data.results);
                }
            })
            .catch((err) => {
                request = null;
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        fetchData(1);

        return () => {
            if (request) {
                request.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    useEffect(() => {
        fetchData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [award.id, sort, pageLimit]);

    useEffect(() => {
        fetchData(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        setPage(1);
        if (activeTab === 'transaction') {
            setSort({
                field: 'modification_number',
                direction: 'asc'
            });
        }
        else if (activeTab === 'federal_account' && award.category === 'idv') {
            setSort({
                field: 'piid',
                direction: 'asc'
            });
        }
        else if (activeTab === 'federal_account' && award.category !== 'idv') {
            setSort({
                field: 'reporting_fiscal_date',
                direction: 'asc'
            });
        }
        else {
            setSort({
                field: 'subaward_number',
                direction: 'desc'
            });
        }

        if (tabOptions[0]?.count) {
            setTotalItems(tabCounts.current[activeTab]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    useEffect(() => {
        if (tabOptions[0]?.count) {
            setTotalItems(tabOptions[0].count);
            tabOptions.forEach((tab) => {
                tabCounts.current[tab.internal] = tab.count;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabOptions]);

    return (
        <>
            {activeTab === 'subaward' &&
                <div className="subaward-totals">
                    <InformationBoxes boxes={[{
                        title: totalSubAwardLabel,
                        type: 'totalSubAward',
                        amount: award.overview.subawardCount
                    }, {
                        title: totalSubAwardAmountLabel,
                        type: 'totalSubAwardAmount',
                        amount: `${award.overview._subawardTotal}`,
                        isMonetary: true
                    }, {
                        title: 'Percent of Prime Award Obligations',
                        type: 'subAwardedPercent',
                        isString: true,
                        amount: `${award.overview.subAwardedPercent}`
                    }]} />
                </div>
            }
            <div className="search-results-table-section">
                <div className="results-table-content">
                    <div className="advanced-search__table-wrapper">
                        <Table
                            columns={columns}
                            rows={rows}
                            currentSort={sort}
                            updateSort={updateSort}
                            classNames="table-for-new-search-page award-results-table-dtui"
                            loading={inFlight}
                            error={error}
                            rowHeight={58}
                            headerRowHeight={45} />
                    </div>
                </div>
            </div>
            <Pagination
                resultsText
                limitSelector
                currentPage={page}
                changePage={setPage}
                pageSize={pageLimit}
                changeLimit={setPageLimit}
                totalItems={totalItems}
                hideLast={totalItems >= 50000} />
        </>
    );
};

AwardHistoryTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardHistoryTableContainer);
