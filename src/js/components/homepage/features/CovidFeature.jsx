/*
* CovidFeature.jsx
* Created by Marcy Held 07/22/2020
*/

import React from 'react';

const clickedHomepageLink = (route) => {
    Analytics.event({
        category: 'Homepage - Link',
        action: route
    });
};

const CovidFeature = () => (
    <div className="feature-covid">
        {/*OFFICIAL COVID-19 SPENDING DATA*/}
        <div className="feature-pane">
            <div className="feature-pane__wrapper">
                <h2 className="feature-pane__title">THE FEDERAL RESPONSE TO COVID-19</h2>
            </div>
        </div>

        <div className="official-spending-data__content-wrapper">
            <div className="official-spending-data__text">
                <h2 className="homepage-feature-title">Official COVID-19 Spending Data</h2>
                <div className="homepage-feature-description">
                    <p>Official spending data from the federal government’s response to COVID-19 is now available to view and download on USAspending. Learn more about the updates made across the site related to COVID-19 spending.</p>
                    <p>The new data includes:</p>
                    <ul>
                        <li><strong>Disaster Emergency Fund Code (DEFC)</strong> tags that highlight funding from the CARES Act and other COVID-19 supplemental appropriations</li>
                        <li><strong>Outlay data</strong> for COVID-19 showing what agencies have paid out, in addition to the existing obligation data showing what agencies have promised to pay</li>
                        <li><strong>Breakdown of spending data</strong> by federal agency, award recipient, and a variety of budget categories</li>
                    </ul>
                    <p>Interested in <strong>downloading all of the COVID-19 spending data?</strong> Visit the
                        <a href="#/disaster/covid-19" onClick={clickedHomepageLink.bind(null, '/disaster/covid-19')}> COVID-19 Spending Profile page </a> and click the download button!</p>
                </div>
            </div>
            <div className="feature-spending-explorer__image-wrapper feature-spending-explorer__image-wrapper_mobile">
                <img
                    className="feature-spending-explorer__image feature-covid-official-spending-data__image"
                    src="img/homepage-covid-official-spending-data.png"
                    srcSet="img/homepage-covid-official-spending-data.png 1x, img/homepage-covid-official-spending-data.png 2x"
                    alt="Illustration of people interacting with data" />
            </div>
        </div>

        {/*ADVANCED SEARCH AND SPENDING PROFILE*/}
        <div className="advanced-search-and-spending-profile__wrapper">
            <div className="advanced-search__content-wrapper">
                <img
                    className="feature-covid-item__image"
                    src="img/homepage-profile-state.png"
                    srcSet="img/homepage-profile-state.png 1x, img/homepage-profile-state@2x.png 2x"
                    alt="Screenshot of State Profile page" />
                <h2 className="homepage-feature-title">COVID-19 Advanced Search Filter</h2>
                <div className="homepage-feature-description">
                    <p>Use the new <strong>Disaster Emergency Fund Code (DEFC)</strong> filter to show awards related to the COVID-19 spending. The new filter works alongside our existing filters, so you can narrow your search to exactly what you want. Additional columns were also added to the search results table to show <strong>COVID-19 spending DEFCs, Obligations, </strong> and <strong>Outlays</strong>.</p>
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

            <div className="advanced-search__content-wrapper">
                <img
                    className="feature-covid-item__image"
                    src="img/homepage-profile-state.png"
                    srcSet="img/homepage-profile-state.png 1x, img/homepage-profile-state@2x.png 2x"
                    alt="Screenshot of State Profile page" />
                <h2 className="homepage-feature-title">COVID-19 Spending Profile</h2>
                <div className="homepage-feature-description">
                    <p>Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Learn more about <strong>who received funding, which agencies outlayed funds,</strong> and <strong>which programs were funded</strong>.</p>
                    <p>All COVID-19 spending data is <strong>available for download</strong> on the COVID-19 Spending profile page with one click.</p>
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

        {/*SPENDING PROFILE*/}
        <div className="award-summary__wrapper feature-award-search">
            <div className="feature-award-search__wrapper">
                <div className="feature-award-search__background-flair" />
                <img
                    className="award-summary__img feature-covid-item__image "
                    src="img/homepage-profile-state.png"
                    srcSet="img/homepage-profile-state.png 1x, img/homepage-profile-state@2x.png 2x"
                    alt="Screenshot of State Profile page" />

                <div className="award-summary__text-wrapper">
                    <div>
                        <h2 className="homepage-feature-title">Award Summary pages now feature COVID-19 spending</h2>
                        <div className="homepage-feature-description">
                            <p><strong>Purple COVID-19 badges</strong> found on our Award Summary pages have made it easy to identify which awards have been funded through COVID-19 appropriations. You can hover over the badge to see relevant <strong>DEFCs</strong> associated with that award. The charts found on Award Summary pages now feature COVID-19 obligation and outlay amounts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default CovidFeature;
