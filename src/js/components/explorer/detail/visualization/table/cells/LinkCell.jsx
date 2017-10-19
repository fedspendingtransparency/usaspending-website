/**
 * LinkCell.jsx
 * Created by Lizzie Salita 10/12/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
// import reactStringReplace from 'react-string-replace';

const propTypes = {
    name: PropTypes.string,
    data: PropTypes.object,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    id: PropTypes.string,
    selectedRow: PropTypes.func
};

export default class LinkCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickedLink = this.clickedLink.bind(this);
    }

    clickedLink() {
        this.props.selectedRow(this.props.id, this.props.data);
    }

    render() {
        const name = this.props.name;

        return (
            <div className={`explorer-link-cell column-${this.props.column}`}>
                <div className="cell-content">
                    <button
                        className="go-deeper-link"
                        onClick={this.clickedLink} >
                        {name}
                    </button>
                </div>
            </div>
        );
    }
}

LinkCell.propTypes = propTypes;
