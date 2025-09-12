/**
 * AccountRankVisualizationContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { max } from 'lodash-es';

import { categoryLabelFields } from 'dataMapping/accounts/accountFields';
import AccountRankVisualizationSection from
    'components/account/visualizations/rank/AccountRankVisualizationSection';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';
import * as AccountHelper from 'apis/account';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import AccountSearchOperation from 'models/v1/account/queries/AccountSearchOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    account: PropTypes.object
};

const AccountRankVisualizationContainer = ({ reduxFilters, account }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [labelSeries, setLabelSeries] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [categoryScope, setCategoryScope] = useState('programActivity');

    const apiRequest = useRef(null);

    const changeScope = (scope) => {
        setCategoryScope(scope);
        setPage(1);
        setHasNextPage(false);
    };

    const newSearch = () => {
        setPage(1);
        setHasNextPage(false);
    };

    const nextPage = () => {
        if (!hasNextPage) {
            return;
        }

        setPage(page + 1);
    };

    const previousPage = () => {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, page - 1]);

        setPage(prevPage);
    };

    const parseData = (data) => {
        const labelSeriesLocal = [];
        const dataSeriesLocal = [];
        const descriptionsLocal = [];

        const labelField = categoryLabelFields[categoryScope];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            const adjustedValue = parseFloat(item.aggregate);

            labelSeriesLocal.push(item[labelField]);
            dataSeriesLocal.push(parseFloat(adjustedValue));

            const description = `Obligated balance for ${item[labelField]}: \
${MoneyFormatter.formatMoney(adjustedValue)}`;
            descriptionsLocal.push(description);
        });

        setLabelSeries(labelSeriesLocal);
        setDataSeries(dataSeriesLocal);
        setDescriptions(descriptionsLocal);
        setLoading(false);
        setHasNextPage(data.page_metadata.has_next_page);
        setHasPreviousPage(data.page_metadata.has_previous_page);
    };

    const fetchData = () => {
        if (apiRequest.current) {
            apiRequest.current.cancel();
        }

        setLoading(true);

        const searchOperation = new AccountSearchOperation(account.id);
        searchOperation.fromState(reduxFilters);

        apiRequest.current = AccountHelper.fetchTasCategoryTotals({
            group: categoryLabelFields[categoryScope],
            field: 'obligations_incurred_by_program_object_class_cpe',
            aggregate: 'sum',
            order: ['-aggregate'],
            filters: searchOperation.toParams(),
            page,
            limit: 5,
            auditTrail: `Rank vis - ${categoryScope}`
        });

        apiRequest.current.promise
            .then((res) => {
                apiRequest.current = null;

                setError(false);
                setLoading(false);

                parseData(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setError(true);
                    setLoading(false);
                    apiRequest.current = null;
                }
            });
    };

    useEffect(() => {
        newSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxFilters, account.id]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, categoryScope]);
    return (
        <AccountRankVisualizationSection
            labelSeries={labelSeries}
            dataSeries={dataSeries}
            descriptions={descriptions}
            categoryScope={categoryScope}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            loading={loading}
            error={error}
            changeScope={changeScope}
            nextPage={nextPage}
            previousPage={previousPage} />
    );
};

AccountRankVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountRankVisualizationContainer);
