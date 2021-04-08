/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ComingSoon, Carousel } from 'data-transparency-ui';
import VisualizationSection from './VisualizationSection';

const propTypes = {
    isMobile: PropTypes.bool,
    fy: PropTypes.string
};

const FySummary = ({ isMobile, fy }) => {
    // TODO eventually get this data via props or redux
    const totalBudgetaryResources = '$1.42 Trillion';
    const percentOfFederalBudget = '15.5%';
    const totalObligations = '$1.11 Trillion';
    const percentOfBudgetaryResources = '79.1%';
    const awardObligations = '$10.62 Billion';
    const percentOfTotalObligations = '9.4%';
    const numberOfRecipients = '200';
    const percentOfFederalRecipients = '1.5%';

    const components = [
        (
            <VisualizationSection
                subtitle="How much can this agency spend?"
                data={totalBudgetaryResources}
                secondaryData={`${percentOfFederalBudget} of the FY ${fy} U.S. federal budget`}
                label="Total Budgetary Resources Over Time" >
                <ComingSoon />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle="How much has this agency spent in total?"
                data={totalObligations}
                secondaryData={`${percentOfBudgetaryResources} of total budgetary resources`}
                label="Total Obligations Over Time" >
                <ComingSoon />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle="How much can this agency spend?"
                data={awardObligations}
                secondaryData={`${percentOfTotalObligations} of total obligations`}
                label="Award Obligations by Type" >
                <ComingSoon />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle="How many recipients did this agency have?"
                data={numberOfRecipients}
                secondaryData={`${percentOfFederalRecipients} of all federal recipients`}
                label="Recipient Award Amount Distribution" >
                <ComingSoon />
            </VisualizationSection>
        )
    ];
    const content = isMobile ? (
        <Carousel items={components} />
    ) : (
        <div className="fy-summary__row">
            {components.map((viz) => (
                <div className="fy-summary__col">
                    {viz}
                </div>
            ))}
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
