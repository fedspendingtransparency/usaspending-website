/**
 * AgencyFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import {
    updateSelectedAwardingAgencies, updateSelectedFundingAgencies
} from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const AgencyFilterGroup = ({ filter }) => {
    const {
        selectedAwardingAgencies, selectedFundingAgencies
    } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const filterType = filter.code === 'selectedAwardingAgencies' ?
        selectedAwardingAgencies :
        selectedFundingAgencies;

    const filterDispatch = filter.code === 'selectedAwardingAgencies' ?
        updateSelectedAwardingAgencies :
        updateSelectedFundingAgencies;

    const toggleFilter = (value) => dispatch(filterDispatch({ agency: value }));

    const tags = [];

    filter.values.forEach((value) => {
        let agencyTitle = value.subtier_agency.name;

        if (value.agencyType === 'subtier' && value.subtier_agency.abbreviation) {
            agencyTitle += ` (${value.subtier_agency.abbreviation})`;
        }
        else if (value.agencyType === 'toptier' && value.toptier_agency.abbreviation) {
            agencyTitle += ` (${value.toptier_agency.abbreviation})`;
        }
        if (value.agencyType === 'subtier' && value.toptier_flag === false) {
            agencyTitle += ` | Sub-Agency of ${
                value.toptier_agency.abbreviation || value.toptier_agency.name
            }`;
        }

        const tag = {
            value,
            title: agencyTitle,
            toggleFilter,
            staged: filterType.has(`${value.id}_${value.agencyType}`)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

AgencyFilterGroup.propTypes = propTypes;
export default AgencyFilterGroup;
