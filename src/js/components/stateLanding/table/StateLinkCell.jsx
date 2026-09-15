/**
 * StateLinkCell.jsx
 * Created by Lizzie Salita 6/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';
import { Link } from 'react-router';
import { URLifyStateName } from 'features/state/stateHelper';
import { useStateNameByFipsId } from "../../../hooks/useStateData";
const propTypes = {
    name: PropTypes.string,
    fips: PropTypes.string,
    searchString: PropTypes.string
};

const StateLinkCell = ({name, fips, searchString}) => {
    let tempname = name;
    let stateNameByFipsId = useStateNameByFipsId();
    // highlight the matched string if applicable
    if (searchString !== '') {
        tempname = replaceString(name, searchString, "state-list__matched");
    }

    return (
        <td className="state-list__body-cell">
            <Link to={`/state/${URLifyStateName(stateNameByFipsId?.[fips])}`}>
                {tempname}
            </Link>
        </td>
    );
    
};

StateLinkCell.propTypes = propTypes;
export default StateLinkCell;