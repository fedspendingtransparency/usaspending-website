/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NewDownloadLevelContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadLevelContainer';

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

    let headerContent = "Step 1 of 2: Select which data you'd like to download";
    let downloadData = {};

    if (downloadStep === 2) {
        headerContent = "Step 2 of 2: Review and begin download";
        // dummy data for now
        // need to figure out data structure for step 2
        downloadData = {
            expectedFile: "sampleFileName_DDMMYYYY.zip",
            selections: "Transactions, Subawards",
            filters: [
                {
                    type: "Fiscal Year",
                    values: "2024, 2025, 2026"
                },
                {
                    type: "Agency",
                    values: "Department of Education, Department of Housing, Department of Commerce, Department of Agriculture, Department of Homeland Security, Department of Justice, Department of Labor, Department of State, Department of Transportation, Department of Veterans Affairs, Department of the Interior, Department of the Treasury"
                }
            ]
        };
    }
    // else if (downloadStep === 3) {
    // }

    const content = (<NewDownloadLevelContainer
        goToStep={goToStep}
        hideModal={hideModal}
        step={downloadStep}
        downloadData={downloadData} />);
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
                                onClick={props.hideModal}
                                aria-label="Close"
                                icon="xmark" />
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
