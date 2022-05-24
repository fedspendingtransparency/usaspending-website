/**
 * AgencyLinkCell.jsx
 * Created by Lizzie Salita 7/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';
import { Link } from 'react-router-dom';

export default class AgencyLinkCell extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        column: PropTypes.string,
        id: PropTypes.number,
        agencySearchString: PropTypes.string
    };

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
