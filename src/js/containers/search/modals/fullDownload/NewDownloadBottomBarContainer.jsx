/**
 * NewDownloadBottomBarContainer.jsx
 * Created by Kevin Li 8/8/17
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { isCancel } from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transitioning';
import { isEmpty } from 'lodash-es';
import { setDownloadExpectedFile, setDownloadExpectedUrl, setDownloadPending, setDownloadCollapsed, resetDownload } from 'redux/actions/search/downloadActions';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import DownloadBottomBar from 'components/search/modals/fullDownload/DownloadBottomBar';
import { requestDownloadStatus, requestFullDownloadNew } from 'helpers/downloadHelper';

const propTypes = {
    download: PropTypes.object,
    filters: PropTypes.object,
    columns: PropTypes.array
};

const NewDownloadBottomBarContainer = ({ download, filters, columns }) => {
    const [visible, setVisible] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { expectedFile, expectedUrl } = useSelector((state) => state.download);
    const [title, setTitle] = useState('We\'re preparing your download(s)...');
    const [descriptionOne, setDescriptionOne] = useState('Action Required: This download link is temporary and will expire. Be sure to download your files before the link becomes inactive. Copy the ');
    const [descriptionTwo, setDescriptionTwo] = useState(' in your browser\'s address bar before closing this page.');
    const downloadRequest = useRef(null);
    const statusRequest = useRef(null);
    const dispatch = useDispatch();
    const statusTimer = useRef(null);
    const statusCount = useRef(0);
    const windowWillClose = (e) => {
    /* eslint-disable no-param-reassign */
    // we need to modify the browser event to trigger a warning message
        e.returnValue = `You have a file that is still being generated. If you leave, the file \
will no longer download to your computer. Are you sure you want to do this?`;
    /* eslint-enable no-param-reassign */
    };

    const closeBar = useCallback(() => {
    // stop monitoring for window close events
        window.removeEventListener('beforeunload', windowWillClose);
        dispatch(resetDownload());
        setVisible(false);
        setShowError(false);
        setShowSuccess(false);
        dispatch(setDownloadExpectedFile(''));
        dispatch(setDownloadExpectedUrl(''));
    }, [dispatch]);

    const downloadFile = useCallback((fileUrl) => {
    // stop monitoring for window close events
        window.removeEventListener('beforeunload', windowWillClose);

        // start the download
        window.open(fileUrl, '_self');

        // update redux
        dispatch(setDownloadPending(false));
        dispatch(setDownloadCollapsed(false));

        setShowSuccess(true);
        setTitle('Your file is ready for download.');
        setDescriptionOne('Your download should begin automatically.');
        window.setTimeout(closeBar, 5000);
    }, [closeBar, dispatch]);

    const displayError = useCallback((message) => {
        // update redux
        dispatch(setDownloadPending(false));
        dispatch(setDownloadCollapsed(false));

        setShowError(true);
        setTitle('An error occurred while generating your file.');
        setDescriptionOne(message);
        window.setTimeout(closeBar, 5000);
    }, [closeBar, dispatch]);

    const scheduleNextStatus = useCallback(() => {
    // determine when the next status check should be
    // it should be 15 seconds for the first minute, then 30 seconds after that
        let timeToWait = 15;
        if (statusCount.current >= 4) {
            timeToWait = 30;
        }

        if (statusTimer.current) {
            window.clearTimeout(statusTimer.current);
        }

        // eslint-disable-next-line no-use-before-define
        statusTimer.current = window.setTimeout(checkStatus, timeToWait * 1000);
        statusCount.current += 1;
    // eslint-disable-next-line no-use-before-define
    }, [checkStatus]);

    const checkStatus = useCallback(() => {
        if (statusRequest.current) {
            statusRequest.current.cancel();
        }
        let expectedFileTemp = '';
        if (expectedFile !== '') {
            expectedFileTemp = expectedFile;
        }
        else if ((typeof expectedFile) === "object" && Object.prototype.hasOwnProperty.call(expectedFile, "file")) {
            expectedFileTemp = expectedFile.file;
        }
        if (expectedFileTemp !== '') {
            statusRequest.current = requestDownloadStatus({
                file_name: expectedFileTemp
            });

            statusRequest.current.promise
                .then((res) => {
                    // eslint-disable-next-line no-use-before-define
                    parseStatus(res.data);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        // something went wrong
                        console.log(err);

                        if (err.response) {
                            displayError(err.response.data.message);
                        }
                        else {
                            displayError(err.message);
                        }
                    }
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expectedFile, expectedUrl]);

    const parseStatus = useCallback((data) => {
        if (data.status === 'finished') {
            // download is ready
            downloadFile(data.file_url);
            return;
        }
        else if (data.status === 'failed') {
            displayError(data.message);
            return;
        }
        scheduleNextStatus();
    }, [displayError, downloadFile, scheduleNextStatus]);

    const displayBar = () => {
        // monitor for window close events
        window.addEventListener('beforeunload', windowWillClose);
        setVisible(true);
        setShowError(false);
        setShowSuccess(false);
        setTitle('We\'re preparing your download(s)...');
        setDescriptionOne('Action Required: This download link is temporary and will expire. Be sure to download your files before the link becomes inactive. Copy the ');
        setDescriptionTwo(' in your browser\'s address bar before closing this page.');
    };

    const requestDownload = () => {
        if (downloadRequest.current) {
            downloadRequest.current.cancel();
        }

        statusCount.current = 0;

        let filterSet = {};
        if (filters) {
            const operation = new SearchAwardsOperation();
            operation.fromState(filters);

            filterSet = operation.toParams();
        }

        const params = {
            filters: filterSet
        };

        if (columns?.length > 0) {
            params.columns = columns;
        }

        downloadRequest.current = requestFullDownloadNew(params);

        downloadRequest.current.promise
            .then((res) => {
                dispatch(setDownloadExpectedFile(res.data.file_name));
                dispatch(setDownloadExpectedUrl(res.data.file_url));
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        displayError(err.response.data.message);
                    }
                    else {
                        displayError(err.message);
                    }
                }
            });
    };


    useEffect(() => {
        if (download?.pendingDownload && download?.showCollapsedProgress &&
            !visible && !isEmpty(filters)) {
            requestDownload(filters, download.columns);
            displayBar();
        }

        return () => {
            window.removeEventListener('beforeunload', windowWillClose);
            window.clearTimeout(statusTimer.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [download?.pendingDownload, download?.showCollapsedProgress]);

    useEffect(() => {
        checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expectedFile, expectedUrl]);

    if (visible) {
        return (
            <TransitionGroup>
                <CSSTransition
                    classNames="download-slide"
                    timeout={500}
                    exit>
                    <DownloadBottomBar
                        showError={showError}
                        showSuccess={showSuccess}
                        title={title}
                        descriptionOne={descriptionOne}
                        descriptionTwo={descriptionTwo}
                        download={download} />
                </CSSTransition>
            </TransitionGroup>
        );
    }
    return null;
};

NewDownloadBottomBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download })
)(NewDownloadBottomBarContainer);
