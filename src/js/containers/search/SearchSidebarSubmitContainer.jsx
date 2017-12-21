/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';

import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';

const propTypes = {
    stagedFilters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

export class SearchSidebarSubmitContainer extends React.Component {
    constructor(props) {
        super(props);

        this.applyStagedFilters = this.applyStagedFilters.bind(this);
        this.resetAllFilters = this.resetAllFilters.bind(this);
    }

    applyStagedFilters() {
        this.props.applyStagedFilters(this.props.stagedFilters);
    }

    resetAllFilters() {
        this.props.resetAppliedFilters();
    }

    render() {
        return (
            <SearchSidebarSubmit
                requestsComplete={this.props.requestsComplete}
                applyStagedFilters={this.applyStagedFilters}
                resetAllFilters={this.resetAllFilters} />
        );
    }
}

export default connect(
    (state) => ({
        requestsComplete: state.appliedFilters._complete,
        stagedFilters: state.filters
    }),
    (dispatch) => bindActionCreators(appliedFilterActions, dispatch))(SearchSidebarSubmitContainer);

SearchSidebarSubmitContainer.propTypes = propTypes;
