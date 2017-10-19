/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { is } from 'immutable';
import moment from 'moment';

import Router from 'containers/router/Router';

import { filterStoreVersion, requiredTypes, initialState } from
    'redux/reducers/search/searchFiltersReducer';
import * as searchHashActions from 'redux/actions/search/searchHashActions';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import * as DownloadHelper from 'helpers/downloadHelper';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

import SearchPage from 'components/search/SearchPage';

const propTypes = {
    params: PropTypes.object,
    filters: PropTypes.object,
    populateAllSearchFilters: PropTypes.func,
    clearAllFilters: PropTypes.func
};

const maxDownloadRows = 500000;

export class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: '',
            hashState: 'ready',
            lastUpdate: '',
            downloadAvailable: false
        };

        this.request = null;
        this.updateRequest = null;
    }

    componentWillMount() {
        this.handleInitialUrl(this.props.params.hash);
        this.requestDownloadAvailability(this.props.filters);
        // this.loadUpdateDate();
    }

    componentWillReceiveProps(nextProps) {
        let nextHash = nextProps.params.hash;
        if (!nextHash) {
            // set null hash URL params (because the user went to /search) to an empty string
            // for purposes of state comparison
            nextHash = '';
        }

        if (nextHash !== this.state.hash) {
            this.receiveHash(nextHash);
        }
        else if (nextProps.filters !== this.props.filters) {
            if (this.state.hashState === 'ready') {
                // the filters changed and it's not because of an inbound/outbound URL hash change
                this.generateHash(nextProps.filters);
            }
            this.requestDownloadAvailability(nextProps.filters);
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

        const unfiltered = this.determineIfUnfiltered(this.props.filters);
        if (unfiltered) {
            // there is no initial hash because there are no filters
            Router.history.replace('/search');
            return;
        }

        // there should be an initial hash because filters are applied
        this.generateHash(this.props.filters);
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

        this.props.populateAllSearchFilters(reduxValues);

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
            this.setState({
                hash: '',
                hashState: 'ready'
            }, () => {
                Router.history.replace('/search');
            });

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
            });
    }

    parseDownloadAvailability(data) {
        const downloadAvailable = !data.transaction_rows_gt_limit;

        this.setState({
            downloadAvailable
        });
    }

    render() {
        return (
            <SearchPage
                hash={this.props.params.hash}
                clearAllFilters={this.props.clearAllFilters}
                filters={this.props.filters}
                lastUpdate={this.state.lastUpdate}
                downloadAvailable={this.state.downloadAvailable} />
        );
    }
}

export default connect(
    (state) => ({
        filters: state.filters
    }),
    (dispatch) => bindActionCreators(Object.assign({}, searchHashActions, {
        clearAllFilters
    }), dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
