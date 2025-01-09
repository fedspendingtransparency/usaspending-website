import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { bulkDefCodeChange, toggleDefCode } from 'redux/actions/search/searchFilterActions';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";

const propTypes = {
    toggleDefCodes: PropTypes.func,
    bulkDefCodesChange: PropTypes.func,
    covidDefCode: PropTypes.object,
    infraDefCode: PropTypes.object

};

const DEFCheckboxTreeTemplate = (props) => {
    const [selectedDefCodes, setSelectedDefCodes] = useState({});
    const hint = useRef();
    const dispatch = useDispatch();

    const { covidDefCode, infraDefCode } = useSelector((state) => state.filters);
    const [errorMsg, isLoading, defCodes] = useDefCodes();

    useEffect(() => {
        if (props.defcType === "covid_19") {
            setSelectedDefCodes(covidDefCode);
        }

        if (props.defcType === "infrastructure") {
            setSelectedDefCodes(infraDefCode);
        }
    }, [covidDefCode, infraDefCode]);

    const parseCodes = (codes, type) => codes.filter(((code) => code.disaster === type)).map((code) => code.code);
    const titlesByCode = (codes, type) => codes.filter(((code) => code.disaster === type)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const defcDataByType = (codes) => {
        if (props.defcType === "covid_19") {
            return [{
                id: "covid",
                name: "COVID-19 Spending",
                filters: parseCodes(codes, "covid_19")
            }];
        }

        if (props.defcType === "infrastructure") {
            return [{
                id: 'infrastructure',
                name: 'Infrastructure Spending',
                filters: parseCodes(codes, "infrastructure") // map to codes only
            }];
        }

        return [];
    };

    const toggleDefc = (selection) => {
        dispatch(toggleDefCode(selection));

    };

    const bulkChangeDefc = (selection) => {
        dispatch(bulkDefCodeChange(selection));
    };

    return (
        <div className="def-code-filter">
            {defCodes?.length > 0 && !isLoading && !errorMsg && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(defCodes)}
                filters={titlesByCode(defCodes, props.defcType)}
                selectedFilters={selectedDefCodes}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc} />
            }
            <SubmitHint ref={hint} />
        </div>
    );
};

DEFCheckboxTreeTemplate.propTypes = propTypes;
export default DEFCheckboxTreeTemplate;
