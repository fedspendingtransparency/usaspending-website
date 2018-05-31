/**
 * RankVisualizationWrapperContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isEqual, max } from 'lodash';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';

import RankVisualizationTitle from 'components/search/visualizations/rank/RankVisualizationTitle';
import SpendingByAgencySection from 'components/search/visualizations/rank/sections/SpendingByAgencySection';
import SpendingByRecipientSection from 'components/search/visualizations/rank/sections/SpendingByRecipientSection';
import SpendingByCFDASection from 'components/search/visualizations/rank/sections/SpendingByCFDASection';
import SpendingByIndustryCodeSection from 'components/search/visualizations/rank/sections/SpendingByIndustryCodeSection';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';
import BaseSpendingByCategoryResult from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';

import { categoryNames, defaultScopes } from 'dataMapping/search/spendingByCategory';

const propTypes = {
    reduxFilters: PropTypes.object,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool
};

export class RankVisualizationWrapperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendingBy: 'awardingAgency',
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            scope: 'awarding_agency',
            next: '',
            previous: '',
            hasNextPage: false,
            hasPreviousPage: false
        };

        this.changeSpendingBy = this.changeSpendingBy.bind(this);
        this.changeScope = this.changeScope.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
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
        this.setState({
            loading: true
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
            auditTrail
        };

        this.apiRequest = SearchHelper.performSpendingByCategorySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(item);

            if (this.state.scope === 'awarding_agency' || this.state.scope === 'awarding_subagency' || this.state.scope === 'recipient_duns') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };
            }

            labelSeries.push(result.name);
            dataSeries.push(result._amount);

            const description = `Spending by ${result.name}: ${result.amount}`;
            descriptions.push(description);
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            loading: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.hasNext,
            hasPreviousPage: data.page_metadata.hasPrevious
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
                        previousPage={this.previousPage} />
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
                        previousPage={this.previousPage} />
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

        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <RankVisualizationTitle
                    changeSpendingBy={this.changeSpendingBy}
                    currentSpendingBy={this.state.spendingBy} />
                { visualization }
            </div>
        );
    }
}

RankVisualizationWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RankVisualizationWrapperContainer);
