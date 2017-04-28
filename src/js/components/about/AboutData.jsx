/**
 * AboutData.jsx
 * Created by Rickey An 04/01/2017
 **/

import React from 'react';


export default class AboutData extends React.Component {

    render() {
        return (
            <div className="aboutdata-outer-wrap">
                <div className="aboutdata-wrap">
                    <div className="image-wrap">
                        <img src="img/aboutdata-graphic@2x.png" alt="About the Data" />
                    </div>
                    <div className="aboutdata-inner-wrap">
                        <h3>About the Data</h3>
                        <hr className="results-divider" />
                        <p>USAspending.gov hosts an abundance of data that can help you understand the
                            nuances of government spending. This data can answer the who, what, where, 
                            why, and how of the complex government spending landscape. Read on for more
                            background on the data you&#8217;ll find on this site.
                        </p>
                        <a 
                            href="#/aboutdata" 
                            role="button" 
                            title="About the Data" 
                            aria-label="About the Data">
                            Not enough for you? Click here for more discussion of the data
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
