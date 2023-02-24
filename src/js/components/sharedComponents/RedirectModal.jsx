/**
 * RedirectModal.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    url: PropTypes.string
};

export default class RedirectModal extends React.Component {
    render() {
        return (
            <Modal
                dialogId="usa-dt-modal__redirect-modal"
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="You're leaving a Federal Government website."
                dialogClass="usa-dt-modal"
                verticallyCenter
                escapeExits>
                <div className="usa-dt-modal redirect-modal">
                    <div className="usa-dt-modal__header">
                        <button
                            className="usa-dt-modal__close-button"
                            onClick={this.props.hideModal}
                            title="Close"
                            aria-label="Close">
                            <Close alt="Close modal" />
                        </button>
                    </div>
                    <div className="usa-dt-modal__body">
                        <div className="usa-dt-modal__title">
                            <div className="usa-dt-modal__title-icon">
                                <i className="usa-da-icon">
                                    <ExclamationTriangle />
                                </i>
                            </div>
                            <div className="usa-dt-modal__title-text">
                                You&apos;re leaving a Federal Government website.
                            </div>
                        </div>
                        <div className="usa-dt-modal__explanation">
                            You&apos;re going to a website that is not managed or controlled by the Federal Government.
                            <br /> Its privacy policies may differ from ours.
                        </div>
                        <div className="usa-dt-modal__directions">
                            Click this link to go to the website you have selected.
                        </div>
                        <div className="usa-dt-modal__link">
                            <a
                                href={this.props.url}
                                target="_blank"
                                rel="noopener noreferrer">
                                {this.props.url}
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

RedirectModal.propTypes = propTypes;
