/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
    downloadArchivePageMetaTags,
    downloadAwardPageMetaTags,
    downloadAccountPageMetaTags,
    dataDictionaryPageMetaTags
} from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';

import AwardDataContainer from 'containers/bulkDownload/awards/AwardDataContainer';
import AccountDataContainer from 'containers/bulkDownload/accounts/AccountDataContainer';
import AwardDataArchiveContainer from 'containers/bulkDownload/archive/AwardDataArchiveContainer';
import BulkDownloadModalContainer from
    'containers/bulkDownload/modal/BulkDownloadModalContainer';
import DataDictionaryContainer from 'containers/bulkDownload/dictionary/DataDictionaryContainer';
import BulkDownloadSidebar from './sidebar/BulkDownloadSidebar';

const propTypes = {
    dataType: PropTypes.string,
    bulkDownload: PropTypes.object,
    startAwardDownload: PropTypes.func,
    startAccountDownload: PropTypes.func,
    dataTypes: PropTypes.array
};

export default class BulkDownloadPage extends React.Component {
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
        if (this.state.showModal && this.props.bulkDownload.download.expectedUrl === ""
            && !this.props.bulkDownload.download.showCollapsedProgress) {
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
        if (this.props.dataType === 'awards') {
            this.props.startAwardDownload();
        }
        else if (this.props.dataType === 'accounts') {
            this.props.startAccountDownload();
        }

        this.showModal();
    }

    render() {
        let downloadDataContent = (
            <AwardDataContainer
                clickedDownload={this.clickedDownload} />
        );
        let metaTags = downloadAwardPageMetaTags;
        if (this.props.dataType === 'award_data_archive') {
            downloadDataContent = (
                <AwardDataArchiveContainer />
            );
            metaTags = downloadArchivePageMetaTags;
        }
        if (this.props.dataType === 'accounts') {
            downloadDataContent = (
                <AccountDataContainer
                    clickedDownload={this.clickedDownload} />
            );
            metaTags = downloadAccountPageMetaTags;
        }
        if (this.props.dataType === 'data_dictionary') {
            downloadDataContent = (
                <DataDictionaryContainer />
            );
            metaTags = dataDictionaryPageMetaTags;
        }
        return (
            <div className="usa-da-bulk-download-page">
                <MetaTags {...metaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Download Center
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug={'slug'}
                            url={'url'}
                            email={{
                                subject: `Check out Agency  on USAspending.gov!`,
                                body: `Here is the url: `
                            }} />
                    </div>
                </StickyHeader>
                <main
                    id="main-content">
                    <div className="bulk-download">
                        <div className="bulk-download__sidebar">
                            <BulkDownloadSidebar
                                dataTypes={this.props.dataTypes}
                                active={this.props.dataType} />
                        </div>
                        <div className="bulk-download__data">
                            {downloadDataContent}
                        </div>
                        <BulkDownloadModalContainer
                            mounted={this.state.showModal}
                            hideModal={this.hideModal} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

BulkDownloadPage.propTypes = propTypes;

