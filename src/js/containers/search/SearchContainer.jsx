/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { is } from 'immutable';
import moment from 'moment';

import Router from 'containers/router/Router';

import { filterStoreVersion, requiredTypes, initialState } from
    'redux/reducers/search/searchFiltersReducer';
import * as searchHashActions from 'redux/actions/search/searchHashActions';
import {
    applyStagedFilters,
    setAppliedFilterEmptiness,
    setAppliedFilterCompletion
} from 'redux/actions/search/appliedFilterActions';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import * as DownloadHelper from 'helpers/downloadHelper';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

import SearchPage from 'components/search/SearchPage';

import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

require('pages/search/searchPage.scss');

const propTypes = {
    params: PropTypes.object,
    filters: PropTypes.object,
    appliedFilters: PropTypes.object,
    restoreHashedFilters: PropTypes.func,
    clearAllFilters: PropTypes.func,
    download: PropTypes.object,
    applyStagedFilters: PropTypes.func,
    setAppliedFilterEmptiness: PropTypes.func,
    setAppliedFilterCompletion: PropTypes.func
};

export class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: '',
            hashState: 'ready',
            lastUpdate: '',
            downloadAvailable: false,
            downloadInFlight: false
        };

        this.request = null;
        this.updateRequest = null;
    }

    componentDidMount() {
        this.handleInitialUrl(this.props.params.hash);
        this.requestDownloadAvailability(this.props.appliedFilters.filters);
    }

    componentDidUpdate(prevProps) {
        const nextHash = this.props.params.hash || '';
        // TODO: use either props or state, not both.
        if (nextHash !== this.state.hash) {
            this.receiveHash(nextHash);
        }
        else if (!isEqual(prevProps.appliedFilters.filters, this.props.appliedFilters.filters)) {
            if (this.state.hashState === 'ready') {
                // the filters changed and it's not because of an inbound/outbound URL hash change
                this.generateHash(this.props.appliedFilters.filters);
            }
            this.requestDownloadAvailability(this.props.appliedFilters.filters);
        }
    }

    handleInitialUrl(urlHash) {
        // on page load, there are multiple possibilities:
        // the URL may not have a hash in it
        if (!urlHash || urlHash === '') {
            this.setState({
                hash: '',
                hashState: 'ready'
            }, () => {
                // but it may be the case that we're coming back to the search page from elsewhere
                // on the site via a link to /search and the Redux store has cached our previous
                // search. In this case, the page will repopulate the search and we should
                // regenerate the hash so the URL matches the page contents
                this.generateInitialHash();
            });
            return;
        }

        // otherwise, it may be the case that the URL has a hash in it, in which case we should
        // regenerate the filters
        this.setState({
            hash: urlHash,
            hashState: 'inbound'
        }, () => {
            this.requestFilters();
        });
    }

    generateInitialHash() {
        // it may be the case that some search filters are applied when the search page is mounted
        // this is most likely because the user has navigated away from a filtered search page, then
        // come back to it (Redux is still holding the filters)
        // in this case, we should regenerate the URL hash for the current filter set so that the
        // URL is immediately shareable
        const unfiltered = this.determineIfUnfiltered(this.props.appliedFilters.filters);
        if (unfiltered) {
            // there is no initial hash because there are no filters
            Router.history.replace('/search');
            this.props.setAppliedFilterEmptiness(true);
            this.props.setAppliedFilterCompletion(true);
            return;
        }

        // there should be an initial hash because filters are applied
        this.generateHash(this.props.appliedFilters.filters);
    }

    receiveHash(urlHash) {
        // unlike when we handle the URL during initial mount, we will assume subsequent filter and
        // URL changes will be caused by direct user input rather than cached Redux values, so we
        // won't try to generate URL hashes based on unchanged filters
        if (!urlHash || urlHash === '') {
            this.setState({
                hash: '',
                hashState: 'ready'
            });
            return;
        }

        // this is a hash that has been provided to the search page via the URL. The filters have
        // not yet been applied, so update the container's state and then parse the hash into its
        // original filter set.
        this.setState({
            hash: urlHash,
            hashState: 'inbound'
        }, () => {
            this.requestFilters();
        });
    }

    provideHash(hash) {
        // this is a hash that represents the current filter set. The filters are already applied
        // by way of user interaction. Now update the component state and URL with the hash so the
        // URL can be shared with others. Update the state first (to prevent the hash from being
        // re-parsed as an inbound/received hash), then replace the URL instead of pushing to
        // prevent hash changes from being added to the browser history. This keeps the back button
        // working as expected.
        this.props.setAppliedFilterEmptiness(false);
        this.setState({
            hash,
            hashState: 'ready'
        }, () => {
            Router.history.replace(`/search/${hash}`);
        });
    }

    requestFilters() {
        // POST an API request to retrieve the Redux state
        if (this.request) {
            this.request.cancel();
        }

        this.request = SearchHelper.restoreUrlHash({
            hash: this.state.hash
        });

        this.request.promise
            .then((res) => {
                this.request = null;
                this.props.setAppliedFilterEmptiness(false);
                this.applyFilters(res.data.filter);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.request = null;

                    // nuke the URL hash since it isn't working
                    this.setState({
                        hash: '',
                        hashState: 'ready'
                    }, () => {
                        this.props.setAppliedFilterEmptiness(true);
                        this.props.setAppliedFilterCompletion(true);
                        Router.history.replace('/search');
                    });
                }
            });
    }

    applyFilters(data) {
        const filters = data.filters;
        const version = data.version;

        if (version !== filterStoreVersion) {
            // versions don't match, don't populate the filters
            // TODO: Kevin Li - figure out how we want to deal with Redux structure changes when
            // a URL hash contains data that no longer applies to the current site
            console.log("version mismatch");
            return;
        }

        // convert values to Immutable object types as necessary
        const reduxValues = {};
        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (requiredTypes[key]) {
                // Redux expects an Immutable-typed object
                const ObjType = requiredTypes[key];
                reduxValues[key] = new ObjType(value);
            }
            else {
                reduxValues[key] = value;
            }
        });

        // apply the filters to both the staged and applied stores
        this.props.restoreHashedFilters(reduxValues);

        // send the prepopulated filters (received from the hash) to Google Analytics
        const events = convertFiltersToAnalyticEvents(reduxValues);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);

        this.setState({
            hashState: 'ready'
        });
    }

    determineIfUnfiltered(filters) {
        // check to see if we are applying any filters
        // if there are no filters, we shouldn't generate a hash
        let unfiltered = true;

        // make a copy of the initial and actual Redux filter states
        const currentState = Object.assign({}, filters);
        const unfilteredState = Object.assign({}, initialState);
        if (currentState.timePeriodType === 'fy') {
            // if the time period is fiscal year, we don't care about the date range values, even
            // if they're provided because the date range tab isn't selected
            delete unfilteredState.timePeriodStart;
            delete unfilteredState.timePeriodEnd;
            delete currentState.timePeriodStart;
            delete currentState.timePeriodEnd;
        }
        else if (currentState.timePeriodEnd === 'dr') {
            // if the time period is date range, we don't care about the fiscal year values, even
            // if they're provided because the fiscal year tab isn't selected
            delete unfilteredState.timePeriodFY;
            delete currentState.timePeriodFY;
        }

        // we need to iterate through each of the filter Redux keys in order to perform equality
        // comparisons on Immutable children (via the Immutable is() function)
        const filterKeys = Object.keys(unfilteredState);

        for (let i = 0; i < filterKeys.length; i++) {
            const key = filterKeys[i];
            const unfilteredValue = unfilteredState[key];
            const currentValue = currentState[key];
            if (!is(unfilteredValue, currentValue)) {
                // it doesn't match, we can stop looping - filters have been applied
                unfiltered = false;
                break;
            }
        }
        return unfiltered;
    }

    generateHash(filters) {
        const unfiltered = this.determineIfUnfiltered(filters);
        if (unfiltered) {
            // all the filters were cleared, reset to a blank hash
            this.props.setAppliedFilterEmptiness(true);
            this.props.setAppliedFilterCompletion(true);
            Router.history.replace('/search');
            return;
        }

        // POST an API request to retrieve the Redux state
        if (this.request) {
            this.request.cancel();
        }

        this.request = SearchHelper.generateUrlHash({
            filters,
            version: filterStoreVersion
        });

        this.request.promise
            .then((res) => {
                this.request = null;

                // update the URL with the received hash
                const hash = res.data.hash;
                this.provideHash(hash);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.request = null;
                }
            });
    }

    loadUpdateDate() {
        if (this.updateRequest) {
            this.updateRequest.cancel();
        }

        this.updateRequest = SearchHelper.fetchLastUpdate();
        this.updateRequest.promise
            .then((res) => {
                this.parseUpdateDate(res.data.last_updated);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.updateRequest = null;
                }
            });
    }

    parseUpdateDate(value) {
        const date = moment(value, 'MM/DD/YYYY');
        this.setState({
            lastUpdate: date.format('MMMM D, YYYY')
        });
    }

    requestDownloadAvailability(filters) {
        if (this.determineIfUnfiltered(filters)) {
            // don't make an API call when it's a blank state
            this.setState({
                downloadAvailable: false,
                downloadInFlight: false
            });
            return;
        }

        this.setState({
            downloadInFlight: true
        });

        const operation = new SearchAwardsOperation();
        operation.fromState(filters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            filters: searchParams,
            auditTrail: 'Download Availability Count'
        };

        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = DownloadHelper.requestDownloadCount(apiParams);
        this.downloadRequest.promise
            .then((res) => {
                this.parseDownloadAvailability(res.data);
                this.downloadRequest = null;
            })
            .catch(() => {
                this.downloadRequest = null;
                this.setState({
                    downloadInFlight: false
                });
            });
    }

    parseDownloadAvailability(data) {
        const downloadAvailable = !data.transaction_rows_gt_limit;

        this.setState({
            downloadAvailable,
            downloadInFlight: false
        });
    }

    render() {
        return (
            <SearchPage
                hash={this.props.params.hash}
                filters={this.props.filters}
                noFiltersApplied={this.props.appliedFilters._empty}
                lastUpdate={this.state.lastUpdate}
                downloadAvailable={this.state.downloadAvailable}
                downloadInFlight={this.state.downloadInFlight}
                download={this.props.download}
                requestsComplete={this.props.appliedFilters._complete} />
        );
    }
}

export default connect(
    (state) => ({
        filters: state.filters,
        download: state.download,
        appliedFilters: state.appliedFilters,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(Object.assign({}, searchHashActions, {
        clearAllFilters,
        applyStagedFilters,
        setAppliedFilterEmptiness,
        setAppliedFilterCompletion
    }), dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
