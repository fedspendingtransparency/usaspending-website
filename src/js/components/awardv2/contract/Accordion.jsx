/**
 * Accordion.jsx
 * Created by Kwadwo Opoku-Debrah 10/13/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { AngleRight, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    accordionName: PropTypes.string,
    accordionIcon: PropTypes.object,
    accordionData: PropTypes.object,
    globalToggle: PropTypes.bool
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
        if (this.props.globalToggle !== prevProps.globalToggle) {
            this.globalOverride();
        }
    }
    handleClick() {
        this.setState({ open: !this.state.open });
    }

    globalOverride() {
        this.setState({
            open: this.props.globalToggle
        });
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
                        {this.state.open ? <AngleDown /> : <AngleRight />}
                    </span>
                </div>
                <div className="accordion-content">
                    {Object.keys(this.props.accordionData).map((key) => (
                        <div className="data-row">
                            <span key={key}>{key.split("_").join(" ")}</span>
                            <span key={this.props.accordionData[key]}>{this.props.accordionData[key] || 'not provided'}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = propTypes;
