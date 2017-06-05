/**
 * LinksSection.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';

import LinksSectionBox from 'components/homepage/LinksSectionBox';

export default class LinksSection extends React.Component {

    render() {
        return (
            <div className="links-section-outer-wrap">
                <div className="links-section-wrap">
                    <h4 className="links-section-primary-title">
                        Check out these sections for more views into our data.
                    </h4>
                    <div className="links-section-box-wrap">
                        <LinksSectionBox
                            icon="recipient"
                            text="Get insights into recipients."
                            linkText="Find a recipient"
                            linkUrl="" />
                        <LinksSectionBox
                            icon="federalAccount"
                            text="See how spending is disbursed."
                            linkText="Find a Federal account"
                            linkUrl="" />
                        <LinksSectionBox
                            icon="api"
                            text="Plug into the data using our API."
                            linkText="View the documentation"
                            linkUrl="https://api.usaspending.gov" />
                        <LinksSectionBox
                            icon="resources"
                            text="Learn more about the data."
                            linkText="Visit our 'About' page"
                            linkUrl="#/about" />
                    </div>
                </div>
            </div>
        );
    }
}
