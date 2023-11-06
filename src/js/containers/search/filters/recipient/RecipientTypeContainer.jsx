/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Set, is } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        this.selectedTypes(this.props.recipientType);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipientType !== this.props.recipientType) {
            this.selectedTypes(this.props.recipientType);
        }
        this.justMounted = false; // only show filter msg after 1st render (including 1st componentDidUpdate)
    }

    selectedTypes(types) {
    // break groups out into their constituent child elements
        let flatTypes = new Set();

        types.forEach((type) => {
            flatTypes = flatTypes.add(type);
        });

        this.setState({
            selectedTypes: flatTypes
        });
    }

    toggleRecipientType = (selection) => {
        this.props.toggleRecipientType(selection);
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
