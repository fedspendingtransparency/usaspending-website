/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";
import ComboBox from "components/sharedComponents/ComboBox";
import ArchiveTypeFilter from './filters/TypeFilter';
import FilterSelectionTitle from "../FilterSelectionTitle";

const currentFY = currentFiscalYear();
const fyOptions = [];

for (let year = currentFY; year >= earliestFiscalYear; year--) {
    fyOptions.push({ value: `FY ${year}`, text: `FY ${year}` });
}

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
    };

    const onFYSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('fy', target.value);
    };

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
                    <ComboBox
                        optionsArray={fyOptions}
                        onSelect={onFYSelect}
                        label={"Fiscal Year (FY)"}
                        placeholder={"Select a Fiscal Year"}
                        defaultValue={`FY ${currentFY}`} />
                    <ArchiveTypeFilter
                        formWidth={formWidth}
                        windowWidth={windowWidth}
                        currentType={filters.type.display}
                        updateFilter={updateFilter} />
                    <div className="form__button" />
                </form>
            </div>
        </>
    );
}

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
