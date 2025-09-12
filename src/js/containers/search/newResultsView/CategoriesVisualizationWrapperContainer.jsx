/**
 * CategoriesVisualizationWrapperContainer.jsx (previously RankVisualizationWrapperContainer.jsx)
 * Created by michaelbray on 4/3/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useSearchParams } from "react-router";
import { max, get } from 'lodash-es';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import Analytics from 'helpers/analytics/Analytics';
import * as SearchHelper from 'helpers/searchHelper';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import BaseSpendingByCategoryResult from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';

import { categoryNames } from 'dataMapping/search/spendingByCategory';
import SearchSectionWrapper from "../../../components/search/newResultsView/SearchSectionWrapper";
import SpendingByCategoriesChart
    from "../../../components/search/newResultsView/categories/SpendingByCategoriesChart";
import CategoriesSectionWrapper from "../../../components/search/newResultsView/categories/CategoriesSectionWrapper";
import * as MoneyFormatter from "../../../helpers/moneyFormatter";

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    agencyIds: oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.bool,
    wrapperProps: PropTypes.object,
    setSelectedDropdown: PropTypes.func,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const CategoriesVisualizationWrapperContainer = (props) => {
    const [sortDirection, setSortDirection] = useState('desc');
    const [activeField, setActiveField] = useState('obligations');
    // eslint-disable-next-line no-unused-vars
    const [spendingBy, setSpendingBy] = useState('awardingAgency');
    const [labeledtableData, setlabeledTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipientError, setRecipientError] = useState(false);
    const [labelSeries, setLabelSeries] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [linkSeries, setLinkSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [scope, setScope] = useState(props.selectedDropdown);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    const [searchParams] = useSearchParams();
    let apiRequest;

    const childProps = {
        spendingBy,
        loading,
        error,
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        page,
        scope,
        next,
        previous,
        hasNextPage,
        hasPreviousPage,
        recipientError
    };

    const columns = {
        recipient: [
            {
                title: 'name',
                displayName: ["Recipient Name"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ],
        awarding_agency: [
            {
                title: 'awarding_agency',
                displayName: ["Awarding Agency"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ],
        awarding_subagency: [
            {
                title: 'awarding_subagency',
                displayName: ["Awarding Subagency"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ],
        cfda: [
            {
                title: 'cfda',
                displayName: ["Assistance Listing"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ],
        naics: [
            {
                title: 'naics',
                displayName: ["North American Industry Classification System (NAICS)"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ],
        psc: [
            {
                title: 'psc',
                displayName: ["Product and Service Code (PSC)"],
                right: false
            },
            {
                title: 'obligations',
                displayName: ["Obligations"],
                right: true
            }
        ]
    };
    const createTableRows = (rows) => {
        const rowsArray = [];
        rows.forEach((row) => {
            const rowArray = [];
            Object.keys(row).forEach((key) => {
                if (key === 'obligations') {
                    rowArray.push(MoneyFormatter.formatMoneyWithPrecision(row[key], 0));
                }
                else if (row[key].value === undefined) {
                    rowArray.push(row[key]);
                }
                else {
                    rowArray.push(row[key]?.value);
                }
            });
            rowsArray.push(rowArray);
        });
        setTableRows(rowsArray);
    };
    const sortBy = (field, direction) => {
        const updatedTable = [...labeledtableData];
        if (direction === 'asc') {
            updatedTable.sort((a, b) => {
                if (field === 'obligations') {
                    return a[field] - b[field];
                }
                return a.name.title.localeCompare(b.name.title);
            });
        }

        if (direction === 'desc') {
            updatedTable.sort((a, b) => {
                if (field === 'obligations') {
                    return b[field] - a[field];
                }
                return b.name.title.localeCompare(a.name.title);
            });
        }
        setSortDirection(direction);
        setActiveField(field);
        createTableRows(updatedTable);
    };

    const parseRank = () => {
        const section = searchParams.get('section');
        const type = searchParams.get('type');
        if (section && type) {
            const rankVal = type;
            if (rankVal === "naics" || rankVal === "psc") {
                props.setSelectedDropdown(rankVal);
            }
        }
    };

    const nextPage = () => {
        if (hasNextPage) {
            setPage((prevState) => prevState + 1);
        }
    };

    const previousPage = () => {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, page - 1]);
        setPage(prevPage);
    };

    const onClickHandler = (linkName) => {
        Analytics.event({
            category: `Section ${props.wrapperProps.sectionName}: ${props.wrapperProps.selectedDropdownOption}`,
            action: `Clicked ${linkName}`
        });
    };

    const parseData = (data) => {
        const tempLabelSeries = [];
        const tempDataSeries = [];
        const tempDescriptions = [];
        const tempLinkSeries = [];
        const tableData = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            const tableDataRow = [];
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(item);

            if (scope === 'awarding_agency' || scope === 'awarding_subagency') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };
            }

            if (scope === 'recipient') {
                result.nameTemplate = (code, name) => name;
            }

            tempLabelSeries.push(result.name);
            tempDataSeries.push(result._amount);

            if (scope === 'recipient' && props.spendingLevel !== 'subawards') {
                const recipientLink = result.recipientId ?
                    `recipient/${result.recipientId}/latest`
                    :
                    '';

                tempLinkSeries.push(recipientLink);

                if (recipientLink !== "") {
                    tableDataRow.name = {
                        value: (
                            <a
                                href={recipientLink}
                                onClick={() => {
                                    onClickHandler(result.name);
                                }}>
                                {result.name}
                            </a>
                        ),
                        title: result.name
                    };
                }
                else {
                    tableDataRow.name = (result.name);
                }
            }
            else if (scope === 'awarding_agency' && props.spendingLevel !== 'subawards') {
                const awardingLink = `agency/${result._agencySlug}`;
                tempLinkSeries.push(awardingLink);
                tableDataRow.name = {
                    value: (
                        <a
                            href={awardingLink}
                            onClick={() => {
                                onClickHandler(result.name);
                            }} >
                            {result.name}
                        </a>),
                    title: result.name
                };
            }
            else if (
                scope === 'awarding_agency' &&
                props.spendingLevel === 'subawards' &&
                props.agencyIds
            ) {
                // this properly pulls in the slug from withAgencySlugs,
                // as it is not provided though the API request for subawards
                const agencyIdentifier = !props.error ? props.agencyIds[item.id] : '';
                const awardingLink = `agency/${agencyIdentifier}`;

                tempLinkSeries.push(awardingLink);

                tableDataRow.name = {
                    value: (
                        <a
                            href={awardingLink}
                            onClick={() => {
                                onClickHandler(result.name);
                            }} >
                            {result.name}
                        </a>),
                    title: result.name
                };
            }
            else {
                tableDataRow.name = {
                    value: result.name,
                    title: result.name
                };
            }

            tableDataRow.obligations = result._amount;
            const description = `Spending by ${result.name}: ${result.amount}`;
            tempDescriptions.push(description);
            tableData.push(tableDataRow);
        });

        setlabeledTableData(tableData);
        // set the state with the new values
        setLabelSeries(tempLabelSeries);
        setDataSeries(tempDataSeries);
        setDescriptions(tempDescriptions);
        setLinkSeries(tempLinkSeries);
        setNext(data.page_metadata.next);
        setPrevious(data.page_metadata.previous);
        setHasNextPage(data.page_metadata.hasNext);
        setHasPreviousPage(data.page_metadata.hasPrevious);
        setLoading(false);
        setError(false);
    };

    const fetchData = () => {
        props.setAppliedFilterCompletion(false);
        setLoading(true);
        setError(false);
        setRecipientError(false);

        if (apiRequest) {
            apiRequest.cancel();
        }

        const auditTrail = `${categoryNames[spendingBy]} Rank Visualization`;

        // Create Search Operation
        const operation = new SearchAwardsOperation();
        operation.fromState(props.reduxFilters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request
        if (props.spendingLevel === 'subawards' && operation.dateType) {
            delete operation.dateType;
        }

        const apiSearchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            category: scope,
            filters: apiSearchParams,
            limit: 10,
            page,
            auditTrail,
            spending_level: props.spendingLevel

        };

        apiRequest = SearchHelper.performSpendingByCategorySearch(apiParams);
        apiRequest.promise
            .then((res) => {
                parseData(res.data);
                apiRequest = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                const responseDetail = get(err, 'response.data.detail', '');
                props.setAppliedFilterCompletion(true);
                apiRequest = null;
                console.log(err);
                setLoading(false);
                setError(true);
                setRecipientError(responseDetail === 'Current filters return too many unique items. Narrow filters to return results.');
            });
    };

    const newSearch = () => {
        setPage(1);
        setHasNextPage(true);
        fetchData();
    };

    useEffect(() => {
        sortBy("obligations", "desc");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labeledtableData, scope]);

    useEffect(() => {
        // fetch data when scope or page changes
        fetchData();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [page]);

    useEffect(() => {
        props.setAppliedFilterCompletion(true);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [labelSeries, dataSeries, descriptions, linkSeries, loading, error, next, previous, hasNextPage, hasPreviousPage]);

    useEffect(() => {
        parseRank();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        newSearch();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [scope]);

    useEffect(() => {
        setScope(props.selectedDropdown);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.selectedDropdown]);

    useEffect(() => {
        if (!props.noApplied) {
            newSearch();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.reduxFilters, scope, props.spendingLevel]);

    return (
        <div
            className="results-visualization-rank-section"
            id="results-section-rank">
            <SearchSectionWrapper
                {...props.wrapperProps}
                {...childProps}
                page={page}
                setPage={setPage}
                columns={columns[scope]}
                sortBy={sortBy}
                setSortDirection={setSortDirection}
                rows={tableRows}
                sortDirection={sortDirection}
                activeField={activeField}
                setActiveField={setActiveField}
                isLoading={childProps?.loading}
                isError={childProps?.error}
                hasNoData={childProps?.labelSeries?.length === 0}
                hash={props.hash}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                nextPage={nextPage}
                previousPage={previousPage}>
                <CategoriesSectionWrapper
                    {...childProps}
                    nextPage={nextPage}
                    previousPage={previousPage}>
                    <SpendingByCategoriesChart
                        {...childProps}
                        hash={props.hash} />
                </CategoriesSectionWrapper>
            </SearchSectionWrapper>
        </div>
    );
};

CategoriesVisualizationWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        spendingLevel: state.searchView.spendingLevel
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(CategoriesVisualizationWrapperContainer);
