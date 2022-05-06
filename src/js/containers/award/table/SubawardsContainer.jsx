/**
 * SubawardsContainer.jsx
 * Created by Kevin Li 4/17/17
 */


import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import BaseSubawardRow from 'models/v2/award/subawards/BaseSubawardRow';

import SubawardsTable from 'components/award/subawards/SubawardsTable';

const propTypes = {
    award: PropTypes.object,
    awardId: PropTypes.string
};

const pageLimit = 15;

export class SubawardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            nextPage: false,
            page: 1,
            sort: {
                field: 'subaward_number',
                direction: 'desc'
            },
            error: false,
            tableInstance: `${uniqueId()}`,
            subawards: []
        };

        this.unmounted = false;

        this.subawardRequest = null;
        this.loadNextPage = this.loadNextPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.unmounted = false;
        this.fetchSubawards(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.awardId !== prevProps.awardId) {
            this.fetchSubawards(1, true);
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    fetchSubawards(page = 1, reset = false) {
        if (this.subawardRequest) {
            // cancel in-flight requests
            this.subawardRequest.cancel();
        }

        // Using integer / incremental id until subawards endpoint accepts our generatedId / this.props.awardId
        const awardId = this.props.award.overview.id;

        const params = {
            page,
            limit: pageLimit,
            sort: this.state.sort.field,
            order: this.state.sort.direction,
            award_id: awardId
        };

        this.setState({
            inFlight: true,
            error: false
        });

        this.subawardRequest = SearchHelper.performSubawardSearch(params);

        this.subawardRequest.promise
            .then((res) => {
                if (this.unmounted) {
                    return;
                }

                this.parseSubawards(res.data, reset);
            })
            .catch((err) => {
                if (this.unmounted) {
                    return;
                }

                if (!isCancel(err)) {
                    this.subawardRequest = null;
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }

    parseSubawards(data, reset) {
        const subawards = [];
        data.results.forEach((item) => {
            const subaward = Object.create(BaseSubawardRow);
            subaward.populate(item);
            subawards.push(subaward);
        });

        const newState = {
            page: data.page_metadata.page,
            nextPage: data.page_metadata.hasNext,
            inFlight: false
        };

        if (reset) {
            newState.tableInstance = `${uniqueId()}`;
            newState.subawards = subawards;
        }
        else {
            newState.subawards = this.state.subawards.concat(subawards);
        }

        this.setState(newState);
    }

    changeSort(sort) {
        this.setState({
            sort
        }, () => {
            this.fetchSubawards(1, true);
        });
    }

    loadNextPage() {
        if (!this.state.nextPage || this.state.inFlight) {
            // no more pages
            return;
        }

        const nextPage = this.state.page + 1;
        this.fetchSubawards(nextPage, false);
    }

    render() {
        const award = this.props.award.overview;
        return (
            <SubawardsTable
                {...this.props}
                {...this.state}
                award={award}
                inFlight={this.state.inFlight}
                changeSort={this.changeSort}
                loadNextPage={this.loadNextPage} />
        );
    }
}

SubawardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        award: state.award
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(SubawardsContainer);
