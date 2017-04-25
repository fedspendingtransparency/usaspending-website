/**
 * DBInfo.jsx
 * Created by Destin Frasier 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

export default class AboutData extends React.Component {
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
                    <li>About the Data</li>
                  </ul>
                </div>
                <div className="article-wrapper">
                    <h1>About the Data</h1>
                    <hr className="results-divider" />
                    <p>Last year, the U.S. government spent $3.85 trillion. Do you ever wonder how all that money was used? Well, as you might imagine, it is a complicated story. It involves hundreds of government agencies and programs, thousands of companies and non-profits, and millions of individual citizens across the country and the globe. Despite this complex story, there is an abundance of data available that can help make sense of it all, and that data is offered here on USAspending.gov.</p>
                    <p>USAspending.gov puts this federal spending data in your hands. In order to understand this data, it’s helpful to first understand how the data is structured and categorized. Below is a graphic showing the various levels of federal spending data that you will encounter on this site.</p>
                    <img src="url(../../img/aboutdata-graphic@2x.png" alt="Data Structure" />
                    <h6>Level 1. Total Federal Spending</h6>
                    <p>This top level represents the entirety of the United States government’s spending for a single fiscal year. Exactly how much can be spent is determined by the budget passed by Congress and signed by the President.</p>
                    <h6>Level 2. Budget Functions</h6>
                    <p>This level refers to the division of the federal budget into approximately 20 high-level categories known as budget functions. Together, these budget functions comprise all spending for a given topic, regardless of the federal agency that oversees the individual federal program. The budget functions are comprised of multiple appropriation accounts.</p>
                    <h6>Level 3. Federal Accounts &amp; Appropriations Accounts</h6>
                    <p>This level refers to the money appropriated to agencies through the annual budget process. It details the funding for programs, projects, and activities that agencies employ to achieve their goals for the year. These programs, projects, and activities are grouped into what are known as appropriation accounts. These accounts help the agency track their finances, much like a bank account. A Federal Account is a collection of multiple Appropriation Accounts that serve the same function. The data associated with the flow of money to and from these Appropriation Accounts are available to explore on USAspending.gov.</p>
                    <h6>Level 4. Program Activity and Object Class</h6>
                    <p>On this next level, each appropriation account is further broken down into what are known as Object Class and Program Activity. The Object Class category groups obligations (money designated for spending) and outlays (checks written) by the types of items and service purchased. Program Activity categorizes obligations and outlays by specific activity or project.</p>
                    <h6>Level 5. Awards</h6>
                    <p>Awards are the final level. Once OMB appropriates the amount of funds that an agency may use, agencies begin to take actions to implement their programs, projects, or activities to make use of their appropriated funds through several types of awards.<br/>Agencies engage in partnerships with organizations through these award types:</p>
                    <ul>
                      <li>Contracts</li>
                      <li>Grants</li>
                      <li>Direct Payments</li>
                      <li>Loans</li>
                      <li>Insurance</li>
                    </ul>
                    <p>On USAspending.gov, you can view many of the details of these various awards, including the agency that issued the award, the organization that received the award, the amounts obligated over time, the general purpose of the award, among other attributes.</p>
                    <p>View our <a href="#">Search and Download page</a> to explore this data.</p>
                </div>
                <Footer />
            </div>
        );
    }
}
