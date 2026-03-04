/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import NewDownloadLevelContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadLevelContainer';
import NewDownloadScopeContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadScopeContainer';

import DownloadProgress from './screens/DownloadProgress';
import usePrevious from '../../../../hooks/usePrevious';

const propTypes = {
    mounted: PropTypes.bool,
    download: PropTypes.object,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool
};

const NewDownloadModal = (props) => {
    const [downloadStep, setDownloadStep] = useState(1);
    const prevProps = usePrevious(props);
    const resetModal = useCallback(() => {
        setDownloadStep(1);
        props.hideModal();
    }, [props]);
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

        setDownloadStep(1);
        props.hideModal();
    };

    const goToStep = (step, override = false) => {
    // we can only go backwards
        if (step >= downloadStep && !override) {
            return;
        }

        setDownloadStep(step);
    };

    let content = <NewDownloadLevelContainer goToStep={goToStep} />;
    let headerContent = "Step 1 of 2: Select which data you'd like to download";
    if (downloadStep === 2) {
        content = <NewDownloadScopeContainer goToStep={goToStep} />;
    }
    else if (downloadStep === 3) {
        headerContent = "Step 2 of 2: Select which data you'd like to download";
        content = (<DownloadProgress
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
                            <button
                                className="close-button"
                                onClick={props.hideModal}
                                title="Close"
                                aria-label="Close">
                                <Close alt="Close modal" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="download-body">
                    {content}
                </div>
            </div>
        </Modal>
    );
};

NewDownloadModal.propTypes = propTypes;
export default NewDownloadModal;
