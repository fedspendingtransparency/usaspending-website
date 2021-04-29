/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';

import {
    downloadArchivePageMetaTags,
    downloadAwardPageMetaTags,
    downloadAccountPageMetaTags,
    dataDictionaryPageMetaTags,
    metadataDownloadPageMetaTags
} from 'helpers/metaTagHelper';

import { PageWrapper } from 'components/sharedComponents/Page';
import MetadataDownload from 'components/bulkDownload/MetadataDownload';
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

const metaTagsByDataType = {
    data_dictionary: dataDictionaryPageMetaTags,
    awards: downloadAwardPageMetaTags,
    accounts: downloadAccountPageMetaTags,
    award_data_archive: downloadArchivePageMetaTags,
    dataset_metadata: metadataDownloadPageMetaTags
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
        if (this.props.dataType === 'award_data_archive') {
            downloadDataContent = (
                <AwardDataArchiveContainer />
            );
        }
        if (this.props.dataType === 'accounts') {
            downloadDataContent = (
                <AccountDataContainer
                    clickedDownload={this.clickedDownload} />
            );
        }
        if (this.props.dataType === 'data_dictionary') {
            downloadDataContent = (
                <DataDictionaryContainer />
            );
        }
        if (this.props.dataType === 'dataset_metadata') {
            downloadDataContent = (
                <MetadataDownload />
            );
        }
        return (
            <div className="usa-da-bulk-download-page">
                {Object.keys(metaTagsByDataType).includes(this.props.dataType) && <MetaTags {...metaTagsByDataType[this.props.dataType]} />}
                <Header />
                <PageHeader title="Download Center" stickyBreakPoint={getStickyBreakPointForSidebar()}>
                    <main id="main-content">
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
                </PageHeader>
            </div>
        );
    }
}

BulkDownloadPage.propTypes = propTypes;

