/**
 * TimeFileDownload.jsx
 * Created by Andrea Blackwell 05/29/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from "lodash";
import { TooltipWrapper } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fullMonthFromAbbr } from 'helpers/monthHelper';

const propTypes = {
    parsedData: PropTypes.object,
    visualizationPeriod: PropTypes.string
};

const TimeFileDownload = ({ parsedData, visualizationPeriod }) => {
    const getDownloadData = () => {
        const headers = [];
        headers.fiscal_year = 'fiscal_year,total_obligations\n';
        headers.quarter = 'fiscal_year,fiscal_quarter,total_obligations\n';
        headers.month = 'fiscal_year,month,total_obligations\n';

        return headers[visualizationPeriod].concat(
            parsedData?.rawLabels?.map((label, i) => {
                if (visualizationPeriod === 'fiscal_year') {
                    return `${label.year},${parsedData.ySeries[i][0]}`;
                }
                if (!label.period) { // API still updating data
                    return null;
                }
                if (visualizationPeriod === 'quarter') {
                    return `${label.year},${label.period[1]},${parsedData.ySeries[i][0]}`;
                }
                const month = fullMonthFromAbbr(label.period);
                return `${['Oct', 'Nov', 'Dec'].indexOf(label.period) > -1 ? parseInt(label.year, 10) + 1 : label.year},${month},${parsedData.ySeries[i][0]}`;
            })
                .join('\n')
        );
    };

    const downloadBlob = () => new Blob([getDownloadData()], { type: 'text/csv;charset=utf-8;' });

    const renderDownloadLink = () => (
        <a
            href={URL.createObjectURL(downloadBlob())}
            download="spending-over-time.csv" >
            <FontAwesomeIcon icon="download" size="lg" />
            <span className="text">
                Download data by {capitalize(visualizationPeriod === 'fiscal_year' ? 'year' : visualizationPeriod)}
            </span>
        </a>
    );

    const downloadTooltip = () => (
        <>
            <div className="tooltip__title">Download data by {capitalize(visualizationPeriod === 'fiscal_year' ? 'year' : visualizationPeriod)}</div>
            <div className="tooltip__text">
                Download a CSV of award spending data that matches your search criteria, broken down by {visualizationPeriod === 'fiscal_year' ? 'year' : visualizationPeriod}. For complete download results, click on the &quot;Download&quot; button on the top right of this page.
            </div>
        </>
    );

    return (
        <div className="download">
            {!parsedData?.loading && renderDownloadLink()}
            {!parsedData?.loading && <TooltipWrapper
                className="tooltip-wrapper"
                icon="info"
                tooltipPosition="left"
                tooltipComponent={downloadTooltip()} />}
        </div>
    );
};

TimeFileDownload.propTypes = propTypes;
export default TimeFileDownload;

