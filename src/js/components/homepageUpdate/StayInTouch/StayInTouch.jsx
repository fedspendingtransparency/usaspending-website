/**
 * StayInTouch.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow } from 'data-transparency-ui';

const StayInTouch = () => (
    <section className="stay-in-touch__section">
        <FlexGridRow className="stay-in-touch__top-row">
            <div className="stay-in-touch__icon-container">
                {/* icon goes here */}
            </div>
            <div className="stay-in-touch__title">
                Stay in touch
            </div>
        </FlexGridRow>
        <FlexGridRow className="stay-in-touch__second-row">
            <div className="stay-in-touch__second-row-container top">
                <div className="stay-in-touch__second-row-title">
                    Get Release Notes delivered to your inbox
                </div>
                <div className="stay-in-touch__second-row-text">
                    Sign up to receive our release notes to keep up with what’s new on USAspending.gov.
                </div>
                <div className="stay-in-touch__second-row-link">
                    Sign up
                </div>
            </div>
            <div className="stay-in-touch__second-row-container">
                <div className="stay-in-touch__second-row-title">
                    Request a USAspending.gov training session
                </div>
                <div className="stay-in-touch__second-row-text">
                    Receive customized training for your organization on how to use our tools and data.
                </div>
                <div className="stay-in-touch__second-row-link">
                    Learn more
                </div>
            </div>
        </FlexGridRow>
    </section>
);

export default StayInTouch;
