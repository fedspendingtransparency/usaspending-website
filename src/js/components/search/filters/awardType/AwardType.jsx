/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

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
    awardTypes: PropTypes.arrayOf(PropTypes.object),
    awardType: PropTypes.object,
    bulkTypeChange: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

const AwardType = (props) => {
    const hint = useRef();

    const awardTypes = awardTypesData.map((type, index) => (
        <PrimaryCheckboxType
            {...type}
            {...props}
            key={index}
            types={awardTypeCodes}
            filterType="Award"
            selectedCheckboxes={props.awardType}
            bulkTypeChange={props.bulkTypeChange} />
    ));

    useEffect(() => {
        if (hint.current) {
            hint.current.showHint();
        }
    }, [props.dirtyFilters]);

    return (
        <div className="award-type-filter search-filter checkbox-type-filter">
            <div className="filter-item-wrap">
                <ul className="checkbox-types">
                    {awardTypes}
                </ul>
                <SubmitHint
                    ref={(component) => {
                        hint.current = component;
                    }} />
            </div>
        </div>
    );
};
AwardType.propTypes = propTypes;

export default AwardType;
