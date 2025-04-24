/**
 * ExplorerLandingOption.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { icons } from 'dataMapping/explorer/dropdownScopes';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    term: PropTypes.string,
    onClick: PropTypes.func
};

const ExplorerLandingOption = (props) => {
    const IconType = icons[props.icon];
    const icon = <IconType alt={props.title} />;
    return (
        <div className="landing-option">
            <div className="landing-option__icon">
                {icon}
            </div>
            <h2 className="landing-option__title">
                {props.title}
                <Link to={`/explorer?glossary=${props.term}`}>
                    <Icons.Glossary />
                </Link>
            </h2>
            <div className="landing-option__description">
                {props.description}
            </div>

            <Link
                className="landing-option__button"
                to={props.url}
                onClick={props.onClick}>
                Start
            </Link>
        </div>
    );
};

ExplorerLandingOption.propTypes = propTypes;

export default ExplorerLandingOption;
