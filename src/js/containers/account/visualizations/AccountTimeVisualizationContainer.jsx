/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    setVizTxnSum: React.PropTypes.func
};

export class AccountTimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            groups: [],
            xSeries: [],
            ySeries: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
    }

    fetchData() {
        this.setState({
            loading: false
        }, () => {
            const mockRes = {
                totals: {
                    outgoing: {
                        outlays: {
                            2017: '2800581',
                            2016: '3160581',
                            2015: '1939581'
                        },
                        obligations: {
                            2017: '5800581',
                            2016: '4160581',
                            2015: '4839581'
                        },
                        budget_authority: {
                            2017: '7800581',
                            2016: '9160581',
                            2015: '5239581'
                        }
                    }
                }
            };

            this.parseData(mockRes);

        });
        // // build a new search operation from the Redux state, but create a transaction-based search
        // // operation instead of an award-based one
        // const operation = new SearchTransactionOperation();
        // operation.fromState(this.props.reduxFilters);

        // const searchParams = operation.toParams();

        // // generate the API parameters
        // const apiParams = {
        //     field: 'federal_action_obligation',
        //     group: 'action_date__fy',
        //     order: ['item'],
        //     aggregate: 'sum',
        //     filters: searchParams
        // };

        // this.setState({
        //     loading: true
        // });
        // const search = SearchHelper.performTransactionsTotalSearch(apiParams);
        // search.promise
        //     .then((res) => {
        //         this.parseData(res.data);
        //     });
    }

    parseData(data) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];

        // get all the years
        const years = Object.keys(data.totals.outgoing.budget_authority);
        const outgoing = data.totals.outgoing;

        years.forEach((year) => {
            groups.push(year);
            xSeries.push([year]);

            const outlay = parseFloat(outgoing.outlays[year]);
            const obligations = parseFloat(outgoing.obligations[year]);
            const budgetAuthority = parseFloat(outgoing.budget_authority[year]);

            ySeries.push([[budgetAuthority, obligations, outlay]]);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            loading: false
        }, () => {
            // save the total spending amount to Redux so all visualizations have access to this
            // data
        });
    }

    render() {
        return (
            <AccountTimeVisualizationSection data={this.state} />
        );
    }
}

AccountTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.account.filters }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimeVisualizationSectionContainer);
