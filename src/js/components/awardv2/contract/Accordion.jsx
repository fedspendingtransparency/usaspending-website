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
            <div className={this.state.open ? 'accordion accordion_open' : 'accordion'}>
                <div
                    className="accordion__bar"
                    tabIndex={0}
                    role="button"
                    onKeyPress={this.handleClick}
                    onClick={this.handleClick}>
                    <span>
                        {this.props.accordionIcon}
                        {this.props.accordionName}
                    </span>
                    <span>
                        {this.state.open ? <AngleDown /> : <AngleRight />}
                    </span>
                </div>
                <div className="accordion__content">
                    <table className="accordion-table">
                        <tbody>
                            {
                                Object.keys(this.props.accordionData).map((keyValue) => (
                                    <tr
                                        key={keyValue}
                                        className="accordion-table__row">
                                        <td>{keyValue}</td>
                                        <td>{this.props.accordionData[keyValue] || 'not provided'}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

Accordion.propTypes = propTypes;
