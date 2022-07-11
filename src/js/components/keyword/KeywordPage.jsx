/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

// TODO: DEV-7122 Move to new Page Header Component

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DownloadIconButton } from 'data-transparency-ui';

import Analytics from 'helpers/analytics/Analytics';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';
import BulkDownloadModalContainer from 'containers/bulkDownload/modal/BulkDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';

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

export default class KeywordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.clickedDownload = this.clickedDownload.bind(this);
    }

    componentDidUpdate() {
    // Need to close the modal once the download is completed
        if (this.state.showModal && this.props.download.expectedUrl === ""
            && !this.props.download.showCollapsedProgress) {
            this.hideModal();
        }
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }

    clickedDownload() {
        this.props.startDownload();
        this.showModal();
        Analytics.event({
            category: 'Keyword Search - Download',
            action: this.props.keyword
        });
    }

    render() {
        return (
            <PageWrapper
                pageName="Keyword Search"
                classNames="usa-da-keyword-page"
                title="Keyword Search"
                metaTagProps={MetaTagHelper.keywordPageMetaTags}
                toolBarComponents={[
                    <SearchSummary
                        primeAwardTotal={this.props.summary?.primeAmount}
                        primeTransactionCount={this.props.summary?.primeCount}
                        inFlight={this.props.summaryInFlight} />,
                    <DownloadIconButton
                        tooltipComponent={(!this.props.downloadAvailable && this.props.keyword)
                            ? <NoDownloadHover />
                            : null
                        }
                        isEnabled={this.props.downloadAvailable}
                        onClick={this.clickedDownload} />
                ]
                    .filter((c, i) => (
                        (i === 1 && !this.props.keyword) || this.props.keyword)
                    )}>
                <main id="main-content">
                    <div className="keyword-content">
                        <div className="keyword-search-bar">
                            <KeywordSearchBar
                                keyword={this.props.keyword}
                                updateKeyword={this.props.updateKeyword} />
                            <div className="keyword-search-bar__info">
                                Use the Keyword Search to get a broad picture of award data on a given theme. To learn more about the fields the Keyword search matches to, read our <a href="https://fiscalservice.force.com/usaspending/s/article/FAQ-How-does-the-Keyword-Search-work" target="_blank" rel="noopener noreferrer">FAQ entry</a> on the topic. For a more targeted search, try our <Link to="/search">Advanced Search tool</Link>,
                                whose extensive filters let you find more precise data sets.
                            </div>
                        </div>
                        <ResultsTableContainer
                            keyword={this.props.keyword}
                            fetchSummary={this.props.fetchSummary} />
                    </div>
                    <BulkDownloadModalContainer
                        mounted={this.state.showModal}
                        hideModal={this.hideModal} />
                </main>
            </PageWrapper>
        );
    }
}


KeywordPage.propTypes = propTypes;
