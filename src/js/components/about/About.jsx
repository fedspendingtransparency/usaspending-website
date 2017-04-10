/**
 * About.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import MastHead from './MastHead';
import Overview from './Overview';
import AboutData from './AboutData';
import FAQ from './FAQ';
import SubmissionFiles from './SubmissionFiles';
import ContactUs from './ContactUs';
import WhatsNext from './WhatsNext';


export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <Header />
                <MastHead />
                <Overview />
                <AboutData />
                <div className="usa-da-about-inner">
                    <FAQ />
                    <SubmissionFiles />
                </div>
                <div className="usa-da-about-inner">
                    <ContactUs />
                    <WhatsNext />
                </div>
                <Footer />
            </div>
        );
    }
}
