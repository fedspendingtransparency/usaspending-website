/**
 * DrilldownCell.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import replaceString from 'helpers/replaceString';

const propTypes = {
    id: PropTypes.string,
    data: oneOfType([PropTypes.string, PropTypes.object]),
    searchTerm: PropTypes.string
};

const DrilldownCell = ({
    data,
    id,
    searchTerm
}) => (
    <div className="action-cell">
        <span className="action-cell__text">
            {searchTerm ? replaceString(data, searchTerm, 'matched-str') : data}
        </span>
        <Link to={`/about-the-data/agency/${id}`} className="action-cell__button">
            <FontAwesomeIcon icon="angle-double-down" />
        </Link>
    </div>
);

DrilldownCell.propTypes = propTypes;
export default DrilldownCell;
