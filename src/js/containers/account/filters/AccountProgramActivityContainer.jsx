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
    toggleProgramActivity: React.PropTypes.func,
    setProgramActivities: React.PropTypes.func,
    account: React.PropTypes.object
};

export class AccountProgramActivityContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            programActivities: []
        };

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        this.populateProgramActivities();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account !== this.props.account) {
            this.setState({
                programActivities: []
            }, () => {
                this.populateProgramActivities();
            });
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
                "treasury_account__agency_id",
                "treasury_account__main_account_code"],
            field: "ussgl480100_undelivered_orders_obligations_unpaid_fyb",
            aggregate: "count",
            filters: [
                {
                    field: "treasury_account__federal_account",
                    operation: "equals",
                    value: this.props.account.id
                },
                {
                    field: "treasury_account__agency_id",
                    operation: "equals",
                    value: this.props.account.agency_identifier
                },
                {
                    field: "treasury_account__main_account_code",
                    operation: "equals",
                    value: this.props.account.main_account_code
                }
            ]
        };

        this.searchRequest = AccountHelper.fetchProgramActivities(apiSearchParams);

        this.searchRequest.promise
            .then((res) => {
                const data = res.data.results;
                const programActivities = [];

                data.forEach((value) => {
                    programActivities.push({
                        code: value.program_activity__program_activity_code,
                        name: value.program_activity__program_activity_name
                    });
                });

                // Add search results to Redux
                this.setState({
                    programActivities
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        noResults: true
                    });
                }
            });
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
        selectedProgramActivities: state.account.filters.programActivity,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountProgramActivityContainer);
