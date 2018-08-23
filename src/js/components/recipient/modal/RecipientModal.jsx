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
    error: PropTypes.bool,
    loading: PropTypes.bool,
    hideModal: PropTypes.func,
    recipient: PropTypes.object,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    updateSort: PropTypes.func,
    childRecipients: PropTypes.array
};

export default class RecipientModal extends React.Component {
    render() {
        let table = (<RecipientModalTable
            sortField={this.props.sortField}
            hideModal={this.props.hideModal}
            sortDirection={this.props.sortDirection}
            updateSort={this.props.updateSort}
            fy={this.props.recipient.fy}
            total={this.props.recipient.overview._totalAmount}
            childRecipients={this.props.childRecipients} />);
        let message = null;
        if (this.props.loading) {
            message = "Loading...";
            table = null;
        }
        else if (this.props.error) {
            message = "There was an error loading the results.";
            table = null;
        }
        else if (this.props.childRecipients.length === 0) {
            message = "No results found.";
            table = null;
        }
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
                        {table}
                        <div className="child-recipients-modal__message">
                            {message}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

RecipientModal.propTypes = propTypes;
