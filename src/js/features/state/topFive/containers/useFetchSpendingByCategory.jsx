/**
 * useFetchSpendingByCategory.jsx
 * Created by Andrea Blackwell 03/19/26
 */

import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query";
import { performSpendingByCategorySearch, parseData } from "helpers/searchHelper";

export const useFetchSpendingByCategory = (apiParams, category) => {
    const [parsedData, setParsedData] = useState(null);
    const [noResults, setNoResults] = useState(false);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['spendingByAward'],
        queryFn: () => performSpendingByCategorySearch(apiParams).promise,
        staleTime: 60000
    });

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            // eslint-disable-next-line no-shadow
            const { noResults, parsedData } = parseData(data?.data, category);
            if (noResults) {
                setNoResults(true);
            }
            else {
                setParsedData(parsedData);
            }
        }
    }, [category, data, isSuccess]);

    return {
        parsedData, isSuccess, isLoading, error, noResults
    };
};

export default useFetchSpendingByCategory;
