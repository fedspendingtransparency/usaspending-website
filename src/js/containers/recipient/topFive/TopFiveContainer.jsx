/**
 * TopFiveContainer.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
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

import TopFive from 'components/recipient/topFive/TopFive';

export class TopFiveContainer extends React.Component {
    static propTypes = {
        total: PropTypes.number,
        category: PropTypes.string,
        fy: PropTypes.string,
        recipientHash: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            results: []
        };

        this.request = null;
    }

    componentDidMount() {
        this.loadCategory();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipientHash !== this.props.recipientHash) {
            this.loadCategory();
        }
        if (prevProps.fy !== this.props.fy) {
            this.loadCategory();
        }
    }

    dataParams() {
        let timePeriod = null;
        if (this.props.fy === 'latest') {
            const trailing = getTrailingTwelveMonths();
            timePeriod = {
                start_date: trailing[0],
                end_date: trailing[1]
            };
        }
        else if (this.props.fy === 'all') {
            const currentFY = currentFiscalYear();
            const earliestRange = convertFYToDateRange(parseInt(earliestFiscalYear, 10));
            const latestRange = convertFYToDateRange(parseInt(currentFY, 10));
            timePeriod = {
                start_date: earliestRange[0],
                end_date: latestRange[1]
            };
        }
        else if (this.props.fy !== 'all' && this.props.fy) {
            const range = convertFYToDateRange(parseInt(this.props.fy, 10));
            timePeriod = {
                start_date: range[0],
                end_date: range[1]
            };
        }

        const filters = {
            recipient_id: this.props.recipientHash
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        return {
            filters,
            category: this.props.category,
            limit: 5,
            page: 1
        };
    }

    loadCategory() {
        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.request = SearchHelper.performSpendingByCategorySearch(this.dataParams());
        this.request.promise
            .then((res) => {
                this.parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            });
    }

    parseResults(data, type) {
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
        this.setState({
            loading: false,
            error: false,
            results: parsed
        });
    }

    render() {
        return (
            <TopFive
                category={this.props.category}
                total={this.props.total}
                {...this.state} />
        );
    }
}


export default connect(
    (state) => ({
        total: state.recipient.overview._totalAmount,
        fy: state.recipient.fy,
        recipientHash: state.recipient.id
    })
)(TopFiveContainer);
