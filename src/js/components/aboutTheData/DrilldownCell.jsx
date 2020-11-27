/**
 * DrilldownCell.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    data: oneOfType([PropTypes.string, PropTypes.object]),
    id: PropTypes.string
};

const DrilldownCell = ({ data, id }) => (
    <div className="action-cell">
        <span className="action-cell__text">
            {data}
        </span>
        <Link to={`/about-the-data/agency/${id}`} className="action-cell__button">
            <FontAwesomeIcon icon="angle-double-down" />
        </Link>
    </div>
);

DrilldownCell.propTypes = propTypes;
export default DrilldownCell;
