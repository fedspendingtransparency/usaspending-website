/**
 * ObligationsByAwardTypeContainer.jsx
 * Created by Brett Varney 4/30/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ObligationsByAwardType from 'components/agencyV2/visualizations/ObligationsByAwardType';
import { LoadingMessage } from 'data-transparency-ui';
import { fetchObligationsByAwardType } from 'apis/agencyV2';
// import * as MoneyFormatter from 'helpers/moneyFormatter';

// reduce api data into 2 arrays, one for each ring
const categories = [
    {
        label: ['Financial', 'Assistance'], // line break between words
        value: 0,
        color: '#FFBC78'
    },
    {
        label: ['Contracts', ''], // so each cat label array is same length
        value: 0,
        color: '#A9ADD1'
    }
];
const details = [
    {
        label: ['Grants'],
        color: '#C05600'
    },
    {
        label: ['Loans'],
        color: '#FA9441'
    },
    {
        label: ['Direct Payments'],
        color: '#E66F0E'
    },
    {
        label: ['Other'],
        color: '#FFBC78'
    },
    {
        label: ['IDVs'],
        color: '#545BA3'
    },
    {
        label: ['Contracts'],
        color: '#A9ADD1'
    }
];

const propTypes = {
    fiscalYear: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired
};

export default function ObligationsByAwardTypeContainer({ fiscalYear, windowWidth }) {
    const [loading, setLoading] = React.useState(true);
    const { toptierCode } = useSelector((state) => state.agencyV2.overview);

    if (toptierCode) {
        fetchObligationsByAwardType(toptierCode, fiscalYear).promise.then((res) => {
            res.data.results.forEach((d) => {
                switch (d.category) {
                    case 'grants':
                        categories[0].value += d.aggregated_amount;
                        details[0].value = d.aggregated_amount;
                        break;
                    case 'loans':
                        categories[0].value += d.aggregated_amount;
                        details[1].value = d.aggregated_amount;
                        break;
                    case 'direct_payments':
                        categories[0].value += d.aggregated_amount;
                        details[2].value = d.aggregated_amount;
                        break;
                    case 'other':
                        categories[0].value += d.aggregated_amount;
                        details[3].value = d.aggregated_amount;
                        break;
                    case 'idvs':
                        categories[1].value += d.aggregated_amount;
                        details[4].value = d.aggregated_amount;
                        break;
                    case 'contracts':
                        categories[1].value += d.aggregated_amount;
                        details[5].value = d.aggregated_amount;
                        break;
                    default:
                        console.error('Category name from API not recognized: ' + d.category);
                };
            });

            setLoading(false);
        });
    }

    if (loading) {
        return <LoadingMessage />;
    }
    else {
        return (
            <ObligationsByAwardType
                outer={categories}
                inner={details}
                windowWidth={windowWidth} />
        );
    }
}

ObligationsByAwardTypeContainer.propTypes = propTypes;
