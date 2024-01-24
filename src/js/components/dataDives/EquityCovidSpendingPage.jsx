/**
 * EquityCovidSpendingPage.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import Analytics from 'helpers/analytics/Analytics';

import { ShareIcon } from 'data-transparency-ui';
import { Link } from "react-router-dom";
import PageWrapper from "../sharedComponents/PageWrapper";
import { equityPageMetaTags } from "../../helpers/metaTagHelper";
import MainCards from "./shared/MainCards";
import EquityHeading from "./shared/DataDiveHeading";
import EquitySpotlightCards from "./equity/EquitySpotlightCards";

require('pages/equityCovidSpendingPage/equityCovidSpendingPage.scss');

const EquityCovidSpendingPage = () => {
    const analyticsEvent = (action) => {
        Analytics.event({
            event: 'Data Dives',
            category: 'Data Dives: Equity Covid Spending Page',
            action
        });
    };

    const spotlightClickHandler = () => {
        analyticsEvent('Spotlight on The Opportunity Project', 'Spotlight on The Opportunity Project');
    };

    const covidClickHandler = () => {
        analyticsEvent('Spotlight on COVID Profile', 'Spotlight on COVID Profile');
    };

    const HeadingContentObject = {
        heading: 'Equity in COVID-19 Spending',
        intro: 'We worked with teams from various schools and advocacy groups across the country to create tools for analyzing USAspending data and other federal open datasets to understand how the $4.5 trillion in federal COVID-19 spending has been shared across communities most vulnerable to the impacts of the pandemic.',
        note: 'To explore the tools created by these teams and learn more about our collaboration, check out the links below.',
        collab: true,
        date: 'Jan 18, 2022',
        postCnt: 4
    };

    const cardsContentObject = {
        bowie: {
            text: 'The Bowie State University Opportunity Project uses publicly accessible CDC’s Social Vulnerability Index, CDC’s County vaccination rates, and American Rescue Plan COVID-19 vaccine spending data from USAspending to assess COVID-19 vaccination and equity problems for community leaders as end users.',
            link: 'https://a.flow.gl/flow/kx4yer85/display',
            img: '../../../../img/top-bowie-state-combined-image.svg',
            heading: 'Bowie State University',
            color: '#ffbe60'

        },
        morehouse: {
            text: 'The MSI (Minority Serving Institutions) COVID-19 Relief Dashboard for Equity and Transparency uses several federal datasets surrounding school enrollment and COVID-19 relief awards to highlight whether or not COVID-19 funding was equitably distributed to MSIs around the country for federal, state, and local officials and organizations.',
            link: 'https://a.flow.gl/flow/kuo62d54/display',
            img: '../../../../img/top-morehouse-combined-image.svg',
            heading: 'Morehouse College',
            color: '#339189'
        },
        kansas: {
            text: 'The Child Care Planning Assessment Tool will help community leaders better assess and understand the connection between childcare and equitable labor participation including a county level snapshot of child care supply and demand and interactive calculators to begin addressing child care needs in their community.',
            link: 'https://top.kucppr.org/',
            img: '../../../../img/top-university-kansas-combined-image.svg',
            heading: 'University of Kansas Center for Public Partnerships and Research',
            color: '#fa9441'
        },
        momproject: {
            text: 'The PEI (Predictive Equity Index) model employs machine learning and predictive analytics to understand key drivers of equity in the distribution of PPP loans. This methodology allows for creation of a cohesive dataset, allowing for an in-depth assessment of county-level performance of equity, as well as an understanding of how future actions serve to impact anticipated levels of equity in future funding efforts. Taken together, this product allows for policy makers at the county, state, and national-level to take county-level action maximizing the impact of federal dollars on the communities the investments aim to serve.',
            link: 'https://work.themomproject.com/predictiveequity',
            img: '../../../../img/top-mom-project-combined-image.svg',
            heading: 'The Mom Project',
            color: '#29abe2'
        }
    };

    const spotlightContentObject = {
        spotlightCardIcon: (
            <span>
                <FontAwesomeIcon className="equity-spotlight__star" icon="star" size="xl" style={{ height: '20px', width: '20px' }} />
            </span>),
        spotlightCardTitle: (
            <p>Spotlight on The Opportunity Project</p>
        ),
        spotlightCardText: (
            <p>
                Learn more about the teams we worked with to help build these interactive tools as part of The Opportunity Project, a U.S. Census Bureau program bringing government, industry, and communities together to create digital products using federal open data to help the public understand real-world problems facing the country today.
            </p>
        ),
        spotlightCardLink: (
            <Link
                to="/disaster/covid-19/the-opportunity-project"
                onClick={spotlightClickHandler}>
                Learn More
            </Link>
        ),
        trackCardIcon: (
            <span>
                <FontAwesomeIcon icon="chart-bar" inverse size="xl" style={{ height: '20px', width: '20px' }} />
            </span>),
        trackCardTitle: (
            <p>Track <span>COVID-19</span> Spending</p>
        ),
        trackCardText: (
            <p>
                See how much the federal government is spending in response to COVID-19. Use our COVID-19 profile page to track who is receiving relief funds, which agencies are paying out these funds, and more. Download the data from the page to create your own analysis!
            </p>
        ),
        trackCardLink: (
            <Link
                to="/disaster/covid-19?publicLaw=all"
                onClick={covidClickHandler}>
                Explore Now
            </Link>
        )
    };

    const slug = 'data-dives/equity-COVID-19-spending';
    const emailArgs = {
        subject: 'Equity in COVID-19 spending | USAspending.gov',
        body: `Dive into the data with the interactive tools on USAspending.gov to learn about equity in COVID-19 spending: ${getBaseUrl(slug)}`
    };

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, slug, emailArgs);
        analyticsEvent('Share Page');
    };

    return (
        <PageWrapper
            pageName="EquityCovidSpendingPage"
            classNames="equity-covid-spending-page"
            overLine="Data Dives"
            title="Equity in COVID-19 Spending"
            metaTagProps={{ ...equityPageMetaTags }}
            toolBarComponents={[
                <ShareIcon url={getBaseUrl(slug)} onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content equity-content">
                <EquityHeading content={HeadingContentObject} postCount={Object.keys(cardsContentObject).length} />
                <MainCards contentObject={cardsContentObject} />
                <EquitySpotlightCards content={spotlightContentObject} />
            </main>
        </PageWrapper>
    );
};

export default EquityCovidSpendingPage;
