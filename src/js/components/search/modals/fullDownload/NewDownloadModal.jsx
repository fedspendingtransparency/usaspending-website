/**
 * NewDownloadModal.jsx
 * Created by Nick Torres 2/27/26
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NewDownloadContainer from
    'containers/search/modals/fullDownload/screens/newScreens/NewDownloadContainer';

import usePrevious from 'hooks/usePrevious';

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
    const resetModal = useCallback(() => {
        setDownloadStep(1);
        setDownloadType([]);
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

    // eslint-disable-next-line prefer-const
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

        if (downloadType.includes('subawards')) {
            downloadData = {
                ...downloadData,
                filters: [
                    {
                        type: "Fiscal Year",
                        values: "2024, 2025, 2026"
                    },
                    {
                        type: "Agency",
                        values: "Department of Education, Department of Housing, Department of Commerce, Department of Agriculture, Department of Homeland Security, Department of Justice, Department of Labor, Department of State, Department of Transportation, Department of Veterans Affairs, Department of the Interior, Department of the Treasury"
                    },
                    {
                        type: "Recipient",
                        values: "BAMBOOZLE LIVING INC., BAMBOOZLE LIVING INC, BAMBOOZELS INC., BAMBOOZELS, INC., BAMBOOZLE TEA LOUNGE, BAMBOOZLE LIVING, INC., BOOZ ALLEN & HAMILTON INC, BAMBOOZLE ENTERPRISES LLC, BAMBOOZELD, BAMBOOZLE CHANNELSIDE, BAMBOOZLE CAFE, BAMBOOZLE"
                    },
                    {
                        type: "Award Type",
                        values: "Contracts, Block Grant, Formula Grant, Project Grant"
                    },
                    {
                        type: "Recipient Location",
                        values: "STATE | MISSOURI"
                    },
                    {
                        type: "Fiscal Year",
                        values: "2024, 2025, 2026"
                    },
                    {
                        type: "Agency",
                        values: "Department of Education, Department of Housing, Department of Commerce, Department of Agriculture, Department of Homeland Security, Department of Justice, Department of Labor, Department of State, Department of Transportation, Department of Veterans Affairs, Department of the Interior, Department of the Treasury"
                    },
                    {
                        type: "Recipient",
                        values: "BAMBOOZLE LIVING INC., BAMBOOZLE LIVING INC, BAMBOOZELS INC., BAMBOOZELS, INC., BAMBOOZLE TEA LOUNGE, BAMBOOZLE LIVING, INC., BOOZ ALLEN & HAMILTON INC, BAMBOOZLE ENTERPRISES LLC, BAMBOOZELD, BAMBOOZLE CHANNELSIDE, BAMBOOZLE CAFE, BAMBOOZLE"
                    },
                    {
                        type: "Award Type",
                        values: "Contracts, Block Grant, Formula Grant, Project Grant"
                    },
                    {
                        type: "Recipient Location",
                        values: "STATE | MISSOURI"
                    }
                ]
            };
        }
    }
    // else if (downloadStep === 3) {
    // }

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
                        toggleDownloadType={toggleDownloadType} />
                </div>
            </div>
        </Modal>
    );
};

NewDownloadModal.propTypes = propTypes;
export default NewDownloadModal;
