/**
 * AwardInfoBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AgencyInfo from './AgencyInfo';
import RecipientInfo from './RecipientInfo';

export default class AwardInfoBar extends React.Component {

    render() {
        return (
            <div className="award-info-bar">
                <AgencyInfo />
                <RecipientInfo />
            </div>
        );
    }
}
