/* eslint-disable max-len */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import Accordion from "../../sharedComponents/accordion/Accordion";
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

const AboutSection = () => {
    const aboutDetails = [{
        title: "What",
        details: (<>
            <p>
            The Digital Accountability and Transparency Act (DATA Act) was signed into law in 2014, establishing governmentwide standards for financial data and a new reporting process for agencies to improve data quality, transparency, and accountability.
            </p>
            <p>
            The result is an ongoing collaboration between the federal community and external stakeholders to create a standard data model and a publicly accessible and searchable website: USAspending.gov.
            </p>
            <p>
            Today, more than 100 federal agencies submit financial data on a monthly basis, and thousands of public users visit USAspending every day to access the data via visualizations, downloads, and open APIs.
            </p>
        </>)
    },
    {
        title: "Why",
        details: (<>
            <p>
            Before the DATA Act, many programs in the federal government had the same types of spending data about agency expenses and federal awards such as contracts, grants, and loans. However, they weren't all defining their data elements in the same way. These differences made it hard to share or compare data across agencies and programs.
            </p>
        </>)
    },
    {
        title: "How",
        details: (
            <>
                <ul className="interactives-guide_bullet-points">
                    <li>
                        The USAspending data model standardizes data elements and definitions, and the USAspending Broker System is used to validate the data submitted and extracted from agency systems for quality, consistency, and accuracy.
                    </li>
                    <li>
                        USAspending is built on the principles of user-centered design and Agile software development, leveraging input from the public and federal stakeholders to iteratively release updates and enhancements many times per year.
                    </li>
                </ul>
            </>
        )
    }];
    const dataModelCardContent = {
        heading: (
            <>
                <p>USAspending Data Model</p>
                <div role="separator" className="interactives-guide__cardLine" />
            </>
        ),
        content: (
            <>
                <p data-testid="cardText" className="interactives-guide-cardText">
                    To read the technical documentation for the data elements and source systems that flow into USAspending,
                    <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html" title="DAIMS current page">
                        please visit this resources page from the Treasury Department’s Bureau of the Fiscal Service.
                    </a>
                </p>
                <div
                    className="usa-button usa-button-outline read-more-button"
                    role="button"
                    aria-label="Read More Button"
                    title="Read More USAspending's technical documentation">
                        Read More
                </div>
            </>
        )
    };

    return (
        <div className="body__content interactive-data-sources-intro-section">
            <div className="body-padded__content">
                <h3 className="interactiveDataHeader__topTitle">
                    Data Act and Creation of DAIMS/USAspending
                </h3>
                <h4 className="interactives-guide__questionSections">
                    History
                </h4>
                <div role="separator" className="interactives-guide__questionLine" />
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
                    <h2>You can follow the money from the source systems through the submission process to see what is displayed on USAspending.gov.</h2>

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
