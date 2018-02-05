/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';
import BulkDownloadModalContainer from
    'containers/bulkDownload/modal/BulkDownloadModalContainer';
import DownloadButton from 'components/search/header/DownloadButton';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import StickyHeader from '../sharedComponents/stickyHeader/StickyHeader';
import Footer from '../sharedComponents/Footer';

import KeywordSearchBar from './KeywordSearchBar';
import KeywordSearchHover from './KeywordSearchHover';

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
            showHover: false,
            showModal: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.clickedDownload = this.clickedDownload.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Need to close the modal once the download is completed
        if (this.state.showModal && nextProps.download.expectedUrl === ""
            && !nextProps.download.showCollapsedProgress) {
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
    }

    showTooltip() {
        this.setState({
            showHover: true
        });
    }

    closeTooltip() {
        this.setState({
            showHover: false
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
                        Total Prime Award Amount: <span className="keyword-header__summary-amount_bold">{formattedPrimeAmount}</span>
                    </div>
                </div>
                <div className="keyword-header__summary-award-counts">
                    <div className="keyword-header__summary-amount">
                        Prime Award Transaction Count: <span className="keyword-header__summary-amount_bold">{formattedPrimeCount}</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let hover = null;
        if (this.state.showHover) {
            hover = (<KeywordSearchHover
                closeTooltip={this.closeTooltip} />);
        }

        let searchSummary = null;
        if (this.props.summary || this.props.summaryInFlight) {
            searchSummary = this.generateSummary();
        }

        return (
            <div
                className="usa-da-keyword-page">
                <MetaTags {...MetaTagHelper.keywordPageMetaTags} />
                <Header />
                <main id="main-content">
                    <StickyHeader>
                        <div className="keyword-header">
                            <div className="keyword-header__title">
                                <h1>Keyword Search</h1>
                            </div>
                            {searchSummary}
                            <div className={`keyword-header__options ${this.props.keyword ? '' : 'no-hover'}`}>
                                <DownloadButton
                                    downloadAvailable={this.props.downloadAvailable}
                                    onClick={this.clickedDownload} />
                            </div>
                        </div>
                    </StickyHeader>
                    <div className="keyword-content">
                        <div className="search-bar-section">
                            <KeywordSearchBar
                                updateKeyword={this.props.updateKeyword} />
                            <div className="info-text">
                                Use the Keyword Search to get a broad picture of award data on a given theme.
                                You can search through only award descriptions, or award descriptions plus other
                                attributes.
                                <div className="info-wrap">
                                    {hover}
                                    <button
                                        onClick={this.showTooltip}
                                        className="icon">
                                        <InfoCircle />
                                    </button>
                                </div>
                                For a more targeted search, use our <a href="/#/search">Advanced Search tool</a>,
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
