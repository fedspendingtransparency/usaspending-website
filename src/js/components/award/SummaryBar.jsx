/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { getBaseUrl } from 'helpers/socialShare';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';

import DownloadButton from '../search/header/DownloadButton';


const propTypes = {
    slug: PropTypes.string,
    emailSubject: PropTypes.string,
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
    isInvalidId = false,
    slug,
    emailSubject
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
            </div>
            <div className="sticky-header__toolbar">
                <ShareIcon
                    slug={slug}
                    email={{
                        subject: `USAspending.gov Award Summary: ${emailSubject}`,
                        body: `View the spending details of this federal award on USAspending.gov: ${getBaseUrl(slug)}`
                    }} />
                <div className="sticky-header__toolbar-item">
                    <DownloadButton
                        downloadAvailable
                        downloadInFlight={isDownloadPending}
                        onClick={downloadData} />
                </div>
            </div>
        </>
    );
};

SummaryBar.propTypes = propTypes;

export default SummaryBar;
