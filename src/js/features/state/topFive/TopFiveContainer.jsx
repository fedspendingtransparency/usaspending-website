/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import { getTrailingTwelveMonths, convertFYToDateRange } from 'helpers/fiscalYearHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import TopFive from "components/sharedComponents/TopFive";
import useQuery from "hooks/useQuery";
import {
    performSpendingByAwardSearch, performSpendingByCategorySearch
} from "helpers/searchHelper";

const propTypes = {
    type: PropTypes.string,
    category: PropTypes.string
};

const TopFiveContainer = ({ category, type }) => {
    const { overview, fy } = useSelector((state) => state.stateProfile);
    const {
        loading, error, data, fetchData
    } = useQuery();
    const [parsedResults, setParsedResults] = useState([]);
    const [noResultState, setNoResultState] = useState(false);

    const { code, _totalAmount: total } = overview;

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

    const parseResults = useCallback(() => {
        if (!data) return;
        const { results, categories: resCategory } = data;
        if (results.length < 1) {
            setNoResultState(true);
        }
        else {
            const parsed = results.map((item, index) => {
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
                setNoResultState(false);
                return result;
            });

            setParsedResults(parsed);
        }
    }, [category, data]);

    useEffect(() => {
        if (!code) {
            return;
        }

        const request = category === 'awards' ?
            performSpendingByAwardSearch :
            performSpendingByCategorySearch;

        fetchData(request, dataParams);
    }, [category, code, dataParams, fetchData, fy, type]);

    useEffect(() => {
        parseResults();
    }, [parseResults]);

    return (
        <>
            {!noResultState &&
                <TopFive
                    category={category}
                    results={parsedResults}
                    total={total}
                    loading={loading}
                    error={error}
                    dataParams={dataParams} />
            }
        </>
    );
};

TopFiveContainer.propTypes = propTypes;
export default TopFiveContainer;
