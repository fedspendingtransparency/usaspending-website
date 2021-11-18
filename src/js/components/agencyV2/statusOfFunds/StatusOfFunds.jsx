/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FlexGridRow, FlexGridCol, FlexGridContainer } from 'data-transparency-ui';
import DrilldownSidebar from './DrilldownSidebar';
import VisualizationSection from './VisualizationSection';
import IntroSection from "./IntroSection";
import StatusOfFundsNotes from "./StatusOfFundsNotes";

const propTypes = {
    fy: PropTypes.string
};

export const levels = ['Subcomponent', 'Federal Account'];

const StatusOfFunds = ({ fy }) => {
    const [level, setLevel] = useState(0);
    const { toptierCode } = useSelector((state) => state.agencyV2.overview);
    return (
        <div className="body__content status-of-funds">
            <FlexGridContainer>
                <FlexGridRow hasGutter>
                    <FlexGridCol>
                        <IntroSection fy={fy} />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter>
                    <FlexGridCol className="status-of-funds__drilldown-sidebar" tablet={3}>
                        <DrilldownSidebar level={level} setLevel={setLevel} />
                    </FlexGridCol>
                    <FlexGridCol className="status-of-funds__visualization" tablet={9}>
                        <VisualizationSection level={level} agencyId={toptierCode} fy={fy} />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter>
                    <FlexGridCol>
                        <StatusOfFundsNotes />
                    </FlexGridCol>
                </FlexGridRow>
            </FlexGridContainer>
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;
export default StatusOfFunds;
