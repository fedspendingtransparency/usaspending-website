/**
 * DownloadModal.jsx
 * Created by Kevin Li 5/2/17
 */

import React from 'react';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import ExtraModalTabs from './ExtraModalTabs';

const propTypes = {
    mounted: React.PropTypes.bool,
    hideModal: React.PropTypes.func
};

export default class ExtraModal extends React.Component {
    render() {
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="Additional Options"
                dialogClass="search-section-extra-modal"
                verticallyCenter
                escapeExits>
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            className="close-button"
                            aria-label="Close modal"
                            title="Close modal"
                            onClick={this.props.hideModal}>
                            <Close alt="Close modal" />
                        </button>

                        <ExtraModalTabs />
                    </div>

                    <div className="modal-body">
                        Something
                    </div>
                </div>
            </Modal>
        );
    }
}

ExtraModal.propTypes = propTypes;
