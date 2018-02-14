/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';

import Analytics from 'helpers/analytics/Analytics';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as KeywordHelper from 'helpers/keywordHelper';

import KeywordPage from 'components/keyword/KeywordPage';

require('pages/keyword/keywordPage.scss');

const propTypes = {
    params: PropTypes.object,
    bulkDownload: PropTypes.object,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func
};

export class KeywordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            summary: null,
            summaryInFlight: false,
            downloadAvailable: false
        };

        this.summaryRequest = null;
        this.downloadRequest = null;

        this.updateKeyword = this.updateKeyword.bind(this);
        this.fetchSummary = this.fetchSummary.bind(this);
        this.startDownload = this.startDownload.bind(this);
    }

    componentWillMount() {
        this.handleInitialUrl(this.props.params.keyword);
    }

    componentWillReceiveProps(nextProps) {
        const nextKeywordUrl = nextProps.params.keyword;
        if (nextKeywordUrl) {
            // Convert the url to a keyword
            const nextKeyword = decodeURIComponent(nextKeywordUrl);
            // Update the keyword only if it has changed and is more than two characters
            if (nextKeyword !== this.state.keyword && nextKeyword.length > 2) {
                this.setState({
                    keyword: nextKeyword
                });
            }
        }
        else {
            // The keyword param was removed from the url, reset the keyword
            this.setState({
                keyword: ''
            });
        }
    }

    handleInitialUrl(urlKeyword) {
        if (urlKeyword) {
            // Convert the url to a keyword
            const keyword = decodeURIComponent(urlKeyword);
            // Update the keyword only if it has more than two characters
            if (keyword.length > 2) {
                this.setState({
                    keyword
                });
            }
        }
    }

    startDownload() {
        const params = {
            award_levels: ['prime_awards'],
            filters: {
                keyword: this.state.keyword
            }
        };

        this.requestDownload(params, 'awards');
    }

    requestDownload(params, type) {
        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = BulkDownloadHelper.requestBulkDownload(params, type);

        this.downloadRequest.promise
            .then((res) => {
                this.props.setDownloadExpectedUrl(res.data.url);
                this.props.setDownloadExpectedFile(res.data.file_name);
                this.props.setDownloadPending(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    else {
                        console.log(err.message);
                    }
                }
            });
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
                const recordLimit = 500000;
                const downloadAvailable = results.prime_awards_count < recordLimit;
                this.setState({
                    summaryInFlight: false,
                    summary: {
                        primeCount: results.prime_awards_count,
                        primeAmount: results.prime_awards_obligation_amount
                    },
                    downloadAvailable
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
        // Convert the keyword to a url slug
        const slug = encodeURIComponent(keyword);
        this.setState({
            keyword
        }, () => {
            // update the url
            Router.history.replace(`/keyword_search/${slug}`);
            Analytics.event({
                category: 'Keyword Search - Keyword',
                action: keyword
            });
        });
    }

    render() {
        return (
            <KeywordPage
                updateKeyword={this.updateKeyword}
                keyword={this.state.keyword}
                summary={this.state.summary}
                summaryInFlight={this.state.summaryInFlight}
                fetchSummary={this.fetchSummary}
                download={this.props.bulkDownload.download}
                downloadAvailable={this.state.downloadAvailable}
                startDownload={this.startDownload} />
        );
    }
}

KeywordContainer.propTypes = propTypes;
export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(KeywordContainer);
