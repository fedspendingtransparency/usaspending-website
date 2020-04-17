/**
 * AlternateNamesRecipientModalContainer.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import AlternateNamesRecipientModal from 'components/recipient/modal/AlternateNamesRecipientModal';

const propTypes = {
    recipient: PropTypes.object,
    mounted: PropTypes.bool,
    hideModal: PropTypes.func
};

export class AlternateNamesRecipientModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortField: "alternateNames",
            sortDirection: "desc",
            alternateNames: []
        };

        this.request = null;
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.mounted && !prevProps.mounted) {
            // The modal went from hidden to visible
            this.loadAlternateNames();
        }
        if (!isEqual(this.props.recipient.alternateNames, prevProps.recipient.alternateNames)) {
            // Sort the new results by the default sort order
            this.updateSort("alternateName", "desc");
        }
    }

    loadAlternateNames() {
        // Load the initial state
        this.setState({ alternateNames: this.props.recipient.overview.alternateNames });
    }

    updateSort(sortField, sortDirection) {
        const ascSortFunction = (a, b) => (a > b ? 1 : -1);
        const descSortFunction = (a, b) => (a < b ? 1 : -1);
        const sortFunction = sortDirection === "asc"
            ? ascSortFunction
            : descSortFunction;
        const orderedResults = this.props.recipient.overview.alternateNames.sort(sortFunction);
        this.setState({
            sortField,
            sortDirection,
            alternateNames: orderedResults
        });
    }

    render() {
        return (
            <AlternateNamesRecipientModal
                {...this.props}
                sortField={this.state.sortField}
                sortDirection={this.state.sortDirection}
                updateSort={this.updateSort}
                alternateNames={this.state.alternateNames} />
        );
    }
}

export default connect(
    (state) => ({
        recipient: state.recipient
    })
)(AlternateNamesRecipientModalContainer);

AlternateNamesRecipientModalContainer.propTypes = propTypes;
