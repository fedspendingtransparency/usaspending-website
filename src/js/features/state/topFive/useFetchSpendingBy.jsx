/**
 * useFetchSpendingBy.jsx
 * Created by Andrea Blackwell 03/19/26
 */

import { useState, useCallback, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { performSpendingByAwardSearch, performSpendingByCategorySearch } from "helpers/searchHelper";
import BaseStateCategoryResult from "models/v2/state/BaseStateCategoryResult";
import { convertFYToDateRange, getTrailingTwelveMonths } from "../../../helpers/fiscalYearHelper";
import { awardTypeGroups } from "../../../dataMapping/search/awardType";

export const useFetchSpendingBy = (category, code, fy, type) => {
    const [noResults, setNoResults] = useState(false);

    const getDataParams = useCallback(() => {
        let timePeriod = null;
        if (fy === 'latest') {
            const trailing = getTrailingTwelveMonths();
            timePeriod = {
                start_date: trailing[0],
                end_date: trailing[1]
            };
        }
        else if (fy !== 'all' && fy) {
            const range = convertFYToDateRange(parseInt(fy, 10));
            timePeriod = {
                start_date: range[0],
                end_date: range[1]
            };
        }

        const filters = {
            place_of_performance_scope: 'domestic',
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: code
                }
            ]
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        // Tab selection
        if (type !== 'all' && awardTypeGroups[type]) {
            filters.award_type_codes = awardTypeGroups[type];
        }

        const params = {
            filters,
            category,
            limit: 5,
            page: 1
        };

        if (category === 'awards') {
            filters.award_type_codes = ['A', 'B', 'C', 'D'];
            params.fields = ['Award ID', 'Award Amount', 'generated_internal_id'];
            params.order = 'desc';
            params.sort = 'Award Amount';
            params.spending_level = 'awards';
        }

        if (category === 'defc') {
            params.spending_level = 'award_financial';
            params.filters = {
                def_codes: ["L", "M", "N", "O", "P", "U", "V", "Z", "1"],
                ...filters
            };
        }

        return params;
    }, [category, code, fy, type]);

    const dataParams = useMemo(() => getDataParams(), [getDataParams]);

    const parseData = (d) => {
        const res = d.data;

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

        return dataResults;
    };

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`spendingBy${category}${type}${code}${fy}`],
        queryFn: () => {
            if (category === 'awards') {
                return performSpendingByAwardSearch(dataParams).promise;
            }
            return performSpendingByCategorySearch(dataParams).promise;
        },
        select: parseData,
        enabled: !!(dataParams && code && type && fy),
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    return {
        parsedData: data, noResults, isSuccess, isLoading, error, dataParams
    };
};

export default useFetchSpendingBy;
