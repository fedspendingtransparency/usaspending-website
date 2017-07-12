/**
 * AgencyLandingContainer.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { isCancel } from 'axios';
import Immutable from 'immutable';

import { measureTableHeader } from 'helpers/textMeasurement';

import AgenciesTableFields from 'dataMapping/agencyLanding/agenciesTableFields';
import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';
import { Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';
// import AgencyLandingHelper from 'helpers/agencyLandingHelper';

import AgencyLandingSearchBar from 'components/agencyLanding/AgencyLandingSearchBar';
import AgencyLandingResultsSection from 'components/agencyLanding/AgencyLandingResultsSection';

const propTypes = {
    agencies: React.PropTypes.instanceOf(Immutable.OrderedSet),
    agenciesOrder: React.PropTypes.object,
    setAgencies: React.PropTypes.func
};

export class AgencyLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            inFlight: false
        };

        this.agenciesRequest = null;
    }

    componentDidMount() {
        this.showColumns();
    }

    componentDidUpdate(prevProps) {
        if (this.props.agenciesOrder !== prevProps.agenciesOrder) {
            // table sort changed
            this.fetchAgencies();
        }
    }

    componentWillUnmount() {
        if (this.agenciesRequest) {
            this.agenciesRequest.cancel();
        }
    }

    formatSort() {
        let direction = '';
        if (this.props.agenciesOrder.direction === 'desc') {
            direction = '-';
        }

        return `${direction}${this.props.agenciesOrder.field}`;
    }

    showColumns() {
        const columns = [];
        const sortOrder = AgenciesTableFields.defaultSortDirection;

        AgenciesTableFields.order.forEach((col) => {
            const column = {
                columnName: col,
                displayName: AgenciesTableFields[col],
                width: measureTableHeader(AgenciesTableFields[col]),
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        }, () => {
            this.fetchAgencies();
        });
    }

    fetchAgencies() {
        // TODO - Lizzie: uncomment when endpoint is ready
        // if (this.agenciesRequest) {
        //    // a request is in-flight, cancel it
        //    this.agenciesRequest.cancel();
        // }
        //
        // this.setState({
        //    inFlight: true
        // });
        //
        // // generate the params
        // const params = {
        //    filters: [
        //        {
        //            field: 'actice_fy',
        //            operation: 'equals',
        //            value: this.props.activeFY
        //        }
        //    ],
        //    order: [this.formatSort()]
        // };
        //
        // this.agenciesRequest = AgencyLandingHelper.fetchAllAgencies(params);
        //
        // this.agenciesRequest.promise
        //    .then((res) => {
        //        this.setState({
        //            inFlight: false
        //        });
        //
        //        this.parseAgencies(res.data);
        //    })
        //    .catch((err) => {
        //        this.agenciesRequest = null;
        //        if (!isCancel(err)) {
        //            this.setState({
        //                inFlight: false
        //            });
        //            console.log(err);
        //        }
        //    });

        const mockRes = { results: [
            {
                id: 10,
                percentage_of_total_budget_authority: ".0567",
                agency_name: "Architect of the Capitol",
                budget_authority_amount: "4322852976.48",
                active_fy: "2017"
            },
            {
                id: 11,
                percentage_of_total_budget_authority: ".00411",
                agency_name: "Library of Congress",
                budget_authority_amount: "9842852976.48",
                active_fy: "2017"
            },
            {
                id: 14,
                percentage_of_total_budget_authority: ".00032",
                agency_name: "Government Publishing Office",
                budget_authority_amount: "1426852976.48",
                active_fy: "2017"
            }
        ] };

        this.parseAgencies(mockRes);
    }

    parseAgencies(data) {
        const agencies = [];
        data.results.forEach((item) => {
            const agency = new Agency(item);
            agencies.push(agency);
        });

        this.props.setAgencies(agencies);
    }

    render() {
        // TODO - Lizzie: remove static value and use metadata
        const resultsCount = 65;

        return (
            <div className="agency-landing-container">
                <div className="agency-landing-section">
                    <div className="agency-landing-search">
                        <AgencyLandingSearchBar />
                    </div>
                </div>
                <div className="agency-landing-section results-count">
                    {resultsCount} results
                </div>
                <div className="agency-landing-section">
                    <AgencyLandingResultsSection
                        columns={this.state.columns}
                        results={this.props.agencies.toArray()}
                        inFlight={this.state.inFlight} />
                </div>
            </div>
        );
    }
}

AgencyLandingContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        agencies: state.agencyLanding.agencies,
        agenciesOrder: state.agencyLanding.agenciesOrder
    }),
    (dispatch) => bindActionCreators(agencyLandingActions, dispatch)
)(AgencyLandingContainer);
