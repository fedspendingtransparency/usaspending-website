/**
 * InfoSnippet.jsx
 * Created by Emily Gullo 01/30/2017
 **/

import React from 'react';

const propTypes = {
    type: React.PropTypes.string,
    titleValue: React.PropTypes.string,
    nameValue: React.PropTypes.string
};

export default class InfoSnippet extends React.Component {

    render() {
        const title = `title ${this.props.type}`;
        const titleValue = this.props.titleValue;
        const name = `name ${this.props.type}`;
        const nameValue = this.props.nameValue;

        return (
            <li className={this.props.type}>
                <div className={title}>
                    {titleValue}
                </div>
                <div className={name}>
                    {nameValue}
                </div>
            </li>);
    }
}
InfoSnippet.propTypes = propTypes;
