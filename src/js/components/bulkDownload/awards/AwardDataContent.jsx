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
    showModal: PropTypes.func
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

    handleSubmit() {
        this.props.showModal();
    }

    render() {
        const awards = this.props.awards;

        const currentAgencies = {
            agency: awards.filters.agency,
            subAgency: awards.filters.subAgency
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
