/**
 * Accordion.jsx
 * Created by Kwadwo Opoku-Debrah 10/13/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { AngleUp, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    accordionName: PropTypes.string,
    accordionIcon: PropTypes.object,
    accordionData: PropTypes.object,
    globalOpen: PropTypes.bool
};

export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.globalOpen !== prevProps.globalOpen) {
            this.setState({
                open: this.props.globalOpen
            });
        }
    }
    handleClick() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className={this.state.open ? 'accordion-open' : 'accordion'}>
                <div className="accordion-bar" tabIndex={0} role="button" onKeyPress={this.handleClick} onClick={this.handleClick}>
                    <span>
                        {this.props.accordionIcon}
                        {this.props.accordionName}
                    </span>
                    <span>
                        {this.state.open ? <AngleDown /> : <AngleUp />}
                    </span>
                </div>
                <div className="accordion-content">
                    {Object.keys(this.props.accordionData).map((key) => (
                        <div className="data-row">
                            <span key={key}>{key.split("_").join(" ")}</span>
                            <span key={this.props.accordionData[key]}>{this.props.accordionData[key]}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = propTypes;
