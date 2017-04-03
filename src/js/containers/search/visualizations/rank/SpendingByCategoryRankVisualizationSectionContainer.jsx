/**
 * SpendingByCategoryRankVisualizationSectionContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SpendingByCategoryRankVisualizationSection from
    'components/search/visualizations/rank/SpendingByCategoryRankVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchAccountOperation from 'models/search/SearchAccountOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object,
    visualizationWidth: React.PropTypes.number,
    labelWidth: React.PropTypes.number
};

export class SpendingByCategoryRankVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            page: 1,
            total: 0,
            scope: 'budgetFunctions'
        };

        this.changeScope = this.changeScope.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            scope,
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchData();
        });
    }

    previousPage() {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = _.max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchAccountOperation();
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        let groupName = "";

        switch (this.state.scope) {
            case 'budgetFunctions':
                groupName = 'treasury_account__budget_function_title';
                break;
            case 'federalAccounts':
                groupName = 'treasury_account__federal_account__account_title';
                break;
            case 'objectClasses':
                groupName = 'object_class__object_class_name';
                break;
            default:
                groupName = 'program_activity__program_activity_name';
                break;

        }

        // generate the API parameters
        const apiParams = {
            field: 'obligations_incurred_by_program_object_class_cpe',
            group: groupName,
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        this.setState({
            loading: true
        });


        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.apiRequest = SearchHelper.performCategorySearch(apiParams);
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

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));
        });

        this.setState({
            labelSeries,
            dataSeries,
            loading: false,
            total: data.page_metadata.num_pages
        });
    }

    render() {
        return (
            <SpendingByCategoryRankVisualizationSection
                {...this.state}
                visualizationWidth={this.props.visualizationWidth}
                labelWidth={this.props.labelWidth}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

SpendingByCategoryRankVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByCategoryRankVisualizationSectionContainer);
