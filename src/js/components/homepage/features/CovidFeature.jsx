/*
* CovidFeature.jsx
* Created by Marcy Held 07/22/2020
*/

import React from 'react';

import Analytics from 'helpers/analytics/Analytics';

const clickedHomepageLink = (route) => {
    Analytics.event({
        category: 'Homepage - Link',
        action: route
    });
};

const CovidFeature = () => (
    <div className="feature-covid">
        <div className="feature-pane">
            <div className="feature-pane__wrapper">
                <h2 className="feature-pane__title">THE FEDERAL RESPONSE TO COVID-19</h2>
            </div>
        </div>

        <div className="official-spending-data__content-wrapper">
            <div className="official-spending-data__text">
                <h2 className="homepage-feature-title">Official COVID-19 Spending Data</h2>
                <div className="feature-covid-official-spending-data__image-wrapper">
                    <img
                        className="feature-covid-official-spending-data__image-mobile"
                        src="img/homepage-covid-official-spending-data.png"
                        srcSet="img/homepage-covid-official-spending-data.png 1x, img/homepage-covid-official-spending-data.png 2x"
                        alt="Illustration of people interacting with data" />
                </div>
                <div className="homepage-feature-description">
                    <p>Official spending data from the federal government’s response to COVID-19 is now available to view and download on USAspending. Additional data and features will be released in the coming months. Learn more about the updates made across the site related to COVID-19 spending.</p>
                    <p>The new data includes:</p>
                    <ul>
                        <li><strong className="homepage-feature-description_weight_bold">Disaster Emergency Fund Code (DEFC)</strong> tags that highlight funding from the CARES Act and other COVID-19 supplemental appropriations</li>
                        <li><strong className="homepage-feature-description_weight_bold">Outlay data</strong> for COVID-19 showing what agencies have paid out, in addition to the existing obligation data showing what agencies have promised to pay</li>
                        <li><strong className="homepage-feature-description_weight_bold">Breakdown of spending data</strong> by federal agency, award recipient, and a variety of budget categories</li>
                    </ul>
                    <p>Interested in <strong className="homepage-feature-description_weight_bold">downloading all the COVID-19 spending data?</strong> Visit the
                        <a href="#/disaster/covid-19" onClick={clickedHomepageLink.bind(null, '/disaster/covid-19')}> COVID-19 Spending Profile page </a> and click the download button!
                    </p>
                </div>
            </div>
            <div className="feature-covid-official-spending-data__image-wrapper">
                <img
                    className="feature-covid-official-spending-data__image"
                    src="img/homepage-covid-official-spending-data.png"
                    srcSet="img/homepage-covid-official-spending-data.png 1x, img/homepage-covid-official-spending-data.png 2x"
                    alt="Illustration of people interacting with data" />
            </div>
        </div>
        <div className="advanced-search-and-spending-profile__wrapper">
            <div className="advanced-search__content-wrapper">
                <div className="feature-covid-item__image-wrapper">
                    <img
                        className="feature-covid-item__image"
                        src="img/homepage-covid-ss-adv-search.png"
                        alt="Screenshot of Advanced Search page with COVID-19 Spending updates" />
                </div>
                <h2 className="homepage-feature-title">COVID-19 Advanced Search Filter</h2>
                <div className="feature-covid-item__image-wrapper">
                    <img
                        className="feature-covid-item__image-mobile"
                        src="img/homepage-covid-ss-adv-search.png"
                        alt="Screenshot of Advanced Search page with COVID-19 Spending updates" />
                </div>
                <div className="homepage-feature-description adv-search-spending-profile__text">
                    <p>Use the new <strong className="homepage-feature-description_weight_bold">Disaster Emergency Fund Code (DEFC)</strong> filter to show awards related to COVID-19 spending. The new filter works alongside our existing filters, so you can narrow your search to exactly what you want. Additional columns were also added to the search results table to show <strong className="homepage-feature-description_weight_bold">COVID-19 spending DEFCs, Obligations, </strong> and <strong className="homepage-feature-description_weight_bold">Outlays</strong>.</p>
                </div>

                <div className="feature-covid__button-wrap">
                    <a
                        className="feature-covid__button"
                        href="#/search"
                        onClick={clickedHomepageLink.bind(null, '/search')}>
                        Search the Data
                    </a>
                </div>
            </div>

            <div className="advanced-search__content-wrapper-right">
                <div className="feature-covid-item__image-wrapper">
                    <img
                        className="feature-covid-item__image"
                        src="img/homepage-covid-ss-profile.png"
                        alt="Screenshot of COVID-19 Spending profile page" />
                </div>
                <h2 className="homepage-feature-title">COVID-19 Spending Profile</h2>
                <div className="feature-covid-item__image-wrapper">
                    <img
                        className="feature-covid-item__image-mobile"
                        src="img/homepage-covid-ss-profile.png"
                        alt="Screenshot of COVID-19 Spending profile page" />
                </div>
                <div className="homepage-feature-description adv-search-spending-profile__text">
                    <p>Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Learn more about <strong className="homepage-feature-description_weight_bold">who received funding, which agencies outlayed funds,</strong> and <strong className="homepage-feature-description_weight_bold">which programs were funded</strong>.</p>
                    <p>All COVID-19 spending data is <strong className="homepage-feature-description_weight_bold">available for download</strong> on the profile page with one click.</p>
                </div>
                <div className="feature-covid__button-wrap">
                    <a
                        className="feature-covid__button"
                        href="#/disaster/covid-19"
                        onClick={clickedHomepageLink.bind(null, '/disaster/covid-19')}>
                        Explore the Data
                    </a>
                </div>

            </div>
        </div>
        <div className="award-summary__wrapper feature-award-search">
            <div className="feature-award-search__wrapper">
                <div className="feature-covid__background-flair" />
                <div className="feature-covid-award-summary__image-wrapper">
                    <img
                        className="feature-covid-award-summary__image"
                        src="img/homepage-covid-ss-award-summary.png"
                        srcSet="img/homepage-covid-ss-award-summary.png 1x, img/homepage-covid-ss-award-summary.png 2x"
                        alt="Screenshot of Award Summary page with COVID-19 Spending updates" />
                </div>
                <div className="award-summary__text-wrapper">
                    <div>
                        <h2 className="homepage-feature-title">Award Summary pages now feature COVID-19 spending</h2>
                        <div className="feature-covid-award-summary__image-wrapper">
                            <img
                                className="feature-covid-award-summary__image-mobile"
                                src="img/homepage-covid-ss-award-summary.png"
                                srcSet="img/homepage-covid-ss-award-summary.png 1x, img/homepage-covid-ss-award-summary.png 2x"
                                alt="Screenshot of Award Summary page with COVID-19 Spending updates" />
                        </div>
                        <div className="homepage-feature-description">
                            <p><strong className="homepage-feature-description_weight_bold">Purple COVID-19 badges</strong> found on our Award Summary pages have made it easy to identify which awards have been funded through COVID-19 appropriations. You can hover over the badge to see relevant <strong className="homepage-feature-description_weight_bold">DEFCs</strong> associated with that award. The charts found on Award Summary pages now feature <strong className="homepage-feature-description_weight_bold">COVID-19 obligation and outlay amounts.</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default CovidFeature;
