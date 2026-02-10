/**
 * ProgramSourceFilterGroup.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const ProgramSourceFilterGroup = ({ filter }) => {
    const tasCodes = useSelector((state) => state.filters.tasCodes);
    const dispatch = useDispatch();

    console.log({ tasCodes });

    const removeFilter = (value) => {
        console.log({ value });
        // remove a single filter item
        // const newValue = tasCodes.delete(value);
        // this.props.redux.updateGenericFilter({
        //     type: this.props.filter.code,
        //     value: newValue
        // });
        const newValue = tasCodes.delete(value);

        dispatch(updateGenericFilter({
            type: filter.code,
            value: newValue
        }));
    };

    const label = (filter.code === 'treasuryAccounts') ? 'TAS #' : 'FA #';

    const tags = filter.values.map((tas) => {
        const title = tas.isCheckbox
            ? tas.tas_description
            : `${label} | ${tas}`;

        return {
            value: tas,
            title,
            toggleFilter: removeFilter
        };
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

ProgramSourceFilterGroup.propTypes = propTypes;
export default ProgramSourceFilterGroup;
