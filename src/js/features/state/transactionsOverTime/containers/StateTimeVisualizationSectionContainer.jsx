/**
 * StateTimeVisualizationSectionContainer.jsx
 * Created by David Trinh 5/15/18
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StateTimeVisualizationSection from '../StateTimeVisualizationSection';
import useFetchSpendingOverTime from "./useFetchSpendingOverTime";

const StateTimeVisualizationSectionContainer = () => {
    const { code } = useSelector((state) => state.stateProfile.overview);
    const [visualizationPeriod, setVisualizationPeriod] = useState('fiscal_year');
    const [groups, setGroups] = useState([]);
    const [xSeries, setXSeries] = useState([]);
    const [ySeries, setYSeries] = useState([]);
    const [combined, setCombined] = useState([]);
    const [combinedOutlay, setCombinedOutlay] = useState();
    const [ySeriesOutlay, setYSeriesOutlay] = useState([]);

    const {
        parsedData, isSuccess, isLoading, error
    } = useFetchSpendingOverTime(visualizationPeriod, code);

    const updateVisualizationPeriod = (newVizPeriod) => {
        setVisualizationPeriod(newVizPeriod);
    };

    useEffect(() => {
        if (isSuccess && parsedData && Object.keys(parsedData).length > 0) {
            setGroups(parsedData.groupsLocal);
            setXSeries(parsedData.xSeriesLocal);
            setYSeries(parsedData.ySeriesLocal);
            setCombined(parsedData.combinedLocal);
            setCombinedOutlay(parsedData.combinedOutlayLocal);
            setYSeries(parsedData.ySeriesLocal);
            setYSeriesOutlay(parsedData.ySeriesOutlayLocal);
        }
    }, [isSuccess, parsedData]);

    return (
        <StateTimeVisualizationSection
            data={{
                loading: isLoading,
                error,
                groups,
                xSeries,
                ySeries,
                combined,
                combinedOutlay,
                ySeriesOutlay
            }}
            loading={isLoading}
            updateVisualizationPeriod={updateVisualizationPeriod}
            visualizationPeriod={visualizationPeriod} />
    );
};

export default StateTimeVisualizationSectionContainer;
