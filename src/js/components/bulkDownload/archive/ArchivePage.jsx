/**
 * ArchivePage.jsx
 * Created by Kevin Li 11/9/17
 */

import React from 'react';
import { isCancel } from 'axios';

import { downloadPageMetaTags } from 'helpers/metaTagHelper';
import { fetchArchiveURLs } from 'helpers/archiveHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';

import ArchiveTable from './ArchiveTable';

require('pages/bulkDownload/archivePage.scss');

export default class ArchivePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            archive: []
        };

        this.archiveRequest = null;
    }

    componentWillMount() {
        this.loadArchive();
    }

    loadArchive() {
        if (this.archiveRequest) {
            this.archiveRequest.cancel();
        }

        this.archiveRequest = fetchArchiveURLs();
        this.archiveRequest.promise
            .then((res) => {
                this.setState({
                    archive: res.data.archive
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.archiveRequest = null;
                }
            });
    }

    render() {
        return (
            <div className="usa-da-archive-download-page">
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
                        <div className="download-sidebar-content">
                            <ul>
                                <div>
                                    <a
                                        className="sidebar-link active"
                                        href="#/bulk_download">
                                        Go Back
                                    </a>
                                </div>
                            </ul>
                        </div>
                        <div className="api-info">
                            <h5>Interested in our API?</h5>
                            <p>
                                Take a look at our <a target="_blank" rel="noopener noreferrer" href="https://api.usaspending.gov/">API documentation</a>.
                            </p>
                        </div>
                    </div>
                    <div className="download-data-wrapper">
                        <div className="archive-content">
                            <h2>Award Data Archive</h2>
                            <h3>Download historical award data before 2008</h3>
                            <div className="page-description">
                                Below are downloadable .CSV files of award data grouped by fiscal year and split between contract and assistance data.
                            </div>

                            <div className="archive-table-wrapper">
                                <ArchiveTable
                                    data={this.state.archive} />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

