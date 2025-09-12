/**
 * AgencyContainer.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router";
import { isCancel } from "axios";
import { useDispatch } from "react-redux";

import { fetchAgencyOverview } from "apis/agency";
import { useQueryParams } from "helpers/queryParams";
import BaseAgencyOverview from "models/v2/agency/BaseAgencyOverview";
import { setAgencyOverview, resetAgency } from "redux/actions/agency/agencyActions";

import { useValidTimeBasedQueryParams, useLatestAccountData } from "containers/account/WithLatestFy";
import AgencyPage from "components/agency/AgencyPage";
import { useAgencySlugs } from "./WithAgencySlugs";

export const AgencyProfileV2 = () => {
    const { agencySlug } = useParams();
    const [, , { year: latestFy }] = useLatestAccountData();
    const { fy: currentUrlFy } = useQueryParams(["fy"]);
    const [selectedFy, setSelectedFy] = useValidTimeBasedQueryParams(currentUrlFy, null, ["fy"]);

    // Use a custom hook to get the { agency slug: toptier code } mapping, or request it if not yet available
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const request = useRef(null);
    const dispatch = useDispatch();
    const [toptierCode, setToptierCode] = useState(agencySlugs[agencySlug]);

    useEffect(() => {
        if (selectedFy && toptierCode) {
            if (request.current) {
                request.current.cancel();
            }
            setLoading(true);
            setError(false);
            setErrorMessage("");
            // request overview data for this agency
            request.current = fetchAgencyOverview(toptierCode, selectedFy);
            request.current.promise
                .then((res) => {
                    setLoading(false);
                    const agencyOverview = Object.create(BaseAgencyOverview);
                    agencyOverview.populate(res.data);
                    dispatch(setAgencyOverview(agencyOverview));
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setErrorMessage(err.message);
                        setLoading(false);
                        request.current = null;
                        console.error(err);
                    }
                });
        }
    }, [toptierCode, selectedFy, dispatch]);

    useEffect(() => {
        if (!slugsLoading && !slugsError) {
            // Lookup the toptier code for this agency and validate it
            const code = agencySlugs[agencySlug];
            if (code) {
                setToptierCode(code);
            }
            else {
                setRedirect(true);
            }
        }
        else if (slugsError) {
            setError(true);
        }
    }, [agencySlugs, slugsLoading, slugsError, agencySlug]);

    useEffect(
        () => () => {
            // cleanup
            dispatch(resetAgency());
        },
        [agencySlug, dispatch]
    );

    if (redirect) {
        return <Navigate to="/404" />;
    }
    return (
        <AgencyPage
            setSelectedFy={setSelectedFy}
            latestFy={latestFy}
            selectedFy={selectedFy}
            agencySlug={agencySlug}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage} />
    );
};

export default AgencyProfileV2;
