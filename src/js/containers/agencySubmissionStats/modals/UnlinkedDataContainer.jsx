/**
 * UnlinkedDataContainer.jsx
 * Created by Jonathan Hill 01/15/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { unlinkedDataColumns } from 'dataMapping/aboutTheData/modals';
import { formatUnlinkedDataRows } from 'helpers/aboutTheDataHelper';
import { fetchUnlinkedData } from 'apis/agencyReporting';

const propTypes = {
    agencyData: PropTypes.shape({
        agencyName: PropTypes.string,
        agencyCode: PropTypes.string,
        fiscalYear: PropTypes.number,
        fiscalPeriod: PropTypes.number,
        type: PropTypes.string
    })
};

const UnlinkedDataContainer = ({ agencyData }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: '' });
    const [rows, setRows] = useState([]);
    const unlinkedDataReq = useRef(null);

    const unlinkedDataRequest = async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (unlinkedDataReq.current) unlinkedDataReq.current.cancel();
        try {
            unlinkedDataReq.current = fetchUnlinkedData(
                agencyData.agencyCode,
                agencyData.fiscalYear,
                agencyData.fiscalPeriod,
                agencyData.type === 'Contract' ? 'procurement' : 'assistance'
            );
            const res = await unlinkedDataReq.current.promise;
            setRows(formatUnlinkedDataRows(res.data, agencyData.type));
            setLoading(false);
            unlinkedDataReq.current = null;
        }
        catch (e) {
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
                console.error(e);
            }
            unlinkedDataReq.current = null;
        }
    };
    useEffect(() => {
        unlinkedDataRequest();
        return () => {
            if (unlinkedDataReq.current) unlinkedDataReq.current.cancel();
        };
    }, []);

    return (
        <Table
            loading={loading}
            error={error.error}
            message={error.message}
            rows={rows}
            columns={unlinkedDataColumns(agencyData.type).map((column, i) => ({
                displayName: column.displayName,
                title: '',
                right: true,
                bodyHeader: i === 0
            }))} />
    );
};

UnlinkedDataContainer.propTypes = propTypes;
export default UnlinkedDataContainer;
