/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import AwardLevelFilter from './filters/AwardLevelFilter';
import AwardTypeFilter from './filters/AwardTypeFilter';
import AgencyFilter from './filters/AgencyFilter';
import LocationFilter from './filters/LocationFilter';
import DateTypeFilter from './filters/DateTypeFilter';
import TimePeriodFilter from './filters/dateRange/TimePeriodFilter';
import FileFormatFilter from './filters/FileFormatFilter';
import UserSelections from './UserSelections';
import SubmitButton from './SubmitButton';

const propTypes = {
    awards: PropTypes.object,
    updateAwardCheckbox: PropTypes.func,
    updateFilter: PropTypes.func,
    updateStartDate: PropTypes.func,
    updateEndDate: PropTypes.func,
    clearAwardFilters: PropTypes.func,
    agencies: PropTypes.object,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    states: PropTypes.array,
    clickedDownload: PropTypes.func
};

export default class AwardDataContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validDates: false,
            validForm: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValidDates = this.setValidDates.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.awards !== this.props.awards) {
            this.validateForm(nextProps.awards);
        }
    }

    setValidDates(validDates) {
        this.setState({
            validDates
        }, () => {
            this.validateForm(this.props.awards);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.clickedDownload();
    }

    resetForm() {
        this.props.clearAwardFilters();
        this.setValidDates(false);
    }

    validateForm(awards) {
        const validForm = (
            (awards.awardLevels.primeAwards || awards.awardLevels.subAwards)
            && (awards.awardTypes.contracts || awards.awardTypes.grants || awards.awardTypes.directPayments
                || awards.awardTypes.loans || awards.awardTypes.otherFinancialAssistance)
            && this.state.validDates && (awards.dateType !== '')
            && (awards.agency.id !== '')
            && (awards.location !== '')
            && (awards.fileFormat !== '')
        );

        this.setState({
            validForm
        });
    }

    render() {
        const awards = this.props.awards;

        const currentAgencies = {
            agency: awards.agency,
            subAgency: awards.subAgency
        };

        return (
            <div className="download-center">
                <div className="download-center__filters">
                    <h2 className="download-center__title">Custom Award Data</h2>
                    <div className="archive-info">
                        <div className="archive-info__icon">
                            <InfoCircle />
                        </div>
                        <div className="archive-info__content">
                            <div className="archive-info__heading">
                                A faster way to download yearly award data by agency.
                            </div>
                            <div>
                                Award downloads for entire fiscal years are available for each major agency on our&nbsp;
                                <a href="/#/download_center/award_data_archive">
                                    Award Data Archive
                                </a>
                                &nbsp;page.
                            </div>
                        </div>
                    </div>
                    <form
                        className="download-center-form"
                        onSubmit={this.handleSubmit}>
                        <AwardLevelFilter
                            awardLevels={awardDownloadOptions.awardLevels}
                            currentAwardLevels={awards.awardLevels}
                            updateAwardCheckbox={this.props.updateAwardCheckbox} />
                        <AwardTypeFilter
                            awardTypes={awardDownloadOptions.awardTypes}
                            currentAwardTypes={awards.awardTypes}
                            updateAwardCheckbox={this.props.updateAwardCheckbox} />
                        <AgencyFilter
                            agencies={this.props.agencies}
                            subAgencies={this.props.subAgencies}
                            currentAgencies={currentAgencies}
                            updateFilter={this.props.updateFilter}
                            setSubAgencyList={this.props.setSubAgencyList}
                            valid={awards.agency.id !== ''} />
                        <LocationFilter
                            states={this.props.states}
                            currentLocation={awards.location}
                            updateFilter={this.props.updateFilter} />
                        <DateTypeFilter
                            dateTypes={awardDownloadOptions.dateTypes}
                            currentDateType={awards.dateType}
                            updateFilter={this.props.updateFilter}
                            valid={awards.dateType !== ''} />
                        <TimePeriodFilter
                            updateStartDate={this.props.updateStartDate}
                            updateEndDate={this.props.updateEndDate}
                            valid={awards.dateRange.startDate !== '' || awards.dateRange.endDate !== ''}
                            setValidDates={this.setValidDates}
                            filterTimePeriodStart={awards.dateRange.startDate}
                            filterTimePeriodEnd={awards.dateRange.endDate} />
                        <FileFormatFilter
                            fileFormats={awardDownloadOptions.fileFormats}
                            currentFileFormat={awards.fileFormat}
                            updateFilter={this.props.updateFilter}
                            valid={awards.fileFormat !== ''} />
                        <UserSelections
                            awards={awards}
                            agencies={this.props.agencies}
                            subAgencies={this.props.subAgencies} />
                        <SubmitButton
                            filters={awards}
                            validForm={this.state.validForm}
                            validDates={this.state.validDates} />
                    </form>
                    <button className="download-center__reset" onClick={this.resetForm}>
                        Reset form and start over
                    </button>
                </div>
                <div className="download-info">
                    <div className="download-info__title">About Award Data</div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">What is award data?</div>
                        <p>
                            Award data contains all the details of our prime award and sub-award records.
                        </p>
                    </div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">Why would I be interested in this data?</div>
                        <p>
                            Downloading this data gives you access to every attribute of any particular award, including
                            data that may not be surfaced on this site.
                        </p>
                    </div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">How do I use this form?</div>
                        <p>
                            This form allows you to select specific awards by type, agency and sub-agency, and date range.
                            Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                            Heads up: all fields are required. You&#39;ll only be able to start the download when all sections
                            are properly filled.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

AwardDataContent.propTypes = propTypes;
