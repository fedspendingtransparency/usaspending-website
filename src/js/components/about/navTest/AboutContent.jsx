/**
 * navTest/AboutPage.jsx
 * Created by Andrea Blackwell 8/22/2023
 **/

import React from 'react';
import Mission from '../Mission';
import Background from '../Background';
import MoreInfo from '../MoreInfo';
import Contact from '../Contact';
import Development from '../Development';
import Licensing from '../Licensing';

const AboutContent = () => (
    <div className="about-content-wrapper">
        <div className="about-content">
            <div className="about-padded-content">
                <Mission />
                <Background />
                <Development />
                <Licensing />
                <MoreInfo />
                <Contact />
            </div>
        </div>
    </div>
);

export default AboutContent;
