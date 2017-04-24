/**
 * SubawardsContainer.jsx
 * Created by Kevin Li 4/17/17
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import _ from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import SubawardItem from 'models/results/award/SubawardItem';

import SubawardsTable from 'components/award/subawards/SubawardsTable';

const propTypes = {
    award: React.PropTypes.object,
    sort: React.PropTypes.object,
    meta: React.PropTypes.object,
    setSubawards: React.PropTypes.func,
    appendSubawards: React.PropTypes.func,
    setSubawardMeta: React.PropTypes.func
};

const pageLimit = 13;

export class SubawardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false
        };

        this.unmounted = false;

        this.subawardRequest = null;
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        this.unmounted = false;
        this.fetchSubawards(1, true);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.award.id !== this.props.award.id) {
            this.fetchSubawards(1, true);
        }
        else if (prevProps.sort !== this.props.sort) {
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

        let order = this.props.sort.field;
        if (this.props.sort.direction === 'desc') {
            order = `-${this.props.sort.field}`;
        }

        const params = {
            page,
            limit: pageLimit,
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: this.props.award.id
                }
            ],
            order: [order]
        };

        this.setState({
            inFlight: true
        });

        this.subawardRequest = SearchHelper.performSubawardSearch(params);

        this.subawardRequest.promise
            .then((res) => {
                if (this.unmounted) {
                    return;
                }

                this.setState({
                    inFlight: false
                });

                this.parseSubawards(res.data, reset);
            })
            .catch((err) => {
                if (this.unmounted) {
                    return;
                }

                if (!isCancel(err)) {
                    this.subawardRequest = null;
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseSubawards(data, reset) {
        const subawards = [];
        data.results.forEach((item) => {
            const subaward = new SubawardItem(item);
            subawards.push(subaward);
        });

        if (reset) {
            this.props.setSubawards(subawards);
            this.props.setSubawardMeta({
                page: data.page_metadata.page,
                hasNext: data.page_metadata.has_next_page,
                render: _.uniqueId(),
                group: _.uniqueId()
            });
        }
        else {
            this.props.appendSubawards(subawards);
            this.props.setSubawardMeta({
                page: data.page_metadata.page,
                hasNext: data.page_metadata.has_next_page,
                render: _.uniqueId()
            });
        }
    }

    loadNextPage() {
        if (!this.props.meta.hasNext) {
            // no more pages
            return;
        }

        const nextPage = this.props.meta.page + 1;
        this.fetchSubawards(nextPage, false);
    }

    render() {
        return (
            <SubawardsTable
                {...this.props}
                inFlight={this.state.inFlight}
                loadNextPage={this.loadNextPage} />
        );
    }
}

SubawardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        award: state.award.selectedAward,
        subawards: state.award.subawards,
        meta: state.award.subawardMeta,
        sort: state.award.subawardSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(SubawardsContainer);
