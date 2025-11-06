/**
 * DEFCheckboxTreeContainer.jsx
 * Created by Andrea Blackwell 1/8/2025
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { bulkDefCodeChange, toggleDefCode } from 'redux/actions/search/searchFilterActions';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";
import DEFCheckboxTreeLabelv2 from "../../../../components/search/filters/defc/DEFCheckboxTreeLabelv2";
import { sortAlphaNumbersLast } from "../../../../helpers/search/collapsiblesidebarHelper";

const DEFCheckboxTreeContainer = () => {
    const [defSearchString, setDefSearchString] = useState('');
    const [errorMsg, isLoading, defCodes] = useDefCodes();
    const selectedDefCodes = useSelector((state) => state.filters.defCode);
    const dispatch = useDispatch();

    const parseCodes = (codes, type) => sortAlphaNumbersLast(codes.filter(((code) => code.disaster === type)).map((code) => code.code));

    const titlesByCode = (codes) => codes.reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const detailsDisplay = (codes) => codes.reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = (
            <DEFCheckboxTreeLabelv2
                label={item.title}
                subLabel={item.public_law}
                value={item.code}
                defSearchString={defSearchString} />);
        return obj;
    }, {});

    const defcDataByType = (codes) => (
        [
            {
                id: "covid",
                name: "COVID-19 Spending",
                filters: parseCodes(codes, "covid_19")
            },
            {
                id: 'infrastructure',
                name: 'Infrastructure Spending',
                filters: parseCodes(codes, "infrastructure")
            }
        ]);

    const toggleDefc = (selection) => {
        console.log("checking toggleDefc ====> ", selection);
        dispatch(toggleDefCode(selection));
    };

    const bulkChangeDefc = (selection) => {
        console.log("checking bulkChange ====> ", selection);
        dispatch(bulkDefCodeChange(selection));
    };

    const loadingIndicator = (
        <div className="defc-filter-message-container">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="defc-filter-message-container__text">Loading your data...</div>
        </div>
    );

    useEffect(() => {
        detailsDisplay(defCodes);
    }, [defSearchString, defCodes]);

    return (
        <div className="def-code-filter">
            {isLoading && loadingIndicator }
            {defCodes?.length > 0 && !isLoading && !errorMsg && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(defCodes)}
                filters={titlesByCode(defCodes)}
                customLabels={detailsDisplay(defCodes)}
                selectedFilters={selectedDefCodes}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc}
                setDefSearchString={setDefSearchString} />
            }
        </div>
    );
};

export default DEFCheckboxTreeContainer;
