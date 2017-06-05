/**
 * DownloadModal.jsx
 * Created by Kevin Li 5/2/17
 */

import React from 'react';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import ExtraModalTabs from './ExtraModalTabs';
import CylonEye from './CylonEye';
import DownloadLocation from './DownloadLocation';

const propTypes = {
    mounted: React.PropTypes.bool,
    hideModal: React.PropTypes.func,
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    location: React.PropTypes.string,
    animate: React.PropTypes.bool
};

export default class ExtraModal extends React.Component {
    render() {
        let animation = null;
        if (this.props.animate) {
            animation = <CylonEye />;
        }

        let location = null;
        if (this.props.location && this.props.location !== '') {
            location = <DownloadLocation location={this.props.location} />;
        }

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
                        <h1 className="download-title">
                            {this.props.title}
                        </h1>

                        {animation}

                        <div className="server-message">
                            {this.props.message}
                        </div>

                        {location}
                    </div>
                </div>
            </Modal>
        );
    }
}

ExtraModal.propTypes = propTypes;
