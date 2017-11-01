/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DownloadCheckbox from './DownloadCheckbox';

const propTypes = {
    awardLevels: PropTypes.array,
    awardTypes: PropTypes.array,
    updateDownloadFilters: PropTypes.func,
    agencies: PropTypes.array,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func
};

export default class AwardDataContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prime_awards: false,
            sub_awards: false,
            contracts: false,
            grants: false,
            direct_payments: false,
            loans: false,
            other_financial_assistance: false,
            agency: '',
            subAgency: '',
            dateType: '',
            dateRange: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAgencySelect = this.handleAgencySelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleChange(event) {
        const target = event.target;
        this.handleInputChange(target.value, target.name);
    }

    handleAgencySelect(event) {
        const target = event.target;
        this.handleInputChange(target.value, target.name);
        this.props.setSubAgencyList(target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateDownloadFilters('awardData', this.state);
    }

    render() {
        const awardLevels = this.props.awardLevels.map((level) => (
            <DownloadCheckbox
                key={level.name}
                name={level.name}
                label={level.label}
                checked={this.state[level.name]}
                onChange={this.handleInputChange} />
        ));

        const awardTypes = this.props.awardTypes.map((type) => (
            <DownloadCheckbox
                key={type.name}
                name={type.name}
                label={type.label}
                checked={this.state[type.name]}
                onChange={this.handleInputChange} />
        ));

        const agencies = this.props.agencies.map((agency) => (
            <option
                key={agency.toptier_agency_id}
                value={agency.toptier_agency_id}>
                {agency.name}
            </option>
        ));

        const subAgencies = this.props.subAgencies.map((subAgency) => (
            <option
                key={subAgency.subtier_agency_id}
                value={subAgency.subtier_agency_id}>
                {subAgency.subtier_agency_name}
            </option>
        ));

        return (
            <div className="download-data-content">
                <div className="download-filters">
                    <h2><span>Award Data</span> Download</h2>
                    <form
                        className="download-form"
                        onSubmit={this.handleSubmit}>
                        <div className="filter-section">
                            <h5 className="filter-section-title">
                                Select the <span>award level</span> to include.
                            </h5>
                            {awardLevels}
                        </div>
                        <div className="filter-section">
                            <h5 className="filter-section-title">
                                Select the <span>award types</span> to include.
                            </h5>
                            {awardTypes}
                        </div>
                        <div className="filter-section">
                            <h5 className="filter-section-title">
                                Select an <span>agency</span> and <span>sub-agency</span>.
                            </h5>
                            <label className="select-label" htmlFor="agency-select">
                                Agency
                            </label>
                            <select id="agency-select" name="agency" value={this.state.agency} onChange={this.handleAgencySelect}>
                                <option disabled>Select</option>
                                {agencies}
                            </select>
                            <label className="select-label" htmlFor="sub-agency-select">
                                Sub-Agency
                            </label>
                            <select id="sub-agency-select" name="subAgency" value={this.state.subAgency} onChange={this.handleChange}>
                                <option disabled>Select</option>
                                {subAgencies}
                            </select>
                        </div>
                        <input type="submit" value="Download" />
                    </form>
                </div>
                <div className="download-info">
                    <h6>About Award Data</h6>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo,
                        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper
                        nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum
                        at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.
                    </p>
                </div>
            </div>
        );
    }
}

AwardDataContent.propTypes = propTypes;
