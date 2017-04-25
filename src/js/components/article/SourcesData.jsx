/**
 * DBInfo.jsx
 * Created by Destin Frasier 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

export default class SourcesData extends React.Component {
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
                    <li>Sources of Data</li>
                  </ul>
                </div>
                <div className="article-wrapper">
                    <h1>Sources of Data</h1>
                    <hr className="results-divider" />
                    <p>The U.S Treasury Department brings together data from hundreds of federal agencies and systems to make federal spending data readily available to the public. Federal agencies report this data, in a standard format, to Treasury and other government-wide systems.</p>
                    <p>The diagram below provides an overview of the sources of the data that are used on USAspending.gov. This model shows how the data flows from the agency financial and awards systems to reach the public website.</p>
                    <img src="url(../../img/information-flow.png" alt="Information Flow" />
                </div>
                <Footer />
            </div>
        );
    }
}
