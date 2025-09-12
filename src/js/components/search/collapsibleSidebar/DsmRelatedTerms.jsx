/**
 * DsmRelatedTerms
 * Created by Zoey Sears 3/28/25
 */

import React from "react";
import PropTypes from "prop-types";
import GlossaryLink from "../../sharedComponents/GlossaryLink";
import AboutTheDataLink from "../../sharedComponents/AboutTheDataLink";

const propTypes = {
    headingTitle: PropTypes.string,
    glossaryLinks: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired
    })),
    aboutTheData: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
};

const DsmRelatedTerms = ({ headingTitle, glossaryLinks, aboutTheData }) => (
    <>
        <div className="collapsible-sidebar--dsm-wrapper--text-header">
            {headingTitle}
        </div>
        <div className="collapsible-sidebar--dsm-wrapper--text-section">
            {glossaryLinks && glossaryLinks.map((glossaryLink) => (
                <div className="collapsible-sidebar--dsm-wrapper--text-links">
                    <GlossaryLink term={glossaryLink.term} label={glossaryLink.text} />
                </div>)
            )}
            {aboutTheData && aboutTheData.map((data) => (
                <div className="collapsible-sidebar--dsm-wrapper--text-links">
                    <AboutTheDataLink slug={data.slug}>
                        {data.name}
                    </AboutTheDataLink>
                </div>
            ))}
        </div>
    </>
);
DsmRelatedTerms.propTypes = propTypes;
export default DsmRelatedTerms;
