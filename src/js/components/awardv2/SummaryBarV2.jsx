/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class SummaryBar extends React.Component {
    render() {
        return (
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    Award&nbsp;Summary
                </h1>
            </div>

        );
    }
}

SummaryBar.propTypes = propTypes;
