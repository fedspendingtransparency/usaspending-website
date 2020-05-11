/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import DownloadButton from '../search/header/DownloadButton';


const propTypes = {
    category: PropTypes.string,
    downloadData: PropTypes.func,
    isDownloadPending: PropTypes.bool,
    isInvalidId: PropTypes.bool,
    isLoading: PropTypes.bool
};

const SummaryBar = ({
    isLoading,
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
        <>
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    {isLoading ? `--` : `${title} Summary`}
                </h1>
                <DownloadButton
                    downloadAvailable
                    downloadInFlight={isDownloadPending}
                    onClick={downloadData} />
            </div>
            <div className="sticky-header__toolbar">
                <ShareIcon
                    slug={'slug'}
                    url={'url'}
                    email={{
                        subject: `Check out Agency  on USAspending.gov!`,
                        body: `Here is the url: `
                    }} />
            </div>
        </>
    );
};

SummaryBar.propTypes = propTypes;

export default SummaryBar;
