/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

// TODO: DEV-7122 Move to new Page Header Component

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Analytics from 'helpers/analytics/Analytics';

import { keywordPageMetaTags } from 'helpers/metaTagHelper';

import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';
import BulkDownloadModalContainer from 'containers/bulkDownload/modal/BulkDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import DownloadIconButton508 from 'components/sharedComponents/buttons/DownloadButton508';

import KeywordSearchBar from './KeywordSearchBar';
import SearchSummary from './SearchSummary';
import NoDownloadHover from '../search/header/NoDownloadHover';

const propTypes = {
    updateKeyword: PropTypes.func,
    keyword: PropTypes.string,
    summary: PropTypes.object,
    summaryInFlight: PropTypes.bool,
    fetchSummary: PropTypes.func,
    download: PropTypes.object,
    startDownload: PropTypes.func,
    downloadAvailable: PropTypes.bool
};

const KeywordPage = ({
    updateKeyword,
    keyword,
    summary,
    summaryInFlight,
    fetchSummary,
    download,
    startDownload,
    downloadAvailable
}) => {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => setShowModal(false);

    useEffect(() => {
        // Need to close the modal once the download is completed
        if (
            showModal &&
            download.expectedUrl === "" &&
            !download.showCollapsedProgress
        ) {
            hideModal();
        }
    }, [download.expectedUrl, download.showCollapsedProgress, showModal]);

    const clickedDownload = () => {
        startDownload();
        setShowModal(true);
        Analytics.event({
            event: 'keyword-download',
            category: 'Keyword Search - Download',
            action: keyword
        });
    };

    return (
        <PageWrapper
            pageName="Keyword Search"
            classNames="usa-da-keyword-page"
            title="Keyword Search"
            metaTagProps={keywordPageMetaTags}
            toolBarComponents={[
                <SearchSummary
                    primeAwardTotal={summary?.primeAmount}
                    primeTransactionCount={summary?.primeCount}
                    inFlight={summaryInFlight}
                    key="SearchSummary"/>,
                <DownloadIconButton508
                    tooltipComponent={(!downloadAvailable && keyword)
                        ? <NoDownloadHover />
                        : null
                    }
                    isEnabled={downloadAvailable}
                    onClick={clickedDownload}
                    key="DownloadIconButton508" />
            ]
                .filter((c, i) => (
                    (i === 1 && !keyword) || keyword)
                )}>
            <main id="main-content">
                <div className="keyword-content">
                    <div className="keyword-search-bar">
                        <KeywordSearchBar
                            keyword={keyword}
                            updateKeyword={updateKeyword} />
                        <div className="keyword-search-bar__info">
                            Use the Keyword Search to get a broad picture of award data on a given theme.
                            To learn more about the fields the Keyword search matches to, read our{" "}
                            <a
                                href="https://onevoicecrm.my.site.com/usaspending/s/recordlist/Knowledge__kav/00B3d000000V4WDEA0"
                                target="_blank"
                                rel="noopener noreferrer">
                                FAQ entry
                            </a> on the topic. For a more targeted search, try our
                            <Link to="/search"> Advanced Search tool</Link>,
                            whose extensive filters let you find more precise data sets.
                        </div>
                    </div>
                    <ResultsTableContainer
                        keyword={keyword}
                        fetchSummary={fetchSummary} />
                </div>
                <BulkDownloadModalContainer
                    mounted={showModal}
                    hideModal={hideModal} />
            </main>
        </PageWrapper>
    );
};

KeywordPage.propTypes = propTypes;
export default KeywordPage;
