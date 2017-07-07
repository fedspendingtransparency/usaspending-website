/**
 * AgencyProfilesContent.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

import AgenciesSearchContainer from 'containers/agencyProfiles/AgenciesSearchContainer';
import AgenciesTableContainer from 'containers/agencyProfiles/AgenciesTableContainer';

export default class AgencyProfilesContent extends React.Component {
    render() {
        return (
            <div className="agency-profiles-content">
                <div className="agency-profiles-overview">
                    <h3>Find an Agency Profile.</h3>
                    <h6>Understand the current spending of agencies in our agency profiles.</h6>
                    <p>Sixty-six federal agencies report data to USAspending.gov. These include the
                        15 executive departments whose leaders sit on the President&#39;s Cabinet, as well
                        as small independent boards and commissions. They range in size from $700 billion
                        down to less than $200,000.</p>
                </div>
                <AgenciesSearchContainer />
                <AgenciesTableContainer />
            </div>
        );
    }
}
