/**
 * BulkDownloadSidebar.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import SidebarButton from './SidebarButton';

const propTypes = {
    active: PropTypes.string,
    changeDataType: PropTypes.func,
    dataTypes: PropTypes.array
};

export default class BulkDownloadSidebar extends React.Component {
    render() {
        const items = this.props.dataTypes.map((type) => (
            <SidebarButton
                key={type.type}
                type={type.type}
                label={type.label}
                active={this.props.active}
                disabled={type.disabled}
                url={type.url}
                changeDataType={this.props.changeDataType} />
        ));

        return (
            <div
                className={'download-sidebar-content'}>
                <ul>
                    { items }
                </ul>
            </div>
        );
    }
}

BulkDownloadSidebar.propTypes = propTypes;
