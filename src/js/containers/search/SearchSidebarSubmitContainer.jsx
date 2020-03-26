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
import { setChecked, setUnchecked } from 'redux/actions/search/naicsActions';

import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';

import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

const combinedActions = Object.assign({}, appliedFilterActions, {
    clearStagedFilters
});

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func,
    resetNaicsTree: PropTypes.func,
    setAppliedFilterCompletion: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

export class SearchSidebarSubmitContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersChanged: false
        };

        this.resetFilters = this.resetFilters.bind(this);
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

        // check that the key exists in the appliedFilters object and also that it
        // is equal (using Immutable's equality check utilty function) in both stores
        return storeKeys.every((key) => (
            {}.hasOwnProperty.call(this.props.appliedFilters, key) &&
                is(this.props.appliedFilters[key], this.props.stagedFilters[key])
        ));
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
        this.props.setAppliedFilterCompletion(false);
        this.props.applyStagedFilters(this.props.stagedFilters);
        this.setState({
            filtersChanged: false
        });

        const events = convertFiltersToAnalyticEvents(this.props.stagedFilters);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);
    }

    resetFilters() {
        this.props.clearStagedFilters();
        this.props.resetAppliedFilters();
        this.props.resetNaicsTree();
    }

    render() {
        return (
            <SearchSidebarSubmit
                filtersChanged={this.state.filtersChanged}
                requestsComplete={this.props.requestsComplete}
                applyStagedFilters={this.applyStagedFilters}
                resetFilters={this.resetFilters} />
        );
    }
}

export default connect(
    (state) => ({
        requestsComplete: state.appliedFilters._complete,
        isEmpty: state.appliedFilters._empty,
        stagedFilters: state.filters,
        appliedFilters: state.appliedFilters.filters
    }),
    (dispatch) => ({
        ...bindActionCreators(combinedActions, dispatch),
        resetNaicsTree: () => {
            dispatch(setChecked([]));
            dispatch(setUnchecked([]));
        }
    })
)(SearchSidebarSubmitContainer);

SearchSidebarSubmitContainer.propTypes = propTypes;
