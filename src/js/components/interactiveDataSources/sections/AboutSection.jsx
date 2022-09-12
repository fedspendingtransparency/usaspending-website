import React from 'react';
import Accordion from "../../sharedComponents/accordion/Accordion";
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

export default class AboutSection extends React.Component {
    render() {
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
            details: (<>
                <ul>
                    <li>
                    The USAspending data model standardizes data elements and definitions, and the USAspending Broker System is used to validate the data submitted and extracted from agency systems for quality, consistency, and accuracy.
                    </li>
                    <li>
                    USAspending is built on the principles of user-centered design and Agile software development, leveraging input from the public and federal stakeholders to iteratively release updates and enhancements many times per year.
                    </li>
                </ul>
            </>)
        }];
        const dataModelCardContent = {
            heading: (
                <p>USAspending Data Model</p>
            ),
            content: (
                <p>
                To read the technical documentation for the data elements and source systems that flow into USAspending, <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html" target="_blank">please visit this resources page from the Treasury Department’s Bureau of the Fiscal Service.</a>
                </p>
            )
        };

        return (
            <div className="body__content body-padded__content interactive-data-sources-intro-section">
                <h2>Data Act and Creation of DAIMS/USAspending</h2>
                {aboutDetails.map((item, i) => (
                    <Accordion
                        key={`item_${i}`}
                        title={item.title}>
                        {item.details}
                    </Accordion>
                ))}
                <br />
                <ScrollerOverlayCard
                    heading={dataModelCardContent.heading}
                    content={dataModelCardContent.content} />
                <br />
                <div>
                    <p >You can follow the money from the source systems through the submission process to see what is displayed on USAspending.gov.</p>
                    <p>Scroll down to get started.</p>
                </div>
            </div>
        );
    }
}
