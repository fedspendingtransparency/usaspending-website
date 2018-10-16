/**
 * Accordion.jsx
 * Created by Kwadwo Opoku-Debrah 10/13/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    accordionName: PropTypes.string,
    accordionIcon: PropTypes.object,
    accordionData: PropTypes.object
};

export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, class: "accordion" };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className={this.state.open ? 'accordion-open' : 'accordion'}>
                <div className="accordion-bar" tabIndex={0} role="button" onKeyPress={this.handleClick} onClick={this.handleClick}>
                    {this.props.accordionName}
                    {this.props.accordionIcon}
                </div>
                <div className="accordion-content">
                    <div>
                        Parent Award Id
                        {this.props.accordionData.parent_award_id}
                    </div>
                    <div>
                        IDV Type
                        {this.props.accordionData.idvType}
                    </div>
                    <div>
                        IDC Type
                        {this.props.accordionData.idcType}
                    </div>
                    <div>
                        IDV Agency ID
                        {this.props.accordionData.idvAgencyId}
                    </div>
                    <div>
                        Multiple/Single IDV
                        {this.props.accordionData.multipleIdv}
                    </div>
                </div>
            </div>
        );
    }
}

Accordion.propTypes = propTypes;
