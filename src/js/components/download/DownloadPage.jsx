/**
 * DownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';

import { downloadPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';

import AwardDataContainer from 'containers/download/AwardDataContainer';
import DownloadSidebar from './sidebar/DownloadSidebar';

require('pages/download/downloadPage.scss');

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

export default class DownloadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataType: 'awards'
        };

        this.changeDataType = this.changeDataType.bind(this);
    }

    changeDataType(dataType) {
        this.setState({
            dataType
        });
    }

    render() {
        const downloadDataContent = (
            <AwardDataContainer />
        );
        return (
            <div className="usa-da-download-page">
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
                            active={this.state.dataType} />
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
                </main>
                <Footer />
            </div>
        );
    }
}

