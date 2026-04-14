/**
 * useFetchSpendingBy.jsx
 * Created by Andrea Blackwell 03/19/26
 */

import { useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query';
import { performSpendingByAwardSearch, performSpendingByCategorySearch } from "helpers/searchHelper";
import BaseStateCategoryResult from "models/v2/state/BaseStateCategoryResult";

export const useFetchSpendingBy = (apiParams, category, code, fy) => {
    const [parsedData, setParsedData] = useState(null);
    const [noResults, setNoResults] = useState(false);

    const parseData = (res) => {
        if (!res) {
            setNoResults(true);
        }

        const { results, categories: resCategory } = res;

        if (results.length < 1) {
            setNoResults(true);
        }

        const dataResults = results.map((item, index) => {
            const result = Object.create(BaseStateCategoryResult);
            if (category === 'awards') {
                result.populate({
                    name: item['Award ID'],
                    amount: item['Award Amount'],
                    agency_slug: item.generated_internal_id,
                    category
                }, index + 1);
            }
            else {
                result.populate({ ...item, category }, index + 1);
            }

            if (resCategory === 'awarding_agency' || resCategory === 'awarding_subagency') {
                result.nameTemplate = (resCode, name) => {
                    if (resCode) {
                        return `${name} (${resCode})`;
                    }
                    return name;
                };
            }
            else if (resCategory === 'recipient') {
                result.nameTemplate = (resCode, name) => name;
            }
            else if (resCategory === 'county' || resCategory === 'district') {
                result.nameTemplate = (resCode, name) => (name);
            }
            return result;
        });

        setParsedData(dataResults);
    };

    const {
        mutate, isSuccess, isPending, error
    } = useMutation({
        mutationKey: [`spendingBy${category}${code}${fy}`],
        mutationFn: () => {
            if (category === 'awards') {
                return performSpendingByAwardSearch(apiParams).promise;
            }
            return performSpendingByCategorySearch(apiParams).promise;
        },
        onSuccess: (data) => {
            parseData(data?.data);
        },
        staleTime: 60000
    });

    useEffect(() => {
        if (code && category) {
            mutate();
        }
    }, [code, mutate, category, apiParams]);

    return {
        parsedData, noResults, isSuccess, isLoading: isPending, error
    };
};

export default useFetchSpendingBy;
