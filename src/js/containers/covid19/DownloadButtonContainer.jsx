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
import DownloadButton from 'components/search/header/DownloadButton';

const DownloadButtonContainer = () => {
    const dispatch = useDispatch();
    const defCodes = useSelector((state) => state.covid19.defCodes);
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        const params = {
            filters: {
                def_codes: defCodes.map((defc) => defc.code)
            }
        };

        downloadRequest.current = requestFullDownload(params, 'disaster');

        try {
            const { data } = await downloadRequest.current.promise;
            dispatch(setDownloadExpectedUrl(data.file_url));
            dispatch(setDownloadExpectedFile(data.file_name));
            // disable download button
            dispatch(setDownloadPending(true));
            this.downloadRequest.current = null;
        }
        catch (err) {
            console.log(err);
            downloadRequest.current = null;
        }
    };

    return (
        <DownloadButton
            downloadAvailable
            downloadInFlight={downloadInFlight}
            onClick={downloadData} />
    );
};

export default DownloadButtonContainer;
