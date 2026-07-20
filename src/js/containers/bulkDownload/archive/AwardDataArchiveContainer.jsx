/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React, { useRef, useEffect, useCallback, memo } from 'react';
import { requestArchiveFiles } from '../../../helpers/bulkDownloadHelper';
import AwardDataArchiveContent from '../../../components/bulkDownload/archive/AwardDataArchiveContent';
import useRequestAgenciesList from "../../../hooks/useRequestAgenciesList";
import PropTypes from "prop-types";
import { sanitizeUrl } from 'helpers/url';
import useRequestArchiveFiles from "./useRequestArchiveFiles";

import dayjs from "dayjs";

const columns = [
    {
        columnName: 'agency',
        displayName: 'Agency'
    },
    {
        columnName: 'fileName',
        displayName: 'Archive File'
    },
    {
        columnName: 'fy',
        displayName: 'Fiscal Year'
    },
    {
        columnName: 'date',
        displayName: 'Data As Of'
    }
];

const propTypes = {
    filters: PropTypes.object,
    setFilters: PropTypes.func,
    results: PropTypes.array,
    setResults: PropTypes.func
}

// eslint-disable-next-line prefer-arrow-callback
const AwardDataArchiveContainer = memo(function AwardDataArchiveContainer(
    { filters, setFilters, results, setResults }
) {
    const { data: agencyData } = useRequestAgenciesList("award_agencies");

    const agencies = {
        cfoAgencies: agencyData?.data.agencies.cfo_agencies || [],
        otherAgencies: agencyData?.data.agencies.other_agencies || []
    };

    const updateFilter = (name, value) => setFilters(
        (prevState) => ({ ...prevState, [name]: value })
    );

    const parseResults = useCallback((data) => {
        const res = [];

        data.forEach((item) => {
            // Format Agency String
            let formattedAgency = item.agency_name;
            if (item.agency_acronym) {
                formattedAgency = `${item.agency_name} (${item.agency_acronym})`;
            }

            // Format Updated Date
            const date = dayjs(item.updated_date, "YYYY-MM-DD");
            const formattedDate = date.format("MM/DD/YYYY");

            // Format the Fiscal Year
            let formattedFY;
            if (item.fiscal_year === null) {
                formattedFY = 'N/A';
            }
            else {
                formattedFY = `FY ${item.fiscal_year}`;
            }

            const file = {
                agency: formattedAgency,
                fileName: item.file_name,
                url: sanitizeUrl(item.url) || 'not available',
                fy: formattedFY,
                date: formattedDate
            };
            res.push(file);
        });

        setResults(res);
    }, [setResults]);

    const requestData = useRequestArchiveFiles(
        filters.agency.id,
        parseInt(filters.fy, 10),
        filters.type.name
    );

    useEffect(() => {
        if (requestData.length !== 0) parseResults(requestData);
    }, [requestData, parseResults]);

    return (
        <AwardDataArchiveContent
            filters={filters}
            updateFilter={updateFilter}
            agencies={agencies}
            columns={columns}
            results={results} />
    );
});

AwardDataArchiveContainer.propTypes = propTypes;
export default AwardDataArchiveContainer;
