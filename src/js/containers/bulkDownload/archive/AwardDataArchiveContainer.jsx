/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { requestAgenciesList, requestArchiveFiles } from 'helpers/bulkDownloadHelper';
import { currentFiscalYear} from 'helpers/fiscalYearHelper';
import AwardDataArchiveContent from 'components/bulkDownload/archive/AwardDataArchiveContent';

const dayjs = require('dayjs');

const currentFY = currentFiscalYear();

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

const AwardDataArchiveContainer = () => {
    const [agencies, setAgencies] = useState({ cfoAgencies: [], otherAgencies: [] });
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        agency: { id: 'all', name: 'All' },
        type: { name: 'contracts', display: 'Contracts' },
        fy: `${currentFY}`
    });

    const agencyListRequest = useRef(null);
    const resultsRequest = useRef(null);

    const requestAgencyList = useCallback(() => {
        if (agencyListRequest.current) agencyListRequest.current.cancel();

        // perform the API request
        agencyListRequest.current = requestAgenciesList({
            type: "award_agencies",
            agency: 0
        });

        agencyListRequest.current.promise
            .then((res) => {
                const cfoAgencies = res.data.agencies.cfo_agencies;
                const otherAgencies = res.data.agencies.other_agencies;

                setAgencies({ cfoAgencies, otherAgencies });
            })
            .catch((err) => {
                console.log(err);
                agencyListRequest.current = null;
            });
    }, []);

    const updateFilter = (name, value) => setFilters(
        (prevState) => ({ ...prevState, [name]: value })
    );

    const parseResults = (data) => {
        const results = [];

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
                url: item.url,
                fy: formattedFY,
                date: formattedDate
            };
            results.push(file);
        });

        setResults(results);
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
        requestAgencyList();
        requestResults();
    }, [requestAgencyList, requestResults]);

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

export default AwardDataArchiveContainer;
