/**
 * Award.jsx
 * Created by Emily Gullo 01/19/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Error from '../sharedComponents/Error';
import AwardInfo from './AwardInfo';

const propTypes = {
    award: PropTypes.object,
    noAward: PropTypes.bool,
    inFlight: PropTypes.bool
};

export default class Award extends React.Component {
    render() {
        let awardInfo = null;
        if (this.props.award.selectedAward) {
            awardInfo = (
                <AwardInfo
                    {...this.props}
                    inFlight={this.props.inFlight}
                    selectedAward={this.props.award.selectedAward} />
            );
        }
        if (this.props.noAward === true) {
            awardInfo = (
                <div className="wrapper">
                    <Error
                        title="Invalid Award ID"
                        message="The award ID provided is invalid.
                        Please check the ID and try again." />
                </div>
            );
        }
        return (
            <div className="usa-da-award-page">
                <MetaTags {...MetaTagHelper.awardPageMetaTags} />
                <Header />
                { awardInfo }
                <Footer />
            </div>
        );
    }
}
Award.propTypes = propTypes;
