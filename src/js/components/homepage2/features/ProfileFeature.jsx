/**
 * ProfileFeature.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';

import { profileOptions } from 'dataMapping/navigation/menuOptions';

import ImageCarousel from './ImageCarousel';
import FeatureDropdown from './FeatureDropdown';

const images = [
    {
        src: 'img/homepage-profile-agency.png',
        srcSet: 'img/homepage-profile-agency.png 1x, img/homepage-profile-agency@2x.png 2x',
        alt: 'Screenshot of the Agency Profile page'
    },
    {
        src: 'img/homepage-profile-fedaccount.png',
        srcSet: 'img/homepage-profile-fedaccount.png 1x, img/homepage-profile-fedaccount@2x.png 2x',
        alt: 'Screenshot of the Federal Account Profile page'
    },
    {
        src: 'img/homepage-profile-recipient.png',
        srcSet: 'img/homepage-profile-recipient.png 1x, img/homepage-profile-recipient@2x.png 2x',
        alt: 'Recipient Profile page coming soon'
    }
];

const ProfileFeature = () => (
    <div className="feature-profile">
        <div className="profile-left">
            <ImageCarousel
                images={images} />
        </div>
        <div className="profile-right">
            <h2
                className="feature-title"
                tabIndex={-1}>
                A snapshot of the entities involved in federal spending
            </h2>

            <div className="profile-mobile-carousel">
                <ImageCarousel
                    images={images} />
            </div>

            <div className="feature-description">
                <p>
                    Federal spending is complex, and learning its nuances takes time; <strong>Profiles</strong> make the process easier. Our profiles use plain language and engaging graphics to contextualize each entity within the larger federal spending landscape.
                </p>
                <p>
                    Each profile offers a snapshot of the entity in question. Interactive visualizations let you explore entities&apos; spending in an intuitive, accessible way.
                </p>
            </div>

            <div className="profile-dropdown">
                <FeatureDropdown
                    items={profileOptions}>
                    Browse <strong>Profiles</strong>
                </FeatureDropdown>
            </div>
        </div>
    </div>
);

export default ProfileFeature;
