/**
 * FinancialSystemContainer.jsx
 * Created by Kevin Li 3/2/17
 */

import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import FinancialSystemItem from 'models/results/other/FinancialSystemItem';

import FinancialSystemTable from 'components/award/table/FinancialSystemTable';
import SummaryPageTableMessage from 'components/award/table/SummaryPageTableMessage';

import tableFields from 'dataMapping/contracts/financialSystem';

const propTypes = {
    award: React.PropTypes.object,
    tableWidth: React.PropTypes.number,
    resetFinSys: React.PropTypes.func,
    setFinSysData: React.PropTypes.func,
    appendFinSysData: React.PropTypes.func,
    setFinSysMeta: React.PropTypes.func,
    updateTransactionRenderHash: React.PropTypes.func,
    updateTransactionGroupHash: React.PropTypes.func
};

export class FinancialSystemTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLoaded: false,
            inFlight: false
        };

        this.financialRequest = null;
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        this.props.resetFinSys();
        this.loadFinancialSystemData(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.selectedAward.id !== prevProps.award.selectedAward.id) {
            this.props.resetFinSys();
            this.loadFinancialSystemData(1, true);
        }
        else if (!_.isEqual(this.props.award.finSysSort, prevProps.award.finSysSort)) {
            this.loadFinancialSystemData(1, true);
        }
    }

    componentWillUnmount() {
        if (this.financialRequest) {
            this.financialRequest.cancel();
        }
    }

    loadFinancialSystemData(page = 1, reset = false) {
        const awardId = this.props.award.selectedAward.id;
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
        if (this.props.award.finSysSort.direction === 'asc') {
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
            order: [`${sortDirection}${this.props.award.finSysSort.field}`],
            fields: tableFields.table._fields,
            limit: 13
        });

        this.financialRequest.promise
            .then((res) => {
                const detailItems = [];

                res.data.results.forEach((item) => {
                    const finItem = new FinancialSystemItem(item);
                    detailItems.push(finItem);
                });

                if (reset) {
                    this.props.setFinSysData(detailItems);
                }
                else {
                    this.props.appendFinSysData(detailItems);
                }

                // update the meta values
                const meta = res.data.page_metadata;
                this.props.setFinSysMeta({
                    page: meta.page,
                    nextPage: meta.has_next_page
                });

                // update the render hash
                this.props.updateTransactionRenderHash();
                if (reset) {
                    this.props.updateTransactionGroupHash();
                }

                this.setState({
                    hasLoaded: true,
                    inFlight: false
                });
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

    nextPage() {
        if (!this.props.award.finSysMeta.nextPage) {
            return;
        }
        const nextPage = this.props.award.finSysMeta.page + 1;
        this.loadFinancialSystemData(nextPage, false);
    }

    render() {
        let output = (<SummaryPageTableMessage
            message="Loading data..." />);

        if (this.state.hasLoaded) {
            output = (<FinancialSystemTable
                inFlight={this.state.inFlight}
                award={this.props.award}
                tableWidth={this.props.tableWidth}
                nextPage={this.nextPage} />);
        }
        return output;
    }
}

FinancialSystemTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(FinancialSystemTableContainer);
