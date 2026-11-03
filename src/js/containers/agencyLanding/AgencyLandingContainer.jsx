/**
 * AgencyLandingContainer.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React, { useState } from 'react';
import AgenciesTableFields from '../../dataMapping/agencyLanding/agenciesTableFields';
import useFetchAllAgencies from './useFetchAllAgencies';
import AgencyLandingContent from '../../components/agencyLanding/AgencyLandingContent';

const getColumns = () => {
    const columnArray = [];
    const sortOrder = AgenciesTableFields.defaultSortDirection;

    AgenciesTableFields.order.forEach((col) => {
        let displayName = AgenciesTableFields[col];
        columnArray.push({
            columnName: col,
            displayName,
            defaultDirection: sortOrder[col]
        });
    });

    return columnArray;
};

const AgencyLandingContainer = () => {
    const [agencySearchString, setAgencySearchString] = useState('');

    const columns = getColumns();

    const setAgencySearchStringLocal = (string) => {
        let searchValue = '';
        if (string.length > 2) {
            searchValue = string;
        }

        setAgencySearchString(searchValue);
    };

    const { isLoading, results, resultsText } = useFetchAllAgencies(agencySearchString);

    return (
        <AgencyLandingContent
            resultsText={resultsText}
            results={results}
            agencySearchString={agencySearchString}
            inFlight={isLoading}
            columns={columns}
            setAgencySearchString={setAgencySearchStringLocal} />
    );
};

export default AgencyLandingContainer;
