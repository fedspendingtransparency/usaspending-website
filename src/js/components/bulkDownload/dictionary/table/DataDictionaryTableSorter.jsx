/**
 * DataDictionaryTableSorter.jsx
 * Created by Lizzie Salita 9/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    field: PropTypes.string,
    label: PropTypes.string,
    changeSort: PropTypes.func,
    active: PropTypes.object
};

const DataDictionaryTableSorter = (props) => {
    const sortDesc = () => {
        props.changeSort(props.field, 'desc');
    };
    const sortAsc = () => {
        props.changeSort(props.field, 'asc');
    };

    const activeAsc = props.active.field === props.field && props.active.direction === 'asc'
        ? 'header-sorter__button_active' : '';
    const activeDesc = props.active.field === props.field && props.active.direction === 'desc'
        ? 'header-sorter__button_active' : '';

    return (
        <div className="state-list__head-sorter header-sorter">
            <button
                className={`header-sorter__button ${activeAsc}`}
                onClick={sortAsc}>
                <ArrowUp
                    alt={`Sort table by ascending ${props.label}`} />
            </button>
            <button
                className={`header-sorter__button ${activeDesc}`}
                onClick={sortDesc}>
                <ArrowDown
                    alt={`Sort table by descending ${props.label}`} />
            </button>
        </div>
    );
};

DataDictionaryTableSorter.propTypes = propTypes;

export default DataDictionaryTableSorter;
