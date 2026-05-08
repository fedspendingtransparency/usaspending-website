/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import * as downloadActions from 'redux/actions/search/downloadActions';
import * as DownloadHelper from 'helpers/downloadHelper';
import NewDownloadContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadContainer';
import usePrevious from 'hooks/usePrevious';

import getFilters from '../../../../containers/search/topFilterBar/getFilters';

const propTypes = {
    mounted: PropTypes.bool,
    download: PropTypes.object,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool,
    awardsCount: PropTypes.number,
    transactionsCount: PropTypes.number,
    subawardsCount: PropTypes.number
};

const NewDownloadModal = (props) => {
    const [downloadStep, setDownloadStep] = useState(1);
    const [downloadType, setDownloadType] = useState([]);
    const prevProps = usePrevious(props);
    const dispatch = useDispatch();
    const downloadRequest = useRef();
    const statusRequest = useRef();



    
    const resetModal = useCallback(() => {
        setDownloadStep(1);
        setDownloadType([]);
        props.hideModal();
    }, [props]);
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const { filters } = useMemo(
        () => getFilters(reduxFilters), [reduxFilters]);

    useEffect(() => {
        if (!props?.pendingDownload && prevProps?.pendingDownload) {
            resetModal();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevProps?.pendingDownload, props?.pendingDownload, resetModal]);


    const hideModal = () => {
    // reset the state before closing, but only if we're not on the download screen
        if (downloadStep === 3 || props.pendingDownload) {
            props.setDownloadCollapsed(true);
            props.hideModal();
            return;
        }

        resetModal(1);
    };

    const goToStep = (step, override = false) => {
        if (step >= downloadStep && !override) {
            return;
        }

        setDownloadStep(step);
    };

    const toggleDownloadType = (type) => {
        setDownloadType((prevState) => {
            if (downloadType.includes(type)) {
                return prevState.filter((str) => str !== type);
            }
            return [...prevState, type];
        });
    };

    const beginDownload = () => {
        console.debug("download button clicked");

        if (downloadRequest.current) {
            downloadRequest.current.cancel();
        }


        let filterSet = {};
        if (reduxFilters) {
            const operation = new SearchAwardsOperation();
            operation.fromState(reduxFilters);

            filterSet = operation.toParams();
        }

        const params = {
            filters: filterSet
        };

        downloadRequest.current = DownloadHelper.requestFullDownloadNew(params);

        downloadRequest.current.promise
            .then((res) => {
                console.debug("downloading...", res);
                dispatch(downloadActions.setDownloadPending(true));
                dispatch(downloadActions.setDownloadExpectedFile(res.data.file_name));
                dispatch(downloadActions.setDownloadExpectedUrl(res.data.file_url));
                checkStatus();
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        console.error(err.response.data.message);
                    }
                    else {
                        console.error(err.message);
                    }
                }
            });
    };

    // eslint-disable-next-line prefer-const
    let headerContent = "Step 1 of 2: Select which data you'd like to download";
    let downloadData = {};

    if (downloadStep === 2) {
        headerContent = "Step 2 of 2: Review and begin download";
        // dummy data for now
        // need to figure out data structure for step 2
        downloadData = {
            expectedFile: "sampleFileName_DDMMYYYY.zip",
            selections: downloadType,
            filters
        };

        if (downloadType.includes('subawards')) {
            downloadData = {
                ...downloadData,
                filters
            };
        }
    }


    return (
        <Modal
            mounted={props.mounted}
            onExit={hideModal}
            titleText="Additional Options"
            dialogClass="search-section-new-download-modal"
            verticallyCenter
            escapeExits>
            <div className="new-full-download-modal">
                <div className="download-header">
                    <div className="header-content">
                        <h1 className="modal__header">{headerContent}</h1>
                        <div className="close-wrapper">
                            <FontAwesomeIcon
                                tabIndex={0}
                                className="close-button"
                                onClick={hideModal}
                                aria-label="Close"
                                icon="xmark" />
                        </div>
                    </div>
                </div>

                <div className="download-body">
                    <NewDownloadContainer
                        goToStep={goToStep}
                        hideModal={hideModal}
                        step={downloadStep}
                        awardsCount={props.awardsCount}
                        transactionsCount={props.transactionsCount}
                        subawardsCount={props.subawardsCount}
                        downloadData={downloadData}
                        toggleDownloadType={toggleDownloadType}
                        beginDownload={beginDownload} />
                </div>
            </div>
        </Modal>
    );
};

NewDownloadModal.propTypes = propTypes;
export default NewDownloadModal;
