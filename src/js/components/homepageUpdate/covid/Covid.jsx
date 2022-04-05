/**
 * Covid.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import Card from "../../sharedComponents/Card";

require('pages/homepageUpdate/_homepageCovidSection.scss');

const Covid = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <section
            className="homepage-covid"
            aria-label="Covid sections">
            <FlexGridRow
                className="grid-content">
                <FlexGridCol width={12} desktop={6} className="homepage-covid__column-one">
                    <div className="homepage-covid__column-one-content-wrapper">
                        <div className="homepage-covid__heading">
                            The Federal Response to COVID-19
                        </div>
                        <div className="homepage-covid__content">
                            The federal government has spent [$3.59 trillion] in response to COVID-19.
                        </div>
                        <div className="homepage-covid__image-wrapper">
                            <picture>
                                <img
                                    role="presentation"
                                    src="../../../../img/homepage-covid-official-spending-data.svg"
                                    alt="" />
                            </picture>
                        </div>
                    </div>
                </FlexGridCol>
                <FlexGridCol width={12} desktop={6} className="homepage-covid__column-two">
                    <div className="homepage-covid__column-two-content-wrapper">
                        <Card />
                        <Card />
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

export default Covid;
