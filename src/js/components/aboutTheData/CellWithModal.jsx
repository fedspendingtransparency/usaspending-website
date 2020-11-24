/**
 * CellWithModal.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    data: oneOfType([PropTypes.string, PropTypes.object]),
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
