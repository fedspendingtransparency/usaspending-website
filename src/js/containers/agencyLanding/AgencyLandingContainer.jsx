/**
 * AgencyLandingContainer.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import Immutable from 'immutable';

import AgenciesTableFields from 'dataMapping/agencyLanding/agenciesTableFields';
import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';
import { Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';
import * as AgencyLandingHelper from 'helpers/agencyLandingHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import AgencyLandingContent from 'components/agencyLanding/AgencyLandingContent';

const propTypes = {
    agencies: PropTypes.instanceOf(Immutable.OrderedSet),
    agenciesOrder: PropTypes.object,
    setAgencies: PropTypes.func,
    meta: PropTypes.object,
    autocompleteAgencies: PropTypes.array
};

export class AgencyLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            inFlight: false,
            currentFY: '',
            agencySearchString: '',
            autocompleteAgencies: [],
            noResults: false
        };

        this.agenciesRequest = null;
        this.setAgencySearchString = this.setAgencySearchString.bind(this);
        this.setNoResults = this.setNoResults.bind(this);
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

    setAgencySearchString(agencySearchString) {
        this.setState({
            agencySearchString
        });
    }

    setNoResults(noResults) {
        this.setState({
            noResults
        });
    }

    showColumns() {
        const columns = [];
        const sortOrder = AgenciesTableFields.defaultSortDirection;
        const widths = AgenciesTableFields.columnWidthPercentage;

        AgenciesTableFields.order.forEach((col) => {
            let displayName = AgenciesTableFields[col];
            if ((col === 'budget_authority_amount') ||
                (col === 'percentage_of_total_budget_authority')) {
                // Add (FY YYYY) to Budget Authority and Percent of Total U.S. Budget column headers
                if (this.state.fy) {
                    displayName = `${displayName} (FY ${this.state.currentFY})`;
                }
            }
            const column = {
                columnName: col,
                displayName,
                width: widths[col],
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
        if (this.agenciesRequest) {
            // a request is in-flight, cancel it
            this.agenciesRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        // generate the params
        const params = {
            sort: this.props.agenciesOrder.field,
            order: this.props.agenciesOrder.direction
        };

        this.agenciesRequest = AgencyLandingHelper.fetchAllAgencies(params);

        this.agenciesRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                this.parseAgencies(res.data);
            })
            .catch((err) => {
                this.agenciesRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseAgencies(data) {
        const agencies = [];

        data.results.forEach((item) => {
            // Format budget authority amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.budget_authority_amount, 0);

            // Convert from decimal value to percentage
            const percentage = item.percentage_of_total_budget_authority * 100;
            // Round percentage to 2 decimal places
            let percent = Math.round(parseFloat(percentage) * 100) / 100;

            if (percent === 0.00) {
                percent = 'Less than 0.01%';
            }
            else {
                percent = `${percent}%`;
            }

            const agencyObject = {
                agency_id: item.agency_id,
                agency_name: [item.agency_name],
                budget_authority_amount: formattedCurrency,
                percentage_of_total_budget_authority: percent
            };

            const agency = new Agency(agencyObject);
            agencies.push(agency);
        });

        this.props.setAgencies(agencies);
    }

    render() {
        let results = [];

        if (!this.state.noResults) {
            // There are results
            if (this.props.autocompleteAgencies.length === 0) {
                // There is no search input
                results = this.props.agencies.toArray();
            }
            else {
                // There are agencies matching the search input
                results = this.props.autocompleteAgencies;
            }
        }

        const resultsCount = results.length;
        let resultsText = `${resultsCount} results`;
        if (resultsCount === 1) {
            resultsText = `${resultsCount} result`;
        }

        // Create an Ordered Set for the search hash
        const autocompleteSet = new Immutable.OrderedSet(this.props.autocompleteAgencies);

        return (
            <AgencyLandingContent
                {...this.props}
                resultsText={resultsText}
                results={results}
                searchHash={autocompleteSet.hashCode()}
                agencySearchString={this.state.agencySearchString}
                inFlight={this.state.inFlight}
                columns={this.state.columns}
                setAgencySearchString={this.setAgencySearchString}
                setNoResults={this.setNoResults} />
        );
    }
}

AgencyLandingContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        agencies: state.agencyLanding.agencies,
        agenciesOrder: state.agencyLanding.agenciesOrder,
        meta: state.agencyLanding.agenciesMeta,
        autocompleteAgencies: state.agencyLanding.autocompleteAgencies
    }),
    (dispatch) => bindActionCreators(agencyLandingActions, dispatch)
)(AgencyLandingContainer);
