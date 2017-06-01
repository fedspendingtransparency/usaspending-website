/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';

import { filterStoreVersion, requiredTypes } from 'redux/reducers/search/searchFiltersReducer';
import * as searchHashActions from 'redux/actions/search/searchHashActions';
import * as SearchHelper from 'helpers/searchHelper';

import SearchPage from 'components/search/SearchPage';

import { testRedux, testRedux2 } from './testRedux';

const propTypes = {
    params: React.PropTypes.object,
    hash: React.PropTypes.string,
    filters: React.PropTypes.object,
    populateAllSearchFilters: React.PropTypes.func
};

export class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: '',
            hashState: 'ready'
        };

        this.request = null;
    }

    componentWillMount() {
        this.receiveHash(this.props.params.hash);
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
        }
    }

    receiveHash(urlHash) {
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
            hashState: 'outbound'
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
            console.log("reject");
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

    generateHash(filters) {
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

    render() {
        return (
            <SearchPage hash={this.props.hash} />
        );
    }
}

export default connect(
    (state) => ({
        hash: state.searchHash.hash,
        filters: state.filters
    }),
    (dispatch) => bindActionCreators(searchHashActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
