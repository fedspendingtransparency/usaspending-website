import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import { uniqueId } from "lodash";

import { fetchAwardTransaction } from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import { Table } from "data-transparency-ui";
import tableMapping from "../../../dataMapping/award/transactionHistoryTable/tableMapping";
import { AwardHistoryTransactionsTableRow } from "../../../models/v2/award/BaseFederalAccountFunding";

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string
};

const AwardHistoryTableContainer = ({ award, category }) => {
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

    const parseData = (data) => {
        console.log('data: ', data);
        console.log('tableMapping: ', category, tableMapping[category]);
        if (category === 'idv' || category === 'loan' || category === 'contract') {
            setColumns(tableMapping[category]);
        }
        else {
            setColumns(tableMapping.assistance);
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

        console.log('dtuiRows', dtuiRows);
        setRows(dtuiRows);
        setInFlight(false);
    };

    const fetchData = (pageNumber = 1, reset = false) => {
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

        request = fetchAwardTransaction(params);

        request.promise
            .then((res) => {
                parseData(res.data.results);
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
