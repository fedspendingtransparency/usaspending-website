/**
 * StateLandingContainer.jsx
 * Created by Kevin Li 5/23/18
 */

import React, { useState } from 'react';
import StateLandingContent from 'components/stateLanding/StateLandingContent';
import useFetchStateRecipientList from './useFetchStateRecipientList';

const StateLandingContainer = () => {
    const [searchString, setSearchString] = useState('');
    const [sort, setSort] = useState({ field: 'name', direction: 'asc' });

    const { results, resultsText, total, loading, error } = useFetchStateRecipientList(sort, searchString);

    const setSortLocal = (field, direction) => setSort({ field, direction });

    return (
        <StateLandingContent
            setSearchString={setSearchString}
            resultsText={resultsText}
            setSort={setSortLocal}
            loading={loading}
            error={error}
            total={total}
            results={results}
            sortField={sort.field}
            sortDirection={sort.direction}
            searchString={searchString} />
    );
};

export default StateLandingContainer;
