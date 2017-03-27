/**
  * Homepage.jsx
  * Created by Emily Gullo 03/15/2017
  **/

import React from 'react';
import Landing from './Landing';
import TreeMap from './visualizations/TreeMap';
import TreeMapIntro from './TreeMapIntro';
import LinksSection from './LinksSection';
import SearchSection from './SearchSection';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSpent: "$3.85 trillion",
            budgetCategories: {
                children: [
                    { name: "National Defense", value: 595303439435.41 },
                    { name: "International Affairs", value: 45304204110.79 },
                    { name: "General Science, Space, and Technology", value: 30230316084.43 },
                    { name: "Energy", value: 3748706890.45 },
                    { name: "Natural Resources and Environment", value: 37792268568.36 },
                    { name: "Agriculture", value: 20174987360.06 },
                    { name: "Transportation", value: 92940730983.02 },
                    { name: "Community and Regional Development", value: 21051938355.95 },
                    { name: "Education, Training, Employment, and Social Services",
                        value: 108057798196.10 },
                    { name: "Health", value: 511320133269.73 },
                    { name: "Medicare", value: 594535157426.09 },
                    { name: "Income Security", value: 514582983291.10 },
                    { name: "Social Security", value: 916077987132.59 },
                    { name: "Veterans Benefits and Services", value: 174514511683.73 },
                    { name: "Administration of Justice", value: 57144161860.45 },
                    { name: "General Government", value: 18639539276.13 },
                    { name: "Net Interest", value: 240721540897.61 }
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
                <TreeMapIntro />
                <TreeMap
                    budgetCategories={this.state.budgetCategories} />
                <SearchSection />
                <LinksSection />
                <Footer />
            </div>
        );
    }
}
