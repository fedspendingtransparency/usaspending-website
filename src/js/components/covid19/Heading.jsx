/**
 * Heading.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { requestFullDownload } from 'helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from '-redux/actions/bulkDownload/bulkDownloadActions';
import Analytics from 'helpers/analytics/Analytics';
import { jumpToSection } from 'helpers/covid19Helper';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import ShareDownloadButtonGroup from 'components/sharedComponents/buttons/ShareDownloadButtonGroup';

const propTypes = {
    publicLaw: PropTypes.string,
    url: PropTypes.string,
    onShareClick: PropTypes.func
};

const Heading = ({ publicLaw, url, onShareClick }) => {
    const jumpToDataSources = () => {
        jumpToSection('data_sources_and_methodology');
    };

    const dispatch = useDispatch();
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);
    const { defcParams } = useSelector((state) => state.covid19);

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        downloadRequest.current = requestFullDownload({ filters: { def_codes: defcParams } }, 'disaster');

        try {
            const { data } = await downloadRequest.current.promise;
            dispatch(setDownloadExpectedUrl(data.file_url));
            dispatch(setDownloadExpectedFile(data.file_name));
            // disable download button
            dispatch(setDownloadPending(true));
            downloadRequest.current = null;
        }
        catch (err) {
            console.error(err);
            downloadRequest.current = null;
        }
        Analytics.event({
            event: 'covid_19_download',
            category: 'COVID-19 - Profile',
            action: 'download',
            gtm: true
        });
    };

    return (
        <FlexGridRow
            className={`heading__container 
            ${publicLaw === 'american-rescue-plan' ? 'information-body-arp' : 'information-body'}`}>
            <FlexGridCol width={10} className="aligned-heading">
                {publicLaw === 'american-rescue-plan' ?
                    <div className="heading__description">
                        <p>In March 2021, the U.S. Congress appropriated additional funds in response to the COVID-19 pandemic through the American Rescue Plan Act of 2021. See how much has been spent, how spending is categorized, who received funding, and more.</p>
                        <p>
                            Visit our <button className="usa-button-link" onClick={jumpToDataSources}> Data Sources & Methodology </button> section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies.
                        </p>
                    </div>
                    :
                    <div className="heading__description">
                        <p>In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation. In March of 2021, additional funds were appropriated through the American Rescue Plan Act.</p>
                        <p>
                            Visit our <button className="usa-button-link" onClick={jumpToDataSources}>Data Sources & Methodology</button> section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies.
                        </p>
                    </div>
                }

            </FlexGridCol>
            <FlexGridCol width={2}>
                <ShareDownloadButtonGroup
                    url={url}
                    showDownloadBtn
                    onDownloadClick={downloadData}
                    downloadInFlight={downloadInFlight}
                    downloadIcon="file-download"
                    onShareClick={onShareClick}
                    className="blue-share" />
            </FlexGridCol>
        </FlexGridRow>
    );
};

Heading.propTypes = propTypes;
export default Heading;
