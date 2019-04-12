/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';
import DownloadButton from '../search/header/DownloadButton';

const propTypes = {
    category: PropTypes.string
};

export default class SummaryBar extends React.Component {
    render() {
        let title = startCase(this.props.category);
        let downloadBtn = null;
        if (this.props.category === 'idv') {
            title = 'Indefinite Delivery Vehicle';
            downloadBtn = <DownloadButton disableHover />;
        }
        return (
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    {title} Summary
                </h1>
                {downloadBtn}
            </div>
        );
    }
}

SummaryBar.propTypes = propTypes;
