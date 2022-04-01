/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { getTrailingTwelveMonths, convertFYToDateRange } from 'helpers/fiscalYearHelper';
import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import TopFive from 'components/state/topFive/TopFive';

export class TopFiveContainer extends React.Component {
    static propTypes = {
        code: PropTypes.string,
        total: PropTypes.number,
        category: PropTypes.string,
        fy: PropTypes.string,
        type: PropTypes.string
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
        if (prevProps.code !== this.props.code) {
            this.loadCategory();
        }
        else if (prevProps.fy !== this.props.fy) {
            this.loadCategory();
        }
        else if (prevProps.type !== this.props.type) {
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
        else if (this.props.fy !== 'all' && this.props.fy) {
            const range = convertFYToDateRange(parseInt(this.props.fy, 10));
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
                    state: this.props.code
                }
            ]
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        if (this.props.type !== 'all' && awardTypeGroups[this.props.type]) {
            filters.award_type_codes = awardTypeGroups[this.props.type];
        }

        return {
            filters,
            category: this.props.category,
            limit: 5,
            page: 1
        };
    }

    loadCategory() {
        if (!this.props.code) {
            this.setState({
                loading: false,
                error: true
            });
            return;
        }

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
                    console.log(err);
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
            else if (type === 'recipient') {
                result.nameTemplate = (code, name) => name;
            }
            else if (type === 'county' || type === 'district') {
                result.nameTemplate = (code, name) => (name);
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
        code: state.stateProfile.overview.code,
        total: state.stateProfile.overview._totalAmount,
        fy: state.stateProfile.fy
    })
)(TopFiveContainer);
