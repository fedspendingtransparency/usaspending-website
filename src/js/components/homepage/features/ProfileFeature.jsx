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
        srcSet: 'img/homepage-profile-agency.webp 1x, img/homepage-profile-agency@2x.webp 2x',
        src: 'img/homepage-profile-agency.png',
        alt: 'Screenshot of the Agency Profile page'
    },
    {
        srcSet: 'img/homepage-profile-fedaccount.webp 1x, img/homepage-profile-fedaccount@2x.webp 2x',
        src: 'img/homepage-profile-fedaccount.png',
        alt: 'Screenshot of the Federal Account Profile page'
    },
    {
        srcSet: 'img/homepage-profile-state.webp 1x, img/homepage-profile-state@2x.webp 2x',
        src: 'img/homepage-profile-state.png',
        alt: 'Screenshot of State Profile page'
    },
    {
        srcSet: 'img/homepage-profile-recipient.webp 1x, img/homepage-profile-recipient@2x.webp 2x',
        src: 'img/homepage-profile-recipient.png',
        alt: 'Recipient Profile page coming soon'
    }
];

const ProfileFeature = () => (
    <div className="feature-profile">
        <div className="feature-profile__wrapper">
            <div className="feature-profile__image-wrapper">
                <ImageCarousel
                    images={images} />
            </div>
            <div className="feature-profile__content">
                <h2
                    className="homepage-feature-title"
                    tabIndex={-1}>
                    A snapshot of the entities involved in federal spending
                </h2>

                <div className="feature-profile__mobile-carousel">
                    <ImageCarousel
                        images={images} />
                </div>

                <div className="homepage-feature-description">
                    <p>
                        Federal spending is complex, and learning its nuances takes time; <strong className="homepage-feature-description_weight_bold">Profiles</strong> make the process easier. Our profiles use plain language and engaging graphics to contextualize each entity within the larger federal spending landscape.
                    </p>
                    <p>
                        Each profile offers a snapshot of the entity in question. Interactive visualizations let you explore entities&apos; spending in an intuitive, accessible way.
                    </p>
                </div>

                <div className="feature-profile__dropdown">
                    <FeatureDropdown
                        items={profileOptions}>
                        Browse <strong>Profiles</strong>
                    </FeatureDropdown>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileFeature;
