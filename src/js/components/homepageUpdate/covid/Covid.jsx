/**
 * Covid.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Link } from "react-router-dom";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import Card from "../../sharedComponents/Card";

require('pages/homepageUpdate/_homepageCovidSection.scss');

const Covid = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const searchCardIcon = <FontAwesomeIcon icon={faSearch} size="lg" />;
    const searchCardHeading = <p>Search <span>COVID-19</span> Spending Data</p>;
    const searchCardContent = (
        <p>
        Use the <strong>Disaster Emergency Fund Code (DEFC)</strong> filter in Advanced Search to find awards related to <span>COVID-19</span> spending. Narrow your search with additional filters to help you find the data you need.
        </p>);
    const searchCardLink = (
        <Link
            to="/search">
            Search the Data
        </Link>);

    const trackCardIcon = <FontAwesomeIcon icon={faChartBar} size="lg" />;
    const trackCardHeading = <p>Track <span>COVID-19</span> Spending</p>;
    const trackCardContent = (
        <p>
        Our <span>COVID-19</span> profile page helps you track <span>COVID-19</span> spending by who is receiving funding, which agencies have paid out funds, which programs were funded, and more.
        All <span>COVID-19</span> spending data is available for download on the profile page with one click. You can also read about our datasets and calculations on the <Link to="/disaster/covid-19/data-sources">Data Sources & Methodology page</Link>.
        </p>);
    const trackCardLink = (
        <Link
            to="/disaster/covid-19">
            Explore the Data
        </Link>);

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
                <div className="homepage-covid__background-flair" />
                <FlexGridCol width={12} desktop={6} className="homepage-covid__column-one">
                    <div className="homepage-covid__column-one-content-wrapper">
                        <div className="homepage-covid__heading">
                            The Federal Response to <span>COVID-19</span>
                        </div>
                        <div className="homepage-covid__content">
                            The federal government has spent [$3.59 trillion] in response to <span>COVID-19</span>.
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
                        <Card
                            icon={searchCardIcon}
                            heading={searchCardHeading}
                            content={searchCardContent}
                            link={searchCardLink} />
                        <Card
                            icon={trackCardIcon}
                            heading={trackCardHeading}
                            content={trackCardContent}
                            link={trackCardLink} />
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

export default Covid;

