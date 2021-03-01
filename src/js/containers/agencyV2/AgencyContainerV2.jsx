/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setBudgetaryResources } from 'redux/actions/agencyV2/agencyV2Actions';
import { fetchBudgetaryResources } from 'helpers/agencyV2Helper';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import { LoadingWrapper } from 'components/sharedComponents/Loading';
import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';

import Error from 'components/sharedComponents/Error';
import AgencyPage from 'components/agencyV2/AgencyPage';

export const AgencyProfileV2 = () => {
    const { agencyId } = useParams();
    const dispatch = useDispatch();
    // currentFiscalYear is wrong. We need to ask the api for the current FY as this is account level data.
    const [selectedFy, setSelectedFy] = useState(FiscalYearHelper.currentFiscalYear());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        // request budgetary resources data for this agency
        const budgetaryResourcesRequest = fetchBudgetaryResources(agencyId);
        budgetaryResourcesRequest.promise
            .then((res) => {
                // parse the response using our data model
                setLoading(false);
                const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
                budgetaryResources.populate(res.data);
                // store the data model object in Redux
                dispatch(setBudgetaryResources(budgetaryResources));
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    }, [agencyId]);

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
