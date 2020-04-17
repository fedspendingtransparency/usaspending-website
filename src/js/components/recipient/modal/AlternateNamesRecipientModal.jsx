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

export default class AlternateNamesRecipientModal extends React.Component {
    render() {
        let table = (<AlternateNamesRecipientModalTable
            sortField={this.props.sortField}
            hideModal={this.props.hideModal}
            sortDirection={this.props.sortDirection}
            updateSort={this.props.updateSort}
            alternateNames={this.props.alternateNames} />);
        let message = null;
        if (this.props.alternateNames.length === 0) {
            message = "No results found.";
            table = null;
        }
        const resultCount = this.props.alternateNames.length;
        const resultCountDisplay = table
            ? `${resultCount} ${resultCount > 1 ? "results" : "result"}`
            : null;
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText={`Other Names for ${this.props.recipient.overview.name}`}
                dialogClass="recipients-modal"
                verticallyCenter
                escapeExits>
                <div className="recipients-modal__wrapper">
                    <div className="recipients-modal__header">
                        <h1 className="recipients-modal__title">{`Other Names for ${this.props.recipient.overview.name}`}</h1>
                        <button
                            className="recipients-modal__close-button"
                            onClick={this.props.hideModal}
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
    }
}

AlternateNamesRecipientModal.propTypes = propTypes;
