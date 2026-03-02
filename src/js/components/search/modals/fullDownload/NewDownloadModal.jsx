/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';
import DownloadLevelContainer from
    'containers/search/modals/fullDownload/screens/DownloadLevelContainer';
import DownloadScopeContainer from
    'containers/search/modals/fullDownload/screens/DownloadScopeContainer';

import DownloadBreadcrumb from './breadcrumb/DownloadBreadcrumb';

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
        if (!props.pendingDownload && prevProps.pendingDownload) {
            resetModal();
        }
    }, [prevProps.pendingDownload, props.pendingDownload, resetModal]);


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

    let content = <DownloadLevelContainer goToStep={goToStep} />;
    if (downloadStep === 2) {
        content = <DownloadScopeContainer goToStep={goToStep} />;
    }
    else if (downloadStep === 3) {
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
            dialogClass="search-section-extra-modal"
            verticallyCenter
            escapeExits>
            <div className="full-download-modal">
                <div className="download-header">
                    <div className="header-content">
                        <h1>Download Data</h1>
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
                    <div className="download-filter-bar">
                        <TopFilterBarContainer compressed />
                    </div>
                    <DownloadBreadcrumb
                        step={downloadStep}
                        goToStep={goToStep} />
                    {content}
                </div>
            </div>
        </Modal>
    );
};

NewDownloadModal.propTypes = propTypes;
export default NewDownloadModal;
