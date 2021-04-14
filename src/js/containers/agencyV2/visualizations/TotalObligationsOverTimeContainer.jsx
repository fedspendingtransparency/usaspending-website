/**
 * TotalObligationsOverTimeContainer.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { isCancel } from 'axios';
import { throttle } from 'lodash';
import {
    LoadingMessage,
    ErrorMessage,
    NoResultsMessage
} from 'data-transparency-ui';

import TotalObligationsOverTimeVisualization from 'components/agencyV2/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization';
import { addSubmissionEndDatesToBudgetaryResources } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { useQueryParams } from 'helpers/queryParams';
import { fetchBudgetaryResources } from 'apis/agencyV2APIs';

const propTypes = {};

const agency_obligation_by_period = [
    {
        period: 1,
        obligated: 46698411999.28
    },
    {
        period: 2,
        obligated: 85901744451.98
    },
    {
        period: 3,
        obligated: 100689245470.66
    },
    {
        period: 4,
        obligated: 110898908395.86
    },
    {
        period: 5,
        obligated: 120898908395.86
    },
    {
        period: 6,
        obligated: 10689245470.86
    },
    {
        period: 7,
        obligated: 140898908395.86
    },
    {
        period: 8,
        obligated: 190689245470.86
    },
    {
        period: 9,
        obligated: 160898908395.86
    },
    {
        period: 10,
        obligated: 170898908395.86
    },
    {
        period: 11,
        obligated: 180898908395.86
    },
    {
        period: 12,
        obligated: 185898908395.86
    }
];

const TotalObligationsOverTimeContainer = ({ }) => {
    const { agencyId } = useParams();
    const { fy } = useQueryParams(['fy']);
    const [error, setError] = useState({ error: false, message: '' });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const containerReference = useRef(null);
    const submissionPeriods = useSelector((state) => state.account.submissionPeriods.toJS());
    // window width
    const [windowWidth, setWindowWidth] = useState(0);
    // visualization width
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [budgetaryResourcesHaveSubmissionDates, setBudgetaryResourcesHaveSubmissionDates] = useState(false);

    useEffect(() => {
        setError({ error: false, message: '' });
        setLoading(true);
        const budgetaryResourcesRequest = fetchBudgetaryResources(agencyId, fy);
        budgetaryResourcesRequest.promise
            .then((res) => {
                const mockData = res.data.agency_data_by_year[0].agency_obligation_by_period = agency_obligation_by_period;
                // add correct submission period end date to budgetary resources by fy and period
                if (submissionPeriods.length && !budgetaryResourcesHaveSubmissionDates) {
                    setData(addSubmissionEndDatesToBudgetaryResources(mockData, submissionPeriods, fy));
                    setBudgetaryResourcesHaveSubmissionDates(true);
                    setLoading(false);
                }
                else {
                    setData(mockData);
                }
            }).catch((e) => {
                if (!isCancel(e)) {
                    setError({ error: true, message: e.message });
                    setLoading(false);
                    console.error(e);
                }
            });
    }, [agencyId, fy]);

    // we must wait for submission periods before we draw the chart
    useEffect(() => {
        if (submissionPeriods.length && !budgetaryResourcesHaveSubmissionDates && data.length) {
            setData(addSubmissionEndDatesToBudgetaryResources(data, submissionPeriods, fy));
            setBudgetaryResourcesHaveSubmissionDates(true);
            setLoading(false);
        }
    }, [submissionPeriods, data]);

    const handleWindowResize = throttle(() => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            // setWindowWidth(windowWidth);
            setWindowWidth(wWidth);
            setVisualizationWidth(containerReference.current.offsetWidth);
        }
    }, 50);

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div ref={containerReference} className="total-obligations-over-time-visualization-container">
            {error.error && <ErrorMessage />}
            {loading && <LoadingMessage />}
            {!error.error && !loading && !data.length && <NoResultsMessage />}
            {
                !error.error && !loading && data.length > 0 &&
                <TotalObligationsOverTimeVisualization
                    width={visualizationWidth}
                    data={data}
                    fy={fy} />
            }
        </div>
    );
};

TotalObligationsOverTimeContainer.propTypes = propTypes;
export default TotalObligationsOverTimeContainer;
