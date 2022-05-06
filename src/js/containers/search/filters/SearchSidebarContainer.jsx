/**
 * SearchSidebarContainer.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchSidebar from 'components/search/SearchSidebar';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    filters: PropTypes.object
};

export class SearchSidebarContainer extends React.Component {
    render() {
        return (
            <SearchSidebar />
        );
    }
}

SearchSidebarContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filters: state.filters
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SearchSidebarContainer);
