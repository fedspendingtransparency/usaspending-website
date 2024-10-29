/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import AccordionCheckbox from "../../../sharedComponents/checkbox/AccordionCheckbox";

const awardTypesData = [
    {
        id: 'award-contracts',
        name: 'Contracts',
        filters: awardTypeGroups.contracts
    },
    {
        id: 'indefinite-delivery-vehicle',
        name: 'Contract IDVs',
        filters: awardTypeGroups.idvs
    },
    {
        id: 'award-grants',
        name: 'Grants',
        filters: awardTypeGroups.grants
    },
    {
        id: 'award-direct-payments',
        name: 'Direct Payments',
        filters: awardTypeGroups.direct_payments
    },
    {
        id: 'award-loans',
        name: 'Loans',
        filters: awardTypeGroups.loans
    },
    {
        id: 'award-other',
        name: 'Other',
        filters: awardTypeGroups.other
    }
];

const propTypes = {
    awardType: PropTypes.object,
    bulkTypeChange: PropTypes.func,
    toggleCheckboxType: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

const AwardType = (props) => {
    const hint = useRef();

    useEffect(() => {
        if (hint.current) {
            hint.current.showHint();
        }
    }, [props.dirtyFilters]);

    return (
        <div className="award-type-filter search-filter checkbox-type-filter">
            <AccordionCheckbox
                filterCategoryMapping={awardTypesData}
                filters={awardTypeCodes}
                selectedFilters={props.awardType}
                singleFilterChange={props.toggleCheckboxType}
                bulkFilterChange={props.bulkTypeChange} />
            <SubmitHint
                ref={(component) => {
                    hint.current = component;
                }} />
        </div>
    );
};
AwardType.propTypes = propTypes;

export default AwardType;
