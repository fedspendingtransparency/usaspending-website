/**
 * PageTitle.jsx
 * Created by Lizzie Salita 12/8/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TooltipWrapper } from 'data-transparency-ui';
import CovidTooltip from './CovidTooltip';

const propTypes = {
    fy: PropTypes.string
};

const PageTitle = ({
    fy
}) => {
    const {
        name,
        logo,
        covidDefCodes
    } = useSelector((state) => state.agency.overview);

    const image = logo ? (
        <img
            className="page-title__image"
            src={`graphics/agency/${logo}`}
            alt={`${name} logo`} />
    ) : '';
    return (
        <div className="page-title">
            <div className="page-title__wrapper">
                <h2 className="page-title__name">
                    {name}&nbsp;&nbsp;
                    {name && covidDefCodes.length > 0 &&
                    <TooltipWrapper tooltipPosition="bottom" offsetAdjustments={{ top: 0 }} className="page-title__tooltip" tooltipComponent={<CovidTooltip fy={fy} codes={covidDefCodes} />}>
                        <span className="covid-spending-flag">
                            Includes COVID-19 Spending
                        </span>
                    </TooltipWrapper>
                    }
                </h2>
            </div>
            {image}
        </div>
    );
};

PageTitle.propTypes = propTypes;
export default PageTitle;
