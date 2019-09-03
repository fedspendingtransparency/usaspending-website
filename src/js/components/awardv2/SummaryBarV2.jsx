/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';
import DownloadButton from '../search/header/DownloadButton';

const propTypes = {
    category: PropTypes.string,
    downloadData: PropTypes.func,
    isDownloadPending: PropTypes.bool
};

export default class SummaryBar extends React.Component {
    render() {
        const title = (this.props.category === 'idv')
            ? 'Indefinite Delivery Vehicle'
            : startCase(this.props.category);

        return (
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    {title} Summary
                </h1>
                <DownloadButton
                    downloadAvailable
                    downloadInFlight={this.props.isDownloadPending}
                    onClick={this.props.downloadData} />
            </div>
        );
    }
}

SummaryBar.propTypes = propTypes;
