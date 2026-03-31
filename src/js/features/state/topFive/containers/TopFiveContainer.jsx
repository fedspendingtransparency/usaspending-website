/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import { getTrailingTwelveMonths, convertFYToDateRange } from 'helpers/fiscalYearHelper';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import TopFive from "components/sharedComponents/TopFive";
import useFetchSpendingBy from "./useFetchSpendingBy";

const propTypes = {
    type: PropTypes.string,
    category: PropTypes.string,
    agencyData: PropTypes.object
};

const TopFiveContainer = ({ category, type, agencyData }) => {
    const { overview, fy } = useSelector((state) => state.stateProfile);
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


    const {
        parsedData, noResults, isSuccess, isLoading, error
    } = useFetchSpendingBy(dataParams, category);

    useEffect(() => {
        if (isSuccess && (noResults || parsedData?.length > 0)) {
            setParsedResults(parsedData);
            setNoResultState(noResults);
        }
    }, [isSuccess, noResults, parsedData]);


    return (
        <>
            {!noResultState &&
                <TopFive
                    category={category}
                    results={parsedResults}
                    total={total}
                    loading={isLoading}
                    error={error}
                    dataParams={dataParams}
                    agencyData={agencyData} />
            }
        </>
    );
};

TopFiveContainer.propTypes = propTypes;
export default TopFiveContainer;
