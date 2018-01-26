/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import { isCancel } from 'axios';

import * as KeywordHelper from 'helpers/keywordHelper';

import KeywordPage from 'components/keyword/KeywordPage';

require('pages/keyword/keywordPage.scss');

export default class KeywordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            summary: null,
            summaryInFlight: false
        };

        this.summaryRequest = null;

        this.updateKeyword = this.updateKeyword.bind(this);
        this.fetchSummary = this.fetchSummary.bind(this);
    }

    fetchSummary() {
        if (this.summaryRequest) {
            this.summaryRequest.cancel();
        }

        this.setState({
            summaryInFlight: true
        });

        const params = {
            filters: {
                keyword: this.state.keyword,
                // temporarily hard-code FYs 2015, 2016, & 2017 to match the data in elastic search
                time_period: [
                    {
                        start_date: "2014-10-01",
                        end_date: "2015-09-30"
                    },
                    {
                        start_date: "2015-10-01",
                        end_date: "2016-09-30"
                    },
                    {
                        start_date: "2016-10-01",
                        end_date: "2017-09-30"
                    }
                ]
            }
        };

        this.summaryRequest = KeywordHelper.fetchSummary(params);
        this.summaryRequest.promise
            .then((res) => {
                const results = res.data.results;
                this.setState({
                    summaryInFlight: false,
                    summary: {
                        primeCount: results.prime_awards_count,
                        primeAmount: results.prime_awards_obligation_amount
                    }
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        summaryInFlight: false
                    });
                    console.log(err);
                    this.summaryRequest = null;
                }
            });
    }

    updateKeyword(keyword) {
        this.setState({
            keyword
        });
    }

    render() {
        return (
            <KeywordPage
                updateKeyword={this.updateKeyword}
                keyword={this.state.keyword}
                summary={this.state.summary}
                summaryInFlight={this.state.summaryInFlight}
                fetchSummary={this.fetchSummary} />
        );
    }
}
