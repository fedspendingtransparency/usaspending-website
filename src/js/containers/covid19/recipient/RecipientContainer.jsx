/**
 * RecipientContainer.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React from 'react';
// import tabs from 'containers/covid19/helpers/recipient';
import DateNote from 'components/covid19/DateNote';
// import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import ReadMore from 'components/covid19/ReadMore';
import ExternalLink from 'components/sharedComponents/ExternalLink';

const ComingSoon = () => (
    <div className="coming-soon-section">
        <h4>Coming Soon</h4>
        <p>This feature is currently under development.</p>
    </div>
);
// eslint-disable-next-line
const RecipientContainer = () => {
    // const [activeTab, setActiveTab] = useState('recipient_locations');
    // const changeActiveTab = (tab) => {
    //     const tabInternal = tabs.find((item) => item.internal === tab).internal;
    //     setActiveTab(tabInternal);
    // };
    return (
        <div className="body__content recipient__container">
            <DateNote />
            <h3 className="body__narrative">
                <strong>Who</strong> received funding through COVID-19 awards?
            </h3>
            <div className="body__narrative-description">
                <p>
                    Once the federal government has determined that an individual, organization, business, or state, local, or tribal government will receive an award, the money is obligated (promised) and then outlayed (paid) according to the terms of the contract or financial assistance.<sup>3</sup>
                </p>
                <ReadMore>
                    <p>
                        In the map below, you will see a spending breakdown by state, county, or congressional district of recipients who have received awards funded by COVID-19 appropriations. These recipient locations shown below reflect the location of organizational offices that were used to register for awards, and do not reflect the actual distribution of funds. In the case of recipients who are individual persons and not organizations, data is aggregated by county or state to protect personally identifiable information (PII). Data about the location where the award money is used, known as the &apos;Primary Place of Performance&apos;, is available in the download at the top right of this page.
                    </p>
                    <p>
                        In the second tab, you will see a spending breakdown by recipient name.
                    </p>
                    <p>
                        <em>Please note that award amounts do not include the Small Business Administration (SBA)&apos;s Paycheck Protection Program.</em>
                    </p>
                    <p className="footnotes">
                        <sup>3</sup> To learn more about eligibility criteria for receiving a financial assistance award or contract, visit <ExternalLink url="https://beta.sam.gov/" />
                    </p>
                </ReadMore>
            </div>
            <ComingSoon />
            {/* <div className="recipient__tabs-container count-tabs">
                <MoreOptionsTabs tabs={tabs} changeActiveTab={changeActiveTab} hideCounts />
                <div className="recipient__content">
                    {tabs.find((t) => activeTab === t.internal).component}
                </div>
            </div> */}
        </div>
    );
};

export default RecipientContainer;
