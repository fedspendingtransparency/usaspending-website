/**
 * RankVisualizationWrapperContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from "react-router-dom";

import { isEqual, max, get } from 'lodash';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import RankVisualizationTitle from 'components/search/visualizations/rank/RankVisualizationTitle';
import SpendingByAgencySection from 'components/search/visualizations/rank/sections/SpendingByAgencySection';
import SpendingByRecipientSection from 'components/search/visualizations/rank/sections/SpendingByRecipientSection';
import SpendingByCFDASection from 'components/search/visualizations/rank/sections/SpendingByCFDASection';
import SpendingByIndustryCodeSection from 'components/search/visualizations/rank/sections/SpendingByIndustryCodeSection';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import BaseSpendingByCategoryResult from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';

import { categoryNames, defaultScopes } from 'dataMapping/search/spendingByCategory';

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool
};

export class RankVisualizationWrapperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendingBy: 'awardingAgency',
            loading: true,
            error: false,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            linkSeries: [],
            page: 1,
            scope: 'awarding_agency',
            next: '',
            previous: '',
            hasNextPage: false,
            hasPreviousPage: false,
            recipientError: false
        };

        this.changeSpendingBy = this.changeSpendingBy.bind(this);
        this.changeScope = this.changeScope.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
        this.parseRank();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) && !this.props.noApplied) {
            this.newSearch();
        }
        else if (prevProps.subaward !== this.props.subaward && !this.props.noApplied) {
            // subaward toggle changed, update the search object
            this.newSearch();
        }
        else if (prevState.scope !== this.state.scope) {
            // scope changed, perform a new search
            this.newSearch();
        }
    }
    parseRank() {
        if (this.props.history) {
            const params = this.props.history.location.search.split("&");
            params.shift();
            if (params.length === 2 && params[0].substring(0, 4) === "tab=") {
                if (params[1].substring(0, 9) === "rankType=") {
                    const rankVal = params[1].substring(9);
                    this.changeSpendingBy("industryCode");
                    if (rankVal === "naics" || rankVal === "psc") {
                        this.changeScope(rankVal);
                    }
                }
            }
        }
    }

    changeScope(scope) {
        this.setState({
            scope,
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        if (this.state.hasNextPage) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.fetchData();
            });
        }
    }

    previousPage() {
    // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        this.props.setAppliedFilterCompletion(false);
        this.setState({
            loading: true,
            error: false,
            recipientError: false
        });

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        const auditTrail = `${categoryNames[this.state.spendingBy]} Rank Visualization`;

        // Create Search Operation
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            category: this.state.scope,
            filters: searchParams,
            limit: 10,
            page: this.state.page,
            auditTrail,
            subawards: this.props.subaward
        };

        this.apiRequest = SearchHelper.performSpendingByCategorySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data);
                this.apiRequest = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                const responseDetail = get(err, 'response.data.detail', '');
                this.props.setAppliedFilterCompletion(true);
                this.apiRequest = null;
                console.log(err);
                this.setState({
                    loading: false,
                    error: true,
                    recipientError: responseDetail === 'Current filters return too many unique items. Narrow filters to return results.'
                });
            });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];
        const linkSeries = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(item);

            if (this.state.scope === 'awarding_agency' || this.state.scope === 'awarding_subagency') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };
            }

            if (this.state.scope === 'recipient') {
                result.nameTemplate = (code, name) => name;
            }

            labelSeries.push(result.name);
            dataSeries.push(result._amount);

            if (this.state.scope === 'recipient' && !this.props.subaward) {
                const recipientLink = result.recipientId ? `recipient/${result.recipientId}/latest` : '';
                linkSeries.push(recipientLink);
            }

            if (this.state.scope === 'awarding_agency') {
                const awardingLink = `agency/${result._agencySlug}`;
                linkSeries.push(awardingLink);
            }

            const description = `Spending by ${result.name}: ${result.amount}`;
            descriptions.push(description);
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            linkSeries,
            loading: false,
            error: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.hasNext,
            hasPreviousPage: data.page_metadata.hasPrevious
        }, () => {
            this.props.setAppliedFilterCompletion(true);
        });
    }

    generateVisualization() {
        switch (this.state.spendingBy) {
            case 'awardingAgency':
                return (
                    <SpendingByAgencySection
                        {...this.state}
                        changeScope={this.changeScope}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage} />
                );
            case 'recipient':
                return (
                    <SpendingByRecipientSection
                        {...this.state}
                        changeScope={this.changeScope}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage}
                        recipientError={this.state.recipientError} />
                );
            case 'cfda':
                return (
                    <SpendingByCFDASection
                        {...this.state}
                        changeScope={this.changeScope}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage} />
                );
            case 'industryCode':
                return (
                    <SpendingByIndustryCodeSection
                        {...this.state}
                        changeScope={this.changeScope}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage}
                        industryCodeError={this.props.subaward} />
                );
            default:
                return (
                    <SpendingByAgencySection
                        {...this.state}
                        changeScope={this.changeScope}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage}
                        agencyType="awarding" />
                );
        }
    }

    changeSpendingBy(spendingBy) {
        this.setState({
            spendingBy,
            scope: defaultScopes[spendingBy]
        });
    }

    render() {
        const visualization = this.generateVisualization();

        const fieldTypes = [
            'awardingAgency',
            'recipient',
            'cfda'
        ];
        if (!this.props.subaward) {
            fieldTypes.push('industryCode');
        }

        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <RankVisualizationTitle
                    fieldTypes={fieldTypes}
                    changeSpendingBy={this.changeSpendingBy}
                    currentSpendingBy={this.state.spendingBy} />
                { visualization }
            </div>
        );
    }
}

RankVisualizationWrapperContainer.propTypes = propTypes;

export default withRouter(connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(RankVisualizationWrapperContainer));
