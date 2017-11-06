/**
 * BulkDownloadModal.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import ModalContent from './ModalContent';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool,
    expectedFile: PropTypes.string
};

export default class BulkDownloadModal extends React.Component {
    render() {
        const content = (<ModalContent
            hideModal={this.props.hideModal}
            setDownloadCollapsed={this.props.setDownloadCollapsed}
            expectedFile={this.props.expectedFile} />);

        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="Bulk Download"
                dialogClass="bulk-download-modal"
                verticallyCenter
                escapeExits>
                <div className="full-download-modal">
                    <div className="download-header">
                        <div className="header-content">
                            <h1>Download Data</h1>
                            <div className="close-wrapper">
                                <button
                                    className="close-button"
                                    onClick={this.props.hideModal}
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
    }
}

BulkDownloadModal.propTypes = propTypes;
