import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { flowRight } from 'lodash';

import withDefCodes from 'containers/covid19/WithDefCodes';
import { bindActionCreators } from "redux";
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

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

    useEffect(() => {
        if (props.defcType === "covid_19") {
            setSelectedDefCodes(props.covidDefCode);
        }

        if (props.defcType === "infrastructure") {
            setSelectedDefCodes(props.infraDefCode);
        }
    }, [props.covidDefCode, props.infraDefCode]);

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
        searchFilterActions.toggleDefCode(selection);
    };

    const bulkChangeDefc = (selection) => {
        searchFilterActions.bulkDefCodeChange(selection);
    };

    console.log(selectedDefCodes)

    return (
        <div className="def-code-filter">
            {props?.defCodes?.length > 0 && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(props.defCodes)}
                filters={titlesByCode(props.defCodes, props.defcType)}
                selectedFilters={selectedDefCodes}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc} />
            }
            <SubmitHint ref={hint} />
        </div>
    );
};

DEFCheckboxTreeTemplate.propTypes = propTypes;

const mapStateToProps = (state) => ({
    covidDefCode: state.filters.covidDefCode,
    infraDefCode: state.filters.infraDefCode
});

const mapDispatchToProps = (dispatch) => (bindActionCreators(searchFilterActions, dispatch));

export default flowRight(
    withDefCodes,
    connect(mapStateToProps, mapDispatchToProps)
)(DEFCheckboxTreeTemplate);
