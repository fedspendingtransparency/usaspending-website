/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ComingSoon, Carousel, LoadingMessage, ErrorMessage } from 'data-transparency-ui';

import { fetchBudgetaryResources } from 'apis/agencyV2';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import { setBudgetaryResources } from 'redux/actions/agencyV2/agencyV2Actions';
import TotalObligationsOverTimeContainer from 'containers/agencyV2/visualizations/TotalObligationsOverTimeContainer';
import VisualizationSection from './VisualizationSection';
import BarChart from './BarChart';

const propTypes = {
    isMobile: PropTypes.bool,
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

const FySummary = ({
    isMobile,
    fy,
    agencyId
}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const { budgetaryResources: { dataByYear: resourcesByYear } } = useSelector((state) => state.agencyV2);
    const budgetaryResourcesRequest = useRef(null);

    useEffect(() => () => {
        if (budgetaryResourcesRequest.current) {
            budgetaryResourcesRequest.current.cancel();
        }
    }, []);

    useEffect(() => {
        if (agencyId) {
            setIsLoading(true);
            setIsError(false);
            budgetaryResourcesRequest.current = fetchBudgetaryResources(agencyId);
            budgetaryResourcesRequest.current.promise
                .then(({ data }) => {
                    budgetaryResourcesRequest.current = null;
                    const d = Object.create(BaseAgencyBudgetaryResources);
                    d.populate(data, fy);
                    dispatch(setBudgetaryResources(d));
                    setIsLoading(false);
                })
                .catch((e) => {
                    console.error('Error fetching budgetary resources', e);
                    budgetaryResourcesRequest.current = null;
                    setIsLoading(false);
                    setIsError(true);
                    throw e;
                });
        }
    }, [agencyId]);

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
                subtitle={isMobile ? 'How much can this agency spend?' : (<>How much can<br />this agency spend?</>)}
                data={totalBudgetaryResources}
                secondaryData={`${percentOfFederalBudget} of the FY ${fy} U.S. federal budget`}
                label="Total Budgetary Resources Over Time">
                {isLoading && <LoadingMessage />}
                {!isLoading && isError && <ErrorMessage description="There was an error fetching this data." />}
                {!isLoading && !isError && <BarChart
                    selectedFy={fy}
                    agencyBudgetByYear={Object
                        .entries(resourcesByYear)
                        .map(([key, value]) => ({ year: key, budget: value.agencyBudget }))} />
                }
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent in total?' : (<>How much has this agency<br />spent in total?</>)}
                data={totalObligations}
                secondaryData={`${percentOfBudgetaryResources} of total budgetary resources`}
                label="Total Obligations Over Time" >
                <TotalObligationsOverTimeContainer />
                {/* <ComingSoon className="viz-placeholder" /> */}
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent on awards?' : (<>How much has this agency<br />spent on awards?</>)}
                data={awardObligations}
                secondaryData={`${percentOfTotalObligations} of total obligations`}
                label="Award Obligations by Type" >
                <ComingSoon className="viz-placeholder" />
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
    const content = isMobile ? (
        <Carousel items={components} />
    ) : (
        <div className="fy-summary__row">
            {components.map((viz, i) => (
                <div key={`FY-Summary-${i}`} className="fy-summary__col">
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
