/**
 * SourcesData.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class SourcesData extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <Header />
                <Breadcrumb title="Sources of Data" />
                <div className="article-wrapper">
                    <h1>Sources of Data</h1>
                    <hr className="results-divider" />
                    <p>
                        The U.S Treasury Department brings together data from hundreds of federal agencies and systems to make federal spending data readily available to the public. Federal agencies report this data, in a standard format, to Treasury and other government-wide systems.
                    </p>
                    <p>
                        The diagram below provides an overview of the sources of the data that are used on USAspending.gov. This model shows how the data flows from the agency financial and awards systems to reach the public website.
                    </p>
                    <img src="img/information-flow.png" alt="Information Flow" />
                </div>
                <Footer />
            </div>
        );
    }
}
