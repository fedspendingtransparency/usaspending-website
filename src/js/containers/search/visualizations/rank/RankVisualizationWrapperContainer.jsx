/**
 * CategoriesVisualizationWrapperContainer.jsx
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

import RankVisualizationTitle from 'components/search/visualizations/rank/RankVisualizationTitle';
import SpendingByAgencySection from 'components/search/visualizations/rank/sections/SpendingByAgencySection';
import SpendingByRecipientSection from 'components/search/visualizations/rank/sections/SpendingByRecipientSection';
import SpendingByCFDASection from 'components/search/visualizations/rank/sections/SpendingByCFDASection';
import SpendingByIndustryCodeSection from 'components/search/visualizations/rank/sections/SpendingByIndustryCodeSection';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import BaseSpendingByCategoryResult from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';

import { categoryNames, defaultScopes } from 'dataMapping/search/spendingByCategory';

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    agencyIds: oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.bool
};

const RankVisualizationWrapperContainer = (props) => {
    const [spendingBy, setSpendingBy] = useState('awardingAgency');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipientError, setRecipientError] = useState(false);
    const [labelSeries, setLabelSeries] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [linkSeries, setLinkSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [scope, setScope] = useState('awarding_agency');
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
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
        recipientError,
        showPicker
    };

    const setPickerState = (value) => {
        setShowPicker(value);
    };

    const togglePicker = () => {
        setShowPicker((prevState) => !prevState);
    };

    const changeScope = (newScope) => {
        setScope(newScope);
        setPage(1);
        setHasNextPage(false);
    };

    const changeSpendingBy = (tempSpendingBy) => {
        setSpendingBy(tempSpendingBy);
        setScope(defaultScopes[tempSpendingBy]);
    };

    const parseRank = () => {
        if (history) {
            const params = history.location.search.split("&");
            params.shift();
            if (params.length === 2 && params[0].substring(0, 4) === "tab=") {
                if (params[1].substring(0, 9) === "rankType=") {
                    const rankVal = params[1].substring(9);
                    changeSpendingBy("industryCode");
                    if (rankVal === "naics" || rankVal === "psc") {
                        changeScope(rankVal);
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

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
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
            }

            if (scope === 'awarding_agency' && !props.subaward) {
                const awardingLink = `agency/${result._agencySlug}`;
                tempLinkSeries.push(awardingLink);
            }
            else if (scope === 'awarding_agency' && props.subaward && props.agencyIds) {
                // this properly pulls in the slug from withAgencySlugs, as it is not provided though the API request for subawards
                const agencyIdentifier = !props.error ? props.agencyIds[item.id] : '';
                const awardingLink = `agency/${agencyIdentifier}`;
                tempLinkSeries.push(awardingLink);
            }

            const description = `Spending by ${result.name}: ${result.amount}`;
            tempDescriptions.push(description);
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

    const generateVisualization = () => {
        switch (spendingBy) {
            case 'awardingAgency':
                return (
                    <SpendingByAgencySection
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        togglePicker={togglePicker}
                        showPicker={showPicker} />
                );
            case 'recipient':
                return (
                    <SpendingByRecipientSection
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        recipientError={recipientError}
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        togglePicker={togglePicker} />
                );
            case 'cfda':
                return (
                    <SpendingByCFDASection
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        togglePicker={togglePicker} />
                );
            case 'industryCode':
                return (
                    <SpendingByIndustryCodeSection
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        industryCodeError={props.subaward}
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        togglePicker={togglePicker} />
                );
            default:
                return (
                    <SpendingByAgencySection
                        {...childProps}
                        changeScope={changeScope}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        agencyType="awarding"
                        subaward={props.subaward}
                        isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                        togglePicker={togglePicker} />
                );
        }
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
        if (!props.noApplied) {
            newSearch();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.reduxFilters, scope, props.subaward]);


    const visualization = generateVisualization();

    const fieldTypes = [
        'awardingAgency',
        'recipient',
        'cfda'
    ];
    if (!props.subaward) {
        fieldTypes.push('industryCode');
    }

    return (
        <div
            className="results-visualization-rank-section"
            id="results-section-rank">
            <RankVisualizationTitle
                fieldTypes={fieldTypes}
                changeSpendingBy={changeSpendingBy}
                currentSpendingBy={spendingBy}
                subaward={props.subaward}
                showPicker={showPicker}
                togglePicker={togglePicker}
                setPickerState={setPickerState} />
            { visualization }
        </div>
    );
};

RankVisualizationWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(RankVisualizationWrapperContainer);
