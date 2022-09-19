/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import Accordion from "../../sharedComponents/accordion/Accordion";
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

const AboutSection = () => {
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
            Today, more than 100 federal agencies submit financial data to USAspending on a monthly basis, and thousands of public users visit the site every day to access data via visualizations, downloads, and open APIs.
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
        </>)
    },
    {
        title: "How was the DATA Act implemented?",
        details: (
            <>
                <ul className="interactives-guide_bullet-points">
                    <li>
                    The USAspending data model standardizes data elements and definitions, and the USAspending Broker validates the data submitted and extracted from agency systems for quality, consistency, and accuracy.
                    </li>
                    <li>
                    USAspending is built on principles of user-centered design and Agile software development, leveraging input from the public and federal stakeholders to iteratively release updates and enhancements many times per year.
                    </li>
                </ul>
            </>
        )
    }];
    const dataModelCardContent = {
        heading: (
            <>
                <h4>USAspending Data Model</h4>
                <div role="separator" className="interactives-guide__cardLine" />
            </>
        ),
        content: (
            <>
                <p data-testid="cardText" className="interactives-guide-cardText">
                    To read the technical documentation for the data elements and source systems that flow into USAspending,
                    visit the resources page from the Treasury Department's Bureau of the Fiscal Service.
                </p>
                <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html" title="Read More: DATA Act Information Model Schema (DAIMS)" target="_blank" rel="noopener noreferrer">
                    <div
                        className="usa-button usa-button-outline read-more-button"
                        role="button"
                        aria-label="Read More Button"
                        title="Read More: DATA Act Information Model Schema (DAIMS)">
                            Read Our Documentation
                    </div>
                </a>
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
                    <h4>You can follow the money from the source systems through the submission and extraction process to see what is displayed on USAspending.</h4>

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
