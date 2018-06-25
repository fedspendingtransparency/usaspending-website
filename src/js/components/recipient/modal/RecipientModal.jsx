/**
 * RecipientModal.jsx
 * Created by Lizzie Salita 6/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';
import RecipientModalTable from './table/RecipientModalTable';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    recipient: PropTypes.object,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    updateSort: PropTypes.func,
    childRecipients: PropTypes.array
};

export default class RecipientModal extends React.Component {
    render() {
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="Child Recipients"
                dialogClass="child-recipients-modal"
                verticallyCenter
                escapeExits>
                <div className="child-recipients-modal__wrapper">
                    <div className="child-recipients-modal__header">
                        <h1 className="child-recipients-modal__title">Child Recipients</h1>
                        <button
                            className="child-recipients-modal__close-button"
                            onClick={this.props.hideModal}
                            title="Close"
                            aria-label="Close">
                            <Close alt="Close modal" />
                        </button>
                    </div>
                    <div className="child-recipients-modal__body">
                        <RecipientModalTable
                            loading={this.props.loading}
                            error={this.props.error}
                            sortField={this.props.sortField}
                            sortDirection={this.props.sortDirection}
                            updateSort={this.props.updateSort}
                            fy={this.props.recipient.fy}
                            total={this.props.recipient.overview._totalAmount}
                            childRecipients={this.props.childRecipients} />
                    </div>
                </div>
            </Modal>
        );
    }
}

RecipientModal.propTypes = propTypes;
