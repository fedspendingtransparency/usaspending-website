/**
 * ChildRecipientModal.jsx
 * Created by Lizzie Salita 6/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    childRecipients: PropTypes.array
};

export default class ChildRecipientModal extends React.Component {
    render() {
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="Child Recipients"
                dialogClass="child-recipient-modal"
                verticallyCenter
                escapeExits>
                <div className="child-recipient-modal__wrapper">
                    <div className="child-recipient-modal__header">
                        <h1 className="child-recipient-modal__title">Child Recipients</h1>
                        <button
                            className="child-recipient-modal__close-button"
                            onClick={this.props.hideModal}
                            title="Close"
                            aria-label="Close">
                            <Close alt="Close modal" />
                        </button>
                    </div>
                    <div className="child-recipient-modal__body">
                        Table Here
                    </div>
                </div>
            </Modal>
        );
    }
}

ChildRecipientModal.propTypes = propTypes;
