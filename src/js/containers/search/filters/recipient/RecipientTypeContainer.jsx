/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientType from 'components/search/filters/recipient/RecipientType';

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    updateRecipientDomesticForeignSelection: PropTypes.func,
    toggleRecipientType: PropTypes.func,
    bulkRecipientTypeChange: PropTypes.func,
    updateRecipientLocations: PropTypes.func
};

const ga = require('react-ga');

export class RecipientTypeContainer extends React.Component {
    static logLocationFilterEvent(placeType, place, event) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `${event} Recipient ${placeType.toLowerCase()} Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleRecipientType = this.toggleRecipientType.bind(this);
        this.bulkRecipientTypeChange = this.bulkRecipientTypeChange.bind(this);
    }

    toggleRecipientType(selection) {
        this.props.toggleRecipientType(selection);
        // Analytics handled by checkbox component
    }

    bulkRecipientTypeChange(selection) {
        this.props.bulkRecipientTypeChange(selection);
        // Analytics handled by checkbox component
    }

    render() {
        return (
            <RecipientType
                {...this.props}
                toggleCheckboxType={this.toggleRecipientType}
                bulkTypeChange={this.bulkRecipientTypeChange} />
        );
    }
}

RecipientTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients,
        recipientDomesticForeign: state.filters.recipientDomesticForeign,
        recipientType: state.filters.recipientType,
        selectedRecipientLocations: state.filters.selectedRecipientLocations
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientTypeContainer);
