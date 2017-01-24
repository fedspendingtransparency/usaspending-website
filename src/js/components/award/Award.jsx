/**
 * Award.jsx
 * Created by Emily Gullo 01/19/2017
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import SummaryBar from './SummaryBar';
import AwardInfoContainer from '../../containers/award/AwardInfoContainer';

const propTypes = {
    getSelectedAward: React.PropTypes.func
};

export default class Award extends React.Component {

    render() {
        return (
            <div className="usa-da-award-page">
                <Header />
                <SummaryBar />
                <div className="wrapper">
                    <AwardInfoContainer
                        getSelectedAward={this.props.getSelectedAward} />
                </div>
                <Footer />
            </div>
        );
    }
}

Award.propTypes = propTypes;
