import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDefCodes } from '../../hooks/WithDefCodes';
import { setDefCodes } from '../../redux/actions/bulkDownload/bulkDownloadActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccordionCheckbox from "../../components/sharedComponents/checkbox/AccordionCheckbox";
import { defcDataByType } from '../../dataMapping/search/defCodes';
import DEFCheckboxTreeDownloadLabel from "./DEFCheckboxTreeDownloadLabel";

const DEFCheckboxTreeDownload = ({
    type,
    isDisabled = false
}) => {
    const [defSearchString, setDefSearchString] = useState('');
    const [errorMsg, isLoading, validDefCodes] = useDefCodes();
    const { defCodes } = useSelector((state) => state.bulkDownload[type]);
    const dispatch = useDispatch();

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

    useEffect(() => {
        if (isDisabled && defCodes.length){
            dispatch(setDefCodes(type, []));
        }
    }, [defCodes, dispatch, isDisabled, type])

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
