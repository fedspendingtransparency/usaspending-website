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
import { REQUEST_VERSION } from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";

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

    // eslint-disable-next-line react/sort-comp
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

        // Tab selection
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

    getSelectedSection(item) {
        const params = this.dataParams();

        let categoryFilter;

        if (params.category === 'awarding_agency') {
            categoryFilter = { agencies: [type: "awarding", tier: "toptier", name: item] };
            
        } else if (params.category === 'awarding_subagency') {
            categoryFilter = { recipient_search_text: item };

        } else if (params.category === 'recipient') {
            categoryFilter = { recipient_search_text: item };

        } else if (params.category === 'county') {
            categoryFilter = { recipient_search_text: item };

        } else if (params.category === 'district') {
            categoryFilter = { recipient_search_text: item };

        } else if (params.category === 'cfda') {
            categoryFilter = { program_numbers: [item] };

        } else if (params.category === 'psc') {
            categoryFilter = { psc_codes: item };

        } else if (params.category === 'naics') {
            categoryFilter = { naics_codes: [item] };

        }

        const filterValue = {
            filters: {
                ...params.filters
            },
            version: REQUEST_VERSION
        };

        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                const searchUrl = `/search?hash=${hashData.hash}`;
                console.log("search url", searchUrl);
                return searchUrl;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.hash = null;
                }
                else {
                    // Request failed
                    tempHash = null;
                    console.log(error);
                }
            });
        return '';
    };

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

        // generate a link with these dataParams
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

            console.log("url", this.getSelectedSection());
            // append the filter here
            // for the filter need - the state code (props.code), table category (props.category), time period(?), and tab selection (props.type)
            console.log("filters", this.props.fy, this.dataParams());


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
