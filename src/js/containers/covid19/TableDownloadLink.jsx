/**
 * DownloadButtonContainer.jsx
 * Created by Lizzie Salita 7/9/20
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { requestFullDownloadRecipient } from 'helpers/downloadHelper';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import TableDownloadIconButton from 'components/covid19/TableDownloadIconButton';

const propTypes = {
    defCodes: PropTypes.array.isRequired,
    awardTypeCodes: PropTypes.array
};

const TableDownloadLink = ({ defCodes, awardTypeCodes }) => {
    const dispatch = useDispatch();
    const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
    const downloadRequest = useRef(null);

    const downloadData = async () => {
        dispatch(setDownloadCollapsed(true));

        if (downloadRequest.current) {
            downloadRequest.cancel();
        }

        if (awardTypeCodes && awardTypeCodes.length > 0) {
            // if we have award type codes then the "All" tab is not selected
            downloadRequest.current = requestFullDownloadRecipient({
                filters: {
                    def_codes: defCodes,
                    award_type_codes: awardTypeCodes
                }
            });
        } else {
            // if awardTypeCodes is null then the "All" tab was selected
            downloadRequest.current = requestFullDownloadRecipient({
                filters: {
                    def_codes: defCodes
                }
            });
        }


        try {
            const { data } = await downloadRequest.current.promise;
            dispatch(setDownloadExpectedUrl(data.file_url));
            dispatch(setDownloadExpectedFile(data.file_name));
            // disable download button
            dispatch(setDownloadPending(true));
            downloadRequest.current = null;
        }
        catch (err) {
            console.log(err);
            downloadRequest.current = null;
        }
    };

    return (
        <TableDownloadIconButton
            downloadInFlight={downloadInFlight}
            onClick={downloadData}
            alternativeStyle />
    );
};

TableDownloadLink.propTypes = propTypes;
export default TableDownloadLink;
