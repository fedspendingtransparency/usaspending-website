/**
  * ReferencedAwardsContainer.jsx
  * Created by Lizzie Salita 2/14/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { isEqual, pick, findKey } from 'lodash';

import * as IdvHelper from 'helpers/idvHelper';
import BaseReferencedAwardResult from 'models/v2/award/BaseReferencedAwardResult';
import ReferencedAwardsSection from 'components/award/idv/referencedAwards/ReferencedAwardsSection';

const propTypes = {
    award: PropTypes.object,
    tableType: PropTypes.string,
    switchTab: PropTypes.func
};

const defaultProps = {
    tableType: 'child_awards'
};

const tableTypes = [
    {
        label: 'Child Award Orders',
        internal: 'child_awards',
        enabled: true
    },
    {
        label: 'Child IDV Orders',
        internal: 'child_idvs',
        enabled: true
    },
    {
        label: 'Grandchild Award Orders',
        internal: 'grandchild_awards',
        enabled: true
    }
];

export class ReferencedAwardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            sort: {
                child_idvs: 'period_of_performance_start_date',
                child_awards: 'period_of_performance_start_date',
                grandchild_awards: 'period_of_performance_start_date'
            },
            page: {
                child_idvs: 1,
                child_awards: 1,
                grandchild_awards: 1
            },
            order: {
                child_idvs: 'desc',
                child_awards: 'desc',
                grandchild_awards: 'desc'
            },
            tableTypes,
            inFlight: false,
            error: false,
            results: []
        };

        this.request = null;

        this.switchTab = this.switchTab.bind(this);
        this.changePage = this.changePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        if (this.props.award.id && this.props.award.idvDetails) {
            this.pickDefaultTab();
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.award.id !== prevProps.award.id || !isEqual(this.props.award.idvDetails, prevProps.award.idvDetails)) && this.props.award.idvDetails) {
            this.pickDefaultTab();
        }

        if (this.props.tableType !== prevProps.tableType && this.props.award.idvDetails) this.loadResults();
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
    }

    loadResults() {
        if (this.request) {
            this.request.cancel();
        }

        const {
            page, sort, order
        } = this.state;

        const { tableType } = this.props;

        const params = {
            award_id: this.props.award.id,
            type: tableType,
            limit: this.state.limit,
            page: page[tableType],
            sort: sort[tableType],
            order: order[tableType]
        };

        this.setState({
            inFlight: true,
            error: false
        });

        this.request = IdvHelper.fetchReferencedAwards(params);
        this.request.promise
            .then((res) => {
                this.parseAwards(res.data.results);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }

    pickDefaultTab() {
        const { idvDetails: counts } = this.props.award;
        const tableKeys = tableTypes.map((type) => type.internal);
        const tableCounts = pick(counts, tableKeys);
        const defaultTab = findKey(tableCounts, (count) => count !== 0);
        if (counts.child_awards === 0 && defaultTab) {
            this.switchTab(defaultTab);
        }
        else {
            this.loadResults();
        }
    }

    parseAwards(data) {
        const results = data.map((result) => {
            const referencedAward = Object.create(BaseReferencedAwardResult);
            referencedAward.populate(result);
            return referencedAward;
        });

        this.setState({
            inFlight: false,
            error: false,
            results
        });
    }

    updateSort(newSort, newOrder) {
        const { sort, order } = this.state;
        const { tableType } = this.props;
        const updatedSort = Object.assign({}, sort, {
            [tableType]: newSort
        });
        const updatedOrder = Object.assign({}, order, {
            [tableType]: newOrder
        });
        this.setState({
            sort: updatedSort,
            order: updatedOrder
        }, () => {
            this.loadResults();
        });
    }

    changePage(newPage) {
        const { page } = this.state;
        const updatedPage = Object.assign({}, page, {
            [this.props.tableType]: newPage
        });
        this.setState({
            page: updatedPage
        }, () => {
            this.loadResults();
        });
    }

    switchTab(tableType) {
        this.props.switchTab(tableType);
    }

    render() {
        return (
            <ReferencedAwardsSection
                {...this.state}
                counts={this.props.award.idvDetails}
                switchTab={this.switchTab}
                changePage={this.changePage}
                updateSort={this.updateSort}
                tableType={this.props.tableType}
                tableTypes={tableTypes} />
        );
    }
}

ReferencedAwardsContainer.propTypes = propTypes;
ReferencedAwardsContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        award: state.award
    })
)(ReferencedAwardsContainer);
