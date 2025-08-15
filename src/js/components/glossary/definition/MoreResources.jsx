/**
 * MoreResources.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import SmartLink from './SmartLink';

const propTypes = {
    resources: PropTypes.string
};

const MoreResources = (props) => (
    <div className="glossary-resources">
        <h3 className="title">
                    More Resources
        </h3>
        <hr />
        <ReactMarkdown
            source={props.resources}
            renderers={Object.assign({}, ReactMarkdown.renderers, {
                Link: SmartLink
            })} />
    </div>
);

MoreResources.propTypes = propTypes;
export default MoreResources;
