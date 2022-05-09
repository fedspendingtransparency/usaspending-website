/**
 * BulkDownloadSidebar.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import SidebarButton from './SidebarButton';

const propTypes = {
    active: PropTypes.string,
    dataTypes: PropTypes.array
};

const BulkDownloadSidebar = ({ active, dataTypes }) => (
    <div
        className="download-sidebar-content">
        <ul>
            {dataTypes.map((type) => (
                <SidebarButton
                    key={type.code}
                    type={type.type}
                    label={type.label}
                    active={active}
                    disabled={!type.enabled}
                    url={type.url}
                    shouldOpenNewTab={type.shouldOpenNewTab}
                    externalLink={type.externalLink}
                    internalDomain={type.internalDomain} />
            ))}
        </ul>
    </div>
);

BulkDownloadSidebar.propTypes = propTypes;
export default BulkDownloadSidebar;
