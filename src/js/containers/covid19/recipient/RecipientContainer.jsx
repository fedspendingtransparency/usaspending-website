/**
 * RecipientContainer.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React, { useState } from 'react';
import tabs from 'containers/covid19/helpers/recipient';
import DateNote from 'components/covid19/DateNote';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';

const RecipientContainer = () => {
    const [activeTab, setActiveTab] = useState('recipient_locations');
    const changeActiveTab = (tab) => {
        const tabInternal = tabs.find((item) => item.internal === tab).internal;
        setActiveTab(tabInternal);
    };
    return (
        <div className="body__content recipient__container">
            <DateNote />
            <h3 className="body__narrative">
                These are the recipients who received COVID-19 Response <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                Federal agencies allocate award funds. Agencies receive funding from the Federal
                Government, which they award to recipients in order to respond to the COVID-19
                pandemic.
            </p>
            <div className="recipient__tabs-container count-tabs">
                <MoreOptionsTabs tabs={tabs} changeActiveTab={changeActiveTab} hideCounts />
                <div className="recipient__content">
                    {tabs.find((item) => item.internal === activeTab).component}
                </div>
            </div>
        </div>
    );
};

export default RecipientContainer;
