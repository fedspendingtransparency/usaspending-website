/**
 * DownloadHover.jsx
 * Created by James Lee 7/16/2020
 */

import React from 'react';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import { Link } from 'react-router-dom';

const DownloadHover = () => (
    <div className="download-hover-spacer">
        <div
            className="download-hover"
            id="no-download-hover"
            role="tooltip">
            <div className="download-hover-interior">
                <div className="hover-content">
                    <div className="icon">
                        <ExclamationTriangle alt="Download is not available" />
                    </div>
                    <div className="message">
                        <div>This download includes all data displayed on this page (as well as many additional data elements), with the exception of a few aspects one would need the more granular Account Breakdown by Award data (File C) to reproduce. If you wish to download this more granular data, visit the{' '}
                            <Link to="/download_center/custom_account_data">Custom Account Data</Link> download page.
                        </div>
                        <br />
                        <div>See the Data Sources section for more information on how downloadable data maps to this page.</div>
                    </div>
                </div>
                <div className="tooltip-pointer right" />
            </div>
        </div>
    </div>);

export default DownloadHover;
