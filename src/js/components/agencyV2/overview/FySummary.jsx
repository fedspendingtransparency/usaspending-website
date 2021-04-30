/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ComingSoon, Carousel } from 'data-transparency-ui';
import TotalObligationsOverTimeContainer from 'containers/agencyV2/visualizations/TotalObligationsOverTimeContainer';
import VisualizationSection from './VisualizationSection';

import ObligationsByAwardTypeContainer from 'containers/agencyV2/visualizations/ObligationsByAwardTypeContainer';

const propTypes = {
    windowWidth: PropTypes.number,
    fy: PropTypes.string
};

const FySummary = ({ fy, windowWidth, isMobile }) => {
    // TODO eventually get this data via props or redux
    const totalBudgetaryResources = '$1.42 Trillion';
    const percentOfFederalBudget = '15.5%';
    const totalObligations = '$1.11 Trillion';
    const percentOfBudgetaryResources = '79.1%';
    const awardObligations = '$10.62 Billion';
    const percentOfTotalObligations = '9.4%';
    const numberOfRecipients = '200';
    const percentOfFederalRecipients = '1.5%';

    const sections = (windowWidth) => [
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much can this agency spend?' : (<>How much can<br />this agency spend?</>)}
                data={totalBudgetaryResources}
                secondaryData={`${percentOfFederalBudget} of the FY ${fy} U.S. federal budget`}
                label="Total Budgetary Resources Over Time" >
                <ComingSoon className="viz-placeholder" />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent in total?' : (<>How much has this agency<br />spent in total?</>)}
                data={totalObligations}
                secondaryData={`${percentOfBudgetaryResources} of total budgetary resources`}
                label="Total Obligations Over Time" >
                <TotalObligationsOverTimeContainer />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent on awards?' : (<>How much has this agency<br />spent on awards?</>)}
                data={awardObligations}
                secondaryData={`${percentOfTotalObligations} of total obligations`}
                label="Award Obligations by Type" >
                <ObligationsByAwardTypeContainer windowWidth={windowWidth} />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How many award recipients did this agency have?' : (<>How many award recipients<br />did this agency have?</>)}
                data={numberOfRecipients}
                secondaryData={`${percentOfFederalRecipients} of all federal recipients`}
                label="Recipient Award Amount Distribution" >
                <ComingSoon className="viz-placeholder" />
            </VisualizationSection>
        )
    ];

    return (
        <div className="fy-summary">
            <h4 className="fy-summary__heading">FY {fy} Summary</h4>
            <hr />
            {isMobile ? <Carousel items={sections(windowWidth)} />
                : (
                    <div className="fy-summary__row">
                        {sections(windowWidth).map((viz, i) => (
                            <div key={`FY-Summary-${i}`} className="fy-summary__col">
                                {viz}
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

FySummary.propTypes = propTypes;
export default FySummary;
