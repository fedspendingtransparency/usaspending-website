/**
 * MoreResources.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import SmartLink from './SmartLink';


const propTypes = {
    resources: PropTypes.string
};

const MoreResources = ({ resources }) => (
    <div className="glossary-resources">
        <h3 className="title">
            More Resources
        </h3>
        <hr />
        <Markdown components={{Link: SmartLink, a: SmartLink}} skipHtml>{resources}</Markdown>
    </div>
);

MoreResources.propTypes = propTypes;
export default MoreResources;
