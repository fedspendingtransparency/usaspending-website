/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useCallback, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import Note, { dodNote } from 'components/sharedComponents/Note';
import IsMobileContext from "context/IsMobileContext";

import AwardLevelAndTypeFilter from './filters/AwardLevelAndTypeFilter';
import AgencyFilter from './filters/AgencyFilter';
import LocationFilter from './filters/LocationFilter';
import DateTypeFilter from './filters/DateTypeFilter';
import TimePeriodFilter from './filters/dateRange/TimePeriodFilter';
import FileFormatFilter from './filters/FileFormatFilter';
import SubmitButton from './SubmitButton';
import AwardsUserSelections from './AwardsUserSelections';

const propTypes = {
    awards: PropTypes.object,
    updateFilter: PropTypes.func,
    updateStartDate: PropTypes.func,
    updateEndDate: PropTypes.func,
    clearAwardFilters: PropTypes.func,
    agencies: PropTypes.object,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    states: PropTypes.array,
    clickedDownload: PropTypes.func,
    bulkAwardTypeChange: PropTypes.func,
    toggleAwardTypeChange: PropTypes.func
};

const AwardDataContent = ({
    awards,
    updateFilter,
    updateStartDate,
    updateEndDate,
    clearAwardFilters,
    agencies,
    subAgencies,
    setSubAgencyList,
    states,
    clickedDownload,
    bulkAwardTypeChange,
    toggleAwardTypeChange
}) => {
    const { isTablet } = useContext(IsMobileContext);
    const [validDates, setValidDates] = useState(false);
    const [validForm, setValidForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        clickedDownload();
    };

    const resetForm = () => {
        clearAwardFilters();
        setValidDates(false);
    };

    const validateForm = useCallback((award, dates) => {
        const primeAwards = award.awardTypes.primeAwards.size > 0;
        const subAwards = award.awardTypes.subAwards.size > 0;
        const form = (
            (primeAwards || subAwards)
            && dates && (award.dateType !== '')
            && (award.agency.id !== '')
            && (award.location !== '')
            && (award.fileFormat !== '')
        );

        setValidForm(form);
    }, []);

    useEffect(() => {
        validateForm(awards, validDates);
    }, [awards, validDates, validateForm]);

    const currentAgencies = {
        agency: awards.agency,
        subAgency: awards.subAgency
    };

    const awardTypeLabels = Object.assign(
        {},
        ...Object.entries(awardDownloadOptions.awardTypeLookups)
            .map(([key, value]) => ({ [key]: value.label }))
    );

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
                            <Link to="/download_center/award_data_archive">
                                Award Data Archive
                            </Link>
                            &nbsp;page.
                        </div>
                    </div>
                </div>
                <form
                    className="download-center-form"
                    onSubmit={handleSubmit}>
                    <AwardLevelAndTypeFilter
                        awardLevels={awardDownloadOptions.awardLevels}
                        awardTypeLabels={awardTypeLabels}
                        currentAwardTypes={awards.awardTypes}
                        bulkAwardTypeChange={bulkAwardTypeChange}
                        toggleAwardTypeChange={toggleAwardTypeChange} />
                    <AgencyFilter
                        currentAgencyType={awards.agencyType}
                        agencyTypes={awardDownloadOptions.agencyTypes}
                        agencies={agencies}
                        subAgencies={subAgencies}
                        currentAgencies={currentAgencies}
                        updateFilter={updateFilter}
                        setSubAgencyList={setSubAgencyList}
                        valid={awards.agency.id !== ''} />
                    <LocationFilter
                        locationTypes={awardDownloadOptions.locationTypes}
                        states={states}
                        currentLocation={awards.location}
                        updateFilter={updateFilter}
                        currentLocationType={awards.locationType} />
                    <DateTypeFilter
                        dateTypes={awardDownloadOptions.dateTypes}
                        currentDateType={awards.dateType}
                        updateFilter={updateFilter}
                        valid={awards.dateType !== ''} />
                    <TimePeriodFilter
                        updateStartDate={updateStartDate}
                        updateEndDate={updateEndDate}
                        valid={awards.dateRange.startDate !== '' || awards.dateRange.endDate !== ''}
                        setValidDates={setValidDates}
                        filterTimePeriodStart={awards.dateRange.startDate}
                        filterTimePeriodEnd={awards.dateRange.endDate} />
                    <FileFormatFilter
                        fileFormats={awardDownloadOptions.fileFormats}
                        currentFileFormat={awards.fileFormat}
                        updateFilter={updateFilter}
                        valid={awards.fileFormat !== ''} />
                    { isTablet && <AwardsUserSelections />}
                    <SubmitButton
                        filters={awards}
                        validForm={validForm}
                        validDates={validDates}
                        dataType="awards" />
                    <div className="download-center__reset-container">
                        <button className="download-center__reset" onClick={resetForm}>
                        Reset form and start over
                        </button>
                    </div>
                </form>

            </div>
            <div className="download-info">
                <h3 className="download-info__title">About Award Data</h3>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">What is award data?</h4>
                    <p>
                        Award data contains all the details of our prime award and sub-award records.
                    </p>
                </div>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">Why would I be interested in this data?</h4>
                    <p>
                        Downloading this data gives you access to every attribute of any particular award, including
                        data that may not be surfaced on this site.
                    </p>
                </div>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">How do I use this form?</h4>
                    <p>
                        This form allows you to select specific awards by type; agency and sub-agency; location; and date range.
                        Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                        <b> Please note that most fields are required.</b> You&#39;ll only be able to start the download when all required
                        sections are properly filled in.
                    </p>
                </div>
                <div className="download-info__section">
                    <Note message={dodNote} />
                </div>
            </div>
        </div>
    );
};

AwardDataContent.propTypes = propTypes;
export default AwardDataContent;
