/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as KeywordHelper from 'helpers/keywordHelper';

import KeywordPage from 'components/keyword/KeywordPage';

require('pages/keyword/keywordPage.scss');

const propTypes = {
    bulkDownload: PropTypes.object,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
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

    componentDidMount() {
        this.handleUrl(this.props.match.params.keyword);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
            this.handleUrl(this.props.match.params.keyword);
        }
    }

    handleUrl(urlKeyword) {
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
        else if (this.state.keyword) {
            // The keyword param was removed from the url, reset the keyword
            this.setState({
                keyword: ''
            });
        }
    }

    startDownload() {
        const params = {
            award_levels: ['prime_awards'],
            filters: {
                keyword: this.state.keyword
            }
        };

        this.requestDownload(params);
    }

    requestDownload(params) {
        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = BulkDownloadHelper.requestAwardsDownload(params);

        this.downloadRequest.promise
            .then((res) => {
                this.props.setDownloadExpectedUrl(res.data.file_url);
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
                keyword: this.state.keyword
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
            this.props.history.replace(`/keyword_search/${slug}`);
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
const KeywordContainerWithRouter = withRouter(KeywordContainer);

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(KeywordContainerWithRouter);
