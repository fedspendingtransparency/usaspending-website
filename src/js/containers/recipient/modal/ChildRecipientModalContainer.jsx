/**
 * ChildRecipientModalContainer.jsx
 * Created by Lizzie Salita 6/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { orderBy, isEqual } from 'lodash';

import * as recipientActions from 'redux/actions/recipient/recipientActions';
import * as RecipientHelper from 'helpers/recipientHelper';

import ChildRecipientModal from 'components/recipient/modal/ChildRecipientModal';
import BaseChildRecipient from 'models/v2/recipient/BaseChildRecipient';

const propTypes = {
    setRecipientChildren: PropTypes.func,
    recipient: PropTypes.object,
    mounted: PropTypes.bool,
    hideModal: PropTypes.func
};

export class ChildRecipientModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            error: false,
            sortField: '_amount',
            sortDirection: 'desc',
            childRecipients: []
        };

        this.request = null;
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.mounted && !prevProps.mounted) {
            // The modal went from hidden to visible
            this.loadChildRecipients();
        }
        if (!isEqual(this.props.recipient.children, prevProps.recipient.children)) {
            // Sort the new results by the default sort order
            this.updateSort('_amount', 'desc');
        }
    }

    loadChildRecipients() {
        if (this.request) {
            // A request is currently in-flight, cancel it
            this.request.cancel();
        }

        this.setState({
            inFlight: true
        });

        const duns = this.props.recipient.overview.duns;
        const year = this.props.recipient.fy;

        this.request = RecipientHelper.fetchChildRecipients(duns, year);

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false
                }, () => {
                    if (res.data.length > 0) {
                        this.parseChildren(res.data);
                    }
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    this.setState({
                        inFlight: false,
                        error: true
                    });
                }
            });
    }

    parseChildren(data) {
        this.setState({
            inFlight: false,
            error: false
        });
        const childRecipients = data.map((child) => {
            const childRecipient = Object.create(BaseChildRecipient);
            childRecipient.populate(child);
            return childRecipient;
        });
        this.props.setRecipientChildren(childRecipients);
    }

    updateSort(sortField, sortDirection) {
        const orderedResults = orderBy(this.props.recipient.children, [sortField], [sortDirection]);
        this.setState({
            sortField,
            sortDirection,
            childRecipients: orderedResults
        });
    }

    render() {
        return (
            <ChildRecipientModal
                {...this.props}
                error={this.state.error}
                loading={this.state.inFlight}
                sortField={this.state.sortField}
                sortDirection={this.state.sortDirection}
                updateSort={this.updateSort}
                childRecipients={this.state.childRecipients} />
        );
    }
}

export default connect(
    (state) => ({
        recipient: state.recipient
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(ChildRecipientModalContainer);

ChildRecipientModalContainer.propTypes = propTypes;
