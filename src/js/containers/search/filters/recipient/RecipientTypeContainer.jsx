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

import RecipientType from 'components/search/filters/recipient/RecipientTypeAccordion';

export class RecipientTypeContainer extends React.Component {
    static propTypes = {
        toggleRecipientType: PropTypes.func,
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

    componentDidUpdate() {
        this.justMounted = false; // only show filter msg after 1st render (including 1st componentDidUpdate)
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
                selectedTypes={this.props.recipientType}
                toggleCheckboxType={this.toggleRecipientType} />
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
