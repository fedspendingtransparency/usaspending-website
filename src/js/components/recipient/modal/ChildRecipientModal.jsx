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

export default class ChildRecipientModal extends React.Component {
    render() {
        let table = (<ChildRecipientModalTable
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
        const resultCount = this.props.childRecipients.length;
        const resultPluralize = resultCount > 1 ? "results" : "result";
        const resultCountDisplay = table ? `${resultCount} ${resultPluralize}` : null;
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
                titleText="Child Recipients"
                dialogClass="recipients-modal"
                verticallyCenter
                escapeExits>
                <div className="recipients-modal__wrapper">
                    <div className="recipients-modal__header">
                        <h1 className="recipients-modal__title">Child Recipients</h1>
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

ChildRecipientModal.propTypes = propTypes;
