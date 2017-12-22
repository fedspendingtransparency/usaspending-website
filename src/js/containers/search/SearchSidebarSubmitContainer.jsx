/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { is } from 'immutable';

import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/search/searchFilterActions';

import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';

const combinedActions = Object.assign({}, appliedFilterActions, {
    clearStagedFilters
});

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func
};

export class SearchSidebarSubmitContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersChanged: false
        };

        this.applyStagedFilters = this.applyStagedFilters.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stagedFilters !== this.props.stagedFilters) {
            this.stagingChanged();
        }
        else if (prevProps.appliedFilters !== this.props.appliedFilters) {
            this.stagingChanged();
        }
    }

    compareStores() {
        // we need to do a deep equality check by comparing every store key
        const storeKeys = Object.keys(this.props.stagedFilters);
        if (storeKeys.length !== Object.keys(this.props.appliedFilters).length) {
            // key lengths do not match, there's a difference so fail immediately
            return false;
        }

        for (const key of storeKeys) {
            if (!{}.hasOwnProperty.call(this.props.appliedFilters, key)) {
                // no such key, immediately fail
                return false;
            }

            if (!is(this.props.appliedFilters[key], this.props.stagedFilters[key])) {
                // use immutable to check equality of nested objects
                return false;
            }
        }

        return true;
    }

    stagingChanged() {
        // do a deep equality check between the staged filters and applied filters
        if (!this.compareStores()) {
            this.setState({
                filtersChanged: true
            });
        }
        else if (this.state.filtersChanged) {
            this.setState({
                filtersChanged: false
            });
        }
    }

    applyStagedFilters() {
        this.props.applyStagedFilters(this.props.stagedFilters);
        this.setState({
            filtersChanged: false
        });
    }

    render() {
        return (
            <SearchSidebarSubmit
                filtersChanged={this.state.filtersChanged}
                requestsComplete={this.props.requestsComplete}
                applyStagedFilters={this.applyStagedFilters}
                resetStagedFilters={this.props.clearStagedFilters} />
        );
    }
}

export default connect(
    (state) => ({
        requestsComplete: state.appliedFilters._complete,
        stagedFilters: state.filters,
        appliedFilters: state.appliedFilters.filters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SearchSidebarSubmitContainer);

SearchSidebarSubmitContainer.propTypes = propTypes;
