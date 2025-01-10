/**
 * DEFCheckboxTreeContainer.jsx
 * Created by Andrea Blackwell 1/8/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { bulkCovidDefCodeChange, toggleCovidDefCode, bulkInfraDefCodeChange, toggleInfraDefCode } from 'redux/actions/search/searchFilterActions';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";

const propTypes = {
    defcType: PropTypes.string
};

const DEFCheckboxTreeContainer = ({ defcType }) => {
    const [selectedDefCodes, setSelectedDefCodes] = useState({});
    const dispatch = useDispatch();

    const { covidDefCode, infraDefCode } = useSelector((state) => state.filters);
    const [errorMsg, isLoading, defCodes] = useDefCodes();
    const [category, setCategory] = useState();

    useEffect(() => {
        if (defcType === "covid_19") {
            setCategory("covid");
            setSelectedDefCodes(covidDefCode);
        }

        if (defcType === "infrastructure") {
            setCategory("infrastructure");
            setSelectedDefCodes(infraDefCode);
        }
    }, [covidDefCode, infraDefCode, defcType]);

    const parseCodes = (codes, type) => codes.filter(((code) => code.disaster === type)).map((code) => code.code);
    const titlesByCode = (codes, type) => codes.filter(((code) => code.disaster === type)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const defcDataByType = (codes) => {
        if (defcType === "covid_19") {
            return [{
                id: "covid",
                name: "COVID-19 Spending",
                filters: parseCodes(codes, "covid_19")
            }];
        }

        if (defcType === "infrastructure") {
            return [{
                id: 'infrastructure',
                name: 'Infrastructure Spending',
                filters: parseCodes(codes, "infrastructure") // map to codes only
            }];
        }

        return [];
    };

    const toggleDefc = (selection) => {
        if (defcType === "covid_19") {
            dispatch(toggleCovidDefCode(selection));
        }
        else if (defcType === "infrastructure") {
            dispatch(toggleInfraDefCode(selection));
        }
    };

    const bulkChangeDefc = (selection) => {
        if (defcType === "covid_19") {
            dispatch(bulkCovidDefCodeChange(selection));
        }
        else if (defcType === "infrastructure") {
            dispatch(bulkInfraDefCodeChange(selection));
        }
    };

    return (
        <div className="def-code-filter">
            {defCodes?.length > 0 && !isLoading && !errorMsg && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(defCodes)}
                filters={titlesByCode(defCodes, defcType)}
                selectedFilters={selectedDefCodes}
                selectedCategory={category}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc}
                isExpanded />
            }
        </div>
    );
};

DEFCheckboxTreeContainer.propTypes = propTypes;
export default DEFCheckboxTreeContainer;
