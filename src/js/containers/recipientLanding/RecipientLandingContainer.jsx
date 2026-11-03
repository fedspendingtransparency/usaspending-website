/**
 * RecipientLandingContainer.jsx
 * Created by David Trinh 7/2/18
 */

import React, { useState } from 'react';
import { inRange } from 'lodash-es';
import RecipientLandingContent from 'components/recipientLanding/RecipientLandingContent';
import useFetchAllRecipients from './useFetchAllRecipients';

const RecipientLandingContainer = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [order, setOrder] = useState({ field: 'amount', direction: 'desc' });
    const [awardType, setAwardType] = useState('all');
    const [searchString, setSearchString] = useState('');
    const [pageSize] = useState(50);

    const { results, totalItems, loading, error } = useFetchAllRecipients({
        order: order.direction,
        sort: order.field,
        page: pageNumber,
        limit: pageSize,
        awardType,
        keyword: searchString
    });

    const onChangePage = (page) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (inRange(page, 1, totalPages + 1)) {
            // Change page number in the state and make a new request
            setPageNumber(page);
        }
    };

    const setRecipientSearchString = (string) => {
        setSearchString(string);
        setPageNumber(1);
    };

    const setSort = (field, direction) => {
        setOrder({ field, direction });
        setPageNumber(1);
    };

    const setTab = (awardType) => {
        setAwardType(awardType);
        setPageNumber(1);
    };

    return (
        <RecipientLandingContent
            results={results}
            inFlight={loading}
            error={error}
            order={order}
            setSort={setSort}
            setTab={setTab}
            searchString={searchString}
            setRecipientSearchString={setRecipientSearchString}
            onChangePage={onChangePage}
            pageNumber={pageNumber}
            totalItems={totalItems}
            pageSize={pageSize} />
    );
};

export default RecipientLandingContainer;
