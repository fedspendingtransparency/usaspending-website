/**
 * NoDownloadHover.jsx
 * Created by Kevin Li 10/23/17
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { TooltipComponent } from 'data-transparency-ui';

const NoDownloadHover = () => (
    <TooltipComponent title="Advanced Search Download">
        <div className="message">
            Our Advanced Search limits downloads to 500,000 records.
            Narrow your search using additional filters, or grab larger files from
            our <Link to="/download_center/custom_award_data">Custom Award Data</Link>.
        </div>
    </TooltipComponent>
);

export default NoDownloadHover;
