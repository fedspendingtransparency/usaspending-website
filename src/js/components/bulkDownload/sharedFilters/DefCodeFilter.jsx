import React from 'react';
import PropTypes from "prop-types";

import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import DEFCheckboxTreeDownload from 'components/bulkDownload/DEFCheckboxTreeDownload';

const DefCodeFilter = ({ type }) => {
    const icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    return (
        <div className="download-filter def-code-filter">
            <h3 className="download-filter__title">
                {icon} Filter by <span className="download-filter__title_em">Disaster Emergency Fund Codes (DEFCs).</span>
            </h3>
            <p className="download-filter__subtitle">(Optional)</p>
            <div className="download-filter__info">
                <span>Filter your data with codes related to supplemental appropriation bills targeting disasters and emergencies. </span>
            </div>
            <div className="download-filter__content">
                <DEFCheckboxTreeDownload type={type} />
                {type === "accounts"
                    ? <p className="download-filter__content-note"><span className="download-filter__content-note_bold">Note:</span> COVID-19 Spending account data is only available starting FY2020 P07.</p>
                    : <p className="download-filter__content-note"><span className="download-filter__content-note_bold">Note:</span> COVID-19 Spending data is only available for award and sub-award actions with an Action Date on or after 4/1/2020.</p>
                }
            </div>
        </div>
    );
};

DefCodeFilter.propTypes = {
    type: PropTypes.string.isRequired // either "accounts" or "awards"
};

export default DefCodeFilter;
