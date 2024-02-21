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
    metadataDownloadPageMetaTags
} from 'helpers/metaTagHelper';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import MetadataDownload from 'components/bulkDownload/MetadataDownload';
import AwardDataContainer from 'containers/bulkDownload/awards/AwardDataContainer';
import AccountDataContainer from 'containers/bulkDownload/accounts/AccountDataContainer';
import AwardDataArchiveContainer from 'containers/bulkDownload/archive/AwardDataArchiveContainer';
import BulkDownloadModalContainer from 'containers/bulkDownload/modal/BulkDownloadModalContainer';

const propTypes = {
    dataType: PropTypes.string,
    bulkDownload: PropTypes.object,
    startAwardDownload: PropTypes.func,
    startAccountDownload: PropTypes.func,
    dataTypes: PropTypes.array
};

const metaTagsByDataType = {
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
        let awardDataArchiveClass = '';
        let downloadDataContent = (
            <AwardDataContainer
                clickedDownload={this.clickedDownload} />
        );
        if (this.props.dataType === 'award_data_archive') {
            downloadDataContent = (
                <AwardDataArchiveContainer />
            );
            awardDataArchiveClass = 'award-data-archive-special-width';
        }
        if (this.props.dataType === 'accounts') {
            downloadDataContent = (
                <AccountDataContainer
                    clickedDownload={this.clickedDownload} />
            );
        }
        if (this.props.dataType === 'dataset_metadata') {
            downloadDataContent = (
                <MetadataDownload />
            );
        }
        return (
            <PageWrapper
                pageName="Download Center"
                classNames="usa-da-bulk-download-page"
                title="Download Center"
                metaTagProps={this.props.dataType in metaTagsByDataType ? metaTagsByDataType[this.props.dataType] : {}}>
                <main id="main-content">
                    <div className={`bulk-download ${awardDataArchiveClass}`}>
                        <div className="bulk-download__data">
                            {downloadDataContent}
                        </div>
                        <BulkDownloadModalContainer
                            mounted={this.state.showModal}
                            hideModal={this.hideModal} />
                    </div>
                </main>
            </PageWrapper>
        );
    }
}

BulkDownloadPage.propTypes = propTypes;

