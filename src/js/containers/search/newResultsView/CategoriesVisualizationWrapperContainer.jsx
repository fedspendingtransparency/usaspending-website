/**
 * CategoriesVisualizationWrapperContainer.jsx (previously RankVisualizationWrapperContainer.jsx)
 * Created by michaelbray on 4/3/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useHistory } from "react-router-dom";
import { max, get } from 'lodash';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import BaseSpendingByCategoryResult from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';

import { categoryNames } from 'dataMapping/search/spendingByCategory';
import SearchSectionWrapper from "../../../components/search/newResultsView/SearchSectionWrapper";
import SpendingByCategoriesChart
    from "../../../components/search/visualizations/rank/spendingByCategoriesChart/SpendingByCategoriesChart";
import CategoriesSectionWrapper from "../../../components/search/newResultsView/categories/CategoriesSectionWrapper";
import CategoriesTable from "../../../components/search/newResultsView/categories/CategoriesTable";
import * as MoneyFormatter from "../../../helpers/moneyFormatter";

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    agencyIds: oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.bool,
    wrapperProps: PropTypes.object,
    setSelectedDropdown: PropTypes.func
};

const CategoriesVisualizationWrapperContainer = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [spendingBy, setSpendingBy] = useState('awardingAgency');
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
    const history = useHistory();
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

    const changeScope = (newScope) => {
        setScope(newScope);
        setPage(1);
        setHasNextPage(false);
    };

    const parseRank = () => {
        if (history) {
            const params = history.location.search.split("&");
            params.shift();
            if (params.length === 2 && params[0].substring(0, 8) === "section=") {
                if (params[1].substring(0, 5) === "type=") {
                    const rankVal = params[1].substring(5);
                    if (rankVal === "naics" || rankVal === "psc") {
                        props.setSelectedDropdown(rankVal);
                    }
                }
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

            if (scope === 'recipient' && !props.subaward) {
                const recipientLink = result.recipientId ? `recipient/${result.recipientId}/latest` : '';
                tempLinkSeries.push(recipientLink);

                if (recipientLink !== "") {
                    tableDataRow.push(<a href={recipientLink}>{result.name}</a>);
                }
                else {
                    tableDataRow.push(result.name);
                }
            }
            else if (scope === 'awarding_agency' && !props.subaward) {
                const awardingLink = `agency/${result._agencySlug}`;
                tempLinkSeries.push(awardingLink);
                tableDataRow.push(<a href={awardingLink}>{result.name}</a>);
            }
            else if (scope === 'awarding_agency' && props.subaward && props.agencyIds) {
                // this properly pulls in the slug from withAgencySlugs, as it is not provided though the API request for subawards
                const agencyIdentifier = !props.error ? props.agencyIds[item.id] : '';
                const awardingLink = `agency/${agencyIdentifier}`;
                tempLinkSeries.push(awardingLink);
                tableDataRow.push(<a href={awardingLink}>{result.name}</a>);
            }
            else {
                tableDataRow.push(result.name);
            }

            tableDataRow.push(MoneyFormatter.formatMoneyWithPrecision(result._amount, 0));

            const description = `Spending by ${result.name}: ${result.amount}`;
            tempDescriptions.push(description);
            tableData.push(tableDataRow);
        });


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
        setTableRows(tableData);
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
        if (props.subaward && operation.dateType) {
            delete operation.dateType;
        }

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            category: scope,
            filters: searchParams,
            limit: 10,
            page,
            auditTrail,
            subawards: props.subaward
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
        setHasNextPage(false);
        fetchData();
    };

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
    }, [props.reduxFilters, scope, props.subaward]);

    return (
        <div
            className="results-visualization-rank-section"
            id="results-section-rank">
            <SearchSectionWrapper
                {...props.wrapperProps}
                isLoading={childProps?.loading}
                isError={childProps?.error}
                hasNoData={childProps?.labelSeries?.length === 0}
                table={<CategoriesTable
                    {...childProps}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    recipientError={recipientError}
                    columns={columns[scope]}
                    rows={tableRows} />}>
                <CategoriesSectionWrapper
                    {...childProps}
                    changeScope={changeScope}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    subaward={props.subaward}
                    isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}>
                    <SpendingByCategoriesChart
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        industryCodeError={props.subaward}
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        width="1000px" />
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
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(CategoriesVisualizationWrapperContainer);
