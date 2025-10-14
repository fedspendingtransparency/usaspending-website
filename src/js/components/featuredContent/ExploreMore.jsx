/* eslint-disable arrow-body-style */
/**
 * ExploreMore.jsx
 * Created by Nick Torres 10/8/25
 */

import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../sharedComponents/ExternalLink';

const propTypes = {
    header: PropTypes.string,
    citations: PropTypes.array
};

const ExploreMore = (props) => {
    console.debug(props);
    return (
        <>
            <span className="featured-content__citation-heading">
                {props.header}
            </span>
            <div className="featured-content__citation-wrapper">
                {props.citations?.map((citation, index) => (
                // eslint-disable-next-line react/no-array-index-key
                    <span className="featured-content__citation" key={`featured-content__citation-${index}`}>
                        {citation.type === "external" ?
                            <><ExternalLink isCard url={citation.slug}><FontAwesomeIcon icon="external-link-alt" />{citation.label}</ExternalLink></> :
                            <><Link to={citation.slug}><FontAwesomeIcon icon="link" />{citation.label}</Link></>}
                    </span>
                ))}
            </div>
        </>
    );
};

ExploreMore.propTypes = propTypes;
export default ExploreMore;
