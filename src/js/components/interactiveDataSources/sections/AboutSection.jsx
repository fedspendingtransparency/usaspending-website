/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import ReadMore from 'components/sharedComponents/ReadMore';
import { Link } from "react-router-dom";
import Accordion from "../../sharedComponents/accordion/Accordion";
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const AboutSection = () => {
    // todo figure out why interactives-guide_bullet-points adds the bullet points but messes up the layout; currently appears as just text
    const readMoreList = (
        <>
            <br />
            <ul>
                <li><span className="glossary-term">Glossary</span>{" "}
                    <GlossaryLink term="/" />: a collection of plain-language and official definitions for commonly used terms
                </li>
                <li>
                    <Link
                        className="scroller-overlay-card__link"
                        to="/?about-the-data"
                        target="_blank"
                        rel="noopener noreferrer">About the Data
                    </Link>: a collection of disclosures and background information
                </li>
                <li>
                    <Link
                        className="scroller-overlay-card__link"
                        to="/federal-spending-guide"
                        target="_blank"
                        rel="noopener noreferrer">
                        Federal Spending Guide
                    </Link>
                    : a collection of frequently asked questions
                </li>
                <li>
                    <Link
                        className="scroller-overlay-card__link"
                        to="/data-dictionary"
                        target="_blank"
                        rel="noopener noreferrer">
                        Data Dictionary
                    </Link>
                    : a crosswalk spreadsheet for data element names and definitions across USAspending downloads and source systems
                </li>
                <li>
                    <Link
                        className="scroller-overlay-card__link"
                        to="/download_center/dataset_metadata"
                        target="_blank"
                        rel="noopener noreferrer">
                        Dataset Metadata
                    </Link>
                    : documentation for all JSON objects accessible from downloads
                </li>
                <li>
                    <a
                        className="scroller-overlay-card__link"
                        href="https://api.usaspending.gov/docs/endpoints"
                        target="_blank"
                        rel="noopener noreferrer">
                        API Endpoints
                    </a>
                    : documentation for all JSON objects accessible from API endpoints
                </li>
                <li>
                    <a
                        className="scroller-overlay-card__link"
                        href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        DATA Act Information Model Schema (DAIMS)
                    </a>
                    : technical documentation for the data submitted to, and extracted by, USAspending.gov (Files A, B, C, D1, D2, E, and F)
                </li>
            </ul>
        </>
    );
    const aboutDetails = [{
        title: "What is the DATA Act?",
        details: (<>
            <p>
            The Digital Accountability and Transparency Act (DATA Act) was signed into law in 2014, establishing federal standards for financial data and a new reporting process for agencies to improve data quality, transparency, and accountability.
            </p>
            <p>
            The result is an ongoing partnership between the federal community and external stakeholders to create a standard data model and a publicly accessible and searchable website: USAspending.gov.
            </p>
            <p>
            Today, more than 100 federal agencies submit financial data to USAspending.gov on a monthly basis, and thousands of public users visit the site every day to access data via visualizations, downloads, and open APIs.
            </p>
        </>)
    },
    {
        title: "Why was the DATA Act needed?",
        details: (<>
            <p>
            Before the DATA Act, many programs in the federal government had the same types
            of spending data about agency expenses and federal awards such as contracts, grants, and loans. However, they weren't all defining their data elements in the same way. These differences made it hard to share or compare data across agencies and programs.
            </p>
            <p>
                In addition, agency financial systems were not linked to governmentwide award systems, so there was no way to follow the money from appropriated funds to award spending for recipients across the country and the world. As a result of the DATA Act, policies and mechanisms now exist for this linkage.
            </p>
        </>)
    },
    {
        title: "How is the DATA Act implemented?",
        details: (
            <>
                <p>
                    The USAspending data model standardizes data elements and definitions, and the USAspending Broker validates the data submitted and extracted from agency systems for quality, consistency, and accuracy.
                </p>
                <p>
                    USAspending.gov is built on principles of user-centered design and Agile software development, leveraging input from the public and federal stakeholders to iteratively release updates and enhancements many times per year.
                </p>
            </>
        )
    }];
    const dataModelCardContent = {
        heading: (
            <div className="interactives-guide__heading-container">
                <h4 className="interactives-guide__heading">USAspending Data Model</h4>
            </div>
        ),
        content: (
            <>
                <p data-testid="cardText" className="interactives-guide-cardText">
                    The USAspending data model is a collection of resources that explains the elements, relationships, and sources for the data on USAspending.gov. This Data Sources page is one such resource. Read about the other resources below.
                </p>
                <ReadMore>
                    {readMoreList}
                </ReadMore>
            </>
        )
    };

    return (
        <div className="body__content interactive-data-sources-intro-section">
            <div className="body-padded__content">
                <h3 className="interactiveDataHeader__topTitle">
                History of the DATA Act
                </h3>
                {aboutDetails.map((item, i) => (
                    <Accordion
                        data-testid="accordion"
                        aria-label="Toggle Expansion"
                        aria-expanded="false"
                        key={`item_${i}`}
                        title={item.title}>
                        {item.details}
                    </Accordion>
                ))}
            </div>
            <div className="interactives-guide__background-green">
                <div className="body-padded__content">
                    <ScrollerOverlayCard
                        heading={dataModelCardContent.heading}
                        content={dataModelCardContent.content} />
                </div>
                <br />
                <div className="interactives-guide_begin-scroller">
                    <h4>You can follow the money from the source systems through the submission and extraction process to see what is displayed on USAspending.gov.</h4>

                    <div className="interactives-guide_scroll-indicator">
                        <h5 id="scroll-down-text">
                            Scroll down to get started.
                        </h5>
                        <div className="interactives-arrow-holder">
                            <FontAwesomeIcon
                                aria-labelledby="scroll-down-text"
                                alt="Down Arrow icon"
                                icon={faArrowDown}
                                className="interactives-down-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AboutSection;
