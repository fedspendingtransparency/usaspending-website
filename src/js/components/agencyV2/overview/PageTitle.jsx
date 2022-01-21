/**
 * PageTitle.jsx
 * Created by Lizzie Salita 12/8/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TooltipWrapper } from 'data-transparency-ui';
import { xlargeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from 'lodash';
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
    } = useSelector((state) => state.agencyV2.overview);

    const [windowWidth, setWindowWidth] = useState(0);
    const [isXlargeScreen, setIsXlargeScreen] = useState(window.innerWidth < xlargeScreen);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsXlargeScreen(newWidth < xlargeScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <TooltipWrapper tooltipPosition={isXlargeScreen ? "bottom" : "right"} offsetAdjustments={{ top: 0 }} className="page-title__tooltip" tooltipComponent={<CovidTooltip fy={fy} codes={covidDefCodes} />}>
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
