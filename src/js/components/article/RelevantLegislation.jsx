/**
 * RelevantLegislation.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class RelevantLegislation extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <Header />
                <Breadcrumb title="Relevant Legislation" />
                <div className="article-wrapper">
                    <h1>Relevant Legislation</h1>
                    <hr className="results-divider" />
                    <p>
                        Beta.USAspending.gov is the new official source of accessible, searchable 
                        and reliable spending data for the U.S. Government. Treasury released this 
                        new version of the USAspending.gov site in accordance with the Digital 
                        Accountability and Transparency Act (DATA Act) of 2014 requirements.
                    </p>
                    <h6>Background</h6>
                    <p>
                        The Federal Funding Accountability and Transparency Act of 2006 (FFATA) 
                        was signed into law on September 26, 2006. The legislation required that 
                        federal contract, grant, loan, and other financial assistance awards of 
                        more than $25,000 be displayed on a publicly accessible and searchable 
                        website to give the American public access to information on how their tax 
                        dollars are being spent. In 2008, FFATA was amended by the Government 
                        Funding Transparency Act, which required prime recipients to report details 
                        on their first-tier sub-recipients for awards made as of October 1, 2010.
                    </p>
                    <p>
                        The transparency efforts of FFATA were expanded with the enactment of the 
                        Digital Accountability and Transparency Act (DATA Act) Pub. L. 113-101 on 
                        May 9, 2014. The purpose of the DATA Act, as directed by Congress, is to:
                    </p>
                    <ul>
                        <li>
                            Expand FFATA by disclosing direct agency expenditures and linking 
                            federal contract, loan, and grant spending information to federal agency 
                            programs
                        </li>
                        <li>
                            Establish government-wide data standards for financial data and provide 
                            consistent, reliable, and searchable data that is displayed accurately
                        </li>
                        <li>
                            Simplify reporting, streamline reporting requirements, and reduce 
                            compliance costs, while improving transparency
                        </li>
                        <li>
                            Improve the quality of data submitted to USAspending.gov by holding 
                            agencies accountable.
                        </li>
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }
}
