/**
 * Overview.jsx
 * Created by Rickey An 04/28/2017
 **/

import React from 'react';

export default class Introduction extends React.Component {

    render() {
        return (
            <div className="intro-wrap">
                <div className="intro-inner-wrap">
                    <h3>
                        Beta.USAspending.gov is the new official source of accessible, searchable
                        and reliable spending data for the U.S. Government. 
                    </h3>
                    <p>
                        Treasury released this new version of the USAspending.gov site in accordance
                        with the Digital Accountability and Transparency Act (DATA Act) requirements.
                        The "Beta" site will run concurrently with the previous version of the
                        USAspending.gov website over the summer to minimize disruptions to users&#39;
                        data access and provide more time to add user-centered enhancements.  The
                        new Beta.USAspending.gov site tracks agency expenditures and for the first
                        time, links relevant agency expenditure data with awards distributed by the
                        government. 
                    </p>
                </div>
            </div>
        );
    }
}
