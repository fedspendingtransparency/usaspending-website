/**
 * ObjectClassContainer.jsx
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { reduce } from 'lodash';

import * as AgencyHelper from 'helpers/agencyHelper';

import ObjectClassTreeMap from 'components/agency/visualizations/objectClass/ObjectClassTreeMap';

const propTypes = {
    id: PropTypes.string,
    activeFY: PropTypes.string,
    asOfDate: PropTypes.string,
    displayedTotalObligation: PropTypes.number
};

const defaultProps = {
    id: '',
    activeFY: ''
};

export default class ObjectClassContainer extends React.PureComponent {
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
            totalMinorObligation: 0,
            hasNegatives: false,
            minorHasNegatives: false
        };

        this.showMinorObjectClasses = this.showMinorObjectClasses.bind(this);
    }

    componentDidMount() {
        this.fetchMajorObjectClasses(this.props.id, this.props.activeFY);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.activeFY !== prevProps.activeFY) {
            this.fetchMajorObjectClasses(this.props.id, this.props.activeFY);
        }
    }

    fetchMajorObjectClasses(id, fy) {
        if (!id || id === '' || !fy || fy === '') {
            // invalid ID or fiscal year
            return;
        }

        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.searchRequest = AgencyHelper.fetchAgencyMajorObjectClasses({
            funding_agency_id: id,
            fiscal_year: fy
        });

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum ALL obligated_amounts in the returned object classes
                // to produce the total obligation amount
                const totalObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => sum + parseFloat(objectClass.obligated_amount),
                    0
                );

                // Sum only the positive obligated_amounts in the returned object classes
                const positiveObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => {
                        if (parseFloat(objectClass.obligated_amount) >= 0) {
                            return sum + parseFloat(objectClass.obligated_amount);
                        }
                        return sum;
                    },
                    0
                );

                const hasNegatives = positiveObligation > totalObligation;

                this.setState({
                    majorObjectClasses: {
                        children: res.data.results
                    },
                    minorObjectClasses: {
                        children: []
                    },
                    totalObligation,
                    totalMinorObligation: 0,
                    hasNegatives
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

    showMinorObjectClasses(selected) {
        // We want to clear out the existing Minor Object Class treemap
        // so that subsequent loads don't show the previous treemap
        // in the time it takes for the API call to return
        this.setState({
            minorObjectClasses: {
                children: []
            },
            totalMinorObligation: 0
        }, () => {
            this.fetchMinorObjectClasses(selected);
        });
    }

    fetchMinorObjectClasses(majorObjectClassCode) {
        if (!majorObjectClassCode || majorObjectClassCode === '') {
            // invalid object class code
            return;
        }

        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.searchRequest = AgencyHelper.fetchAgencyMinorObjectClasses({
            funding_agency_id: this.props.id,
            fiscal_year: this.props.activeFY,
            major_object_class_code: majorObjectClassCode
        });

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum ALL obligated_amounts in the returned object classes
                // to produce the total obligation amount
                const totalMinorObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => sum + parseFloat(objectClass.obligated_amount),
                    0
                );

                // Sum the positive obligated_amounts in the returned object classes
                const positiveMinorObligation = reduce(
                    res.data.results,
                    (sum, objectClass) => {
                        if (parseFloat(objectClass.obligated_amount) >= 0) {
                            return sum + parseFloat(objectClass.obligated_amount);
                        }
                        return sum;
                    },
                    0
                );

                const minorHasNegatives = positiveMinorObligation > totalMinorObligation;

                this.setState({
                    minorObjectClasses: {
                        children: res.data.results
                    },
                    totalMinorObligation,
                    minorHasNegatives
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
        return (
            <ObjectClassTreeMap
                activeFY={this.props.activeFY}
                displayedTotalObligation={this.props.displayedTotalObligation}
                majorObjectClasses={this.state.majorObjectClasses}
                minorObjectClasses={this.state.minorObjectClasses}
                totalObligation={this.state.totalObligation}
                totalMinorObligation={this.state.totalMinorObligation}
                showMinorObjectClasses={this.showMinorObjectClasses}
                asOfDate={this.props.asOfDate}
                hasNegatives={this.state.hasNegatives}
                minorHasNegatives={this.state.minorHasNegatives} />
        );
    }
}

ObjectClassContainer.propTypes = propTypes;
ObjectClassContainer.defaultProps = defaultProps;
