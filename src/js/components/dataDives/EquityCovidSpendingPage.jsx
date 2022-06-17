/**
 * EquityCovidSpendingPage.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { ShareIcon } from 'data-transparency-ui';
import PageWrapper from "../sharedComponents/PageWrapper";
import { equityPageMetaTags } from "../../helpers/metaTagHelper";
import EquityHeading from "./equity/EquityHeading";

require('pages/equityCovidSpendingPage/equityCovidSpendingPage.scss');

const EquityCovidSpendingPage = () => {
    const contentObject = {
        heading: 'Equity in COVID-19 Spending',
        intro: 'We worked with teams from various schools and advocacy groups across the country to create tools for analyzing USAspending data and other federal open datasets to understand how the $4.5 trillion in federal COVID-19 spending has been shared across communities most vulnerable to the impacts of the pandemic.',
        note: 'To explore the tools created by these teams and learn more about our collaboration, check out the links below.',
        bowieText: 'The Bowie State University Opportunity Project uses publicly accessible CDC’s Social Vulnerability Index, CDC’s County vaccination rates, and American Rescue Plan COVID-19 vaccine spending data from USAspending to assess COVID-19 vaccination and equity problems for community leaders as end users.',
        bowieLink: 'https://a.flow.gl/flow/kx4yer85/display',
        morehouseText: 'The MSI (Minority Serving Institutions) COVID-19 Relief Dashboard for Equity and Transparency uses several federal datasets surrounding school enrollment and COVID-19 relief awards to highlight whether or not COVID-19 funding was equitably distributed to MSIs around the country for federal, state, and local officials and organizations.',
        morehouseLink: 'https://a.flow.gl/flow/kuo62d54/display',
        kansasText: 'The Child Care Planning Assessment Tool will help community leaders better assess and understand the connection between childcare and equitable labor participation including a county level snapshot of child care supply and demand and interactive calculators to begin addressing child care needs in their community.',
        kansasLink: 'https://top.kucppr.org/',
        momText: 'The PEI (Predictive Equity Index) model employs machine learning and predictive analytics to understand key drivers of equity in the distribution of PPP loans. This methodology allows for creation of a cohesive dataset, allowing for an in-depth assessment of county-level performance of equity, as well as an understanding of how future actions serve to impact anticipated levels of equity in future funding efforts. Taken together, this product allows for policy makers at the county, state, and national-level to take county-level action maximizing the impact of federal dollars on the communities the investments aim to serve.',
        momLink: 'https://work.themomproject.com/predictiveequity',
        spotlightCardTitle: 'Spotlight on The Opportunity Project',
        spotlightCardText: 'Learn more about the teams we worked with to help build these interactive tools as part of The Opportunity Project, a U.S. Census Bureau program bringing government, industry, and communities together to create digital products using federal open data to help the public understand real-world problems facing the country today.',
        spotlightCardLink: 'https://www.usaspending.gov/disaster/covid-19/the-opportunity-project',
        trackCardTitle: 'Track COVID-19 Spending',
        trackCardText: 'See how much the federal government is spending in response to COVID-19. Use our COVID-19 profile page to track who is receiving relief funds, which agencies are paying out these funds, and more. Download the data from the page to create your own analysis!',
        trackCardLink: 'https://www.usaspending.gov/disaster/covid-19?publicLaw=all'
    };

    const slug = 'data-dives/equity-COVID-19-spending';
    const emailArgs = {
        subject: 'Equity in COVID-19 Spending',
        body: `View the Equity in COVID-19 Spending page on USAspending.gov: ${getBaseUrl(slug)}`
    };

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, slug, emailArgs);
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
                <EquityHeading content={contentObject} />
                <div>MAIN CARDS</div>
                <div>SPOTLIGHT CARDS</div>
            </main>
        </PageWrapper>
    );
};

export default EquityCovidSpendingPage;
