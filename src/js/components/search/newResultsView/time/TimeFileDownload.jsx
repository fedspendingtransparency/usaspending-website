/**
 * TimeFileDownload.jsx
 * Created by Andrea Blackwell 05/29/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { words, upperFirst } from "lodash";
import { TooltipWrapper } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    downloadData: PropTypes.arrayOf(PropTypes.string),
    visualizationPeriod: PropTypes.string
};

const TimeFileDownload = ({ downloadData, visualizationPeriod }) => {
    const getDownloadData = () => {
        const headers = [];
        headers.fiscal_year = 'fiscal_year,total_obligations\n';
        headers.quarter = 'fiscal_quarter,total_obligations\n';
        headers.month = 'month,total_obligations\n';
        return headers[visualizationPeriod].concat(downloadData.join('\n'));
    };

    const downloadBlob = () => new Blob([getDownloadData()], { type: 'text/csv;charset=utf-8;' });

    const getPeriod = () => {
        if (visualizationPeriod === 'fiscal_year') {
            return 'year';
        }
        else if (visualizationPeriod === 'quarter') {
            return 'fiscal quarter';
        }
        return 'month';
    };
    const renderDownloadLink = () => (
        <a
            href={URL.createObjectURL(downloadBlob())}
            download={`results-over-time-by-${visualizationPeriod}-${Date.now()}.csv`} >
            <FontAwesomeIcon icon="download" size="lg" />
            <span className="text">
                Download data by {words(getPeriod()).map(upperFirst).join(' ')}
            </span>
        </a>
    );

    const downloadTooltip = () => (
        <>
            <div className="tooltip__title">Download data by {words(getPeriod()).map(upperFirst).join(' ')}</div>
            <div className="tooltip__text">
                Download a CSV of award spending data that matches your search criteria, broken down by {getPeriod()}. For complete download results, click on the &quot;Download&quot; button on the top right of this page.
            </div>
        </>
    );

    return (
        <div className="download">
            {downloadData && renderDownloadLink()}
            {downloadData && <TooltipWrapper
                className="tooltip-wrapper"
                icon="info"
                tooltipPosition="left"
                tooltipComponent={downloadTooltip()} />}
        </div>
    );
};

TimeFileDownload.propTypes = propTypes;
export default TimeFileDownload;

