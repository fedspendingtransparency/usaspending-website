/**
 * AccountRankVisualizationContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { max } from 'lodash-es';

import { categoryLabelFields } from 'dataMapping/accounts/accountFields';
import AccountRankVisualizationSection from 'components/account/visualizations/rank/AccountRankVisualizationSection';
import useAccountSearchOperation from "./useAccountSearchOperation";

const AccountRankVisualizationContainer = () => {
    const account = useSelector((state) => state.account.account);
    const [page, setPage] = useState(1);
    const [categoryScope, setCategoryScope] = useState('programActivity');

    const changeScope = (scope) => {
        setCategoryScope(scope);
        setPage(1);
    };

    const nextPage = () => {
        if (!hasNextPage) return;

        setPage(page + 1);
    };

    const previousPage = () => {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, page - 1]);

        setPage(prevPage);
    };

    const { data, error, loading } = useAccountSearchOperation(
        categoryLabelFields[categoryScope],
        account.id,
        page,
        categoryScope
    );

    const {
        labelSeries,
        dataSeries,
        descriptions,
        hasNextPage,
        hasPreviousPage
    } = data;

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

export default AccountRankVisualizationContainer;
