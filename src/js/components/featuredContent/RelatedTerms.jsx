/**
 * RelatedTerms.jsx
 * Created by Nick Torres 10/8/25
 */

import React from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import PropTypes from "prop-types";
import GlossaryLink from '../sharedComponents/GlossaryLink';
import AboutTheDataLink from '../sharedComponents/AboutTheDataLink';

const propTypes = {
    header: PropTypes.string,
    citations: PropTypes.array
};

const RelatedTerms = (props) => (
    <>
        <span className="featured-content__citation-heading">
            {props.header}
        </span>
        <FlexGridRow className="featured-content__citation-wrapper">
            {props.citations?.map((citation, index) => (
                <FlexGridCol mobile={12} tablet={4} desktop={12} className="featured-content__citation" key={`featured-content__citation-${index}`}>
                    { citation.type === "glossary" ?
                        <GlossaryLink term={citation.term} label={citation.label} displayIcon={false} /> :
                        <AboutTheDataLink slug={citation.term}>
                            {citation.label}
                        </AboutTheDataLink>
                    }
                </FlexGridCol>
            ))}
        </FlexGridRow>
    </>
);

RelatedTerms.propTypes = propTypes;
export default RelatedTerms;
