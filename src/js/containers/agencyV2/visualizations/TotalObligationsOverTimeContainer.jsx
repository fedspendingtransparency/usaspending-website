/**
 * TotalObligationsOverTimeContainer.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import {
    LoadingMessage,
    ErrorMessage,
    NoResultsMessage
} from 'data-transparency-ui';

import TotalObligationsOverTimeVisualization from 'components/agencyV2/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization';
import { addSubmissionEndDatesToBudgetaryResources } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { useQueryParams } from 'helpers/queryParams';

const propTypes = {
    agencyBudget: PropTypes.number,
    obligationsByPeriod: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool
};

const mockExceedingAmounts = (data, agencyBudget) => data.map((d, i) => {
    const newData = d;
    if (i === 1) {
        newData.obligated -= agencyBudget;
    }
    if (i === 3) {
        newData.obligated += agencyBudget;
    }
    // if (i + 1 === data.length) {
    //     newData.obligated += agencyBudget;
    // }
    return newData;
});

const TotalObligationsOverTimeContainer = ({
    agencyBudget,
    obligationsByPeriod,
    isLoading,
    isError
}) => {
    const { fy } = useQueryParams(['fy']);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const containerReference = useRef(null);
    const submissionPeriods = useSelector((state) => state.account.submissionPeriods);
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);

    useEffect(() => {
        setLoading(true);
        const javaScriptSubmissionPeriods = submissionPeriods.toJS();
        if (javaScriptSubmissionPeriods.length && obligationsByPeriod.length && !isLoading && !isError) {
            // setData(addSubmissionEndDatesToBudgetaryResources(obligationsByPeriod, javaScriptSubmissionPeriods, fy).sort((a, b) => a.period - b.period));
            setData(mockExceedingAmounts(addSubmissionEndDatesToBudgetaryResources(obligationsByPeriod, javaScriptSubmissionPeriods, fy).sort((a, b) => a.period - b.period), agencyBudget));
            setLoading(false);
        }
    }, [submissionPeriods, obligationsByPeriod, isLoading, isError, fy]);

    useEffect(() => {
        if (isError) setLoading(false);
    }, [isError]);

    const handleWindowResize = throttle(() => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
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
            {isError && <ErrorMessage />}
            {loading && <LoadingMessage />}
            {!isError && !loading && !data.length && <NoResultsMessage />}
            {
                !isError && !loading && data.length > 0 &&
                <TotalObligationsOverTimeVisualization
                    width={visualizationWidth}
                    agencyBudget={agencyBudget}
                    data={data}
                    fy={fy} />
            }
        </div>
    );
};
TotalObligationsOverTimeContainer.propTypes = propTypes;
export default TotalObligationsOverTimeContainer;
