/**
 * AgencyFooterContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';

import { clearAllFilters, updateSelectedAwardingAgencies } from
    'redux/actions/search/searchFilterActions';
import * as AgencyHelper from 'helpers/agencyHelper';

import AgencyFooter from 'components/agency/footer/AgencyFooter';

const propTypes = {
    id: React.PropTypes.string,
    clearAllFilters: React.PropTypes.func,
    updateSelectedAwardingAgencies: React.PropTypes.func
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

    componentWillMount() {
        this.loadAgency(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.loadAgency(nextProps.id);
        }
    }

    loadAgency(id) {
        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            ready: false
        });

        this.request = AgencyHelper.fetchAgencyCgacCode({
            id
        });

        this.request.promise
            .then((res) => {
                this.setState({
                    ready: true,
                    agency: res.data.results[0]
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    clickedSearch() {
        if (!this.state.ready) {
            return;
        }

        // we need to clear out the Redux filters
        this.props.clearAllFilters();

        // now push in the current agency as the selected awarding agency
        this.props.updateSelectedAwardingAgencies({
            agency: this.state.agency
        });

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
