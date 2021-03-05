/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isCancel } from 'axios';

import { fetchAgencyOverview } from 'helpers/agencyV2Helper';
import { useQueryParams } from 'helpers/queryParams';

import { useValidTimeBasedQueryParams, useLatestAccountData } from 'containers/account/WithLatestFy';
import AgencyPage from 'components/agencyV2/AgencyPage';

export const AgencyProfileV2 = () => {
    const { agencyId } = useParams();
    const [, , { year: latestFy }] = useLatestAccountData();
    const { fy: currentUrlFy } = useQueryParams(['fy']);
    const [selectedFy, setSelectedFy] = useValidTimeBasedQueryParams(currentUrlFy, null, ['fy']);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const request = useRef(null);

    useEffect(() => {
        if (selectedFy) {
            if (request.current) {
                request.current.cancel();
            }
            setLoading(true);
            setError(false);
            // request overview data for this agency
            request.current = fetchAgencyOverview(agencyId, selectedFy);
            request.current.promise
                .then((res) => {
                    setLoading(false);
                    // TODO - parse the response ing a data model
                    // TODO - store the data model object in Redux
                    console.log(res.data);
                }).catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setLoading(false);
                        request.current = null;
                        console.error(err);
                    }
                });
        }
    }, [agencyId, selectedFy]);

    return (
        <AgencyPage
            setSelectedFy={setSelectedFy}
            latestFy={latestFy}
            selectedFy={selectedFy}
            agencyId={agencyId}
            isLoading={isLoading}
            isError={isError} />
    );
};

export default AgencyProfileV2;
