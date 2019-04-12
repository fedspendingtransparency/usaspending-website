/**
  * ReferencedAwardsContainer.jsx
  * Created by Lizzie Salita 2/14/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { isEqual } from 'lodash';

import * as IdvHelper from 'helpers/idvHelper';
import BaseReferencedAwardResult from 'models/v2/awardsV2/BaseReferencedAwardResult';
import ReferencedAwardsSection from 'components/awardv2/idv/referencedAwards/ReferencedAwardsSection';

const propTypes = {
    award: PropTypes.object
};

const tableTypes = [
    {
        label: 'Child Awards',
        internal: 'child_awards',
        enabled: true
    },
    {
        label: 'Child IDVs',
        internal: 'child_idvs',
        enabled: true
    },
    {
        label: 'Grandchild Awards',
        internal: 'grandchild_awards',
        enabled: true
    }
];

export class ReferencedAwardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            tableType: 'child_idvs',
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
            inFlight: true,
            error: false,
            results: []
        };

        this.request = null;

        this.switchTab = this.switchTab.bind(this);
        this.changePage = this.changePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        if (this.props.award.id && this.props.award.counts) {
            this.pickDefaultTab();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id || !isEqual(this.props.award.counts, prevProps.award.counts)) {
            this.pickDefaultTab();
        }
    }

    loadResults() {
        if (this.request) {
            this.request.cancel();
        }

        const {
            tableType, page, sort, order
        } = this.state;

        const params = {
            award_id: this.props.award.id,
            type: this.state.tableType,
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
        const { counts } = this.props.award;
        if (counts.child_idvs === 0 && counts.child_awards !== 0) {
            this.switchTab('child_awards');
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
        const { tableType, sort, order } = this.state;
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
        const { tableType, page } = this.state;
        const updatedPage = Object.assign({}, page, {
            [tableType]: newPage
        });
        this.setState({
            page: updatedPage
        }, () => {
            this.loadResults();
        });
    }

    switchTab(tableType) {
        if (tableType !== this.state.tableType) {
            this.setState({
                tableType
            }, () => {
                this.loadResults();
            });
        }
    }

    render() {
        return (
            <ReferencedAwardsSection
                {...this.state}
                counts={this.props.award.counts}
                switchTab={this.switchTab}
                changePage={this.changePage}
                updateSort={this.updateSort}
                tableTypes={tableTypes} />
        );
    }
}

ReferencedAwardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        award: state.awardV2
    })
)(ReferencedAwardsContainer);
