/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ArchiveAgencyFilter from './filters/AgencyFilter';
import ArchiveTypeFilter from './filters/TypeFilter';
import ArchiveFiscalYearFilter from './filters/FiscalYearFilter';
import FilterSelectionTitle from "../FilterSelectionTitle";

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    requestResults: PropTypes.func
};

const AwardDataArchiveForm = ({
    filters,
    updateFilter,
    agencies,
    requestResults
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [formWidth, setFormWidth] = useState(0);

    const divRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        requestResults();
    };

    useEffect(() => {
        const setWidth = () => {
            const windowW = window.innerWidth;
            const formW = divRef.current.clientWidth - 1;

            setWindowWidth(windowW)
            setFormWidth(formW)
        };

        setWidth();

        window.addEventListener('resize', setWidth);

        return () => window.removeEventListener('resize', setWidth);
    }, []);

    return (
        <>
            <FilterSelectionTitle type="agencyFy" />
            <div className="award-data-archive-form">
                <div className="form-title__wrapper">
                    <div className="form-title">
                        Filter by
                    </div>
                </div>
                <div
                    className="form-width-master"
                    ref={divRef} />
                <form
                    className="archive-form"
                    onSubmit={handleSubmit}>
                    <ArchiveAgencyFilter
                        formWidth={formWidth}
                        windowWidth={windowWidth}
                        agency={filters.agency}
                        updateFilter={updateFilter}
                        agencies={agencies} />
                    <ArchiveTypeFilter
                        formWidth={formWidth}
                        windowWidth={windowWidth}
                        currentType={filters.type.display}
                        updateFilter={updateFilter} />
                    <ArchiveFiscalYearFilter
                        formWidth={formWidth}
                        windowWidth={windowWidth}
                        currentFY={filters.fy}
                        updateFilter={updateFilter} />
                    <div className="form__button" />
                </form>
            </div>
        </>
    );
}

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
