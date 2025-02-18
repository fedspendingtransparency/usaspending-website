/**
 * DEFCheckboxTreeContainer.jsx
 * Created by Andrea Blackwell 1/8/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { bulkCovidDefCodeChange, toggleCovidDefCode, bulkInfraDefCodeChange, toggleInfraDefCode } from 'redux/actions/search/searchFilterActions';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";
import DEFCheckboxTreeLabelv2 from "../../../../components/search/filters/defc/DEFCheckboxTreeLabelv2";
import { sortAlphaNumbersLast } from "../../../../helpers/search/collapsiblesidebarHelper";

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

    const parseCodes = (codes) => sortAlphaNumbersLast(codes.filter(((code) => code.disaster === defcType)).map((code) => code.code));

    const titlesByCode = (codes) => codes.filter(((code) => code.disaster === defcType)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const detailsDisplay = (codes) => codes.filter(((code) => code.disaster === defcType)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = (
            <DEFCheckboxTreeLabelv2
                label={item.title}
                subLabel={item.public_law}
                value={item.code} />);
        return obj;
    }, {});

    const defcDataByType = (codes) => {
        if (defcType === "covid_19") {
            return [{
                id: "covid",
                name: "COVID-19 Spending",
                filters: parseCodes(codes)
            }];
        }

        if (defcType === "infrastructure") {
            return [{
                id: 'infrastructure',
                name: 'Infrastructure Spending',
                filters: parseCodes(codes)
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

    const loadingIndicator = (
        <div className="defc-filter-message-container">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="defc-filter-message-container__text">Loading your data...</div>
        </div>
    );

    return (
        <div className="def-code-filter">
            {isLoading && loadingIndicator }
            {defCodes?.length > 0 && !isLoading && !errorMsg && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(defCodes)}
                filters={titlesByCode(defCodes)}
                customLabels={detailsDisplay(defCodes)}
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
