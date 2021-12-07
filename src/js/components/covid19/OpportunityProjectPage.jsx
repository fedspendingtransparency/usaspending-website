/**
 * OpportunityProjectPage.jsx
 * Created by Brett Varney 10/27/21
 */

import React from 'react';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { topPageMetaTags } from 'helpers/metaTagHelper';
import { FlexGridContainer, FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';

require('pages/covid19/opportunityProject.scss');

const OpportunityProjectPage = () => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(showModal(e.target.href));
    };

    const externalLink = (href, linkText) => (
        <a href={href} onClick={handleClick}>
            {linkText}&nbsp;
            <FontAwesomeIcon size="sm" icon="external-link-alt" />
        </a>
    );

    return (
        <PageWrapper
            pageName="The Opportunity Project"
            title="The Opportunity Project"
            noHeader
            metaTagProps={topPageMetaTags}>
            <FlexGridContainer className="top-page">
                <FlexGridRow>
                    <FlexGridCol desktop={{ span: 8, offset: 2 }} className="content">
                        <main role="main" className="main-content" id="main-content">
                            <header>
                                <h1 className="main-heading">Analyzing Equity in Federal COVID-19 Spending: The Opportunity Project</h1>
                                <img src="img/opportunity-project-logo.png" role="presentation" alt="" />
                            </header>

                            <section>
                                <p>The Bureau of the Fiscal Service (Fiscal) at the U.S. Department of the Treasury is proud to have been selected by The Opportunity Project as a Challenge Partner to collaborate, innovate and assist in solving the problem of analyzing equity in COVID-19 federal funding.</p>
                                <p>The Opportunity Project (TOP) is a public &amp; private sector innovation program led by Census Open Innovation Labs at the U.S. Census Bureau with a focus on the nation’s toughest challenges. TOP brings together technologists, government, and community leaders to rapidly prototype digital products— powered by federal open data—that solve real-world problems for people across the country TOP’s 2021 sprint theme is &ldquo;The World Post COVID-19: Society, Economy, and Environment&rdquo;.</p>
                                <p>The team behind <a href="/about">USAspending.gov</a> at Fiscal brought together tech teams, product advisors, user advocates, local government officials and federal data stewards from all over America to collaborate on the mission of analyzing equity in COVID-19 federal funding for our TOP 2021 sprint.  We want to thank and acknowledge all  of the TOP participants for volunteering their time, contributing to federal open data innovation, serving as a resource, and collaborating across sectors in service of helping communities.</p>
                            </section>

                            <picture>
                                <source srcSet="img/opportunity-project-map.webp 950w" type="image/webp" />
                                <source srcSet="img/opportunity-project-map.png" type="image/png" />
                                <img src="img/opportunity-project-map.png" alt="United States map displaying locations of teams who participated in the Bureau of the Fiscal Service's 2021 sprint for The Opportunity Project" />
                            </picture>

                            <section>
                                <div className="list-heading">Tech Teams:</div>
                                <ul>
                                    <li>Bowie State University</li>
                                    <li>Morehouse College</li>
                                    <li>University of Kansas Center for Public Partnerships and Research</li>
                                    <li>The Mom Project</li>
                                </ul>
                                <div className="list-heading">Product Advisors:</div>
                                <ul>
                                    <li>Flow Immersive</li>
                                </ul>
                                <div className="list-heading">User Advocates:</div>
                                <ul>
                                    <li>The Girl Scout Research Institute at Girl Scouts of the USA</li>
                                    <li>The Honorable Elbra Wedgeworth, Denver, Colorado</li>
                                    <li>Dr. Bina Shrimali, Researcher, Public Health & Community Development</li>
                                    <li>Christian McDonald, Innovation Director, Dallas Morning News Journalism Innovation Endowment at The University of Texas at Austin</li>
                                    <li>Maria Howeth, Grants Specialist, Tribal Nations, Ecivis</li>
                                    <li>Poonam Soans, Chief Data Officer, The State of New Jersey</li>
                                    <li>Department of Human Services, Allegheny County, Pennsylvania</li>
                                    <li>Johnson County Public Health, Johnson County, Iowa</li>
                                    <li>Office of the Chief Financial Officer, Data Strategy & Analytics, City of Detroit, MI</li>
                                    <li>City of Laredo Information Services Department, Laredo, Texas</li>
                                </ul>
                                <div className="list-heading">Federal Data Stewards:</div>
                                <p>To see a comprehensive list of federal open datasets that were curated in this sprint to help analyze equity in COVID-19 federal funding visit the{' '}
                                    <a href="https://opportunity.census.gov/data/covid-spending/" target="_blank" rel="noopener noreferrer">TOP datasets page</a>.
                                </p>
                            </section>

                            <section>
                                <p><span className="bold">THE CHALLENGE</span> – Develop innovative tools that combine datasets to help inform community leaders on equitable distribution of federal funding. Teams were encouraged to analyze how federal COVID-19 spending has been shared with communities most vulnerable to impacts of the pandemic.</p>
                                <p><span className="bold">THE PROBLEM</span> – Over the course of the COVID-19 pandemic, the federal government has made $4.5 trillion available for relief efforts. How has this money been spent? A greater understanding of how government spending reaches different communities is a step forward for data transparency and a call-to-action to improve equity.</p>
                                <p><span className="bold">THE OPPORTUNITY</span> – The correlation between federal spending data and demographic data is critical to understanding how federal funds are distributed to various communities, but this correlation has not been fully explored or made accessible to local stakeholders. This creates blind spots for government leaders as they make decisions on funding allocation and addressing inequities in their communities. To help address this need, the opportunity project sought technologists to help innovate and build digital products with experts (known as user advocates) on the ground in communities across America.</p>
                                <p><span className="bold">THE TARGET END USERS</span> – Local government officials, federal funding decision makers, equity policy experts, community advocacy organizations and data journalists.</p>
                                <p><span className="bold">THE VISION</span> – By bringing together Census, Treasury, and other open data sources, there can be innovative digital tools built to help stakeholders better understand whether the federal government is equitably distributing federal funds during the COVID-19 pandemic.</p>
                                <p><span className="bold">THE RESULTS</span> – The Opportunity Project 2021 sprint concluded in November 2021.  Working with user advocates, data stewards, product advisors and following Census’s TOP product development toolkit, tech teams submitted innovative tools to analyze equity in federal COVID-19 spending.  The results are both inspiring and illuminating.  To see what tech teams built, please visit the website links below.</p>
                                <p><span className="bold">PLEASE NOTE: Inclusion on this page does not constitute endorsement by the Department of the Treasury, Bureau of the Fiscal Service, or any employees thereof of any product, service, or enterprise.</span></p>
                            </section>

                            <section>
                                <h2>Bowie State University</h2>
                                <p>Product statement: Bowie State University Opportunity Project uses publicly accessible CDC’s Social Vulnerability Index, CDC’s County vaccination rates, the ARP county COVID-19 vaccine spending data, and Co-est 2020 to assess COVID-19 vaccination and equity problems for community leaders as end users.</p>
                                <p>Link: {externalLink("https://app.flow.gl/flow/3xfvr3", "Bowie State University TOP Project on Flow Immersive")}</p>

                                <h2>Morehouse College</h2>
                                <p>Product statement: The MSI (Minority Serving Institutions) COVID-19 Relief Dashboard for Equity and Transparency uses several federal datasets surrounding school enrollment and COVID-19 relief awards to highlight whether or not COVID-19 funding was equitably distributed to MSIs around the country for federal, state, and local officials and organizations.</p>
                                <p>Link: {externalLink("https://a.flow.gl/flow/kuo62d54", "MSI COVID-19 Relief Dashboard for Equity and Transparency")}</p>

                                <h2>University of Kansas Center for Public Partnerships and Research</h2>
                                <p>Product statement: The Child Care Planning Assessment Tool will help community leaders better assess and understand the connection between childcare and equitable labor participation including a county level snapshot of child care supply and demand and interactive calculators to begin addressing child care needs in their community.</p>
                                <p>Link: {externalLink("https://top.kucppr.org/", "Child Care in America | A broken business model (kucppr.org)")}</p>
                                <p>Video: {externalLink("https://vimeo.com/638475809", "Kansas & Flow Immersive TOP Project Video Overview")}</p>

                                <h2>The Mom Project</h2>
                                <p>Product statement: The PEI (Predictive Equity Index) model employs machine learning and predictive analytics to understand key drivers of equity in the distribution of PPP loans. This methodology allows for creation of a cohesive dataset, allowing for an in-depth assessment of county-level performance of equity, as well as an understanding of how future actions serve to impact anticipated levels of equity in future funding efforts. Taken together, this product allows for policy makers at the county, state, and national-level to take county-level action maximizing the impact of federal dollars on the communities the investments aim to serve.</p>
                                <p>Link: {externalLink("https://work.themomproject.com/predictiveequity", "Predictive Equity Index Model, developed by Werklabs, the research division of The Mom Project")}</p>
                            </section>

                            <footer>
                                <p className="center">Questions, ideas, or feedback? E-mail us at <a href="mailto:usaspending@fiscal.treasury.gov">usaspending@fiscal.treasury.gov</a></p>
                                <p className="center">We want to thank everyone involved in The Opportunity Project.  Learn more at{' '}
                                    <a href="https://opportunity.census.gov/" target="_blank" rel="noopener noreferrer">opportunity.census.gov</a>.
                                </p>
                            </footer>
                        </main>
                    </FlexGridCol>
                </FlexGridRow>
            </FlexGridContainer>
        </PageWrapper>
    );
};

export default OpportunityProjectPage;
