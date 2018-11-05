/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import { startCase } from "lodash";

const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool,
    id: PropTypes.string
};

export default class FinancialAssistanceContent extends React.Component {
    render() {
        // TODO: determine glossary term for link
        return (
            <div className="award award-financial-assistance">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.selectedAward.typeDescription)}</div>
                    <div className="award__heading-glossary">
                        <a href={`#/award_v2/${this.props.id}/?glossary=grant`}>
                            <Icons.Glossary />
                        </a>
                    </div>
                    <div className="award__heading-id">
                        <span className="award__heading-lable">PIID</span>
                        {this.props.selectedAward.id}
                    </div>
                </div>
                <hr className="award__divider" />
            </div>
        );
    }
}
FinancialAssistanceContent.propTypes = propTypes;
