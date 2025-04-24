/**
 * DownloadButtonContainer.jsx
 * Created by Lizzie Salita 7/9/20
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadIconButton, TooltipComponent } from 'data-transparency-ui';

import { requestFullDownload } from 'helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import Analytics from 'helpers/analytics/Analytics';

const Tooltip = () => (
    <TooltipComponent title="COVID-19 Download">
        <div className="message">
            <div>This download includes all data displayed on this page (as well as many additional data elements), with the exception of a few aspects one would need the more granular Account Breakdown by Award data (File C) to reproduce. If you wish to download this more granular data, visit the{' '}
                <Link to="/download_center/custom_account_data">Custom Account Data</Link> download page.
            </div>
            <br />
            <div>See the Data Sources section for more information on how downloadable data maps to this page.</div>
        </div>
    </TooltipComponent>
);

const DownloadButtonContainer = () => {
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
        <DownloadIconButton
            tooltipComponent={<Tooltip />}
            downloadInFlight={downloadInFlight}
            onClick={downloadData} />
    );
};

export default DownloadButtonContainer;
