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

const mockSubawards = [
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    },
    {
        award: 8914,
        recipient: {
            recipient_name: "NAME OF COMPANY"
        },
        action_date: "2016-11-30",
        description: "test 123",
        amount: 1234.50,
        subaward_number: 2
    }];

export class SubawardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false
        };

        this.subawardRequest = null;
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
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

    fetchSubawards(page = 1, reset = false) {
        if (this.subawardRequest) {
            // cancel in-flight requests
            this.subawardRequest.cancel();
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
            ]
        };

        this.setState({
            inFlight: true
        });

        this.subawardRequest = SearchHelper.performSubawardSearch(params);

        this.subawardRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                const mockData = {
                    page_metadata: {
                        page: 1,
                        has_next_page: false
                    },
                    results: mockSubawards
                };
                this.parseSubawards(mockData, reset);
            })
            .catch((err) => {
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
