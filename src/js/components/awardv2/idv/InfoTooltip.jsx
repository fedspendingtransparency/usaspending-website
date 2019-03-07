/**
 * InfoTooltip.jsx
 * Created by Lizzie Salita 3/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node
};

export default class InfoTooltip extends React.Component {
    render() {
        return (
            <div
                className="info-tooltip"
                id="info-tooltip"
                role="tooltip">
                <div className="info-tooltip__interior">
                    <div className="tooltip-pointer" />
                    <div className="info-tooltip__content">
                        <div className="info-tooltip__message">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoTooltip.propTypes = propTypes;
