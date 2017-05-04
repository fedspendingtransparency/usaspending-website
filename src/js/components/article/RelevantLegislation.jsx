/**
 * RelevantLegislature.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class RelevantLegislature extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <Header />
                <Breadcrumb title="Relevant Legislature" />
                <div className="article-wrapper">
                    <h1>Relevant Legislature</h1>
                    <hr className="results-divider" />
                    <p>
                        Beta.USAspending.gov is the new official source of accessible, searchable 
                        and reliable spending data for the U.S. Government. Treasury released this 
                        new version of the USAspending.gov site in accordance with the Digital 
                        Accountability and Transparency Act (DATA Act) of 2014 requirements.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}
