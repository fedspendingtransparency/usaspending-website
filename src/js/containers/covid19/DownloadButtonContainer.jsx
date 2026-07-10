/**
 * DownloadButtonContainer.jsx
 * Created by Lizzie Salita 7/9/20
 */

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DownloadIconButton508 from '../../components/sharedComponents/buttons/DownloadButton508';
import { requestFullDownload } from '../../helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from '../../redux/actions/bulkDownload/bulkDownloadActions';
import Analytics from '../../helpers/analytics/Analytics';
import PropTypes from 'prop-types';

const propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string
};

const DownloadButtonContainer = ({
    icon = "download",
    className =''
}) => {
    const dispatch = useDispatch();
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);
    const { defcParams } = useSelector((state) => state.covid19);

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        downloadRequest.current = requestFullDownload({ filters: { def_codes: defcParams } }, 'disaster');

        try {
            const { data } = await downloadRequest.current.promise;
            dispatch(setDownloadExpectedUrl(data.file_url));
            dispatch(setDownloadExpectedFile(data.file_name));
            // disable download button
            dispatch(setDownloadPending(true));
            downloadRequest.current = null;
        }
        catch (err) {
            console.error(err);
            downloadRequest.current = null;
        }
        Analytics.event({
            event: 'covid_19_download',
            category: 'COVID-19 - Profile',
            action: 'download',
            gtm: true
        });
    };

    return (
        <DownloadIconButton508
            downloadInFlight={downloadInFlight}
            onClick={downloadData}
            downloadIcon={icon}
            className={className} />
    );
};

DownloadButtonContainer.propTypes = propTypes;
export default DownloadButtonContainer;
