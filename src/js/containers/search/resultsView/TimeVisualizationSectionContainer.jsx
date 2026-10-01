/**
 * TimeVisualizationSectionContainer.jsx
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import SearchSectionWrapper from "../../../components/search/resultsView/SearchSectionWrapper/SearchSectionWrapper";
import TimeFileDownload from "../../../components/search/resultsView/time/TimeFileDownload";
import TimeVisualizationChart from "../../../components/search/resultsView/time/TimeVisualizationChart";
import usePerformSpendingOverTimeSearch from "./usePerformSpendingOverTimeSearch";

const columns = {
    month: [
        {
            title: 'month_year',
            displayName: ["Month"],
            right: false
        },
        {
            title: "aggregated_amount",
            displayName: ["Obligations"],
            right: true
        }
    ],
    quarter: [
        {
            title: 'quarter_year',
            displayName: ["Fiscal Quarter"],
            right: false
        },
        {
            title: "aggregated_amount",
            displayName: ["Obligations"],
            right: true
        }
    ],
    fiscal_year: [
        {
            title: "fiscal_year",
            displayName: ["Fiscal Year"],
            right: false
        },
        {
            title: "aggregated_amount",
            displayName: ["Obligations"],
            right: true
        }
    ]
};

const propTypes = {
    visualizationPeriod: PropTypes.string,
    hash: PropTypes.string,
    wrapperProps: PropTypes.object
};

const TimeVisualizationSectionContainer = ({
    wrapperProps,
    visualizationPeriod,
    hash
}) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('aggregated_amount');

    const sortBy = useCallback((field, direction) => {
        setActiveField(field);
        setSortDirection(direction);
    }, []);

    const {
        isLoading,
        isError,
        tableRows,
        downloadData,
        parsedData
    } = usePerformSpendingOverTimeSearch(
        visualizationPeriod,
        activeField,
        sortDirection,
        wrapperProps.selectedDropdownOption
    );

    return (
        <SearchSectionWrapper
            {...wrapperProps}
            data={parsedData}
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            activeField={activeField}
            rows={tableRows}
            columns={columns[visualizationPeriod]}
            isLoading={isLoading}
            isError={isError}
            hasNoData={parsedData
                ?.ySeries
                ?.flat()
                ?.reduce((partialSum, a) => partialSum + a, 0) === 0}
            downloadComponent={
                <TimeFileDownload
                    downloadData={downloadData}
                    visualizationPeriod={visualizationPeriod} />
            }
            manualSort
            hash={hash}
            setActiveField={setActiveField}>
            <TimeVisualizationChart
                {...parsedData}
                visualizationPeriod={visualizationPeriod} />
        </SearchSectionWrapper>
    );
};

TimeVisualizationSectionContainer.propTypes = propTypes;
export default TimeVisualizationSectionContainer;
