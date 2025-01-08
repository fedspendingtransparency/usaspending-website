import React, { useRef } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { flowRight } from 'lodash';

import withDefCodes from 'containers/covid19/WithDefCodes';
import { bindActionCreators } from "redux";
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import AccordionCheckbox from "../../../../components/sharedComponents/checkbox/AccordionCheckbox";
import { bulkDefCodesChange, toggleDefCodes } from "../../../../redux/actions/search/searchFilterActions";

const propTypes = {
    toggleDefCodes: PropTypes.func,
    bulkDefCodesChange: PropTypes.func,
    defCodes: PropTypes.arrayOf(PropTypes.object)
};

// DEFCheckboxTreeTemplate.propTypes = {
//     counts: PropTypes.arrayOf(PropTypes.shape({})),
//     defCodes: PropTypes.arrayOf(PropTypes.object),
//     areDefCodesLoading: PropTypes.bool,
//     defCodeFetchError: PropTypes.string,
//     checked: PropTypes.arrayOf(PropTypes.string),
//     stageDef: PropTypes.func
// };


const DEFCheckboxTreeTemplate = (props) => {
    const hint = useRef();

    const parseCodes = (codes, type) => codes.filter(((code) => code.disaster === type)).map((code) => code.code);
    const titlesByCode = (codes, type) => codes.filter(((code) => code.disaster === type)).reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = item.title;
        return obj;
    }, {});

    const covidCountLabel = { value: 'COVID-19', count: 0, label: 'COVID-19 Spending' };
    const infrastructureCountLabel = { value: 'Infrastructure', count: 0, label: 'Infrastructure Spending' };

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

    const stageDef = (newChecked) => {
        const newCount = newChecked.reduce((acc) => acc + 1, 0);
        const labels = [];

        if (newCount > 0) {
            const infraCount = newChecked.filter((checked) => checked === 'Z' || checked === '1').length;
            const covidCount = newChecked.length - infraCount;

            if (props.defcType === "covid_19") {
                labels.push({ ...covidCountLabel, count: covidCount });
            }
            else if (props.defcType === "infrastructure") {
                labels.push({ ...infrastructureCountLabel, count: infraCount });
            }
            props.stageDef(
                newChecked,
                [],
                labels
            );
        }
        else {
            props.stageDef(
                [],
                [],
                []
            );
        }
    };

    const toggleDefc = (selection) => {
        toggleDefCodes(selection);
    };

    const bulkChangeDefc = (selection) => {
        bulkDefCodesChange(selection);
    };

    return (
        <div className="def-code-filter">
            {props?.defCodes?.length > 0 && <AccordionCheckbox
                filterCategoryMapping={defcDataByType(props.defCodes)}
                filters={titlesByCode(props.defCodes, props.defcType)}
                selectedFilters={new Set(props.checked)}
                singleFilterChange={toggleDefc}
                bulkFilterChange={bulkChangeDefc} />
            }
            <SubmitHint ref={hint} />
        </div>
    );
};

DEFCheckboxTreeTemplate.propTypes = propTypes;

const mapStateToProps = (state) => ({
    counts: state.filters.defCodes.toObject().counts,
    checked: state.filters.defCodes.toObject().require
});

const mapDispatchToProps = (dispatch) => (bindActionCreators(searchFilterActions, dispatch));

export default flowRight(
    withDefCodes,
    connect(mapStateToProps, mapDispatchToProps)
)(DEFCheckboxTreeTemplate);
