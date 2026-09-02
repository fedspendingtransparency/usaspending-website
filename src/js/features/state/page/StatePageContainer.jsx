/**
 * StatePageContainer.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { useDispatch, useSelector } from "react-redux";

import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import ProfileBackLink from 'components/sharedComponents/ProfileBackLink';
import StateOverview from "features/state/overview/StateOverview";
import StateTimeVisualizationSectionContainer from
    "features/state/transactionsOverTime/StateTimeVisualizationSectionContainer";
import { setStateFiscalYear, setStateCenter } from "redux/actions/state/stateActions";
import { stateCenterFromFips } from 'helpers/mapHelper';

import StateFooter from "./StateFooter";
import StatePageWrapper from "./StatePageWrapper";
import useStateNavigation from "../useStateNavigation";
import useFetchOverview from "./useFetchOverview";

import TopFiveSection from "../topFive/TopFiveSection";
import useAgencySlugs from "../../../hooks/useAgencySlugs";

require('pages/state/statePage.scss');

const StatePageContainer = () => {
    const dispatch = useDispatch();
    const { handleFyChange, stateId, fy } = useStateNavigation();
    const stateProfile = useSelector((s) => s.stateProfile);
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
    const agencyData = { agencySlugs, slugsLoading, slugsError };

    const { isLoading, error
    } = useFetchOverview(stateId, fy);

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));
        // Update the map center
        const center = stateCenterFromFips(stateId);
        dispatch(setStateCenter(center));
    }, [fy, stateId, dispatch]);

    let content = (
        <FlexGridRow className="state-content-wrapper">
            <FlexGridCol className="state-content">
                <StateOverview />
                <StateTimeVisualizationSectionContainer />
                <TopFiveSection agencyData={agencyData} />
                <StateFooter />
            </FlexGridCol>
        </FlexGridRow>
    );

    if (error) {
        content = (
            <Error
                title="Invalid State"
                message="The state ID provided is invalid. Please check the ID and try again." />
        );
    }

    return (
        <StatePageWrapper
            stateProfile={stateProfile}
            handleFyChange={handleFyChange}
            loading={isLoading}>
            <main id="main-content" className="main-content">
                <ProfileBackLink
                    label="Back to State Profile Page"
                    url="/state" />
                <Helmet>
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css"
                        rel="stylesheet"
                        crossOrigin="anonymous"
                        integrity="sha384-JnF4GvwrnLggHxx0ORCeHombtPxfqigY/GeEvbdv0Uy5qrCAuAyN3AulKRA+VAPr" />
                </Helmet>
                <LoadingWrapper isLoading={isLoading}>
                    {content}
                </LoadingWrapper>
            </main>
        </StatePageWrapper>
    );
};

export default StatePageContainer;