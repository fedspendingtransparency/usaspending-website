/**
 * DownloadPlaceholder.jsx
 * Created by Kevin Li 1/24/18
 */

import React from 'react';
import MobileLinks from './MobileLinks';

const DownloadPlaceholder = () => (
    <div className="download-placeholder">
        <div className="download-placeholder__wrapper">
            <img
                className="download-placeholder__icon"
                src="img/homepage-download-placeholder.png"
                srcSet="img/homepage-download-placeholder.png 1x, img/homepage-download-placeholder@2x.png 2x"
                alt="Download icon" />
            <h2
                className="download-placeholder__title"
                tabIndex={-1}>
                Downloading our data is easy.
            </h2>
            <p
                className="download-placeholder__detail">
                Need comprehensive federal spending data quickly? Our download tools offer a straightforward path to customizable, downloadable data sets.
            </p>
            <MobileLinks />
        </div>
    </div>
);

export default DownloadPlaceholder;
