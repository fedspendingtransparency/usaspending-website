/**
 * HomepageCovidContainer.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import CovidOverviewModel from 'models/v2/covid19/BaseOverview';
import { fetchOverview } from 'apis/disaster';
import { useDispatch, useSelector } from 'react-redux';
import { setOverview } from 'redux/actions/covid19/covid19Actions';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { applyStagedFilters, resetAppliedFilters, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';
import Analytics from 'helpers/analytics/Analytics';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from "../../components/sharedComponents/Card";
import TotalAmount from "../../components/homepage/hero/TotalAmount";

const HomepageCovidContainer = () => {
    const [, setIsIncrementComplete] = useState(false);
    const [isAmountLoading, setIsAmountLoading] = useState(true);
    const [, , validDefCodes] = useDefCodes();
    const request = useRef(null);
    const dispatch = useDispatch();
    const totalSpendingAmount = useSelector((state) => state.covid19.overview._totalOutlays);
    const history = useHistory();

    const clickedHomepageLink = (route) => {
        Analytics.event({
            category: 'Homepage - Link',
            action: route
        });
    };

    const onlyCovidDefCodes = validDefCodes.filter((code) => code.disaster === 'covid_19');

    const handleGoToAdvancedSearch = (e) => {
        e.preventDefault();
        clickedHomepageLink("search");
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        dispatch(setAppliedFilterCompletion(false));
        dispatch(applyStagedFilters({
            ...defaultFilters,
            defCodes: new CheckboxTreeSelections({
                require: onlyCovidDefCodes.map((code) => code.code),
                exclude: [],
                counts: [{ value: "COVID-19", count: onlyCovidDefCodes.length || 0, label: "COVID-19 Spending" }]
            })
        }));
        history.push('/search');
    };

    const searchCardIcon = (
        <span
            className="fa-layers fa-fw"><FontAwesomeIcon icon="search" inverse size="xl" style={{ height: '20px', width: '20px' }} />
        </span>);
    const searchCardHeading = <p>Search <span>COVID-19</span> Spending Data</p>;
    const searchCardContent = (
        <p>
        Use the <strong>Disaster Emergency Fund Code (DEFC)</strong> filter in Advanced Search to find awards related to <span>COVID-19</span> spending. Narrow your search with additional filters to help you find the data you need.
        </p>);
    const searchCardLink = (
        <Link
            to="/search"
            onClick={handleGoToAdvancedSearch}>
            Search the Data
        </Link>);

    const trackCardIcon = (
        <span
            className="fa-layers fa-fw"><FontAwesomeIcon icon="chart-bar" inverse size="xl" style={{ height: '20px', width: '20px' }} />
        </span>);
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

    const completeIncrementAndTriggerScroll = () => {
        setIsIncrementComplete(true);
    };

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        setIsIncrementComplete(false);
        setIsAmountLoading(true);
        request.current = fetchOverview(validDefCodes.map((c) => c.code));
        request.current.promise
            .then((res) => {
                if (totalSpendingAmount && totalSpendingAmount > 0) {
                    setIsAmountLoading(false);
                    setIsIncrementComplete(true);
                }
                const overview = Object.create(CovidOverviewModel);
                overview.populate(res.data);
                dispatch(setOverview(overview));
            });
    }, [dispatch, totalSpendingAmount, validDefCodes]);

    return (
        <section
            className="homepage-covid"
            aria-label="HomepageCovidContainer sections">
            <FlexGridRow
                className="grid-content">
                <FlexGridCol width={12} desktop={6} className="homepage-covid__column-one">
                    <div className="homepage-covid__column-one-content-wrapper">
                        <div className="homepage-covid__heading">
                            The Federal Response to <span>COVID-19</span>
                        </div>
                        <div className="homepage-covid__content">
                            The federal government has spent{' '}
                            {isAmountLoading && <div className="dot-pulse" />}
                            <TotalAmount
                                completeIncrement={completeIncrementAndTriggerScroll}
                                className={`covid-hero__headline--amount${isAmountLoading ? '' : ' show-amount'}`}
                                total={totalSpendingAmount}
                                isLoading={isAmountLoading} />
                            {' '}in response to <span>COVID-19</span>.
                        </div>
                        <div className="homepage-covid__image-wrapper">
                            <picture>
                                <img
                                    role="presentation"
                                    src="../../../img/homepage-covid-official-spending-data.svg"
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

export default HomepageCovidContainer;
