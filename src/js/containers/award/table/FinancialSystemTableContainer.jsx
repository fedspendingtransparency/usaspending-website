/**
 * FinancialSystemContainer.jsx
 * Created by Kevin Li 3/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import FinancialSystemItem from 'models/results/other/FinancialSystemItem';
import FinancialSystemTable from 'components/award/table/FinancialSystemTable';

import tableFields from 'dataMapping/contracts/financialSystem';

const propTypes = {
    award: PropTypes.object,
    tableWidth: PropTypes.number
};

export class FinancialSystemTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            nextPage: false,
            page: 1,
            sort: {
                field: 'certified_date',
                direction: 'desc'
            },
            tableInstance: `${uniqueId()}`,
            data: []
        };

        this.financialRequest = null;
        this.loadNextPage = this.loadNextPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.loadFinancialSystemData(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.selectedAward.internalId !== prevProps.award.selectedAward.internalId) {
            this.loadFinancialSystemData(1, true);
        }
    }

    componentWillUnmount() {
        if (this.financialRequest) {
            this.financialRequest.cancel();
        }
    }

    loadFinancialSystemData(page = 1, reset = false) {
        const awardId = this.props.award.selectedAward.internalId;
        if (!awardId) {
            return;
        }

        this.setState({
            inFlight: true
        });

        if (this.financialRequest) {
            this.financialRequest.cancel();
        }

        let sortDirection = '-';
        if (this.state.sort.direction === 'asc') {
            sortDirection = '';
        }

        this.financialRequest = SearchHelper.performFinancialSystemLookup({
            page,
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: awardId
                }
            ],
            order: [`${sortDirection}${this.state.sort.field}`],
            fields: tableFields.table._fields,
            limit: 15
        });

        this.financialRequest.promise
            .then((res) => {
                const detailItems = [];

                res.data.results.forEach((item) => {
                    const finItem = new FinancialSystemItem(item);
                    detailItems.push(finItem);
                });

                // update the meta values
                const meta = res.data.page_metadata;
                const newState = {
                    inFlight: false,
                    page: meta.page,
                    nextPage: meta.has_next_page
                };

                if (reset) {
                    newState.tableInstance = `${uniqueId()}`;
                    newState.data = detailItems;
                }
                else {
                    newState.data = this.state.data.concat(detailItems);
                }

                this.setState(newState);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.financialRequest = null;
                    this.setState({
                        inFlight: false
                    });
                }
            });
    }

    loadNextPage() {
        if (!this.state.nextPage || this.state.inFlight) {
            return;
        }
        const nextPage = this.state.page + 1;
        this.loadFinancialSystemData(nextPage, false);
    }

    changeSort(sort) {
        this.setState({
            sort
        }, () => {
            this.loadFinancialSystemData(1, true);
        });
    }

    render() {
        return (
            <FinancialSystemTable
                {...this.state}
                tableWidth={this.props.tableWidth}
                loadNextPage={this.loadNextPage}
                changeSort={this.changeSort} />
        );
    }
}

FinancialSystemTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(FinancialSystemTableContainer);
