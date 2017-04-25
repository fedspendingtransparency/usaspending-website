/**
 * DBInfo.jsx
 * Created by Destin Frasier 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

export default class RelevantLegislature extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <Header />
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="#" role="button" title="Home" aria-label="Home">Home</a></li>
                    <svg class="usa-da-icon-angle-right" viewBox="0 0 512 512" aria-label="Arrow Pointing Right Icon" height="12"><title>Arrow Pointing Right Icon</title><g><path d="M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506"></path></g></svg>
                    <li><a href="#/about" role="button" title="About Us" aria-label="About Us">About Us</a></li>
                    <svg class="usa-da-icon-angle-right" viewBox="0 0 512 512" aria-label="Arrow Pointing Right Icon" height="12"><title>Arrow Pointing Right Icon</title><g><path d="M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506"></path></g></svg>
                    <li>Relevant Legislature</li>  
                  </ul>
                </div>
                <div className="article-wrapper">
                    <h1>Relevant Legislature</h1>
                    <hr className="results-divider" />
                    <p>The <a href="#">Federal Funding Accountability and Transparency Act of 2006 (FFATA)</a> was signed into law on September 26, 2006. The legislation required that federal contract, grant, loan, and other financial assistance awards of more than $25,000 be displayed on a publicly accessible and searchable website to give the American public access to information on how their tax dollars are being spent. In 2008, FFATA was amended by the <a href="#">Government Funding Transparency Act</a>, which required prime recipients to report details on their first-tier sub-recipients for awards made as of October 1, 2010.</p>
                    <p>The transparency efforts of FFATA were expanded with the enactment of the <a href="#">Digital Accountability and Transparency Act (DATA Act)</a> Pub. L. 113-101 on May 9, 2014. The purpose of the DATA Act, as directed by Congress, is to:</p>
                    <ul>
                      <li>Expand FFATA by disclosing direct agency expenditures and linking federal contract, loan, and grant spending information to federal agency programs.</li>
                      <li>Establish government-wide data standards for financial data and provide consistent, reliable, and searchable data that is displayed accurately.</li>
                      <li>Simplify reporting, streamline reporting requirements, and reduce compliance costs, while improving transparency.</li>
                      <li>Improve the quality of data submitted to <a href="#">USAspending.gov</a> by holding agencies accountable.</li>
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }
}
