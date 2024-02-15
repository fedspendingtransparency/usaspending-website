/**
 * PageTitle.jsx
 * Created by Lizzie Salita 12/8/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const propTypes = {
    fy: PropTypes.string
};

const PageTitle = () => {
    const {
        name,
        logo
    } = useSelector((state) => state.agency.overview);

    const image = logo ? (
        <img
            className="page-title__image"
            src={`graphics/agency/${logo}`}
            alt={`${name} logo`} />
    ) : '';
    return (
        <div className="page-title">
            <div className="page-title__wrapper">
                <h2 className="page-title__name">
                    {name}&nbsp;&nbsp;
                </h2>
            </div>
            {image}
        </div>
    );
};

PageTitle.propTypes = propTypes;
export default PageTitle;
