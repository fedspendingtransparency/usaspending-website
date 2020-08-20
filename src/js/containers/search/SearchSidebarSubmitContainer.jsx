/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/search/searchFilterActions';
import { setCheckedNaics, setUncheckedNaics } from 'redux/actions/search/naicsActions';
import { resetMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';

import { areFiltersEqual } from 'containers/search/SearchContainer';
import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';

import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

const combinedActions = Object.assign(
    {},
    appliedFilterActions,
    { clearStagedFilters },
    { resetMapLegendToggle }
);

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func,
    resetNaicsTree: PropTypes.func,
    resetMapLegendToggle: PropTypes.func,
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
        const areStagedAndAppliedFiltersEquivalent = (
            areFiltersEqual(this.props.stagedFilters, prevProps.stagedFilters) &&
            areFiltersEqual(this.props.appliedFilters, prevProps.appliedFilters)
        );
        if (!areStagedAndAppliedFiltersEquivalent) {
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
        return areFiltersEqual(this.props.stagedFilters, this.props.appliedFilters);
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
        this.props.resetMapLegendToggle();
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
            dispatch(setCheckedNaics([]));
            dispatch(setUncheckedNaics([]));
        }
    })
)(SearchSidebarSubmitContainer);

SearchSidebarSubmitContainer.propTypes = propTypes;
