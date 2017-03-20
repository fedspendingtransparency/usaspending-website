/**
  * HomepageContainer.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Landing from 'components/homepage/Landing';
import TreeMap from 'components/homepage/TreeMap';
import LinksSection from 'components/homepage/LinksSection';
import SearchSection from 'components/homepage/SearchSection';
import Header from '../../components/sharedComponents/header/Header';
import Footer from '../../components/sharedComponents/Footer';

export default class HomepageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSpent: "$3.85 trillion",
            budgetCategories: {
                socialSecurity: 24.1,
                nationalDefense: 16,
                medicare: 14.8,
                incomeSecurity: 13.8,
                health: 13.1,
                netInterest: 6.1,
                veteransBenefits: 4.3,
                education: 3.3,
                justice: 1.4,
                misc: [
                    1.2,
                    1.1,
                    0.9,
                    0.6,
                    0.4,
                    0.3,
                    0.1,
                    0.1
                ]
            },
            budgetBreakdown: {
                totalContractors: "2.29 trillion",
                individuals: 30.2,
                stateLocal: 17,
                contractors: 12.1,
                federalGov: 40.5
            }
        };
    }

    render() {
        return (
            <div className="usa-da-home-page">
                <Header />
                <Landing />
                <TreeMap
                    budgetCategories={this.state.budgetCategories} />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
