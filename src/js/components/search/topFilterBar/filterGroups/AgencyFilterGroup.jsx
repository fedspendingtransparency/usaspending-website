/**
 * AgencyFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string, code: PropTypes.string };

const AgencyFilterGroup = ({ name, code }) => {
    const selectedAgencies = useSelector((state) => state.filters[code]);
    const appliedAgencies = useSelector((state) => state.appliedFilters.filters[code]);
    const dispatch = useDispatch();

    const toggleFilter = ({ key, value }, staged) => {
        const newValue = staged ?
            selectedAgencies.delete(key) :
            selectedAgencies.set(key, value);

        dispatch(updateGenericFilter({
            type: code,
            value: newValue
        }));
    };

    const tags = [];

    appliedAgencies.forEach((value) => {
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

        const key = `${value.id}_${value.agencyType}`;

        const tag = {
            value: { key, value },
            title: agencyTitle,
            toggleFilter,
            staged: selectedAgencies.has(key)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

AgencyFilterGroup.propTypes = propTypes;
export default AgencyFilterGroup;
