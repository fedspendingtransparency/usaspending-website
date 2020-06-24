/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCfdaCount, fetchAwardAmounts, fetchAwardCount } from 'helpers/disasterHelper';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';
import OverviewData from '../OverviewData';

const overviewData = [
    {
        type: 'cfdaCount',
        label: 'Total CFDA Programs'
    },
    {
        type: 'awardOutlays',
        label: 'Total Award Outlays',
        dollarAmount: true
    },
    {
        type: 'awardObligations',
        label: 'Total Award Obligations',
        dollarAmount: true
    },
    {
        type: 'numberOfAwards',
        label: 'Total Number of Awards'
    }
];

const SpendingByCFDA = () => {
    const [cfdaCount, setCfdaCount] = useState(null);
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
                // TODO - add award type codes
            }
        };
        fetchCfdaCount(params).promise
            .then((res) => {
                setCfdaCount(res.data.count);
            });
        fetchAwardAmounts(params).promise
            .then((res) => {
                setAwardObligations(res.data.obligation);
                setAwardOutlays(res.data.outlay);
            });
        fetchAwardCount(params).promise
            .then((res) => {
                setNumberOfAwards(res.data.count);
            });
    }, [defCodes]);

    const amounts = {
        cfdaCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    return (
        <div className="body__content assistance-listing">
            <h3 className="body__narrative">
                These are the assistance listings that supported the COVID-19 Response with <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        // TODO - use the active award type in the subtitle
                        subtitle="for all awards"
                        amount={amounts[data.type]} />
                ))}
            </div>
            <SpendingByCFDAContainer />
        </div>
    );
};

export default SpendingByCFDA;
