/**
 * RecipientDetails.jsx
 * Created by Lizzie Salita 6/27/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createOnKeyDownHandler } from 'helpers/keyboardEventsHelper';

const propTypes = {
    data: PropTypes.object,
    globalToggle: PropTypes.bool
};

export default class RecipientDetails extends React.Component {
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

    formatRecipientLink(internalId, name) {
        if (internalId && name) {
            return (<a href={`#/recipient/${internalId}`}>{name}</a>);
        }
        else if (internalId) {
            return (<a href={`#/recipient/${internalId}`}>Unknown</a>);
        }
        else if (name) {
            return name;
        }
        return '--';
    }

    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.handleClick);
        return (
            <div className={this.state.open ? 'accordion accordion_open' : 'accordion'}>
                <div
                    className="accordion__bar"
                    tabIndex={0}
                    role="button"
                    onKeyDown={onKeyDownHandler}
                    onClick={this.handleClick}>
                    <span>
                        <FontAwesomeIcon size="lg" icon="building" />
                        Recipient Details
                    </span>
                    <span>
                        {this.state.open ? <FontAwesomeIcon size="lg" icon="angle-down" /> : <FontAwesomeIcon size="lg" icon="angle-right" />}
                    </span>
                </div>
                <div className="accordion__content">
                    <table className="accordion-table">
                        <tbody>
                            <tr
                                className="accordion-table__row">
                                <td>Recipient</td>
                                <td>
                                    {this.formatRecipientLink(this.props.data.internalId, this.props.data._name)}
                                </td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td>DUNS</td>
                                <td>{this.props.data.duns}</td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td>Parent Name</td>
                                <td>
                                    {this.formatRecipientLink(this.props.data.parentInternalId, this.props.data.parentName)}
                                </td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td>Parent DUNS</td>
                                <td>{this.props.data.parentDuns}</td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td>Address</td>
                                <td>
                                    <div>{this.props.data.location.streetAddress}</div>
                                    <div>{this.props.data.location.regionalAddress}</div>
                                    <div>{this.props.data.location.fullCongressionalDistrict}</div>
                                </td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td>Business Types</td>
                                <td>
                                    <ul className="accordion-table__list">
                                        {this.props.data.businessCategories.map((type) => <li key={type}>{type}</li>)}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

RecipientDetails.propTypes = propTypes;
