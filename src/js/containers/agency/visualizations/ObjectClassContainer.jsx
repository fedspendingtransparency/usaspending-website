/**
 * ObjectClassContainer.jsx
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { reduce } from 'lodash';

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as AgencyHelper from 'helpers/agencyHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import ObjectClassTreeMap from 'components/agency/visualizations/objectClass/ObjectClassTreeMap';

const propTypes = {
    id: React.PropTypes.string,
    active_fy: React.PropTypes.string
};

export class ObjectClassContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            inFlight: true,
            majorObjectClasses: {
                children: []
            },
            minorObjectClasses: {
                children: []
            },
            totalObligation: 0,
            totalMinorObligation: 0
        };

        this.fetchMinorObjectClasses = this.fetchMinorObjectClasses.bind(this);
    }

    componentWillMount() {
        this.fetchMajorObjectClasses(this.props.id, this.props.active_fy);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.fetchMajorObjectClasses(nextProps.id, nextProps.active_fy);
        }
    }

    fetchMajorObjectClasses(agencyID, fiscalYear) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // const params = {
        //     fiscal_year: fiscalYear,
        //     funding_agency_id: agencyID
        // };

        // Todo - Mike Bray: Remove once this data is available
        const params = {
            fiscal_year: 2017,
            funding_agency_id: 246
        };

        this.searchRequest = AgencyHelper.fetchAgencyMajorObjectClasses(params);

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum the positive obligated_amounts in the returned object classes
                // to produce the total obligation amount
                const totalObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => {
                        if (parseFloat(objectClass.obligated_amount) >= 0) {
                            return sum + parseFloat(objectClass.obligated_amount);
                        }
                        return sum;
                    },
                    0
                );

                this.setState({
                    majorObjectClasses: {
                        children: res.data.results
                    },
                    minorObjectClasses: {
                        children: []
                    },
                    totalObligation,
                    totalMinorObligation: 0
                });
            })
            .catch((err) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    fetchMinorObjectClasses(majorObjectClassCode) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // const params = {
        //     fiscal_year: this.props.active_fy,
        //     funding_agency_id: this.props.id,
        //     major_object_class_code: majorObjectClassCode
        // };

        // Todo - Mike Bray: Remove once this data is available
        const params = {
            fiscal_year: 2017,
            funding_agency_id: 246,
            major_object_class_code: majorObjectClassCode
        };

        this.searchRequest = AgencyHelper.fetchAgencyMinorObjectClasses(params);

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum the positive obligated_amounts in the returned object classes
                // to produce the total obligation amount
                const totalMinorObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => {
                        if (parseFloat(objectClass.obligated_amount) >= 0) {
                            return sum + parseFloat(objectClass.obligated_amount);
                        }
                        return sum;
                    },
                    0
                );

                this.setState({
                    minorObjectClasses: {
                        children: res.data.results
                    },
                    totalMinorObligation
                });
            })
            .catch((err) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    render() {
        const total = MoneyFormatter.formatTreemapValues(this.state.totalObligation);

        return (
            <div
                className="agency-section-wrapper"
                id="agency-object-classes">
                <div className="agency-callout-description">
                    This {total} in obligations is divided among categories,
                    called object classes. These groupings can be helpful for analysis
                    and cross-agency comparison.
                </div>
                <div className="agency-section-title">
                    <h4>Object Class</h4>
                    <hr className="results-divider" />
                </div>
                <div className="agency-section-content">
                    <ObjectClassTreeMap
                        majorObjectClasses={this.state.majorObjectClasses}
                        minorObjectClasses={this.state.minorObjectClasses}
                        totalObligation={this.state.totalObligation}
                        totalMinorObligation={this.state.totalMinorObligations}
                        fetchMinorObjectClasses={this.fetchMinorObjectClasses} />
                </div>
            </div>
        );
    }

}

export default connect(
    (state) => ({
        agency: state.agency
    })
)(ObjectClassContainer);

ObjectClassContainer.propTypes = propTypes;
