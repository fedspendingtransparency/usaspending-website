/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isCancel } from 'axios';
import { useDispatch } from 'react-redux';

import { fetchAgencyOverview } from 'helpers/agencyV2Helper';
import { useQueryParams } from 'helpers/queryParams';
import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
import { setAgencyOverview } from 'redux/actions/agencyV2/agencyV2Actions';

import { useValidTimeBasedQueryParams, useLatestAccountData } from 'containers/account/WithLatestFy';
import AgencyPage from 'components/agencyV2/AgencyPage';

export const AgencyProfileV2 = () => {
    const { agencyId } = useParams();
    const [, , { year: latestFy }] = useLatestAccountData();
    const { fy: currentUrlFy } = useQueryParams(['fy']);
    const [selectedFy, setSelectedFy] = useValidTimeBasedQueryParams(currentUrlFy, null, ['fy']);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const request = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedFy) {
            if (request.current) {
                request.current.cancel();
            }
            setLoading(true);
            setError(false);
            setErrorMessage('');
            // request overview data for this agency
            request.current = fetchAgencyOverview(agencyId, selectedFy);
            request.current.promise
                .then((res) => {
                    setLoading(false);
                    const agencyOverview = Object.create(BaseAgencyOverview);
                    agencyOverview.populate(res.data);
                    dispatch(setAgencyOverview(agencyOverview));
                }).catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setErrorMessage(err.message);
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
            isError={isError}
            errorMessage={errorMessage} />
    );
};

export default AgencyProfileV2;
