/**
 * TotalObligationsOverTimeContainer.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { throttle } from 'lodash';
import {
    LoadingMessage,
    ErrorMessage,
    NoResultsMessage
} from 'data-transparency-ui';

import TotalObligationsOverTimeVisualization from 'components/agencyV2/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization';
import { addSubmissionEndDatesToBudgetaryResources } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { useQueryParams } from 'helpers/queryParams';
import { mockAgencyObligationByPeriod } from 'dataMapping/agencyV2/visualizations/totalObligationsOverTime';

const propTypes = {
    agencyObligationsByPeriod: PropTypes.array,
    error: PropTypes.shape({
        error: PropTypes.bool,
        message: PropTypes.string
    })
};

const TotalObligationsOverTimeContainer = ({
    agencyObligationsByPeriod = mockAgencyObligationByPeriod,
    error = { error: false, message: '' }
}) => {
    const { agencyId } = useParams();
    const { fy } = useQueryParams(['fy']);
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
        setLoading(true);
        if (submissionPeriods.length && !budgetaryResourcesHaveSubmissionDates) {
            setData(addSubmissionEndDatesToBudgetaryResources(agencyObligationsByPeriod, submissionPeriods, fy));
            setBudgetaryResourcesHaveSubmissionDates(true);
            setLoading(false);
        }
        else {
            setData(agencyObligationsByPeriod);
        }
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
