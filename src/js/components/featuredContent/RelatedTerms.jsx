/* eslint-disable arrow-body-style */
/**
 * RelatedTerms.jsx
 * Created by Nick Torres 10/8/25
 */

import React from 'react';
import PropTypes from "prop-types";
import GlossaryLink from '../sharedComponents/GlossaryLink';
import AboutTheDataLink from '../sharedComponents/AboutTheDataLink';

const propTypes = {
    header: PropTypes.string,
    citations: PropTypes.array
};

const RelatedTerms = (props) => {
    return (
        <>
            <span className="featured-content__citation-heading">
                {props.header}
            </span>
            <div className="featured-content__citation-wrapper">
                {props.citations?.map((citation, index) => (
                // eslint-disable-next-line react/no-array-index-key
                    <span className="featured-content__citation" key={`featured-content__citation-${index}`}>
                        { citation.type === "glossary" ?
                            <GlossaryLink term={citation.term} label={citation.label} displayIcon={false} /> :
                            <AboutTheDataLink slug={citation.term}>
                                {citation.label}
                            </AboutTheDataLink>
                        }
                    </span>
                ))}
            </div>
        </>
    );
};

RelatedTerms.propTypes = propTypes;
export default RelatedTerms;
