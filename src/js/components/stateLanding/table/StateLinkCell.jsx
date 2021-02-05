/**
 * StateLinkCell.jsx
 * Created by Lizzie Salita 6/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';
import { Link } from 'react-router-dom';
import { URLifyStateName } from 'helpers/stateHelper';
import { stateNameByFipsId } from 'dataMapping/state/stateNames';

const propTypes = {
    name: PropTypes.string,
    fips: PropTypes.string,
    searchString: PropTypes.string
};

export default class StateLinkCell extends React.Component {
    render() {
        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.searchString !== '') {
            name = replaceString(this.props.name, this.props.searchString, "state-list__matched");
        }

        return (
            <td className="state-list__body-cell">
                <Link to={`/state/${URLifyStateName(stateNameByFipsId[this.props.fips])}`}>
                    {name}
                </Link>
            </td>
        );
    }
}

StateLinkCell.propTypes = propTypes;
