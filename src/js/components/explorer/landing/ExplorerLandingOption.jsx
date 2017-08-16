/**
 * ExplorerLandingOption.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string
};

const ExplorerLandingOption = (props) => (
    <div className="landing-option">
        <h3>{props.title}</h3>
        <div className="description">
            {props.description}
        </div>

        <a
            className="landing-option-button"
            href={props.url}>
            Start Here
        </a>
    </div>
);

ExplorerLandingOption.propTypes = propTypes;

export default ExplorerLandingOption;
