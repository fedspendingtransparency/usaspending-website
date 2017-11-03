/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

import AwardLevelFilter from './filters/AwardLevelFilter';
import AwardTypeFilter from './filters/AwardTypeFilter';
import AgencyFilter from './filters/AgencyFilter';
import DateTypeFilter from './filters/DateTypeFilter';
import TimePeriodFilter from './filters/dateRange/TimePeriodFilter';
import FileFormatFilter from './filters/FileFormatFilter';

const propTypes = {
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
            dateType: 'action_date',
            startDate: '',
            endDate: '',
            fileFormat: 'csv',
            validDates: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAgencySelect = this.handleAgencySelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValidDates = this.setValidDates.bind(this);
    }

    setValidDates(validDates) {
        this.setState({
            validDates
        });
    }

    handleChange(event) {
        const target = event.target;
        this.handleInputChange(target.value, target.name);
    }

    handleInputChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleAgencySelect(event) {
        const target = event.target;
        this.handleInputChange(target.value, target.name);
        if (target.value === '') {
            this.setState({
                subAgency: ''
            });
        }
        this.props.setSubAgencyList(target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateDownloadFilters('awardData', this.state);
    }

    render() {
        const currentAwardLevels = {
            prime_awards: this.state.prime_awards,
            sub_awards: this.state.sub_awards
        };

        const currentAwardTypes = {
            contracts: this.state.contracts,
            grants: this.state.grants,
            direct_payments: this.state.direct_payments,
            loans: this.state.loans,
            other_financial_assistance: this.state.other_financial_assistance
        };

        const awardTypesValid = (this.state.contracts || this.state.grants ||
            this.state.direct_payments || this.state.loans || this.state.other_financial_assistance);

        const currentAgencies = {
            agency: this.state.agency,
            subAgency: this.state.subAgency
        };

        const formValidation = (
            (this.state.prime_awards || this.state.sub_awards)
            && awardTypesValid && this.state.agency && this.state.validDates
        );

        let submitButton = (
            <div className="submit-button disabled">
                <button disabled>Download</button>
            </div>
        );

        if (formValidation) {
            submitButton = (
                <div className="submit-button">
                    <input type="submit" value="Download" />
                </div>
            );
        }

        return (
            <div className="download-data-content">
                <div className="download-filters">
                    <h2><span>Award Data</span> Download</h2>
                    <form
                        className="download-form"
                        onSubmit={this.handleSubmit}>
                        <AwardLevelFilter
                            awardLevels={awardDownloadOptions.awardLevels}
                            currentAwardLevels={currentAwardLevels}
                            onChange={this.handleInputChange}
                            valid={this.state.prime_awards || this.state.sub_awards} />
                        <AwardTypeFilter
                            awardTypes={awardDownloadOptions.awardTypes}
                            currentAwardTypes={currentAwardTypes}
                            onChange={this.handleInputChange}
                            valid={awardTypesValid} />
                        <AgencyFilter
                            agencies={this.props.agencies}
                            subAgencies={this.props.subAgencies}
                            currentAgencies={currentAgencies}
                            onChange={this.handleChange}
                            handleAgencySelect={this.handleAgencySelect}
                            valid={this.state.agency !== ''} />
                        <DateTypeFilter
                            dateTypes={awardDownloadOptions.dateTypes}
                            currentDateType={this.state.dateType}
                            onChange={this.handleChange}
                            valid={this.state.dateType !== ''} />
                        <TimePeriodFilter
                            handleInputChange={this.handleInputChange}
                            valid={this.state.startDate !== '' || this.state.endDate !== ''}
                            setValidDates={this.setValidDates} />
                        <FileFormatFilter
                            fileFormats={awardDownloadOptions.fileFormats}
                            currentFileFormat={this.state.fileFormat}
                            onChange={this.handleChange}
                            valid={this.state.fileFormat !== ''} />
                        {submitButton}
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
