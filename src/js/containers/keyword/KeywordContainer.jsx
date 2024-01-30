/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';

import Analytics from 'helpers/analytics/Analytics';

import {
    setDownloadExpectedUrl,
    setDownloadExpectedFile,
    setDownloadPending
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as KeywordHelper from 'helpers/keywordHelper';

import KeywordPage from 'components/keyword/KeywordPage';

require('pages/keyword/keywordPage.scss');

const propTypes = {
    match: PropTypes.object
};

const KeywordContainer = (props) => {
    const [keyword, setKeyword] = useState('');
    const [summary, setSummary] = useState(null);
    const [summaryInFlight, setSummaryInFlight] = useState(false);
    const [downloadAvailable, setDownloadAvailable] = useState(false);
    let summaryRequest = null;
    let downloadRequest = null;
    const history = useHistory();
    const dispatch = useDispatch();

    const downloadObject = useSelector((state) => state.bulkDownload.download);

    const handleUrl = useCallback((urlKeyword) => {
        if (urlKeyword) {
            // Convert the url to a keyword
            setKeyword(decodeURIComponent(urlKeyword));
            // Update the keyword only if it has more than two characters
            if (keyword.length > 2) {
                setKeyword(keyword);
            }
        }
        else if (keyword) {
            // The keyword param was removed from the url, reset the keyword
            setKeyword('');
        }
    });

    const updateKeyword = (keywordParam) => {
        // Convert the keyword to a url slug
        const slug = encodeURIComponent(keywordParam);
        setKeyword(keywordParam);

        // update the url
        history.replace(`/keyword_search/${slug}`);

        Analytics.event({
            event: 'keyword',
            category: 'Keyword Search - Keyword',
            action: keywordParam
        });
    };

    const requestDownload = (params) => {
        if (downloadRequest) {
            downloadRequest.cancel();
        }

        downloadRequest = BulkDownloadHelper.requestAwardsDownload(params);

        downloadRequest.promise
            .then((res) => {
                dispatch(setDownloadExpectedUrl(res.data.file_url));
                dispatch(setDownloadExpectedFile(res.data.file_name));
                dispatch(setDownloadPending(true));
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
    };

    const startDownload = () => {
        const params = {
            award_levels: ['prime_awards'],
            filters: {
                keyword
            }
        };

        requestDownload(params);
    };

    const fetchSummary = () => {
        if (summaryRequest) {
            summaryRequest.cancel();
        }

        setSummaryInFlight(true);

        const params = {
            filters: {
                keyword
            }
        };

        summaryRequest = KeywordHelper.fetchSummary(params);

        summaryRequest.promise
            .then((res) => {
                const results = res.data.results;
                const recordLimit = 500000;
                setDownloadAvailable(results.prime_awards_count < recordLimit);
                setSummaryInFlight(false);
                setSummary({
                    primeCount: results.prime_awards_count,
                    primeAmount: results.prime_awards_obligation_amount
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setSummaryInFlight(false);
                    console.log(err);
                    summaryRequest.cancel();
                }
            });
    };

    useEffect(() => {
        handleUrl(props.match.params.keyword);
    }, [handleUrl, props.match.params.keyword]);

    return (
        <KeywordPage
            updateKeyword={updateKeyword}
            keyword={keyword}
            summary={summary}
            summaryInFlight={summaryInFlight}
            fetchSummary={fetchSummary}
            download={downloadObject}
            downloadAvailable={downloadAvailable}
            startDownload={startDownload} />
    );
};

KeywordContainer.propTypes = propTypes;
export default KeywordContainer;
