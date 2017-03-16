/**
 * comingSoonLabel.jsx
 * Created by Marco Mendoza 03/03/2017
 **/

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';

export default class comingSoonLabel extends React.Component {
    render() {
        return (
            <div className="coming-soon-container">
                <div className="coming-soon-icon">
                    <Icons.ExclamationCircle />
                </div>
                <span className="coming-soon-label">Coming Soon</span>
            </div>
        );
    }
}
