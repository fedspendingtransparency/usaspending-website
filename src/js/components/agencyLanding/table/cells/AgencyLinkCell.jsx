/**
 * AgencyLinkCell.jsx
 * Created by Lizzie Salita 7/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';
import { Link } from 'react-router-dom';

const propTypes = {
    name: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    id: PropTypes.number,
    agencySearchString: PropTypes.string
};

export default class AgencyLinkCell extends React.Component {
    render() {
        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.agencySearchString !== '') {
            name = replaceString(this.props.name, this.props.agencySearchString, "matched");
        }

        return (
            <div className={`agency-link-cell column-${this.props.column}`}>
                <div className="cell-content">
                    <Link to={`/agency/${this.props.id}`}>
                        {name}
                    </Link>
                </div>
            </div>
        );
    }
}

AgencyLinkCell.propTypes = propTypes;
