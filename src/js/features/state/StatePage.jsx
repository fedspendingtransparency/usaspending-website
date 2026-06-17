/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";

import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import ProfileBackLink from 'components/sharedComponents/ProfileBackLink';
import StateOverview from "features/state/overview/StateOverview";
import StateTimeVisualizationSectionContainer from
    "features/state/transactionsOverTime/containers/StateTimeVisualizationSectionContainer";
import StateFooter from "features/state/StateFooter";
import StatePageWrapper from "./StatePageWrapper";
import TopFiveSectionContainer from "./topFive/containers/TopFiveSectionContainer";
import {useDispatch, useSelector} from "react-redux";
import useStateNavigation from "./useStateNavigation";
import useFetchOverview from "./useFetchOverview";
import { setStateFiscalYear, setStateCenter } from "redux/actions/state/stateActions";
import { stateCenterFromFips } from 'helpers/mapHelper';


const StatePage = () => {
    const dispatch = useDispatch();
    const { handleFyChange, state, stateId, fy } = useStateNavigation();
    const stateProfile = useSelector((s) => s.stateProfile);

    const { isLoading, error
    } = useFetchOverview(stateId, fy);

    useEffect(() => {
        // Reset the FY
        dispatch(setStateFiscalYear(fy));
        // Update the map center
        const center = stateCenterFromFips(stateId);
        dispatch(setStateCenter(center));
    }, [state, stateProfile.fy, fy, stateId]);

    let content = (
        <FlexGridRow className="state-content-wrapper">
            <FlexGridCol className="state-content">
                <StateOverview />
                <StateTimeVisualizationSectionContainer />
                <TopFiveSectionContainer />
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
                        rel="stylesheet" />
                </Helmet>
                <LoadingWrapper isLoading={isLoading}>
                    {content}
                </LoadingWrapper>
            </main>
        </StatePageWrapper>
    );
};

export default StatePage;