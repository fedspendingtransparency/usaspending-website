/**
 * AgencyOverview.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    agency: PropTypes.object
};

export default class AgencyOverview extends React.PureComponent {
    render() {
        let title = `${this.props.agency.name} (${this.props.agency.abbreviation})`;
        if (this.props.agency.abbreviation === '') {
            title = this.props.agency.name;
        }

        let logo = null;
        let hideLogo = 'hide';
        if (this.props.agency.logo !== '') {
            hideLogo = '';
            logo = (<img src={this.props.agency.logo} alt={this.props.agency.name} />);
        }

        return (
            <div
                className="agency-overview"
                id="agency-overview">
                <div className="title-wrapper">
                    <div className={`logo ${hideLogo}`}>
                        {logo}
                    </div>
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                </div>
                <hr className="results-divider" />
                <div className="overview-content">
                    <div className="agency-details">
                        <h4>Agency Mission</h4>
                        <p>Not available</p>

                        <div className="lower-details">

                            <div className="group">
                                <h5>Agency Head</h5>
                                <p>Not available</p>
                            </div>

                            <div className="group">
                                <h5>Website</h5>
                                <p>Not available</p>
                            </div>

                        </div>
                    </div>
                    <div className="budget-authority hide">
                        <h4>Budget Authority This Year (FY {this.props.agency.activeFY})</h4>
                    </div>
                </div>
            </div>
        );
    }
}

AgencyOverview.propTypes = propTypes;
