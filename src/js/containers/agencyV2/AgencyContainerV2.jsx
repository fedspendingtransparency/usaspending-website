/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isCancel } from 'axios';

import { fetchAgencyOverview } from 'helpers/agencyV2Helper';
import { allFiscalYears } from 'helpers/fiscalYearHelper';

import { useQueryParams, useValidTimeBasedQueryParams, useLatestAccountData } from 'containers/account/WithLatestFy';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import AgencyPage from 'components/agencyV2/AgencyPage';

export const AgencyProfileV2 = () => {
    const { agencyId } = useParams();
    const [, , { year: latestFy }] = useLatestAccountData();
    const { fy: currentUrlFy } = useQueryParams(['fy']);
    // currentFiscalYear is wrong. We need to ask the api for the current FY as this is account level data.
    const result = useValidTimeBasedQueryParams(currentUrlFy, null, ['fy']);
    const [selectedFy, setSelectedFy] = result;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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

    const getFyOptions = (fy) => {
        if (fy) {
            return allFiscalYears(2017, fy)
                .map((year) => {
                    const onClickHandler = () => setSelectedFy({ fy: year });
                    return {
                        name: `${year}`,
                        value: year,
                        onClick: onClickHandler
                    };
                });
        }
        return [{
            name: 'Loading fiscal years...',
            value: '',
            onClick: () => { }
        }];
    };

    return (
        <LoadingWrapper isLoading={loading} >
            <AgencyPage fyOptions={getFyOptions(latestFy)} selectedFy={selectedFy} agencyId={agencyId} error={error} />
        </LoadingWrapper>
    );
};

export default AgencyProfileV2;
