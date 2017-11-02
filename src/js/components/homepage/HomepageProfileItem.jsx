/**
 * HomepageProfileItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    enabled: PropTypes.bool,
    navigateTo: PropTypes.func
};

const HomepageProfileItem = (props) => {
    const clickedButton = () => {
        if (!props.enabled) {
            return;
        }

        // substring the URL because the router already appends a # to the provided route
        props.navigateTo(props.url.substring(1));
    };

    let decorator = null;
    if (!props.enabled) {
        decorator = (
            <div className="coming-soon">
                Coming Soon
            </div>
        );
    }

    return (
        <li>
            <button
                className="dropdown-button"
                onClick={clickedButton}
                disabled={!props.enabled}>
                {props.title}
                {decorator}
            </button>
        </li>
    );
};

HomepageProfileItem.propTypes = propTypes;

export default HomepageProfileItem;
