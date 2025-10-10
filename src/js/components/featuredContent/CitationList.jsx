/* eslint-disable arrow-body-style */
/**
 * CitationList.jsx
 * Created by Nick Torres 10/8/25
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

const propTypes = {
    header: PropTypes.string,
    citations: PropTypes.array
};

const CitationList = (props) => {
    return (
        <>
            <span className="featured-content__citation-heading">
                {props.header}
            </span>
            <div className="featured-content__citation-wrapper">
                {props.citations?.map((citation, index) => (
                // eslint-disable-next-line react/no-array-index-key
                    <span className="featured-content__citation" key={`featured-content__citation-${index}`}>
                        {citation}
                    </span>
                ))}
            </div>
        </>
    );
};

CitationList.propTypes = propTypes;
export default CitationList;
