/**
 * DownloadButtonContainer.jsx
 * Created by Lizzie Salita 7/9/20
 */

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFullDownload } from 'helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import DownloadIconButton from 'components/sharedComponents/stickyHeader/DownloadIconButton';

const TableDownloadLink = () => {
    const dispatch = useDispatch();
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        downloadRequest.current = requestFullDownload({}, 'disaster');

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
    };

    return (
        <DownloadIconButton
            downloadInFlight={downloadInFlight}
            onClick={downloadData}
            alternativeStyle />
    );
};

export default TableDownloadLink;
