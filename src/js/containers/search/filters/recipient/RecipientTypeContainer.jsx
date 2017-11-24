/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { keyBy } from 'lodash';

import { recipientTypeGroups } from 'dataMapping/search/recipientType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientType from 'components/search/filters/recipient/RecipientType';

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    updateRecipientDomesticForeignSelection: PropTypes.func,
    toggleRecipientType: PropTypes.func,
    bulkRecipientTypeChange: PropTypes.func,
    updateRecipientLocations: PropTypes.func,
    recipientType: PropTypes.object
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

        this.state = {
            selectedTypes: new Set()
        };

        // Bind functions
        this.toggleRecipientType = this.toggleRecipientType.bind(this);
        this.bulkRecipientTypeChange = this.bulkRecipientTypeChange.bind(this);
    }

    componentDidMount() {
        this.ungroupSelectedTypes(this.props.recipientType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipientType !== this.props.recipientType) {
            this.ungroupSelectedTypes(nextProps.recipientType);
        }
    }

    ungroupSelectedTypes(types) {
        // break groups out into their constituent child elements
        let flatTypes = new Set();

        types.forEach((type) => {
            if (recipientTypeGroups[type]) {
                // this is a full group, add the whole group
                flatTypes = flatTypes.concat(recipientTypeGroups[type]);
            }
            else {
                flatTypes = flatTypes.add(type);
            }
        });

        this.setState({
            selectedTypes: flatTypes
        });
    }

    determineParentType(types) {
        // determine the parent type that was selected and submit that to Redux instead
        // the previous ungroupSelectedTypes function will ungroup these filter values when Redux
        // provides them back to the component for display and re-selection
        const selectedObject = keyBy(types);
        for (const groupName in recipientTypeGroups) {
            if (!recipientTypeGroups[groupName]) {
                // no such group
                continue;
            }

            const firstElement = recipientTypeGroups[groupName][0];
            if (selectedObject[firstElement]) {
                // there was a filter in this group that has a value in the selected array
                // that means this group was selected.
                // and since this gets called each time a parent filter is changed, we can stop
                // looking because we know only one parent filter could have been (de)selected
                return groupName;
            }
        }
        return null;
    }

    toggleRecipientType(selection) {
        this.props.toggleRecipientType(selection);
        // Analytics handled by checkbox component
    }

    bulkRecipientTypeChange(selection) {
        const parentType = this.determineParentType(selection.types);
        if (!parentType) {
            // something bad happened, don't allow redux to change
            return;
        }

        this.props.bulkRecipientTypeChange({
            types: [parentType],
            direction: selection.direction
        });
        // Analytics handled by checkbox component
    }

    render() {
        return (
            <RecipientType
                {...this.props}
                selectedTypes={this.state.selectedTypes}
                toggleCheckboxType={this.toggleRecipientType}
                bulkTypeChange={this.bulkRecipientTypeChange} />
        );
    }
}

RecipientTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        recipientType: state.filters.recipientType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientTypeContainer);
