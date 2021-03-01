/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isCancel } from 'axios';

import { fetchAgencyOverview } from 'helpers/agencyV2Helper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import { LoadingWrapper } from 'components/sharedComponents/Loading';
import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';
import Error from 'components/sharedComponents/Error';
import AgencyPage from 'components/agencyV2/AgencyPage';

export const AgencyProfileV2 = () => {
    const { agencyId } = useParams();
    // currentFiscalYear is wrong. We need to ask the api for the current FY as this is account level data.
    const [selectedFy, setSelectedFy] = useState(FiscalYearHelper.currentFiscalYear());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const request = useRef(null);

    useEffect(() => {
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
                // TODO - parse the response using a data model
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
    }, [agencyId, selectedFy]);

    // TODO - get FY from URL or select a default FY
    const fyOptions = FiscalYearHelper.allFiscalYears(FiscalYearHelper.earliestExplorerYear)
        .map((year) => {
            const onClickHandler = () => setSelectedFy(year);
            return {
                name: `${year}`,
                value: year,
                onClick: onClickHandler
            };
        })
        .sort((a, b) => defaultSortFy(a.value, b.value));

    return (
        <LoadingWrapper isLoading={loading} >
            {error ? <Error /> : (
                <AgencyPage fyOptions={fyOptions} selectedFy={selectedFy} agencyId={agencyId} />
            )}
        </LoadingWrapper>
    );
};

export default AgencyProfileV2;
