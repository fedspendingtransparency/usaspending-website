/**
 * LinksSection.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';

import LinksSectionBox from 'components/homepage/LinksSectionBox';

export default class LinksSection extends React.Component {

    render() {
        return (
            <div className="links-section-wrap">
                <h4
                    className="links-section-primary-title">
                    Check out these sections for more views into our data.
                </h4>
                <div className="links-section-box-wrap">
                    <LinksSectionBox
                        icon="recipient"
                        text="Get insights into specific recipients." 
                        linkText="Find a recipient" 
                        linkUrl="http://google.com" 
                    />
                    <LinksSectionBox
                        icon="federalAccount" 
                        text="See how spending is disbursed."
                        linkText="Find a Federal account" 
                        linkUrl="http://google.com"
                    />
                    <LinksSectionBox
                        icon="api" 
                        text="Plug directly into our data." 
                        linkText="View the documentation" 
                        linkUrl="http://google.com"
                    />
                    <LinksSectionBox
                        icon="resources" 
                        text="Learn more about the data."
                        linkText="Visit our 'About' page" 
                        linkUrl="http://google.com"
                    />
                </div>
            </div>
        );
    }
}