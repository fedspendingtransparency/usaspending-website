/**
 * AlternateNamesRecipientModalContainer.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlternateNamesRecipientModal from 'components/recipient/modal/AlternateNamesRecipientModal';

const propTypes = {
    recipient: PropTypes.object,
    hideModal: PropTypes.func
};

export class AlternateNamesRecipientModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortField: "alternateNames",
            sortDirection: "asc"
        };
    }

    updateSort = (sortField, sortDirection) => this.setState({ sortField, sortDirection });

    render() {
        const sortedAlternateNames = this.state.sortDirection === "asc"
            ? this.props.recipient.overview.alternateNames.sort((a, b) => (a.localeCompare(b)))
            : this.props.recipient.overview.alternateNames.sort((a, b) => (b.localeCompare(a)));

        return (
            <AlternateNamesRecipientModal
                {...this.props}
                sortField={this.state.sortField}
                sortDirection={this.state.sortDirection}
                updateSort={this.updateSort}
                alternateNames={sortedAlternateNames} />
        );
    }
}

export default connect(
    (state) => ({
        recipient: state.recipient
    })
)(AlternateNamesRecipientModalContainer);

AlternateNamesRecipientModalContainer.propTypes = propTypes;
