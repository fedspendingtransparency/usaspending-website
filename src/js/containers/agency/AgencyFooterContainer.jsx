/**
 * AgencyFooterContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Router from 'containers/router/Router';

import { clearAllFilters, updateSelectedAwardingAgencies } from
    'redux/actions/search/searchFilterActions';

import AgencyFooter from 'components/agency/footer/AgencyFooter';

const propTypes = {
    id: PropTypes.string,
    clearAllFilters: PropTypes.func
};

export class AgencyFooterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            agency: {}
        };

        this.request = null;

        this.clickedSearch = this.clickedSearch.bind(this);
    }

    clickedSearch() {
        // TODO: Kevin Li - this feature has been descoped to no longer auto-fill the search page
        // if (!this.state.ready) {
        //     return;
        // }

        // we need to clear out the Redux filters
        this.props.clearAllFilters();

        // // now push in the current agency as the selected awarding agency
        // this.props.updateSelectedAwardingAgencies({
        //     agency: this.state.agency
        // });

        Router.history.push('/search');
    }

    render() {
        return (
            <AgencyFooter
                clickedSearch={this.clickedSearch} />
        );
    }
}

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators({
        clearAllFilters,
        updateSelectedAwardingAgencies
    }, dispatch)
)(AgencyFooterContainer);

AgencyFooterContainer.propTypes = propTypes;
