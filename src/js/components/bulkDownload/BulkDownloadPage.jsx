/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { downloadPageMetaTags } from 'helpers/metaTagHelper';
import { downloadCenterOptions } from 'dataMapping/navigation/menuOptions';
import Router from 'containers/router/Router';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'components/sharedComponents/Footer';

import AwardDataContainer from 'containers/bulkDownload/awards/AwardDataContainer';
import AwardDataArchiveContainer from 'containers/bulkDownload/archive/AwardDataArchiveContainer';
import BulkDownloadModalContainer from
    'containers/bulkDownload/modal/BulkDownloadModalContainer';
import BulkDownloadSidebar from './sidebar/BulkDownloadSidebar';

const propTypes = {
    setDataType: PropTypes.func,
    dataType: PropTypes.string,
    bulkDownload: PropTypes.object,
    startDownload: PropTypes.func
};

export default class BulkDownloadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.changeDataType = this.changeDataType.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.clickedDownload = this.clickedDownload.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Need to close the modal once the download is completed
        if (this.state.showModal && nextProps.bulkDownload.download.expectedUrl === ""
            && !nextProps.bulkDownload.download.showCollapsedProgress) {
            this.hideModal();
        }
    }

    changeDataType(dataType) {
        this.props.setDataType(dataType);
        Router.history.replace('/bulk_download');
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
        return (
            <div className="usa-da-bulk-download-page">
                <MetaTags {...downloadPageMetaTags} />
                <Header />
                <main
                    id="main-content">
                    <StickyHeader>
                        <div className="sticky-header__title">
                            <h1 tabIndex={-1} id="main-focus">
                                Download Center
                            </h1>
                        </div>
                    </StickyHeader>
                    <div className="bulk-download-content">
                        <div className="download-sidebar">
                            <BulkDownloadSidebar
                                dataTypes={downloadCenterOptions}
                                changeDataType={this.changeDataType}
                                active={this.props.dataType} />
                            <div className="api-info">
                                <h5>Interested in our API?</h5>
                                <p>
                                    Take a look at our <a target="_blank" rel="noopener noreferrer" href="https://api.usaspending.gov/">API documentation</a>.
                                </p>
                            </div>
                        </div>
                        <div className="download-data-wrapper">
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

