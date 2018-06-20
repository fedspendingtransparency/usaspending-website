/**
 * ChildRecipientsModal.jsx
 * Created by Lizzie Salita 6/18/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { orderBy } from 'lodash';

import { Close } from 'components/sharedComponents/icons/Icons';
import ChildRecipientsTable from './ChildRecipientsTable';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    recipient: PropTypes.object
};

export default class ChildRecipientsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortField: 'name',
            sortDirection: 'desc',
            childRecipients: []
        };

        this.updateSort = this.updateSort.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipient !== this.props.recipient) {
            this.updateSort(this.state.sortField, this.state.sortDirection);
        }
    }

    updateSort(sortField, sortDirection) {
        const orderedResults = orderBy(this.props.recipient.overview.children, [sortField], [sortDirection]);
        this.setState({
            sortField,
            sortDirection,
            childRecipients: orderedResults
        });
    }

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
                        <ChildRecipientsTable
                            sortField={this.state.sortField}
                            sortDirection={this.state.sortDirection}
                            updateSort={this.updateSort}
                            fy={this.props.recipient.fy}
                            total={this.props.recipient.overview._totalAmount}
                            childRecipients={this.state.childRecipients} />
                    </div>
                </div>
            </Modal>
        );
    }
}

ChildRecipientsModal.propTypes = propTypes;
