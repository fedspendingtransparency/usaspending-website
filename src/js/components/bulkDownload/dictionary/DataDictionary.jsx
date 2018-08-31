/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    content: PropTypes.object
};

export default class DataDictionary extends React.Component {
    render() {
        return (
            <div className="data-dictionary">
                <h2>Data Dictionary</h2>
            </div>
        );
    }
}

DataDictionary.propTypes = propTypes;
