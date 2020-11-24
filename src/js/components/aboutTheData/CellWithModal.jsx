/**
 * CellWithModal.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    data: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};

const CellWithModal = ({ data, openModal }) => (
    <div className="modal-cell">
        {data}
        <button className="modal-cell__button" onClick={openModal}>
            <FontAwesomeIcon icon="expand-alt" />
        </button>
    </div>
);

CellWithModal.propTypes = propTypes;
export default CellWithModal;
