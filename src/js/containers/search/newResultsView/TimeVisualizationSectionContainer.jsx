/**
 * TimeVisualizationSectionContainer.jsx
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MonthHelper from 'helpers/monthHelper';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import SearchSectionWrapper from "../../../components/search/newResultsView/SearchSectionWrapper";
import BaseSpendingOverTimeRow from "../../../models/v2/search/visualizations/time/BaseSpendingOverTimeRow";
import * as MoneyFormatter from "../../../helpers/moneyFormatter";
import TimeFileDownload from "../../../components/search/newResultsView/time/TimeFileDownload";
import TimeVisualizationChart from "../../../components/search/visualizations/time/TimeVisualizationChart";

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    visualizationPeriod: PropTypes.string
};

const TimeVisualizationSectionContainer = (props) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState(props.visualizationPeriod);
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('aggregated_amount');
    const [parsedData, setParsedData] = useState({
        loading: true,
        error: false,
        groups: [],
        xSeries: [],
        ySeries: [],
        rawLabels: []
    });
    const [tableRows, setTableRows] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [downloadData, setDownloadDataRows] = useState([]);

    let apiRequest = null;

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

    const generateTimeLabel = (group, timePeriod) => {
        if (group === 'fiscal_year') {
            return timePeriod.fiscal_year;
        }
        else if (group === 'quarter') {
            return `Q${timePeriod.quarter} ${timePeriod.fiscal_year}`;
        }

        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        return `${month} ${year}`;
    };

    const generateTimeRaw = (group, timePeriod) => {
        if (group === 'fiscal_year') {
            return {
                period: null,
                year: timePeriod.fiscal_year
            };
        }
        else if (group === 'quarter') {
            return {
                period: `Q${timePeriod.quarter}`,
                year: `${timePeriod.fiscal_year}`
            };
        }

        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        return {
            period: `${month}`,
            year: `${year}`
        };
    };
    const parseData = (data, group) => {
        const tempGroups = [];
        const tempXSeries = [];
        const tempYSeries = [];
        const tempRawLabels = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            tempGroups.push(generateTimeLabel(group, item.time_period));
            tempRawLabels.push(generateTimeRaw(group, item.time_period));
            tempXSeries.push([generateTimeLabel(group, item.time_period)]);
            tempYSeries.push([parseFloat(item.aggregated_amount)]);
        });

        setParsedData({
            groups: tempGroups,
            xSeries: tempXSeries,
            ySeries: tempYSeries,
            rawLabels: tempRawLabels,
            loading: false,
            error: false
        });
    };

    const createTableRows = (rows) => {
        const rowsArray = [];
        const selectedTimeFrame = props.wrapperProps.selectedDropdownOption;
        rows.forEach((row) => {
            const rowArray = [];
            Object.keys(row).forEach((key) => {
                if (row[key] !== false && !key.includes("raw")) {
                    if (key === "month") {
                        rowArray.push(`${MonthHelper.convertNumToShortMonth(row[key])} ${MonthHelper.convertMonthToFY(row[key], row.fiscal_year)}`);
                    }
                    else if (key === "quarter") {
                        rowArray.push(`Q${row[key]} ${row.fiscal_year}`);
                    }
                    else if (key.includes("amount")) {
                        rowArray.push(MoneyFormatter.formatMoneyWithPrecision(row[key], 0));
                    }
                    else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") {
                        rowArray.push(row[key]);
                    }
                }
            });
            rowsArray.push(rowArray);
        });

        setTableRows(rowsArray);

        const downloadDataRows = [];

        rows.forEach((row) => {
            const downloadDataRow = [];
            Object.keys(row).forEach((key) => {
                if (row[key] !== false && !key.includes("raw")) {
                    if (key === "month") {
                        downloadDataRow.push(`${MonthHelper.convertNumToShortMonth(row[key])} ${MonthHelper.convertMonthToFY(row[key], row.fiscal_year)}`);
                    }
                    else if (key === "quarter") {
                        downloadDataRow.push(`Q${row[key]} ${row.fiscal_year}`);
                    }
                    else if (key.includes("amount")) {
                        downloadDataRow.push(row[key]);
                    }
                    else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") {
                        downloadDataRow.push(row[key]);
                    }
                }
            });
            downloadDataRows.push(downloadDataRow);
        });

        setDownloadDataRows(downloadDataRows);
    };

    const sortBy = (field, direction) => {
        const updatedTable = [...tableData];
        if (direction === 'asc') {
            updatedTable.sort((a, b) => a[field] - b[field]);
        }

        if (direction === 'desc') {
            updatedTable.sort((a, b) => b[field] - a[field]);
        }

        setSortDirection(direction);
        setActiveField(field);
        createTableRows(updatedTable);
    };

    const fetchAwards = (auditTrail = null) => {
        const operation = new SearchAwardsOperation();
        operation.fromState(props.reduxFilters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request
        if (props.subaward && operation.dateType) {
            delete operation.dateType;
        }

        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            group: visualizationPeriod,
            filters: searchParams,
            subawards: props.subaward
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        apiRequest = SearchHelper.performSpendingOverTimeSearch(apiParams);

        apiRequest.promise
            .then((res) => {
                const data = res.data;
                parseData(data, visualizationPeriod);
                const tempTableData = [];
                data.results.map((d) => {
                    const row = Object.create(BaseSpendingOverTimeRow);
                    row.populate(d);
                    tempTableData.push(row);
                    return row;
                });
                setTableData(tempTableData);
                apiRequest = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                props.setAppliedFilterCompletion(true);
                apiRequest = null;
                console.log(err);
                setParsedData({ ...parseData, loading: false, error: true });
            });
    };

    const fetchData = () => {
        props.setAppliedFilterCompletion(false);
        setParsedData({ ...parseData, loading: true, error: false });
        // Cancel API request if it exists
        if (apiRequest) {
            apiRequest.cancel();
        }

        // Fetch data from the Awards v2 endpoint
        fetchAwards('Spending Over Time Visualization');
    };

    useEffect(() => {
        sortBy("aggregated_amount", "desc");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData]);

    useEffect(() => {
        if (!props.noApplied) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reduxFilters, props.subaward, visualizationPeriod]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visualizationPeriod]);

    useEffect(() => {
        if (parsedData.loading !== true && parsedData.error !== true) {
            props.setAppliedFilterCompletion(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedData]);


    useEffect(() => {
        if (props.visualizationPeriod !== visualizationPeriod) {
            setVisualizationPeriod(props.visualizationPeriod);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visualizationPeriod]);

    return (
        <SearchSectionWrapper
            {...props.wrapperProps}
            data={parsedData}
            sortBy={sortBy}
            sortDirection={sortDirection}
            activeField={activeField}
            columns={columns[visualizationPeriod]}
            rows={tableRows}
            isLoading={parsedData?.loading}
            isError={parsedData?.error}
            hasNoData={parsedData?.ySeries?.flat()?.reduce((partialSum, a) => partialSum + a, 0) === 0}
            downloadComponent={<TimeFileDownload downloadData={downloadData} visualizationPeriod={visualizationPeriod} />}
            manualSort>
            <TimeVisualizationChart
                {...parsedData}
                visualizationPeriod={visualizationPeriod}
                subaward={props.subaward} />
        </SearchSectionWrapper>
    );
};

TimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(TimeVisualizationSectionContainer);
