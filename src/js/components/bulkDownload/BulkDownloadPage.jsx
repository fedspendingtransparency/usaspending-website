/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { downloadPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';

import AwardDataContainer from 'containers/bulkDownload/awards/AwardDataContainer';
import BulkDownloadModalContainer from
    'containers/bulkDownload/modal/BulkDownloadModalContainer';
import DownloadSidebar from './sidebar/BulkDownloadSidebar';

const dataTypes = [
    {
        type: 'awards',
        label: 'Award Data',
        disabled: false
    },
    {
        type: 'accounts',
        label: 'Account Data',
        disabled: true
    },
    {
        type: 'files',
        label: 'Agency Submission Files',
        disabled: true
    },
    {
        type: 'snapshots',
        label: 'Database Snapshots',
        disabled: true
    }
];

const propTypes = {
    setDataType: PropTypes.func,
    dataType: PropTypes.string,
    bulkDownload: PropTypes.object
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
    }

    changeDataType(dataType) {
        this.props.setDataType(dataType);
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

    render() {
        const downloadDataContent = (
            <AwardDataContainer
                showModal={this.showModal} />
        );
        return (
            <div className="usa-da-bulk-download-page">
                <MetaTags {...downloadPageMetaTags} />
                <Header />
                <div className="page-title-bar">
                    <div className="page-title-bar-wrap">
                        <h1 className="page-title">
                            Bulk Download
                        </h1>
                    </div>
                </div>
                <main
                    id="main-content"
                    className="main-content">
                    <div className="download-sidebar">
                        <DownloadSidebar
                            dataTypes={dataTypes}
                            changeDataType={this.changeDataType}
                            active={this.props.dataType} />
                        <div className="api-info">
                            <h5>Interested in our API?</h5>
                            <p>
                                Take a look at our <a href="https://api.usaspending.gov/">API documentation</a>.
                            </p>
                        </div>
                    </div>
                    <div className="download-data-wrapper">
                        {downloadDataContent}
                    </div>
                    <BulkDownloadModalContainer
                        mounted={this.state.showModal}
                        hideModal={this.hideModal} />
                </main>
                <Footer
                    bulkDownload={this.props.bulkDownload} />
            </div>
        );
    }
}

BulkDownloadPage.propTypes = propTypes;

