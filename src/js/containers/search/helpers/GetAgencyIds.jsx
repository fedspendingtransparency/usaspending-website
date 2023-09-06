import React from 'react';
import { useAgencySlugs } from "../../agency/WithAgencySlugs";

const GetAgencyIds = () => {
    const [, , agencyIds, , slugsError] = useAgencySlugs();

    return (
        // slugsError ? '' : agencyIds
        <div>hellow</div>
    );
};

export default GetAgencyIds;
