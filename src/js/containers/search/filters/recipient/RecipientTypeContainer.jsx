/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Set, is } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { keyBy } from 'lodash';

import { recipientTypeGroups } from 'dataMapping/search/recipientType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientType from 'components/search/filters/recipient/RecipientType';

export class RecipientTypeContainer extends React.Component {
    static propTypes = {
        toggleRecipientType: PropTypes.func,
        bulkRecipientTypeChange: PropTypes.func,
        recipientType: PropTypes.object,
        appliedType: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedTypes: new Set()
        };
        this.justMounted = true;
    }

    componentDidMount() {
        this.ungroupSelectedTypes(this.props.recipientType);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipientType !== this.props.recipientType) {
            this.ungroupSelectedTypes(this.props.recipientType);
        }
        this.justMounted = false; // only show filter msg after 1st render (including 1st componentDidUpdate)
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

    toggleRecipientType = (selection) => this.props.toggleRecipientType(selection);

    bulkRecipientTypeChange = (selection) => {
        const parentType = this.determineParentType(selection.types);
        if (!parentType) {
            // something bad happened, don't allow redux to change
            return;
        }

        // identify any individual filters within this group that may have already been selected
        const existingChildren = this.props.recipientType.filter((type) =>
            recipientTypeGroups[parentType].indexOf(type) > -1
        );
        if (existingChildren.count() > 0 && selection.direction === 'add') {
            // children are already selected
            // remove these filters before adding anything to prevent duplicates in the Redux store
            // and subsequent API calls/top filter bar
            this.props.bulkRecipientTypeChange({
                types: existingChildren.toArray(),
                direction: 'remove'
            });
        }

        this.props.bulkRecipientTypeChange({
            types: [parentType],
            direction: selection.direction
        });
    };

    dirtyFilters = () => {
        if (this.justMounted || is(this.props.recipientType, this.props.appliedType)) {
            return null;
        }
        return Symbol('dirty recipient type');
    };

    render() {
        return (
            <RecipientType
                dirtyFilters={this.dirtyFilters()}
                selectedTypes={this.state.selectedTypes}
                toggleCheckboxType={this.toggleRecipientType}
                bulkTypeChange={this.bulkRecipientTypeChange} />
        );
    }
}

export default connect(
    (state) => ({
        recipientType: state.filters.recipientType,
        appliedType: state.appliedFilters.filters.recipientType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientTypeContainer);
