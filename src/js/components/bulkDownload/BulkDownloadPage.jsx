/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    downloadArchivePageMetaTags,
    downloadAwardPageMetaTags,
    downloadAccountPageMetaTags,
    metadataDownloadPageMetaTags
} from 'helpers/metaTagHelper';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
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
    startAccountDownload: PropTypes.func
};

const metaTagsByDataType = {
    awards: downloadAwardPageMetaTags,
    accounts: downloadAccountPageMetaTags,
    award_data_archive: downloadArchivePageMetaTags,
    dataset_metadata: metadataDownloadPageMetaTags
};

const BulkDownloadPage = ({
    dataType,
    bulkDownload,
    startAwardDownload,
    startAccountDownload
}) => {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => setShowModal(false);

    useEffect(() => {
        if (
            showModal &&
            bulkDownload.download.expectedUrl === "" &&
            !bulkDownload.download.showCollapsedProgress
        ) {
            hideModal();
        }
    }, [bulkDownload.download.expectedUrl, bulkDownload.download.showCollapsedProgress, showModal]);

    const clickedDownload = () => {
        if (dataType === 'awards') {
            startAwardDownload();
        }
        else if (dataType === 'accounts') {
            startAccountDownload();
        }

        setShowModal(true);
    };

    let awardDataArchiveClass = '';
    let downloadDataContent = (<AwardDataContainer clickedDownload={clickedDownload} />);

    if (dataType === 'award_data_archive') {
        downloadDataContent = (<AwardDataArchiveContainer />);
        awardDataArchiveClass = 'award-data-archive-special-width';
    }

    if (dataType === 'accounts') {
        downloadDataContent = (<AccountDataContainer clickedDownload={clickedDownload} />);
    }

    if (dataType === 'dataset_metadata') {
        downloadDataContent = (<MetadataDownload />);
    }

    return (
        <PageWrapper
            pageName="Download Center"
            classNames="usa-da-bulk-download-page"
            title="Download Center"
            metaTagProps={
                dataType in metaTagsByDataType ?
                    metaTagsByDataType[dataType] :
                    {}
            }>
            <main id="main-content">
                <FlexGridRow style={{ justifyContent: 'center' }}>
                    <FlexGridCol width={12} className={`bulk-download ${awardDataArchiveClass}`}>
                        <div className="bulk-download__data">
                            {downloadDataContent}
                        </div>
                        <BulkDownloadModalContainer
                            mounted={showModal}
                            hideModal={hideModal} />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

BulkDownloadPage.propTypes = propTypes;
export default BulkDownloadPage;
