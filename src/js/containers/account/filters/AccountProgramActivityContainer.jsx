/**
 * AccountProgramActivityContainer.jsx
 * Created by michaelbray on 4/14/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';
import * as AccountHelper from 'helpers/accountHelper';

import ProgramActivityFilter from
    'components/account/filters/programActivity/ProgramActivityFilter';

const propTypes = {
    setAvailableProgramActivities: React.PropTypes.func,
    toggleProgramActivity: React.PropTypes.func,
    account: React.PropTypes.object
};

export class AccountProgramActivityContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noResults: false,
            inFlight: false
        };

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        this.populateProgramActivities();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account !== this.props.account) {
            this.populateProgramActivities();
        }
    }

    updateFilter(code) {
        this.props.toggleProgramActivity(code);
    }

    populateProgramActivities() {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        const apiSearchParams = {
            group: [
                "program_activity__program_activity_name",
                "program_activity__program_activity_code",
                "program_activity__id"],
            field: "ussgl480100_undelivered_orders_obligations_unpaid_fyb",
            aggregate: "count",
            filters: [
                {
                    field: "treasury_account__federal_account",
                    operation: "equals",
                    value: this.props.account.id
                }
            ]
        };

        this.searchRequest = AccountHelper.fetchProgramActivities(apiSearchParams);

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                this.parseResultData(res.data.results);
            })
            .catch((err) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        noResults: true
                    });
                }
            });
    }

    parseResultData(data) {
        const programActivities = [];

        data.forEach((value) => {
            programActivities.push({
                id: value.program_activity__id,
                code: value.program_activity__program_activity_code,
                name: value.program_activity__program_activity_name
            });
        });

        let noResults = false;
        if (programActivities.length === 0) {
            noResults = true;
        }

        // Update state
        this.setState({
            noResults
        });

        // Add search results to Redux
        this.props.setAvailableProgramActivities(programActivities);
    }

    render() {
        return (
            <ProgramActivityFilter
                {...this.props}
                {...this.state}
                updateFilter={this.updateFilter} />
        );
    }
}

AccountProgramActivityContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        availableProgramActivities: state.account.filterOptions.programActivity,
        selectedProgramActivities: state.account.filters.programActivity,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountProgramActivityContainer);
