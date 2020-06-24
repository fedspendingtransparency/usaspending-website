/**
 * RecipientContainer.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React, { useState } from 'react';
import tabs from 'containers/covid19/helpers/recipient';
import RecipientTab from 'components/covid19/recipient/RecipientTab';
import DateNote from 'components/covid19/DateNote';

const RecipientContainer = () => {
    const [activeTab, setActiveTab] = useState('recipient_locations');
    return (
        <div className="recipient__container">
            <DateNote />
            <div className="recipient__title">
                These are the recipients who received COVID-19 Response awards.
            </div>
            <div className="recipient__sub-title">
                Federal agencies allocate award funds. Agencies receive funding from
                the Federal Government, which they award to recipients in order to
                respond to the COVID-19 pandemic.
            </div>
            <div className="recipient__questions">
                {
                    Object.keys(tabs).map((tab) => (
                        <div key={tab} className="recipient__question">
                            {tabs[tab].question}
                        </div>
                    ))
                }
            </div>
            <div className="recipient__tabs-container count-tabs">
                <div className="count-tabs__buttons">
                    {
                        Object.keys(tabs).map((tab) => (
                            <RecipientTab
                                {...tabs[tab]}
                                key={tab}
                                type={tab}
                                setActiveTab={setActiveTab}
                                active={activeTab === tab} />
                        ))
                    }
                </div>
                <div className="recipient__content">
                    {tabs[activeTab].component}
                </div>
            </div>
        </div>
    );
};

export default RecipientContainer;
