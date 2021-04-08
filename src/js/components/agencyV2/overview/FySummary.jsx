/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ComingSoon } from 'data-transparency-ui';
import VisualizationSection from './VisualizationSection';

const propTypes = {
    isMobile: PropTypes.bool,
    fy: PropTypes.string
};

const FySummary = ({ isMobile, fy }) => {
    const content = isMobile ? (
        <div>
            Mobile
        </div>
    ) : (
        <div className="fy-summary__row">
            <div className="fy-summary__col">
                <VisualizationSection
                    subtitle="How much can this agency spend?"
                    data="$1.42 Trillion"
                    secondaryData={`15.5% of the FY ${fy} U.S. federal budget`}
                    label="Total Budgetary Resources Over Time" >
                    <ComingSoon />
                </VisualizationSection>
            </div>
            <div className="fy-summary__col">
                <VisualizationSection
                    subtitle="How much has this agency spent in total?"
                    data="$1.11 Trillion"
                    secondaryData="79.1% of total budgetary resources"
                    label="Total Obligations Over Time" >
                    <ComingSoon />
                </VisualizationSection>
            </div>
            <div className="fy-summary__col">
                <VisualizationSection
                    subtitle="How much can this agency spend?"
                    data="$10.62 Billion"
                    secondaryData="9.4% of total obligations"
                    label="Award Obligations by Type" >
                    <ComingSoon />
                </VisualizationSection>
            </div>
            <div className="fy-summary__col">
                <VisualizationSection
                    subtitle="How many recipients did this agency have?"
                    data="200"
                    secondaryData="1.5% of all federal recipients"
                    label="Recipient Award Amount Distribution" >
                    <ComingSoon />
                </VisualizationSection>
            </div>
        </div>
    );

    return (
        <div className="fy-summary">
            <h4 className="fy-summary__heading">FY {fy} Summary</h4>
            <hr />
            {content}
        </div>
    );
};

FySummary.propTypes = propTypes;
export default FySummary;
