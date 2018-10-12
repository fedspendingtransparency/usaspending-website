/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Building } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardDescription extends React.Component {
    render() {
        return (
            <div className="award__col award-description">
                <div className="award__col award-viz award-amounts">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <Building />
                        </div>
                        <h3 className="award-viz__title">
                            Description
                        </h3>
                    </div>
                    <hr />
                    Coming Soon
                </div>
            </div>
        );
    }
}
AwardDescription.propTypes = propTypes;
