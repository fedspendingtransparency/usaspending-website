/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';

const propTypes = {
    category: PropTypes.string
};

export default class SummaryBar extends React.Component {
    render() {
        let title = startCase(this.props.category);
        if (this.props.category === 'idv') {
            title = 'Indefinite Delivery Vehicle';
        }
        return (
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    {title} Summary
                </h1>
            </div>
        );
    }
}

SummaryBar.propTypes = propTypes;
