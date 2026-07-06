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
import ComboBox from "../../sharedComponents/ComboBox";

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

    console.log({ agencies });

    // Agency Options
    let agenciesArray = [{ name: 'All', toptier_agency_id: 'all', toptier_code: 'all' }];

    Object.entries(agencies).forEach(([key, value]) => {
        const title = {
            name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
            toptier_agency_id: key,
            toptier_code: null
        };
        agenciesArray = [...agenciesArray, title, ...value];
    });

    const agenciesOptions = agenciesArray.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled`, fedCode: code }
    ));

    const onAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('agency', {
            id: target.value,
            name: target.name
        });
    }

    return (
        <>
            <FilterSelectionTitle type="agencyFy" />
            <div className="award-data-archive-form">
                <div className="form-width-master" ref={divRef} />
                <form className="archive-form" onSubmit={handleSubmit}>
                    <ComboBox
                        optionsArray={agenciesOptions}
                        onSelect={onAgencySelect}
                        label={"Agency"}
                        placeholder={"Select an Agency"}
                        defaultValue={"All"} />
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
