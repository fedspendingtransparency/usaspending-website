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
                    <h2>
                        Providing the public with an easy way to explore, search, and understand
                        federal spending data.
                    </h2>
                    <p>
                        By using the new data standards brought forth by the DATA Act,
                        USAspending.gov gives you access to reliable federal spending data at an
                        unprecedented level of transparency and usability.  By equipping the public
                        and government with this data, together we can answer the big questions
                        about how the U.S. government spends taxpayer dollars and provide the needed
                        insight to run a more efficient and effective federal government.
                    </p>
                </div>
            </div>
        );
    }
}
