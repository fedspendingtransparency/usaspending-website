/**
 * RecipientContainer.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import tabs from 'dataMapping/covid19/recipient/recipient';
import RecipientTab from 'components/covid19/recipient/RecipientTab';

const RecipientContainer = () => {
    const [activeTab, setActiveTab] = useState('recipient_locations');
    return (
        <div className="recipient__container">
            <div className="recipient__title">
                    Who received COVID-19 response funding?
            </div>
            <div className="recipient__questions">
                {
                    tabs.map((question) => (
                        <div key={uniqueId()} className="recipient__question">
                            {question.question}
                        </div>
                    ))
                }
            </div>
            <div className="recipient__tabs-container count-tabs">
                <div className="count-tabs__buttons">
                    {
                        tabs.map((tab) => (
                            <RecipientTab
                                {...tab}
                                setActiveTab={setActiveTab}
                                active={activeTab === tab.type} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default RecipientContainer;
