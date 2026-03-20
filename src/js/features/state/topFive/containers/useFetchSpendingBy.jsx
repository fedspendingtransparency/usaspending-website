/**
 * useFetchSpendingBy.jsx
 * Created by Andrea Blackwell 03/19/26
 */

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { performSpendingByAwardSearch, performSpendingByCategorySearch } from "helpers/searchHelper";
import BaseStateCategoryResult from "models/v2/state/BaseStateCategoryResult";

export const useFetchSpendingBy = (apiParams, category) => {
    const [parsedData, setParsedData] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const categoryName = category === "award" ? "Award" : "Category";

    const isEnabled = () => {
        if (category && apiParams?.filters?.place_of_performance_locations[0]?.state?.length > 0) return true;
        return false;
    };

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`spendingBy${categoryName}`],
        queryFn: () => {
            if (category === 'award') return performSpendingByAwardSearch(apiParams).promise;
            return performSpendingByCategorySearch(apiParams).promise;
        },
        enabled: isEnabled(),
        staleTime: 60000
    });

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


    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            parseData(data?.data);
        }
    }, [data, isSuccess, parseData]);

    return {
        parsedData, isSuccess, isLoading, error, noResults
    };
};

export default useFetchSpendingBy;
