/**
 * BulkDownloadPage.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import IsMobileContext from "context/IsMobileContext";
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
import AwardsUserSelections from './awards/AwardsUserSelections';
import AccountUserSelections from './accounts/AccountUserSelections';
import AwardDataArchiveUserSelections from "./archive/AwardDataArchiveUserSelections";
import { currentFiscalYear } from "helpers/fiscalYearHelper";

import DownloadInfoSection from './DownloadInfoSection';

const propTypes = {
    dataType: PropTypes.string,
    bulkDownload: PropTypes.object,
    startAwardDownload: PropTypes.func,
    startAccountDownload: PropTypes.func
};

const currentFY = currentFiscalYear();

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
    const { isTablet } = useContext(IsMobileContext);
    const [showModal, setShowModal] = useState(false);
    // filters and results for Award Data Archive
    const [filters, setFilters] = useState({
        agency: { id: 'all', name: 'All' },
        type: { name: 'contracts', display: 'Contracts' },
        fy: `${currentFY}`
    });
    const [results, setResults] = useState([]);

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

    let downloadDataContent;
    let userSelections;
    let title;

    switch (dataType) {
        case 'award_data_archive':
            downloadDataContent = (
                <AwardDataArchiveContainer
                    filters={filters}
                    setFilters={setFilters}
                    results={results}
                    setResults={setResults}/>
            );
            userSelections = (
                <AwardDataArchiveUserSelections filters={filters} results={results} />
            );
            title = "Award Data Archive";
            break;
        case 'accounts':
            downloadDataContent = (<AccountDataContainer clickedDownload={clickedDownload} />);
            userSelections = (<AccountUserSelections />);
            title = "Custom Account Data";
            break;
        case 'dataset_metadata': downloadDataContent = (<MetadataDownload />); break;
        default:
            downloadDataContent = (<AwardDataContainer clickedDownload={clickedDownload} />);
            userSelections = (<AwardsUserSelections />);
            title = "Custom Award Data";
    }

    return (
        <PageWrapper
            pageName={title}
            classNames="usa-da-bulk-download-page"
            title={title}
            metaTagProps={
                dataType in metaTagsByDataType ?
                    metaTagsByDataType[dataType] :
                    {}
            }>
            <main id="main-content">
                <FlexGridRow className="bulk-download__row">
                    <FlexGridCol
                        width={isTablet || !userSelections ? 12 : 8}
                        className="bulk-download">
                        <div className="bulk-download__data">{downloadDataContent}</div>
                        <BulkDownloadModalContainer mounted={showModal} hideModal={hideModal} />
                    </FlexGridCol>
                    { userSelections && !isTablet &&
                        <FlexGridCol
                            width={4}
                            className="bulk-download">
                            {userSelections}
                        </FlexGridCol>
                    }
                </FlexGridRow>
                <FlexGridRow className="download-info-wrapper">
                    <hr />
                    <FlexGridCol
                        width={isTablet ? 12 : 8}
                        className="download-info">
                        <DownloadInfoSection dataType />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

BulkDownloadPage.propTypes = propTypes;
export default BulkDownloadPage;
