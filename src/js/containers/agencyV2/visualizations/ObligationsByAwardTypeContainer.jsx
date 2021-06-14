/**
 * ObligationsByAwardTypeContainer.jsx
 * Created by Brett Varney 4/30/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ObligationsByAwardType from 'components/agencyV2/visualizations/ObligationsByAwardType';
import { LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import { fetchObligationsByAwardType } from 'apis/agencyV2';

// reduce api data into 2 arrays, one for each ring
let categories = [
    {
        label: ['Financial', 'Assistance'], // line break between words
        color: '#C05600'
    },
    {
        label: ['Contracts', ''], // so each cat label array is same length
        color: '#545BA3'
    }
];
let details = [
    {
        label: ['Grants'],
        color: '#E66F0E'
    },
    {
        label: ['Loans'],
        color: '#FFBC78'
    },
    {
        label: ['Direct Payments'],
        color: '#FA9441'
    },
    {
        label: ['Other'],
        color: '#FCE2C5'
    },
    {
        label: ['Contracts'],
        color: '#7F84BA'
    },
    {
        label: ['IDVs'],
        color: '#A9ADD1'
    }
];

const propTypes = {
    fiscalYear: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired
};

export default function ObligationsByAwardTypeContainer({ fiscalYear, windowWidth }) {
    const [isLoading, setLoading] = React.useState(true);
    const { toptierCode } = useSelector((state) => state.agencyV2.overview);
    let isError = false;

    if (toptierCode) {

        // reset accumulators for new data
        categories[0].value = 0;
        categories[1].value = 0;

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
                    case 'contracts':
                        categories[1].value += d.aggregated_amount;
                        details[4].value = d.aggregated_amount;
                        break;
                    case 'idvs':
                        categories[1].value += d.aggregated_amount;
                        details[5].value = d.aggregated_amount;
                        break;
                    default:
                        console.error(`Category name from API not recognized: ${d.category}`);
                        isError = true;
                }
            });


console.log(JSON.parse(JSON.stringify( categories)));


            setLoading(false);
        });
    }

    return (<>
        { isLoading && <LoadingMessage />}
        { isError && <ErrorMessage />}
        { !isLoading && !isError &&
            <ObligationsByAwardType
                outer={categories}
                inner={details}
                windowWidth={windowWidth} />
        }
    </>);
}

ObligationsByAwardTypeContainer.propTypes = propTypes;
