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
    isDownloadPending: PropTypes.bool,
    isInvalidId: PropTypes.bool
};

const SummaryBar = ({
    category,
    downloadData,
    isDownloadPending,
    isInvalidId = false
}) => {
    if (isInvalidId) {
        return (
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    Invalid Award ID
                </h1>
            </div>
        );
    }
    const title = (category === 'idv')
        ? 'Indefinite Delivery Vehicle'
        : startCase(category);

    return (
        <div className="sticky-header__title">
            <h1 tabIndex={-1} id="main-focus">
                {title} Summary
            </h1>
            <DownloadButton
                downloadAvailable
                downloadInFlight={isDownloadPending}
                onClick={downloadData} />
        </div>
    );
};

SummaryBar.propTypes = propTypes;

export default SummaryBar;
