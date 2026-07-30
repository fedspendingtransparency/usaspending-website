/**
 * ItemDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import MoreResources from './MoreResources';
import SmartLink from './SmartLink';

const propTypes = {
    type: PropTypes.string,
    term: PropTypes.string,
    data_act_term: PropTypes.string,
    resources: PropTypes.string
};

// TODO: Fix prop types
const ItemDefinition = (props) => {
    let resources = null;
    if (props.resources && props.resources !== '') {
        resources = (<MoreResources
            resources={props.resources} />);
    }

    let term = props.term;
    if (props.type === 'official' && props.data_act_term !== '') {
        term = props.data_act_term;
    }

    return (
        <div className="definition-wrapper">
            <h2 className="term">
                {term}
            </h2>

            <div className="definition-content">
                <Markdown components={{Link: SmartLink, a: SmartLink}} skipHtml>{props[props.type]}</Markdown>
            </div>

            {resources}
        </div>
    );
};

ItemDefinition.propTypes = propTypes;
export default ItemDefinition;
