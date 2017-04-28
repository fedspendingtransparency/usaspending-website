/**
 * AboutData.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class AboutData extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <Header />
                <Breadcrumb title="About the Data" />
                <div className="article-wrapper">
                    <h1>About the Data</h1>
                    <hr className="results-divider" />
                    <p>
                        The full picture of government spending is a complicated story. It involves
                        hundreds of government agencies and programs, thousands of companies and
                        nonprofits, and millions of individuals across the country and the globe.
                        Despite the complexity, there is an abundance of data available here on
                        USAspending.gov that can help make sense of it all.
                    </p>
                    <p>
                        USAspending.gov puts this federal spending data in your hands.
                        In order to understand this data, it’s helpful to first understand how the
                        data is structured and categorized. Below is a graphic showing the various
                        levels of federal spending data that you will encounter on this site.
                    </p>
                    <img src="img/spending-heirarchy.png" alt="Data Structure" />
                    <p>
                        While there are many ways to organize federal spending data, understanding
                        the way it is organized on this site will help you get the most of out of
                        our data. All of the categories and levels of spending discussed are
                        available as filters on our Search and Download page. Knowing the scope of
                        each level will not only benefit your understanding of how the U.S.
                        Government tracks and organizes spending data, but also will help you find
                        the data you’re looking for when using our robust search capabilities.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}
