/**
 * TableDownloadLink.jsx
 * Created by Lizzie Salita 7/9/20
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { requestFullDownloadRecipient } from 'helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import TableDownloadIconButton from 'components/covid19/TableDownloadIconButton';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    defCodes: PropTypes.array.isRequired,
    awardTypeCodes: PropTypes.array,
    query: PropTypes.string
};

const TableDownloadLink = ({ defCodes, awardTypeCodes, query }) => {
    const dispatch = useDispatch();
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);
    const params = {
        filters: {}
    };

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        if (defCodes) {
            params.filters.def_codes = defCodes;
        }
        if (awardTypeCodes && awardTypeCodes.length > 0) {
            params.filters.award_type_codes = awardTypeCodes;
        }
        if (query) {
            params.filters.query = query;
        }

        downloadRequest.current = requestFullDownloadRecipient(params);

        try {
            const { data } = await downloadRequest.current.promise;
            dispatch(setDownloadExpectedUrl(data.file_url));
            dispatch(setDownloadExpectedFile(data.file_name));
            // disable download button
            dispatch(setDownloadPending(true));
            downloadRequest.current = null;
        }
        catch (err) {
            console.log(err);
            downloadRequest.current = null;
        }
        Analytics.event({
            event: 'covid_19_table_download',
            category: 'COVID-19 - Spending by Recipient',
            action: 'download',
            gtm: true
        });
    };

    return (
        <TableDownloadIconButton
            downloadInFlight={downloadInFlight}
            onClick={downloadData}
            alternativeStyle />
    );
};

TableDownloadLink.propTypes = propTypes;
export default TableDownloadLink;
