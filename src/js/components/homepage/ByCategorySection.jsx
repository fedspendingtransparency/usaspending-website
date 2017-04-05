/**
 * SearchSection.jsx
 * Created by Destin Frasier 04/05/17
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

export default class ByCategorySection extends React.Component {

    render() {
        return (
            <div className="by-category-section-wrap">
                <div className="inner-wrap">
                    <h3>About <strong>3/4</strong> of the total spending was awarded to state and local governments, private contractors, individuals, and others.</h3>
                    <div className="by-category-vis">
                        Spanding by stacked bar will live here!
                    </div>
                    <div className="map-segue">
                        <div className="icon-wrap">
                            <Icons.MapMarker className="usa-da-map-marker" />
                        </div>
                        <h4>The geographic breakdown of this portion of the budget is shown on the map below</h4>
                    </div>
                </div>
            </div>
        );
    }
}
