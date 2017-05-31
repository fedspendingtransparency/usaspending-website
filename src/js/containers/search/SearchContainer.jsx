/**
 * SearchContainer.jsx
 * Created by Kevin Li 5/30/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';

import * as searchHashActions from 'redux/actions/search/searchHashActions';

import SearchPage from 'components/search/SearchPage';

const propTypes = {
    params: React.PropTypes.object,
    hash: React.PropTypes.string
};

export class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: ''
        };
    }

    componentWillMount() {
        this.receiveHash(this.props.params.hash);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.hash !== this.state.hash) {
            this.receiveHash(nextProps.params.hash);
        }
    }

    receiveHash(urlHash) {
        // this is a hash that has been provided to the search page via the URL. The filters have
        // not yet been applied, so update the container's state and then parse the hash into its
        // original filter set.
        this.setState({
            hash: urlHash
        }, () => {
            this.parseHash();
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
            hash
        }, () => {
            Router.history.replace(`/search/${hash}`);
        });
    }

    parseHash() {

    }

    render() {
        return (
            <SearchPage hash={this.props.hash} />
        );
    }
}

export default connect(
    (state) => ({
        hash: state.searchHash.hash
    }),
    (dispatch) => bindActionCreators(searchHashActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
