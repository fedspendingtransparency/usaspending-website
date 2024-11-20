/**
 * StateContent.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";

import StateTimeVisualizationSectionContainer from 'containers/state/StateTimeVisualizationSectionContainer';
import TopFiveSection from './topFive/TopFiveSection';
import StateOverview from './overview/StateOverview';
import StateFooter from './StateFooter';


const propTypes = {
    stateProfile: PropTypes.object
};

const StateContent = ({ stateProfile }) => (
    <FlexGridRow className="state-content-wrapper">
        <FlexGridCol className="state-content">
            <StateOverview
                stateProfile={stateProfile.overview} />
            <StateTimeVisualizationSectionContainer
                stateProfile={stateProfile.overview} />
            <TopFiveSection />
            <StateFooter />
        </FlexGridCol>
    </FlexGridRow>
);

StateContent.propTypes = propTypes;

export default StateContent;
