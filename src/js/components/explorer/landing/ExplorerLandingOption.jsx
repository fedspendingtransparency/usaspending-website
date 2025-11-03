/**
 * ExplorerLandingOption.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { icons } from 'dataMapping/explorer/dropdownScopes';
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    term: PropTypes.string,
    onClick: PropTypes.func
};

const ExplorerLandingOption = ({ icon, title, description, url, term, onClick }) => {
    const IconType = icons[icon];

    return (
        <div className="landing-option">
            <div className="landing-option__icon">
                <IconType alt={title} />
            </div>
            <h2 className="landing-option__title">
                {title}
                <GlossaryLink term={term} />
            </h2>
            <div className="landing-option__description">
                {description}
            </div>

            <Link
                className="landing-option__button"
                to={url}
                onClick={onClick}>
                Start
            </Link>
        </div>
    );
};

ExplorerLandingOption.propTypes = propTypes;

export default ExplorerLandingOption;
