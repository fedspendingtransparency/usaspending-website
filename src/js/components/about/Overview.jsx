/**
 * Overview.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

export default class MastHead extends React.Component {

    render() {
        return (
            <div className="overview-wrap">
                <p>USAspending.gov provides the public with an easy way to explore, search, and reuse federal spending data. 
                The site was first launched in 2007, following a mandate in the Federal Funding Accountability and Transparency 
                Act (FFATA) to make data about federal spending available to the public. A new version was launched in May 2017, 
                in response to the Digital Accountability and Transparency Act of 2014 (DATA Act), which increased the amount and 
                type of data made available. USAspending.gov provides federal agencies and the public with resources to better 
                understand federal programs and operations to increase the efficiency, effectiveness, and transparency of the 
                federal government.</p>
            </div>
        );
    }
}
 