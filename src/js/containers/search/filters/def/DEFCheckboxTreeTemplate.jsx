import React, { useRef } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { flowRight } from 'lodash';

import withDefCodes from 'containers/covid19/WithDefCodes';

import { updateDefCodes } from 'redux/actions/search/searchFilterActions';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";

const DEFCheckboxTreeTemplate = (props) => {
    const hint = useRef();

    const parseCodes = (codes, type) => codes.filter(((code) => code.disaster === type)).map((code) => code.code);
    const titlesByCode = (codes, type) => codes.filter(((code) => code.disaster === type)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const defcDataByType = (codes) => {
        console.log("codes", props);
        console.log(parseCodes(codes, "covid_19"));


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

    return (
        <div className="def-code-filter">
            {props?.defCodes?.length > 0 && props.checked && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(props.defCodes)}
                filters={titlesByCode(props.defCodes, props.defcType)}
                selectedFilters={new Set()}
                singleFilterChange={() => {}}
                bulkFilterChange={() => {}} />}
            <SubmitHint ref={hint} />
        </div>
    );
};

DEFCheckboxTreeTemplate.propTypes = {
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    defCodes: PropTypes.arrayOf(PropTypes.object),
    areDefCodesLoading: PropTypes.bool,
    defCodeFetchError: PropTypes.string,
    checked: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => ({
    counts: state.filters.defCodes.toObject().counts,
    checked: state.filters.defCodes.toObject().require
});

export default flowRight(
    withDefCodes,
    connect(mapStateToProps)
)(DEFCheckboxTreeTemplate);
