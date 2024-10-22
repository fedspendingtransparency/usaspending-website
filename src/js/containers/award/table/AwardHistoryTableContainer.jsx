import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import { Table, Pagination, InformationBoxes } from "data-transparency-ui";

import * as awardActions from 'redux/actions/award/awardActions';
import { fetchAwardTransaction, performSubawardSearch } from 'helpers/searchHelper';
import { transactionsTableMapping, federalAccountsTableMapping, subawardTableMapping } from "dataMapping/award/transactionHistoryTable/tableMapping";
import BaseFederalAccountFunding, { AwardHistoryTransactionsTableRow } from "models/v2/award/BaseFederalAccountFunding";
import BaseSubawardRow from "models/v2/award/subawards/BaseSubawardRow";
import { fetchFederalAccountFunding } from "helpers/awardHistoryHelper";
import { fetchAwardFedAccountFunding } from 'helpers/idvHelper';

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

    const tabCounts = useRef({});

    let request = null;
    const pageLimit = 15;
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
                    obj.actionTypeDescription || '--',
                    obj.description || '--'
                );
            }
            else if (category === 'loan') {
                value.push(
                    obj.modificationNumber || '--',
                    obj.cfdaNumber || '--',
                    obj.actionDate || '--',
                    obj.faceValue || '--',
                    obj.subsidy || '--',
                    obj.actionTypeDescription || '--',
                    obj.description || '--'
                );
            }
            else {
                value.push(
                    obj.modificationNumber || '--',
                    obj.cfdaNumber || '--',
                    obj.actionDate || '--',
                    obj.federalActionObligation || '--',
                    obj.actionTypeDescription || '--',
                    obj.description || '--'
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
                    obj.agency || '--',
                    obj.awardingAgencyName || '--',
                    obj.disasterEmergencyFundCode || '--',
                    obj.fedAccount || '--',
                    obj.programActivity || '--',
                    obj.objectClass || '--',
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
                    obj.fedAccount || '--',
                    obj.agency || '--',
                    obj.awardingAgencyName || '--',
                    obj.disasterEmergencyFundCode || '--',
                    obj.programActivity || '--',
                    obj.objectClass || '--',
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
                obj.recipient || '--',
                obj.date || '--',
                obj._amount || '--',
                obj.description || '--'
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
    }, [award.id, sort]);

    useEffect(() => {
        fetchData(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
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
                    <Table
                        columns={columns}
                        rows={rows}
                        currentSort={sort}
                        updateSort={updateSort}
                        classNames="award-history-table"
                        loading={inFlight}
                        error={error}
                        rowHeight={58}
                        headerRowHeight={45} />
                </div>
            </div>
            <Pagination
                resultsText
                currentPage={page}
                changePage={setPage}
                pageSize={pageLimit}
                totalItems={totalItems} />
        </>
    );
};

AwardHistoryTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardHistoryTableContainer);
