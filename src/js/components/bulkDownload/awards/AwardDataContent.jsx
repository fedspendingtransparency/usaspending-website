/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useCallback, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IsMobileContext from "context/IsMobileContext";
import AwardLevelAndTypeFilter from './filters/AwardLevelAndTypeFilter';
import AgencyFilter from './filters/AgencyFilter';
import LocationFilter from './filters/LocationFilter';
import DateTypeFilter from './filters/DateTypeFilter';
import TimePeriodFilter from './filters/dateRange/TimePeriodFilter';
import FileFormatFilter from './filters/FileFormatFilter';
import AwardsUserSelections from './AwardsUserSelections';
import { Button, FlexGridRow } from 'data-transparency-ui';

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
    clickedDownload: PropTypes.func
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
    clickedDownload
}) => {
    const { isMedium } = useContext(IsMobileContext);
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

    // prevents submission on enter keydown
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            resetForm();
        }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => clearAwardFilters(), []);

    return (
        <div className="download-center">
            <div className="download-center__filters">
                <div className="download-center-title-wrapper">
                    <h2 className="download-center__title">A faster way to download yearly award data by agency.</h2>
                    <p>
                        Award downloads for entire fiscal years are available for each major agency on our&nbsp;
                        <Link to="/download_center/award_data_archive" className='usa-bold-link'>
                            Award Data Archive
                        </Link>
                        &nbsp;page.
                    </p>
                </div>
                <form
                    className="download-center-form"
                    onSubmit={handleSubmit}>
                    <AwardLevelAndTypeFilter />
                    <AgencyFilter
                        agencies={agencies}
                        subAgencies={subAgencies}
                        updateFilter={updateFilter}
                        setSubAgencyList={setSubAgencyList}
                        valid={awards.agency.id !== ''} />
                    <LocationFilter states={states} updateFilter={updateFilter} />
                    <DateTypeFilter updateFilter={updateFilter} />
                    <TimePeriodFilter
                        updateStartDate={updateStartDate}
                        updateEndDate={updateEndDate}
                        valid={awards.dateRange.startDate !== '' || awards.dateRange.endDate !== ''}
                        setValidDates={setValidDates}
                        filterTimePeriodStart={awards.dateRange.startDate}
                        filterTimePeriodEnd={awards.dateRange.endDate} />
                    <FileFormatFilter updateFilter={updateFilter} />
                    { isMedium && <AwardsUserSelections />}
                    <FlexGridRow className='download-button-group'>
                        <Button
                            additionalClassnames="download-reset"
                            copy="Reset Form"
                            buttonTitle="Reset Form"
                            buttonSize="md"
                            buttonType="secondary"
                            backgroundColor="light"
                            onClick={resetForm}
                            onKeyDown={onKeyDown}/>
                        <Button
                            additionalClassnames="download-button"
                            copy="Download"
                            buttonTitle="Download"
                            buttonSize="md"
                            buttonType="primary"
                            backgroundColor="light"
                            onClick={handleSubmit}
                            disabled={!validForm} />
              
                    </FlexGridRow>
                </form>

            </div>
        </div>
    );
};

AwardDataContent.propTypes = propTypes;
export default AwardDataContent;
