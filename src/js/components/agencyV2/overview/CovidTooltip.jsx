/**
 * CovidTooltip.jsx
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TooltipComponent } from 'data-transparency-ui';
import { DEFC_OBJECT } from 'propTypes';

const replaceEmergencyPl = new RegExp(/(Emergency P.L.|Non-emergency P.L.)/);

const CovidTooltip = ({
    codes,
    fy
}) => {
    const getText = () => codes
        .map(({ code, public_law: pl, title }) => {
            const parsedPublicLaw = `${pl.includes('Non-emergency') ? 'Not designated as emergency' : 'Designated as emergency'}`;
            return (
                <li key={pl}>
                    <strong>{`DEFC: ${code}`}</strong>
                    <p>{`${parsedPublicLaw}; ${pl.replace(replaceEmergencyPl, 'Public Law')}, ${title.toUpperCase()}`}</p>
                </li>
            );
        });
    return (
        <TooltipComponent title="Disaster and Emergency Funding Codes (DEFC)">
            <p>{`In FY ${fy}, this agency received supplemental funding in response to the following:`}</p>
            <ul>
                {getText()}
            </ul>
            <Link to={{
                pathname: "/disaster/covid-19/",
                search: "?section=award_spending_by_agency"
            }}>
                {`View this agency's DEFC spending.`}
            </Link>
        </TooltipComponent>
    );
};

CovidTooltip.propTypes = {
    fy: PropTypes.string,
    codes: PropTypes.arrayOf(DEFC_OBJECT)
};

export default CovidTooltip;
