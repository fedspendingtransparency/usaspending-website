/**
 * RecipientSection.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tabs from 'containers/covid19/helpers/recipient';
import DateNote from 'components/covid19/DateNote';
import { Tabs } from "data-transparency-ui";
import ReadMore from 'components/sharedComponents/ReadMore';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import Analytics from 'helpers/analytics/Analytics';
import Note, { dodNote } from 'components/sharedComponents/Note';

const propTypes = {
    publicLaw: PropTypes.string
};

const RecipientSection = ({ publicLaw }) => {
    const [activeTab, setActiveTab] = useState('recipient_locations');
    const changeActiveTab = (tab) => {
        const tabInternal = tabs.find((item) => item.internal === tab).internal;
        setActiveTab(tabInternal);
        Analytics.event({ category: 'covid-19 - profile', action: `award spending by recipient - ${activeTab}` });
    };
    return (
        <div className="body__content recipient__container">
            <DateNote />
            {publicLaw === 'american-rescue-plan' ?
                <h4 className="body__narrative">
                    <strong>Who</strong> received funding through American Rescue Plan awards?
                </h4> :
                <h4 className="body__narrative">
                    <strong>Who</strong> received funding through COVID-19 awards?
                </h4>
            }
            <div className="body__narrative-description">
                <p>
                    Once the federal government has determined that an individual, organization, business, or state, local, or tribal government will receive an award, the money is obligated (promised) and then outlayed (paid) according to the terms of the contract or financial assistance.<sup>1</sup>
                </p>
                <ReadMore>
                    <p>
                        In the following map, you will see a spending breakdown by state, county, or congressional district of recipients who have received awards funded by COVID-19 appropriations. These recipient locations shown below reflect the location of organizational offices that were used to register for awards, and do not reflect the actual distribution of funds. You can also view recipients in a table by selecting the Recipients tab on the visualization.
                    </p>
                    <p>
                        In the case of recipients who are individual persons and not organizations, data is aggregated by county or state to protect personally identifiable information (PII). Data about the location where the award money is used, known as the &apos;Primary Place of Performance&apos;, is available through the download button at the top of the table.
                    </p>
                    <p className="footnotes">
                        <sup>1</sup> To learn more about eligibility criteria for receiving a financial assistance award or contract, visit <ExternalLink url="https://beta.sam.gov/" />
                    </p>
                </ReadMore>
            </div>
            <div className="recipient__tabs-container count-tabs">
                <Tabs active={activeTab} types={tabs} switchTab={changeActiveTab} />
                <div className="recipient__content">
                    {tabs.find((t) => activeTab === t.internal).component}
                </div>
                <Note message={(
                    <>
                        Amounts reported for Utah reflect an award by HHS from the Provider Relief Fund (PRF)
                        to a single entity in Utah which will make payments to recipients across the country.{' '}
                        <a href="data/data-limitations.pdf" target="_blank" rel="noopener noreferrer">
                            See more information about HHS&apos;s data submission.
                        </a>
                    </>
                )} />
                <Note message={(
                    <>
                        Amounts reported for Minnesota reflect an award by HHS from the Provider Relief Fund (PRF)
                        to a single entity in Minnesota which will make payments to recipients across the country.{' '}
                        <a href="data/data-limitations.pdf" target="_blank" rel="noopener noreferrer">
                            See more information about HHS&apos;s data submission.
                        </a>
                    </>
                )} />
                <Note message={dodNote} />
                {publicLaw === 'american-rescue-plan' ?
                    <Note message={(
                        <>
                            This section uses data tagged with Disaster Emergency Fund Code (DEFC) V, which was designated for Non-emergency P.L. 117-2, American Rescue Plan Act of 2021.
                        </>
                    )} /> :
                    <></>
                }
                <Note message={(
                    <>
                        For &apos;All Awards&apos; we are showing the unique count of recipients across all award types, since some recipients receive multiple awards.
                    </>
                )} />
            </div>
        </div>
    );
};

RecipientSection.propTypes = propTypes;
export default RecipientSection;
