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
            objectClassData: {
                children: []
            },
            totalObligation: 0
        };
    }

    componentWillMount() {
        this.loadData(this.props.id, this.props.active_fy);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.loadData(nextProps.id, nextProps.active_fy);
        }
    }

    loadData(agencyID, fiscalYear) {
        if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // const params = {
        //     fiscal_year: fiscalYear,
        //     funding_agency_id: agencyID
        // };

        const params = {
            fiscal_year: 2017,
            funding_agency_id: 246
        };

        this.searchRequest = AgencyHelper.fetchAgencyObjectClasses(params);

        this.setState({
            inFlight: true
        });

        this.searchRequest.promise
            .then((res) => {
                this.searchRequest = null;

                this.setState({
                    inFlight: false
                });

                // Sum up the obligated_amounts > 0 in the object classes to produce the total
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
                    objectClassData: {
                        children: res.data.results
                    },
                    totalObligation
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
            <div className="agency-section-wrapper">
                <div className="agency-callout-description">
                    This {total} in obligations is divided among categories,
                    called object classes. These groupings can be helpful for analysis
                    and cross-agency comparison.
                </div>
                <div
                    className="agency-section-title"
                    id="agency-objectClasses">
                    <h4>Object Class</h4>
                    <hr className="results-divider" />
                </div>
                <div className="agency-section-content">
                    <ObjectClassTreeMap
                        objectClassData={this.state.objectClassData}
                        totalObligation={this.state.totalObligation} />
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
