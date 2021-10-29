/**
 * DrilldownSidebar.jsx
 * Created by Lizzie Salita 10/29/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import levels from './StatusOfFunds';

const propTypes = {
    level: PropTypes.number,
    setLevel: PropTypes.func
};

const DrilldownSidebar = ({ level, setLevel }) => (
    <>
        DEV-8054 drilldown sidebar
        <div>
            {level < levels.length - 1 ? (
                <button onClick={() => setLevel(level + 1)}>
                    Down
                </button>
            ) : ''}
            {level > 0 ? (
                <button onClick={() => setLevel(level - 1)}>
                    Up
                </button>
            ) : ''}
        </div>
    </>
);

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
