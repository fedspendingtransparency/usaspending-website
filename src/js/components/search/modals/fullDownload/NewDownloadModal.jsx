/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setDownloadColumns, setDownloadPending } from 'redux/actions/search/downloadActions';
import NewDownloadContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadContainer';
import usePrevious from 'hooks/usePrevious';
import getFilters from '../../../../containers/search/topFilterBar/getFilters';
import NewDownloadProgress from './screens/NewDownloadProgress';
import { setSpendingLevelDownload } from '../../../../redux/actions/search/spendingLevelActions';

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
    const resetModal = useCallback(() => {
        setDownloadStep(1);
        setDownloadType([]);
        props.hideModal();
    }, [props]);
    let content = null;

    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const { filters } = useMemo(
        () => getFilters(reduxFilters), [reduxFilters]);

    useEffect(() => {
        if (!props?.pendingDownload && prevProps?.pendingDownload) {
            resetModal();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevProps?.pendingDownload, props?.pendingDownload, resetModal]);


    const hideModal = useCallback(() => {
    // reset the state before closing, but only if we're not on the download screen
        if (downloadStep === 3 || props.pendingDownload) {
            props.setDownloadCollapsed(true);
            props.hideModal();
            return;
        }

        resetModal(1);
    }, [downloadStep, props, resetModal]);

    const goToStep = useCallback((step, override = false) => {
        if (step >= downloadStep && !override) {
            return;
        }

        setDownloadStep(step);
    }, [downloadStep]);

    const toggleDownloadType = (type) => {
        setDownloadType((prevState) => {
            if (downloadType.includes(type)) {
                return prevState.filter((str) => str !== type);
            }
            return [...prevState, type];
        });
    };

    const beginDownload = useCallback(() => {
        dispatch(setSpendingLevelDownload(downloadType));
        dispatch(setDownloadColumns([]));
        dispatch(setDownloadPending(true));
        goToStep(3, true);
    }, [dispatch, goToStep]);

    // eslint-disable-next-line prefer-const
    let headerContent = "Step 1 of 2: Select which data you'd like to download";
    let downloadData = {};

    if (downloadStep === 2) {
        headerContent = "Step 2 of 2: Review and begin download";
        // dummy data for now
        // need to figure out data structure for step 2
        downloadData = {
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
    else if (downloadStep === 3) {
        headerContent = "We're preparing your download.";
        content = (<NewDownloadProgress
            hideModal={hideModal}
            download={props.download}
            setDownloadCollapsed={props.setDownloadCollapsed}
            expectedUrl={props.download.expectedUrl} />);
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
                        beginDownload={beginDownload}
                        downloadType={downloadType}
                        content={content} />
                </div>
            </div>
        </Modal>
    );
};

NewDownloadModal.propTypes = propTypes;
export default NewDownloadModal;
