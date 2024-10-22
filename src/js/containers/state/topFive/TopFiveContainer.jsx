/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { getTrailingTwelveMonths, convertFYToDateRange } from 'helpers/fiscalYearHelper';
import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import TopFive from "../../../components/sharedComponents/TopFive";

const propTypes = {
    code: PropTypes.string,
    total: PropTypes.number,
    category: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string
};

const TopFiveContainer = (props) => {
    const [categoryState, setCategoryState] = useState({ loading: true, error: false, results: [] });
    const [noResultState, setNoResultState] = useState(false);

    const dataParams = () => {
        let timePeriod = null;
        if (props.fy === 'latest') {
            const trailing = getTrailingTwelveMonths();
            timePeriod = {
                start_date: trailing[0],
                end_date: trailing[1]
            };
        }
        else if (props.fy !== 'all' && props.fy) {
            const range = convertFYToDateRange(parseInt(props.fy, 10));
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
                    state: props.code
                }
            ]
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        // Tab selection
        if (props.type !== 'all' && awardTypeGroups[props.type]) {
            filters.award_type_codes = awardTypeGroups[props.type];
        }

        const params = {
            filters,
            category: props.category,
            limit: 5,
            page: 1
        };

        if (props.category === 'awards') {
            filters.award_type_codes = ['A', 'B', 'C', 'D'];
            params.fields = ['Award ID', 'Award Amount', 'generated_internal_id'];
            params.order = 'desc';
            params.sort = 'Award Amount';
            params.subawards = false;
        }

        return params;
    };

    const parseResults = (data, type) => {
        if (data.length < 1) {
            setNoResultState(true);
        } else {
            const parsed = data.map((item, index) => {
                const result = Object.create(BaseStateCategoryResult);
                if (props.category === 'awards') {
                    result.populate({
                        name: item['Award ID'],
                        amount: item['Award Amount'],
                        agency_slug: item.generated_internal_id,
                        category: props.category
                    }, index + 1);
                }
                else {
                    result.populate({ ...item, category: props.category }, index + 1);
                }

                if (type === 'awarding_agency' || type === 'awarding_subagency') {
                    result.nameTemplate = (code, name) => {
                        if (code) {
                            return `${name} (${code})`;
                        }
                        return name;
                    };
                }
                else if (type === 'recipient') {
                    result.nameTemplate = (code, name) => name;
                }
                else if (type === 'county' || type === 'district') {
                    result.nameTemplate = (code, name) => (name);
                }
                setNoResultState(false);
                return result;
            });

            setCategoryState({ loading: false, error: false, results: parsed });
        }
    };

    const loadCategory = () => {
        let request;
        if (!props.code) {
            setCategoryState({ loading: false, error: true });
            return;
        }

        if (request) {
            request.cancel();
        }

        setCategoryState({ loading: true, error: false });

        if (props.category === 'awards') {
            request = SearchHelper.performSpendingByAwardSearch(dataParams());
        }
        else {
            request = SearchHelper.performSpendingByCategorySearch(dataParams());
        }

        request.promise
            .then((res) => {
                parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setCategoryState({ loading: false, error: true });
                }
            });
    };

    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.code, props.fy, props.type]);

    return (
        <>
            {!noResultState &&
                <TopFive
                    category={props.category}
                    dataParams={dataParams()}
                    total={props.total}
                    {...categoryState} />
            }
        </>
    );
};

TopFiveContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        code: state.stateProfile.overview.code,
        total: state.stateProfile.overview._totalAmount,
        fy: state.stateProfile.fy
    })
)(TopFiveContainer);
