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
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';
import IntroSection from "./IntroSection";

const propTypes = {
    fy: PropTypes.string
};

export const levels = ['Sub-Component', 'Federal Account'];

// TODO: Replace mock data with API responsee once endpoints available
export const mockChartData = {
    page_metadata: {
        page: 1,
        total: 1,
        limit: 2,
        next: 2,
        previous: null,
        hasNext: true,
        hasPrevious: false
    },
    results: [
        {
            name: "National Oceanic and Atmospheric Administration",
            total_budgetary_resources: 8000000000,
            total_obligations: 6000000000
        },
        {
            name: "Bureau of the Census",
            total_budgetary_resources: 4400000000,
            total_obligations: 2500000000
        },
        {
            name: "U.S. Patent and Trademark Office",
            total_budgetary_resources: 4200000000,
            total_obligations: 2700000000
        },
        {
            name: "Economic Development Administration",
            total_budgetary_resources: 4150000000,
            total_obligations: 1300000000
        },
        {
            name: "National Telecommunications and Information Administration",
            total_budgetary_resources: 2100000000,
            total_obligations: 50000000
        },
        {
            name: "National Institute of Standards and Technology",
            total_budgetary_resources: 1900000000,
            total_obligations: 1560000000
        },
        {
            name: "International Trade Administration",
            total_budgetary_resources: 1010000000,
            total_obligations: 960000000
        },
        {
            name: "Departmental Management",
            total_budgetary_resources: 100500000,
            total_obligations: 905000000
        },
        {
            name: "Bureau of Industry and Security",
            total_budgetary_resources: 10500000,
            total_obligations: 9050000
        },
        {
            name: "Bureau of Economic Analysis",
            total_budgetary_resources: 5000000,
            total_obligations: 4000000
        }
    ]
};

const StatusOfFunds = ({ fy }) => {
    const [level, setLevel] = useState(0);
    const { toptierCode, name } = useSelector((state) => state.agencyV2.overview);

    return (
        <div className="body__content status-of-funds">
            <FlexGridContainer>
                <FlexGridRow className="status-of-funds__intro" hasGutter>
                    <FlexGridCol>
                        <IntroSection fy={fy} />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter>
                    <FlexGridCol className="status-of-funds__drilldown-sidebar" tablet={3}>
                        <DrilldownSidebar level={level} setLevel={setLevel} />
                    </FlexGridCol>
                    <FlexGridCol className="status-of-funds__visualization" tablet={9}>
                        <VisualizationSection level={level} agencyId={toptierCode} agencyName={name} fy={fy} data={mockChartData} />
                    </FlexGridCol>
                </FlexGridRow>
            </FlexGridContainer>
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;
export default StatusOfFunds;
