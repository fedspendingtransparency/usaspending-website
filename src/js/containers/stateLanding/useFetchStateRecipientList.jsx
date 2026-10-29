import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'js-search';
import { orderBy } from 'lodash-es';
import { fetchStateList } from 'apis/state';
import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';

const useFetchStateRecipientList = (sort, searchString = '') => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchStateRecipientList'],
        queryFn: () => fetchStateList().promise
    });

    const { results, resultsText } = useMemo(() => {
        if (!data?.data) return { results: [], resultsText: '0 results' };

        const parsed = data.data.map((state) => {
            const item = Object.create(BaseStateLandingItem);
            item.populate(state);
            return item;
        });

        // perform a local search
        const search = new Search('fips');

        search.addIndex('name');
        search.addIndex('code');
        search.addDocuments(parsed);

        // return the full data set if no search string is provided
        let searchResults = parsed;
        if (searchString) {
            searchResults = search.search(searchString);
        }

        const { field, direction } = sort;

        // now sort the results by the appropriate table column and direction
        const sortedResults = orderBy(searchResults, [field], [direction]);

        let orderedResults = sortedResults;

        if (field === 'name') {
            // Separate states and territories
            const states = sortedResults.filter((result) => result.type === 'state' || result.type === 'district');
            const territories = sortedResults.filter((result) => result.type === 'territory');

            orderedResults = states.concat(territories);

            if (direction === 'desc') {
                orderedResults = territories.concat(states);
            }
        }

        return {
            results: orderedResults,
            resultsText: orderedResults.length === 1 ? '1 result' : `${orderedResults.length} results`
        };
    }, [data, searchString, sort]);

    const total = useMemo(() => data?.data?.reduce((sum, state) => sum + (state.amount || 0), 0) ?? 0, [data]);

    return { results, resultsText, total, loading: isLoading, error: isError };
};

export default useFetchStateRecipientList;
