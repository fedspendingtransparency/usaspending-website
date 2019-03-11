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
        label: 'Contract IDVs',
        internal: 'idvs',
        enabled: true
    },
    {
        label: 'Contracts',
        internal: 'contracts',
        enabled: true
    }
];

export class ReferencedAwardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            limit: 10,
            tableType: 'idvs',
            sort: 'period_of_performance_start_date',
            order: 'desc',
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

        const params = {
            award_id: this.props.award.id,
            idv: this.state.tableType === 'idvs',
            limit: this.state.limit,
            page: this.state.page,
            sort: this.state.sort,
            order: this.state.order
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
        const counts = this.props.award.counts;
        if (counts.idvs === 0 && counts.contracts !== 0) {
            this.switchTab('contracts');
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

    updateSort(sort, order) {
        this.setState({
            sort,
            order,
            page: 1
        }, () => {
            this.loadResults();
        });
    }

    changePage(page) {
        this.setState({
            page
        }, () => {
            this.loadResults();
        });
    }

    switchTab(tableType) {
        if (tableType !== this.state.tableType) {
            this.setState({
                tableType,
                page: 1
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
