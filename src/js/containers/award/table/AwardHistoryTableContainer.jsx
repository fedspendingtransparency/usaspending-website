import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import { uniqueId } from "lodash";
import { Table } from "data-transparency-ui";

import * as awardActions from 'redux/actions/award/awardActions';
import { fetchAwardTransaction } from 'helpers/searchHelper';
import { transactionsTableMapping, federalAccountsTableMapping } from "dataMapping/award/transactionHistoryTable/tableMapping";
import BaseFederalAccountFunding, { AwardHistoryTransactionsTableRow } from "models/v2/award/BaseFederalAccountFunding";
import { fetchFederalAccountFunding } from "helpers/awardHistoryHelper";
import { fetchAwardFedAccountFunding } from 'helpers/idvHelper';

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string,
    activeTab: PropTypes.string
};

const AwardHistoryTableContainer = ({ award, category, activeTab }) => {
    const [inFlight, setInFlight] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [sort, setSort] = useState({
        field: 'modification_number',
        direction: 'desc'
    });
    const [error, setError] = useState(false);
    const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState();

    let request = null;
    const pageLimit = 5;

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

        const arrayOfObjects = data.map((item) => {
            const row = Object.create(AwardHistoryTransactionsTableRow);
            row.populate(item, category);

            return row;
        });

        const dtuiRows = arrayOfObjects.map((obj) => {
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
        setColumns(federalAccountsTableMapping.idv);

        const fundingResults = data
            .map((item) => {
                const fundingResult = Object.create(BaseFederalAccountFunding);
                fundingResult.populate(item, category);
                return fundingResult;
            });

        const dtuiRows = fundingResults.map((obj) => {
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
            case 'subaward':
                break;
            default: break;
        }

        request.promise
            .then((res) => {
                if (activeTab === 'transaction') {
                    parseTransactionsData(res.data.results);
                }
                else if (activeTab === 'federal_account' && award.category === 'idv') {
                    parseFederalAccountData(res.data.results);
                }
                else {
                    console.log('res: ', res);
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
        fetchData(1, true);

        return () => {
            if (request) {
                request.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    useEffect(() => {
        fetchData(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [award.id, sort]);

    useEffect(() => {
        if (activeTab === 'transaction') {
            setSort({
                field: 'modification_number',
                direction: 'desc'
            });
        }
        else if (activeTab === 'federal_account' && award.category === 'idv') {
            setSort({
                field: 'piid',
                direction: 'asc'
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    return (
        <Table
            columns={columns}
            rows={rows}
            currentSort={sort}
            updateSort={updateSort}
            classNames="award-history-table"
            loading={inFlight}
            error={error} />
    );
};

AwardHistoryTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardHistoryTableContainer);
