/**
 * ExploreMore.jsx
 * Created by Nick Torres 10/8/25
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../sharedComponents/ExternalLink';

const propTypes = {
    header: PropTypes.string,
    citations: PropTypes.array
};

const ExploreMore = (props) => {
    const truncateText = (input, maxLen) => {
        if (input.length <= maxLen) {
            return input; // Return original text if it's within the limit
        }
        // Truncate the text and append an ellipsis
        // Subtract 3 from maxLength to account for the "..."
        return `${input.substring(0, maxLen - 3)}...`;
    };

    return (
        <>
            <span className="featured-content__citation-heading">
                {props.header}
            </span>
            <FlexGridRow hasGutter gutterSize="lg" className="featured-content__citation-wrapper">
                {props.citations?.map((citation, index) => (
                // eslint-disable-next-line react/no-array-index-key
                    <FlexGridCol mobile={10} tablet={5} desktop={12} className="featured-content__citation" key={`featured-content__citation-${index}`}>
                        {citation.type === "external" ?
                            <>
                                <ExternalLink isCard url={citation.slug}>
                                    <div>
                                        <FontAwesomeIcon icon="external-link-alt" />
                                        <span>{truncateText(citation.label, 79)}</span>
                                    </div>
                                </ExternalLink>
                            </> :
                            <>
                                <Link to={citation.slug}>
                                    <div>
                                        <FontAwesomeIcon icon="link" />
                                        <span>{truncateText(citation.label, 79)}</span>
                                    </div>
                                </Link>
                            </>}
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </>
    );
};

ExploreMore.propTypes = propTypes;
export default ExploreMore;
