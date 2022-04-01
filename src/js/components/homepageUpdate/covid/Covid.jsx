/**
 * Covid.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Link, useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { applyStagedFilters, resetAppliedFilters, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import Card from "../../sharedComponents/Card";

require('pages/homepageUpdate/_homepageCovidSection.scss');

const Covid = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const history = useHistory();
    const reduxDefCodes = useSelector((state) => state.covid19.defCodes);

    // const handleGoToAdvancedSearch = (e) => {
    //     e.preventDefault();
    //     clickedHomepageLink("search");
    //     clearFilters();
    //     resetFilters();
    //     setAppliedFilters(false);
    //     stageDefCodesForAdvancedSearch({
    //         ...defaultFilters,
    //         defCodes: new CheckboxTreeSelections({
    //             require: reduxDefCodes.map((code) => code.code),
    //             exclude: [],
    //             counts: [{ value: "COVID-19", count: reduxDefCodes.length || 0, label: "COVID-19 Spending" }]
    //         })
    //     });
    //     history.push('/search');
    // };

    const searchCardIcon = {};
    const searchCardHeading = 'Search COVID-19 Spending Data';
    const searchCardContent = (
        <p>
        Use the <strong>Disaster Emergency Fund Code (DEFC)</strong> filter in Advanced Search to find awards related to COVID-19 spending. Narrow your search with additional filters to help you find the data you need.
        </p>);
    const searchCardLink = (
        <Link
            to="/search">
            Search the Data
        </Link>);

    const trackCardIcon = {};
    const trackCardHeading = 'Track COVID-19 Spending';
    const trackCardContent = (
        <p>
        Our COVID-19 profile page helps you track COVID-19 spending by who is receiving funding, which agencies have paid out funds, which programs were funded, and more.
        All COVID-19 spending data is available for download on the profile page with one click. You can also read about our datasets and calculations on the <Link to="/disaster/covid-19/data-sources">Data Sources & Methodology page</Link>.
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
    }, []);

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
                        <Card
                            heading={searchCardHeading}
                            content={searchCardContent}
                            link={searchCardLink} />
                        <Card
                            heading={trackCardHeading}
                            content={trackCardContent}
                            link={trackCardLink} />
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    resetFilters: () => dispatch(resetAppliedFilters()),
    clearFilters: () => dispatch(clearAllFilters()),
    stageDefCodesForAdvancedSearch: (filters) => dispatch(applyStagedFilters(filters)),
    setAppliedFilters: (areApplied) => dispatch(setAppliedFilterCompletion(areApplied))
});

export default connect(null, mapDispatchToProps)(Covid);

