/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Carousel, FlexGridRow, FlexGridCol } from 'data-transparency-ui';

import { fetchBudgetaryResources } from 'apis/agencyV2';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import { setBudgetaryResources } from 'redux/actions/agencyV2/agencyV2Actions';
import { calculatePercentage, formatMoneyWithUnits } from 'helpers/moneyFormatter';
import TotalObligationsOverTimeContainer from 'containers/agencyV2/visualizations/TotalObligationsOverTimeContainer';
import ObligationsByAwardTypeContainer from 'containers/agencyV2/visualizations/ObligationsByAwardTypeContainer';

import VisualizationSection from './VisualizationSection';
import BarChart from './BarChart';

const propTypes = {
    fy: PropTypes.string,
    windowWidth: PropTypes.number,
    isMobile: PropTypes.bool
};

const FySummary = ({
    fy,
    windowWidth,
    isMobile
}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const {
        budgetaryResources,
        _awardObligations,
        overview
    } = useSelector((state) => state.agencyV2);
    const { toptierCode } = overview;
    const budgetaryResourcesRequest = useRef(null);

    useEffect(() => () => {
        if (budgetaryResourcesRequest.current) {
            budgetaryResourcesRequest.current.cancel();
        }
    }, []);

    useEffect(() => {
        if (toptierCode) {
            setIsLoading(true);
            setIsError(false);
            budgetaryResourcesRequest.current = fetchBudgetaryResources(toptierCode);
            budgetaryResourcesRequest.current.promise
                .then(({ data }) => {
                    budgetaryResourcesRequest.current = null;
                    const dataByYear = {};
                    data.agency_data_by_year.forEach((year) => {
                        // Use our data model to parse the data for each FY
                        const fyBudgetaryResources = Object.create(BaseAgencyBudgetaryResources);
                        fyBudgetaryResources.populate(year);
                        // Store the parsed data with the fiscal year as the key
                        dataByYear[year.fiscal_year] = fyBudgetaryResources;
                    });
                    dispatch(setBudgetaryResources(dataByYear));
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
    }, [toptierCode]);

    const totalBudgetaryResources = budgetaryResources[fy]?.agencyBudget || '--';
    const percentOfFederalBudget = budgetaryResources[fy]?.percentOfFederalBudget || '--';
    const totalObligations = budgetaryResources[fy]?.agencyObligated || '--';
    const percentOfBudgetaryResources = budgetaryResources[fy]?.percentOfAgencyBudget || '--';
    const awardObligations = formatMoneyWithUnits(_awardObligations);
    const percentOfTotalObligations = calculatePercentage(_awardObligations, budgetaryResources[fy]?._agencyObligated);

    const sections = [
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much can this agency spend?' : (<>How much can<br />this agency spend?</>)}
                data={totalBudgetaryResources}
                secondaryData={`${percentOfFederalBudget} of the FY ${fy} U.S. federal budget`}
                label="Total Budgetary Resources Over Time">
                <BarChart
                    isLoading={isLoading}
                    isError={isError}
                    selectedFy={fy}
                    agencyBudgetByYear={Object
                        .entries(budgetaryResources)
                        .map(([key, value]) => ({ year: key, budget: value._agencyBudget }))} />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent in total?' : (<>How much has this agency<br />spent in total?</>)}
                data={totalObligations}
                secondaryData={`${percentOfBudgetaryResources} of total budgetary resources`}
                label="Total Obligations Over Time" >
                <TotalObligationsOverTimeContainer
                    isLoading={isLoading}
                    isError={isError}
                    agencyBudget={budgetaryResources[fy]?._agencyBudget}
                    obligationsByPeriod={budgetaryResources[fy]?.obligationsByPeriod || []} />
            </VisualizationSection>
        ),
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much has this agency spent on awards?' : (<>How much has this agency<br />spent on awards?</>)}
                data={awardObligations}
                secondaryData={`${percentOfTotalObligations} of total obligations`}
                label="Award Obligations by Type" >
                <ObligationsByAwardTypeContainer fiscalYear={+fy} windowWidth={windowWidth} isMobile={isMobile} />
            </VisualizationSection>
        )
    ];

    return (
        <div className="fy-summary">
            <h4 className="fy-summary__heading">FY {fy} Summary</h4>
            <hr />
            {isMobile ? <Carousel items={sections} />
                : (
                    <FlexGridRow hasGutter className="fy-summary__row">
                        {sections.map((viz, i) => (
                            <FlexGridCol tablet={6} className="fy-summary__col" key={`FY-Summary-${i}`}>
                                {viz}
                            </FlexGridCol>
                        ))}
                    </FlexGridRow>
                )}
        </div>
    );
};

FySummary.propTypes = propTypes;
export default FySummary;
