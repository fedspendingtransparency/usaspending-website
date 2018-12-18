/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';
import BulkDownloadModalContainer from
    'containers/bulkDownload/modal/BulkDownloadModalContainer';
import DownloadButton from 'components/search/header/DownloadButton';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import StickyHeader from '../sharedComponents/stickyHeader/StickyHeader';
import Footer from '../sharedComponents/Footer';

import KeywordSearchBar from './KeywordSearchBar';

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

    generateSummary() {
        let formattedPrimeCount = (<span>&nbsp;&mdash;&nbsp;</span>);
        let formattedPrimeAmount = (<span>&nbsp;&mdash;&nbsp;</span>);
        if (!this.props.summaryInFlight) {
            const primeCount = this.props.summary.primeCount;
            const primeAmount = this.props.summary.primeAmount;

            const primeCountUnits = MoneyFormatter.calculateUnitForSingleValue(primeCount);
            const primeAmountUnits = MoneyFormatter.calculateUnitForSingleValue(primeAmount);

            if (primeCountUnits.unit >= MoneyFormatter.unitValues.MILLION) {
                // Abbreviate numbers greater than or equal to 1M
                formattedPrimeCount =
                    `${MoneyFormatter.formatNumberWithPrecision(primeCount / primeCountUnits.unit, 1)}${primeCountUnits.unitLabel}`;
            }
            else {
                formattedPrimeCount =
                    `${MoneyFormatter.formatNumberWithPrecision(primeCount, 0)}`;
            }

            if (primeAmountUnits.unit >= MoneyFormatter.unitValues.MILLION) {
                // Abbreviate amounts greater than or equal to $1M
                formattedPrimeAmount =
                    `${MoneyFormatter.formatMoneyWithPrecision(primeAmount / primeAmountUnits.unit, 1)}${primeAmountUnits.unitLabel}`;
            }
            else {
                formattedPrimeAmount =
                    `${MoneyFormatter.formatMoneyWithPrecision(primeAmount, 0)}`;
            }
        }

        return (
            <div className="keyword-header__summary">
                <div className="keyword-header__summary-title">
                    Search Summary
                </div>
                <div className="keyword-header__summary-award-amounts">
                    <div className="keyword-header__summary-amount">
                        Total Prime Award Amount: <span className="keyword-header__summary-amount keyword-header__summary-amount_bold">{formattedPrimeAmount}</span>
                    </div>
                </div>
                <div className="keyword-header__summary-award-counts">
                    <div className="keyword-header__summary-amount">
                        Prime Award Transaction Count: <span className="keyword-header__summary-amount keyword-header__summary-amount_bold">{formattedPrimeCount}</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let searchSummary = null;
        if (this.props.summary || this.props.summaryInFlight) {
            searchSummary = this.generateSummary();
        }

        return (
            <div
                className="usa-da-keyword-page">
                <MetaTags {...MetaTagHelper.keywordPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="keyword-header">
                        <div className="keyword-header__title">
                            <h1>Keyword Search</h1>
                        </div>
                        {searchSummary}
                        <div className="keyword-header__options">
                            <DownloadButton
                                disableHover={!this.props.keyword}
                                downloadAvailable={this.props.downloadAvailable}
                                onClick={this.clickedDownload} />
                        </div>
                    </div>
                </StickyHeader>
                <main id="main-content">
                    <div className="keyword-content">
                        <div className="keyword-search-bar">
                            <KeywordSearchBar
                                keyword={this.props.keyword}
                                updateKeyword={this.props.updateKeyword} />
                            <div className="keyword-search-bar__info">
                                Use the Keyword Search to get a broad picture of award data on a given theme. To learn more about the fields the Keyword search matches to, read our <a href="https://usaspending-help.zendesk.com/hc/en-us/articles/360001255774-Keyword-Search-Question-How-does-the-Keyword-Search-work-" target="_blank" rel="noopener noreferrer">FAQ entry</a> on the topic. For a more targeted search, try our <a href="/#/search">Advanced Search tool</a>,
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
                <Footer />
            </div>
        );
    }
}


KeywordPage.propTypes = propTypes;
