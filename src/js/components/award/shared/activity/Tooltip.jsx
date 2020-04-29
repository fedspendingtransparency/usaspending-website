/**
 * Tooltip.jsx
 * Created By Jonathan Hill 04/29/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            paragraphs: PropTypes.arrayOf(PropTypes.string)
        }))
    })
};

const Tooltip = ({ data }) => {
    // action_date: "2018-10-30"
    // action_type: "M"
    // action_type_description: "OTHER ADMINISTRATIVE ACTION"
    // description: "IGF::CT::IGF FOR CRITICAL FUNCTIONS TECHNICAL AND SUPPORT SERVICES FOR THE DATA TRANSPARENCY PROGRAM TO SUPPORT SCHEMA, DATA BROKER, USASPENDING WEBSITE, SERVICE DESK, DATA ANALYTICS, AND HOSTING SERVICE AREAS."
    // face_value_loan_guarantee: null
    // federal_action_obligation: 0
    // id: "CONT_TX_2036_2036_2033H618F00230_P00004_TFSAFSABPA17009_0"
    // modification_number: "P00004"
    // original_loan_subsidy_cost: null
    // type: "A"
    // type_description: "BPA CALL"
    console.log(' Data : ', data);
    const createSections = () => {
        if (data.sections) {
            return data.sections.map((section, i) => (
                <div key={`${uniqueId()}-section`} className="tooltip__text">
                    {section.title && <strong>{section.title}</strong>}
                    {section.paragraphs && section.paragraphs.map((body) => (
                        <p className="tooltip__text-section">{body}</p>
                    ))}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className="tooltip">
            {data.title &&
                <div className="tooltip__title">
                    Related Awards
                </div>}
            {createSections()}
        </div>
    );
};

Tooltip.propTypes = propTypes;
export default Tooltip;
