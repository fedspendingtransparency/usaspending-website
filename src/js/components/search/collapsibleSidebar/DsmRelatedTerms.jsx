/**
 * DsmRelatedTerms
 * Created by Zoey Sears 3/28/25
 */

import React from "react";
import PropTypes from "prop-types";
import GlossaryLink from "../../sharedComponents/GlossaryLink";
import { AboutTheDataMarkdownLink } from '../../aboutTheDataSidebar/AboutTheDataMarkdownLink';

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
                <p>
                    <GlossaryLink term={glossaryLink.term} label={glossaryLink.text} />
                </p>)
            )}
            {aboutTheData && aboutTheData.map((data) => (
                <p>
                    <AboutTheDataMarkdownLink slug={data.slug} openPanel name={data.name} />
                </p>
            ))}
        </div>
    </>
);
DsmRelatedTerms.propTypes = propTypes;
export default DsmRelatedTerms;
