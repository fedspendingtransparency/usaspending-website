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
        if (javaScriptSubmissionPeriods.length && agencyObligationsByPeriod.length) {
            setData(addSubmissionEndDatesToBudgetaryResources(agencyObligationsByPeriod, javaScriptSubmissionPeriods, fy));
            setLoading(false);
        }
    }, [submissionPeriods, agencyObligationsByPeriod, fy]);

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
