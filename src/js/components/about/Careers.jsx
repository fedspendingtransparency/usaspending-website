/**
 * Careers.jsx
 * Created by Jonathan Hill 12/07/20
 */

import React from 'react';

const emailbodyString = encodeURIComponent(`Please send me information about current or upcoming hiring opportunities at USAspending.gov or other products within the Office of the Chief Data Officer, Bureau of the Fiscal Service, U.S. Department of the Treasury.\n
I am providing the following information regarding my interest and background - without this information, my inquiry cannot be processed:\n
I am interested in the following types of roles: ________________________\n
My professional background includes the following roles and organizations: ________________________`);

const mailToString = `mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent('USAspending.gov Hiring Opportunities')}&body=${emailbodyString}`;

const Careers = () => (
    <div
        className="about-section-wrapper"
        id="about-careers">
        <h2 className="about-section-title">
            Careers
        </h2>
        <div className="about-section-content">
            <p>
                Are you a data storyteller who is passionate about government transparency? The Office
                of the Chief Data Officer (Bureau of the Fiscal Service, U.S. Department of the Treasury)
                is always on the lookout for talented analysts, marketers, and product managers. If you or
                someone you know is interested in joining our team, please send an email
                to{' '}
                <a href={mailToString}>
                    USAspending.Help@fiscal.treasury.gov
                </a>.
                We will let you know about any current and
                future hiring opportunities!
            </p>
        </div>
    </div>
);

export default Careers;
