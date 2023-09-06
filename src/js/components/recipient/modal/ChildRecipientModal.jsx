/**
 * ChildRecipientModal.jsx
 * Created by Lizzie Salita 6/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';
import ChildRecipientModalTable from './table/ChildRecipientModalTable';

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

const ChildRecipientModal = (props) => {
    let table = (<ChildRecipientModalTable
        sortField={props.sortField}
        hideModal={props.hideModal}
        sortDirection={props.sortDirection}
        updateSort={props.updateSort}
        fy={props.recipient.fy}
        total={props.recipient.overview._totalAmount}
        childRecipients={props.childRecipients} />);
    let message = null;
    if (props.loading) {
        message = "Loading...";
        table = null;
    }
    else if (props.error) {
        message = "There was an error loading the results.";
        table = null;
    }
    else if (props.childRecipients.length === 0) {
        message = "No results found.";
        table = null;
    }
    const resultCount = props.childRecipients.length;
    const resultPluralize = resultCount > 1 ? "results" : "result";
    const resultCountDisplay = table ? `${resultCount} ${resultPluralize}` : null;
    return (
        <Modal
            mounted={props.mounted}
            onExit={props.hideModal}
            titleText="Child Recipients"
            dialogClass="recipients-modal"
            verticallyCenter
            escapeExits>
            <div className="recipients-modal__wrapper">
                <div className="recipients-modal__header">
                    <h1 className="recipients-modal__title">Child Recipients</h1>
                    <button
                        className="recipients-modal__close-button"
                        onClick={props.hideModal}
                        title="Close"
                        aria-label="Close">
                        <Close alt="Close modal" />
                    </button>
                </div>
                <div className="recipients-modal__body">
                    {resultCountDisplay}
                    {table}
                    {resultCountDisplay}
                    <div className="recipients-modal__message">
                        {message}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ChildRecipientModal.propTypes = propTypes;
export default ChildRecipientModal;
