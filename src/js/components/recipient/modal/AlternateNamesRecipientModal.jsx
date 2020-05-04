/**
 * AlternateNamesRecipientModal.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';
import AlternateNamesRecipientModalTable from './table/AlternateNamesRecipientModalTable';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    recipient: PropTypes.object,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    updateSort: PropTypes.func,
    alternateNames: PropTypes.array
};

const AlternateNamesRecipientModal = (props) => {
    let table = (<AlternateNamesRecipientModalTable
        sortField={props.sortField}
        hideModal={props.hideModal}
        sortDirection={props.sortDirection}
        updateSort={props.updateSort}
        alternateNames={props.alternateNames} />);
    let message = null;
    if (props.alternateNames.length === 0) {
        message = "No results found.";
        table = null;
    }
    const resultCount = props.alternateNames.length;
    const resultPluralize = resultCount > 1 ? "results" : "result";
    const resultCountDisplay = table ? `${resultCount} ${resultPluralize}` : null;
    return (
        <Modal
            mounted={props.mounted}
            onExit={props.hideModal}
            titleText={`Other Names for ${props.recipient.overview.name}`}
            dialogClass="recipients-modal"
            verticallyCenter
            escapeExits>
            <div className="recipients-modal__wrapper">
                <div className="recipients-modal__header">
                    <h1 className="recipients-modal__title">{`Other Names for ${props.recipient.overview.name}`}</h1>
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

AlternateNamesRecipientModal.propTypes = propTypes;
export default AlternateNamesRecipientModal;
