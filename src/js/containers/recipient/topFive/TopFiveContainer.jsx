/**
 * TopFiveContainer.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import {
    getTrailingTwelveMonths,
    convertFYToDateRange,
    currentFiscalYear,
    earliestFiscalYear
} from 'helpers/fiscalYearHelper';
import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';
import TopFive from 'components/sharedComponents/TopFive';

const propTypes = {
    total: PropTypes.number,
    category: PropTypes.string,
    fy: PropTypes.string,
    recipientHash: PropTypes.string,
    recipientName: PropTypes.string
};

const TopFiveContainer = ({
    total, category, fy, recipientHash, recipientName
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [noResults, setNoResults] = useState(false);

    let request = null;

    const dataParams = () => {
        let timePeriod = null;
        if (fy === 'latest') {
            const trailing = getTrailingTwelveMonths();
            timePeriod = {
                start_date: trailing[0],
                end_date: trailing[1]
            };
        }
        else if (fy === 'all') {
            const currentFY = currentFiscalYear();
            const earliestRange = convertFYToDateRange(parseInt(earliestFiscalYear, 10));
            const latestRange = convertFYToDateRange(parseInt(currentFY, 10));
            timePeriod = {
                start_date: earliestRange[0],
                end_date: latestRange[1]
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
            recipient_id: recipientHash,
            recipient_name: recipientName
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        return {
            filters,
            category,
            limit: 5,
            page: 1
        };
    };

    const parseResults = (data, type) => {
        if (data.length < 1) {
            setNoResults(true);
        }
        else {
            const parsed = data.map((item, index) => {
                const result = Object.create(BaseStateCategoryResult);
                result.populate(item, index + 1);
                if (type === 'awarding_agency' || type === 'awarding_subagency') {
                    result.nameTemplate = (code, name) => {
                        if (code) {
                            return `${name} (${code})`;
                        }
                        return name;
                    };
                }

                else if (type === 'country' || type === 'state_territory') {
                    result.nameTemplate = (name) => (name);
                }
                return result;
            });

            setLoading(false);
            setError(false);
            setResults(parsed);
        }
    };

    const loadCategory = () => {
        if (request) {
            request.cancel();
        }

        setLoading(true);
        setError(false);

        request = SearchHelper.performSpendingByCategorySearch(dataParams());
        request.promise
            .then((res) => {
                parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    setLoading(false);
                    setError(true);
                }
            });
    };

    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipientHash, fy]);

    return (
        <>
            {!noResults &&
                <TopFive
                    category={category}
                    total={total}
                    dataParams={dataParams()}
                    loading={loading}
                    error={error}
                    results={results} />
            }
        </>
    );
};

TopFiveContainer.propTypes = propTypes;


export default connect(
    (state) => ({
        total: state.recipient.overview._totalAmount,
        fy: state.recipient.fy,
        recipientHash: state.recipient.id,
        recipientName: state.recipient.overview.name
    })
)(TopFiveContainer);
