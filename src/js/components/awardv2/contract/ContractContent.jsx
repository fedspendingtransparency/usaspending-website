/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool
};

export default class ContractContent extends React.Component {
    render() {
        return (
            <div className="award-contract">
                <div className="award-contract__heading">
                    <span className="award-contract__heading_bold">{this.props.selectedAward.typeDescription}</span> <div className="award-contract__heading-glossary"><Icons.Glossary /></div> | {this.props.selectedAward.id}
                    <hr className="award-contract__heading-divider" />
                </div>
            </div>
        );
    }
}
ContractContent.propTypes = propTypes;

