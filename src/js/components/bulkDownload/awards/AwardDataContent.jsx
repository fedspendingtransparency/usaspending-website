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
import UserSelections from './UserSelections';

const propTypes = {
    awards: PropTypes.object,
    updateParam: PropTypes.func,
    updateFilter: PropTypes.func,
    updateStartDate: PropTypes.func,
    updateEndDate: PropTypes.func,
    clearAwardFilters: PropTypes.func,
    agencies: PropTypes.array,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    clickedDownload: PropTypes.func
};

export default class AwardDataContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validDates: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValidDates = this.setValidDates.bind(this);
    }

    setValidDates(validDates) {
        this.setState({
            validDates
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.clickedDownload();
    }

    render() {
        const awards = this.props.awards;

        const currentAgencies = {
            agency: awards.filters.agency,
            subAgency: awards.filters.sub_agency
        };

        const formValidation = (
            (awards.award_levels.length > 0)
                && (awards.filters.award_types.length > 0)
                && this.state.validDates && (awards.filters.dateType !== '')
                && (awards.filters.agency !== '')
                && (awards.file_format !== '')
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
                            currentAwardLevels={awards.award_levels}
                            updateParam={this.props.updateParam} />
                        <AwardTypeFilter
                            awardTypes={awardDownloadOptions.awardTypes}
                            currentAwardTypes={awards.filters.award_types}
                            updateFilter={this.props.updateFilter} />
                        <AgencyFilter
                            agencies={this.props.agencies}
                            subAgencies={this.props.subAgencies}
                            currentAgencies={currentAgencies}
                            updateFilter={this.props.updateFilter}
                            setSubAgencyList={this.props.setSubAgencyList}
                            valid={awards.filters.agency !== ''} />
                        <DateTypeFilter
                            dateTypes={awardDownloadOptions.dateTypes}
                            currentDateType={awards.filters.date_type}
                            updateFilter={this.props.updateFilter}
                            valid={awards.filters.dateType !== ''} />
                        <TimePeriodFilter
                            updateStartDate={this.props.updateStartDate}
                            updateEndDate={this.props.updateEndDate}
                            valid={awards.filters.date_range.start_date !== '' || awards.filters.date_range.end_date !== ''}
                            setValidDates={this.setValidDates} />
                        <FileFormatFilter
                            fileFormats={awardDownloadOptions.fileFormats}
                            currentFileFormat={awards.file_format}
                            updateParam={this.props.updateParam}
                            valid={awards.file_format !== ''} />
                        <UserSelections
                            awards={awards}
                            agencies={this.props.agencies}
                            subAgencies={this.props.subAgencies} />
                        {submitButton}
                    </form>
                    <button className="reset-button" onClick={this.props.clearAwardFilters}>
                        Reset form and start over
                    </button>
                </div>
                <div className="download-info">
                    <h6>About Award Data</h6>
                    <div className="info-section">
                        <div className="info-section-heading">What is award data?</div>
                        <p>
                            Award data contains all the details of our prime award and sub-award records.
                        </p>
                    </div>
                    <div className="info-section">
                        <div className="info-section-heading">Why would I be interested in this data?</div>
                        <p>
                            Downloading this data gives you access to every attribute of any particular award, including
                            data that may not be surfaced on this site.
                        </p>
                    </div>
                    <div className="info-section">
                        <div className="info-section-heading">How do I use this form?</div>
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
