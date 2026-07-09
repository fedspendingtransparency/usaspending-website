/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { requestArchiveFiles } from 'helpers/bulkDownloadHelper';
import AwardDataArchiveContent from 'components/bulkDownload/archive/AwardDataArchiveContent';
import useRequestAgenciesList from "hooks/useRequestAgenciesList";
import PropTypes from "prop-types";
import { sanitizeUrl } from 'helpers/url';

const dayjs = require('dayjs');

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

const AwardDataArchiveContainer = ({ filters, setFilters, results, setResults }) => {
    const { data } = useRequestAgenciesList("award_agencies");
    const resultsRequest = useRef(null);

    const agencies = {
        cfoAgencies: data?.data.agencies.cfo_agencies || [],
        otherAgencies: data?.data.agencies.other_agencies || []
    };

    const updateFilter = (name, value) => setFilters(
        (prevState) => ({ ...prevState, [name]: value })
    );

    const parseResults = (data) => {
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
    };

    const requestResults = useCallback(() => {
        if (resultsRequest.current) resultsRequest.current.cancel();

        // perform the API request
        resultsRequest.current = requestArchiveFiles({
            agency: filters.agency.id,
            fiscal_year: parseInt(filters.fy, 10),
            type: filters.type.name
        });

        resultsRequest.current.promise
            .then((res) => parseResults(res.data.monthly_files))
            .catch((err) => {
                console.log(err);
                resultsRequest.current = null;
            });
    }, [filters.agency.id, filters.fy, filters.type.name]);

    useEffect(() => {
        requestResults();
    }, [requestResults]);

    return (
        <AwardDataArchiveContent
            filters={filters}
            updateFilter={updateFilter}
            agencies={agencies}
            columns={columns}
            results={results}
            requestResults={requestResults} />
    );
}

AwardDataArchiveContainer.propTypes = propTypes;
export default AwardDataArchiveContainer;
