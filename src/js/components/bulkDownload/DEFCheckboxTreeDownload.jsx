import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDefCodes } from 'hooks/WithDefCodes';
import { setDefCodes } from 'redux/actions/bulkDownload/bulkDownloadActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccordionCheckbox from "components/sharedComponents/checkbox/AccordionCheckbox";
import { sortAlphaNumbersLast } from "helpers/search/collapsiblesidebarHelper";
import { defCodeGroups } from 'dataMapping/search/defCodes';
import DEFCheckboxTreeDownloadLabel from "./DEFCheckboxTreeDownloadLabel";

const DEFCheckboxTreeDownload = ({
    type,
    isDisabled = false
}) => {
    const [defSearchString, setDefSearchString] = useState('');
    const [errorMsg, isLoading, validDefCodes] = useDefCodes();
    const { defCodes } = useSelector((state) => state.bulkDownload[type]);
    const dispatch = useDispatch();

    const parseCodes = (codes, codeType) => sortAlphaNumbersLast(
        codes.filter(((code) => code.disaster === codeType))
            .map((code) => code.code)
    );

    const titlesByCode = (codes) => codes.reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const detailsDisplay = (codes) => codes.reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = (
            <DEFCheckboxTreeDownloadLabel
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

    const handleIndeterminateAncestor = (value) => {
        // get parent
        const isCovid = defCodeGroups.covid.includes(value);
        let allChecked = false;
        let checkbox;

        if (isCovid) {
            allChecked = defCodeGroups.covid.every((c) => (
                defCodes.includes(c))
            );
            checkbox = document.getElementById('primary-checkbox__covid');
        }
        else {
            allChecked = defCodeGroups.infrastructure.every((c) => (
                defCodes.includes(c))
            );
            checkbox = document.getElementById('primary-checkbox__infrastructure');
        }

        if (checkbox) {
            checkbox.indeterminate = !allChecked;
            checkbox.checked = allChecked;
        }
    };

    const toggleDefc = (selection) => {
        const value = selection.value;
        let newCheck = new Set([...defCodes]);
        if (newCheck?.size > 0) {
            if (newCheck.has(value)) {
                newCheck = new Set([...newCheck]).filter((dc) => dc !== value);
            }
            else {
                newCheck = new Set([...newCheck, value]);
            }
            dispatch(setDefCodes(type, [...newCheck]));
        }
        else {
            dispatch(setDefCodes(type, selection.value));
        }

        handleIndeterminateAncestor(value);
    };

    const bulkChangeDefc = (selection) => {
        const types = selection.types;
        let newCheck = new Set([...defCodes]);
        if (newCheck?.size > 0) {
            // check if all are currently checked
            const allCurrentlyChecked = types.every((t) => (
                newCheck.has(t)
            ));

            if (allCurrentlyChecked) {
                newCheck = new Set([...newCheck]).filter((dc) => (
                    !types.includes(dc)
                ));
            }
            else {
                newCheck = new Set([...newCheck, ...types]);
            }

            dispatch(setDefCodes(type, [...newCheck]));
        }
        else {
            dispatch(setDefCodes(type, types));
        }
    };

    const loadingIndicator = (
        <div className="defc-filter-message-container">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="defc-filter-message-container__text">Loading your data...</div>
        </div>
    );

    useEffect(() => {
        detailsDisplay(validDefCodes);
    }, [validDefCodes]);

    return (
        <div className="def-code-filter-download">
            {isLoading && loadingIndicator }
            {validDefCodes?.length > 0 && !isLoading && !errorMsg && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(validDefCodes)}
                filters={titlesByCode(validDefCodes)}
                customLabels={detailsDisplay(validDefCodes)}
                selectedFilters={new Set(defCodes)}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc}
                setDefSearchString={setDefSearchString}
                showSearch={false}
                isDisabled={isDisabled} />
            }
        </div>
    );
};

DEFCheckboxTreeDownload.propTypes = {
    isDisabled: PropTypes.bool,
    type: PropTypes.string.isRequired // either "accounts" or "awards"
};

export default DEFCheckboxTreeDownload;
