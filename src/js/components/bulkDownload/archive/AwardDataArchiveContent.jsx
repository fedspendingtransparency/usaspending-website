/**
 * AwardDataArchiveContent.jsx
 * Created by Lizzie Salita 12/12/17
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {startCase} from "lodash-es";

import isMobileContext from "context/IsMobileContext";
import Analytics from "../../../helpers/analytics/Analytics";
import AwardDataArchiveForm from './AwardDataArchiveForm';
import AwardDataArchiveTable from './table/AwardDataArchiveTable';
import AwardDataArchiveUserSelections from "./AwardDataArchiveUserSelections";

const propTypes = {

    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    results: PropTypes.array
};

const fileFieldsForAnalytics = ['fy', 'agency', 'date'];
const archiveFileDownloadGACategory = 'Download Center - Archive Download';
const getArchiveFileName = (file) => fileFieldsForAnalytics
    .reduce((acc, key, i, arr) => {
        const selection = file[key] !== 'N/A'
            ? file[key]
            : `AllFYs`;
        if (i === 0) return `${selection}_`;
        if (i === arr.length - 1) return `${acc}_${selection}`;
        return `${acc}_${selection}_`;
    }, '');

const logArchiveDownload = (e, file) => {
    Analytics.event({
        event: 'archive_bulk_download',
        category: archiveFileDownloadGACategory,
        action: 'File Download',
        label: `File Name: ${getArchiveFileName(file)}`,
        gtm: true
    });

    fileFieldsForAnalytics
        .forEach((key) => {
            const label = file[key] !== 'N/A'
                ? file[key]
                : `AllFYs`;

            Analytics.event({
                event: 'archive_fields_for_download',
                category: archiveFileDownloadGACategory,
                action: `${startCase(key)} Download Criterion`,
                label,
                gtm: true
            });
        });
}

/* eslint-disable max-len */
const AwardDataArchiveContent = ({
    filters,
    updateFilter,
    agencies,
    results
}) => {
    const { isTablet } = useContext(isMobileContext);
    const [selectedFiles, setSelectedFiles] = useState(new Set());

    const onClickReset = () => setSelectedFiles(new Set());

    const onClickDownload = () => selectedFiles.forEach((url) => {
        logArchiveDownload({}, results.find((file) => file.url === url))
        window.open(url, '_blank');
    });

    return (
        <div className="award-data-archive-content">
            <h2>Download major agencies’ award transaction data for full fiscal years.</h2>
            <p>
                A great way to get a view into broad spending trends and, best of all,
                the files are already prepared — you can access them instantaneously.
            </p>
            <p>
                New files are uploaded by the 15th of each month.
                Check the &#39;Data As Of&#39; column to see the last time files were generated.
                There are two downloadable archive file types:
            </p>
            <ul>
                <li>
                    <b> Full files</b> - data for the fiscal year up until the date the file was prepared
                </li>
                <li>
                    <b>Delta files</b> - only new, modified, and deleted data since the date the last month&#39;s files were generated.
                    The `correction_delete_ind` column in the delta files indicates whether a record has been modified (C), deleted (D), or added (blank).
                </li>
            </ul>
            <AwardDataArchiveForm
                filters={filters}
                updateFilter={updateFilter}
                agencies={agencies} />
            <AwardDataArchiveTable results={results} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            {isTablet && <AwardDataArchiveUserSelections filters={filters} results={results}/>}
            <button
                className="reset-button"
                id="reset-button"
                aria-label="Reset File Selections"
                title="Reset File Selections"
                onClick={onClickReset}>
                Reset
            </button>
            <button
                className="download-button"
                id="download-button"
                aria-label="Download File Selections"
                title="Download File Selections"
                disabled={selectedFiles.size === 0}
                onClick={onClickDownload}>
                Download
            </button>
        </div>
    );
}

AwardDataArchiveContent.propTypes = propTypes;
export default AwardDataArchiveContent;
