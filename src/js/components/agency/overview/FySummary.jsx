/**
 * FySummary.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Carousel, FlexGridRow, FlexGridCol } from 'data-transparency-ui';

import { fetchBudgetaryResources } from 'apis/agency';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import { setBudgetaryResources, setDataThroughDates } from 'redux/actions/agency/agencyActions';
import { calculatePercentage, formatMoneyWithUnits } from 'helpers/moneyFormatter';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import TotalObligationsOverTimeContainer from 'containers/agency/visualizations/TotalObligationsOverTimeContainer';
import ObligationsByAwardTypeContainer from 'containers/agency/visualizations/ObligationsByAwardTypeContainer';

import VisualizationSection from './VisualizationSection';
import BarChart from './BarChart';

const propTypes = {
    fy: PropTypes.string,
    dataThroughDate: PropTypes.string,
    windowWidth: PropTypes.number,
    isMobile: PropTypes.bool
};

const FySummary = ({
    fy,
    dataThroughDate,
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
    } = useSelector((state) => state.agency);
    const { toptierCode } = overview;
    const budgetaryResourcesRequest = useRef(null);

    useEffect(() => () => {
        if (budgetaryResourcesRequest.current) {
            budgetaryResourcesRequest.current.cancel();
        }
    }, []);

    // eslint-disable-next-line eqeqeq, camelcase
    let overviewDataThroughDate = useLatestAccountData()[1].toArray().filter((i) => i.submission_fiscal_year == fy)[0]?.period_end_date;
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

                    if (dataByYear[fy].agencyBudget === "--") {
                        overviewDataThroughDate = 'no data';
                    }
                    dispatch(setDataThroughDates({
                        overviewDataThroughDate
                    }));

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
    const totalObligations = budgetaryResources[fy]?.agencyObligated;
    const percentOfBudgetaryResources = budgetaryResources[fy]?.percentOfAgencyBudget || '--';
    const awardObligations = formatMoneyWithUnits(_awardObligations);
    const percentOfTotalObligations = calculatePercentage(_awardObligations, budgetaryResources[fy]?._agencyObligated);

    let dataThroughNote;
    if (dataThroughDate) {
        if (dataThroughDate === 'no data') {
            dataThroughNote = 'No data available for the selected fiscal year';
        }
        else {
            dataThroughNote = `Data through ${moment(dataThroughDate).format('M/D/YYYY')}`;
        }
    }

    const sections = [
        (
            <VisualizationSection
                subtitle={isMobile ? 'How much funding is available to this agency?' : (<>How much funding is available to this agency?</>)}
                data={(<>{totalBudgetaryResources}<br />in budgetary resources</>)}
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
                subtitle={isMobile ? 'How much has this agency planned to spend?' : (<>How much has this agency planned to spend?</>)}
                data={(<>{totalObligations}<br />in total obligations</>)}
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
                subtitle={isMobile ? 'How much has this agency planned to spend on awards?' : (<>How much has this agency<br />planned to spend on awards?</>)}
                data={(<>{awardObligations}<br /> in award obligations</>)}
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
            {dataThroughNote ? <div className="section__date-note">{dataThroughNote}</div> : null}
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
