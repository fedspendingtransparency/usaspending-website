/**
 * Mission.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

export default class Mission extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-mission">
                <div className="about-section-title">
                    <h2>Mission</h2>
                </div>
                <div className="about-subtitle">
                    <h3>Building a more transparent government.</h3>
                </div>
                <div className="about-section-content">
                    <p>USAspending.gov is the official source for spending data for the U.S.
                        Government. Its mission is to show the American public what the federal
                        government spends every year and how it spends the money. You can follow
                        the money from the Congressional appropriations to the federal agencies
                        and down to local communities and businesses.
                    </p>
                </div>
            </div>
        );
    }
}
