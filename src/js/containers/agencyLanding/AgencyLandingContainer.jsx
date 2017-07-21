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

import AgencyLandingSearchBar from 'components/agencyLanding/AgencyLandingSearchBar';
import AgencyLandingResultsSection from 'components/agencyLanding/AgencyLandingResultsSection';

const propTypes = {
    agencies: PropTypes.instanceOf(Immutable.OrderedSet),
    agenciesOrder: PropTypes.object,
    setAgencies: PropTypes.func,
    meta: PropTypes.object,
    setAutocompleteAgencies: PropTypes.func,
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
        this.agencySearchRequest = null;
        this.handleTextInput = this.handleTextInput.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.showColumns();
    }

    componentDidUpdate(prevProps) {
        if (this.props.agenciesOrder !== prevProps.agenciesOrder) {
            // table sort changed
            this.fetchAgencies();
        }
        if (this.props.autocompleteAgencies !== prevProps.autocompleteAgencies) {
            // search input changed
            this.fetchAgencies();
        }
    }

    componentWillUnmount() {
        if (this.agenciesRequest) {
            this.agenciesRequest.cancel();
        }
        if (this.agencySearchRequest) {
            this.agencySearchRequest.cancel();
        }
    }

    handleTextInput(agencyInput) {
        // Clear existing agencies
        this.props.setAutocompleteAgencies([]);
        if (agencyInput === '') {
            this.setState({
                noResults: false
            });
        }

        // Grab input, clear any exiting timeout
        const input = agencyInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteAgencies(input);
        }, 300);
    }

    queryAutocompleteAgencies(input) {
        this.setState({
            noResults: false
        });

        if (this.agencySearchRequest) {
            // A request is currently in-flight, cancel it
            this.agencySearchRequest.cancel();
        }

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                agencySearchString: input
            });

            const agencySearchParams = {
                search_text: input
            };

            this.agencySearchRequest = AgencyLandingHelper.fetchSearchResults(agencySearchParams);

            this.agencySearchRequest.promise
                .then((res) => {
                    this.setState({
                        noResults: res.data.results.length === 0
                    });

                    const matchedAgencies = res.data.results;
                    const matchedAgencyIds = [];
                    matchedAgencies.forEach((agency) => {
                        matchedAgencyIds.push(agency.agency_id);
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteAgencies(
                        matchedAgencyIds
                    );
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
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
        const widths = AgenciesTableFields.columnWidthPercentage;

        AgenciesTableFields.order.forEach((col) => {
            let displayName = AgenciesTableFields[col];
            if ((col === 'budget_authority_amount') || (col === 'percentage_of_total_budget_authority')) {
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
            order: [this.formatSort()]
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
        const showAllAgencies = this.props.autocompleteAgencies.length === 0 && !this.state.noResults;

        data.results.forEach((item) => {
            // If there is no search term, show all agencies. Otherwise, only show agencies that match
            // the search input
            if (showAllAgencies || (this.props.autocompleteAgencies.indexOf(parseFloat(item.agency_id)) > -1)) {
                // Create a link to the agency's profile page
                const link = (
                    <a href={`/#/agency/${item.agency_id}`}>{item.agency_name}</a>
                );

                // Round to 2 decimal places and don't show 0.00
                let percent = Math.round(parseFloat(item.percentage_of_total_budget_authority) * 100) / 100;

                if (percent === 0.00) {
                    percent = 'Less than 0.01%';
                }
                else {
                    percent = `${percent}%`;
                }

                const agencyObject = {
                    agency_id: item.agency_id,
                    agency_profile_link: link,
                    budget_authority_amount: item.budget_authority_amount,
                    percentage_of_total_budget_authority: percent
                };

                const agency = new Agency(agencyObject);
                agencies.push(agency);
            }
        });

        this.props.setAgencies(agencies);
    }

    render() {
        const resultsCount = this.props.agencies.toArray().length;
        let resultsText = `${resultsCount} results`;
        if (resultsCount === 1) {
            resultsText = `${resultsCount} result`;
        }

        return (
            <div className="agency-landing-container">
                <div className="agency-landing-section">
                    <div className="agency-landing-search">
                        <AgencyLandingSearchBar
                            handleTextInput={this.handleTextInput} />
                    </div>
                </div>
                <div className="agency-landing-section results-count">
                    {resultsText}
                </div>
                <div className="agency-landing-section">
                    <AgencyLandingResultsSection
                        batch={this.props.meta.batch}
                        columns={this.state.columns}
                        results={this.props.agencies.toArray()}
                        inFlight={this.state.inFlight}
                        agencySearchString={this.state.agencySearchString} />
                </div>
            </div>
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
