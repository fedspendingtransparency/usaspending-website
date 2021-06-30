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
import { isCancel } from 'axios';

const propTypes = {
    fiscalYear: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired
};

export default function ObligationsByAwardTypeContainer({ fiscalYear, windowWidth }) {
    const [categoriesForGraph, setCategoriesForGraph] = React.useState([]);
    const [detailsForGraph, setDetailsForGraph] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const obligationsByAwardTypeRequest = React.useRef(null);
    const { toptierCode } = useSelector((state) => state.agencyV2.overview);

    React.useEffect(() => () => {
        if (obligationsByAwardTypeRequest.current) {
            obligationsByAwardTypeRequest.current.cancel();
        }
    }, []);

    const getObligationsByAwardType = () => {
        if (obligationsByAwardTypeRequest.current) {
            obligationsByAwardTypeRequest.current.cancel();
        }
        if (error) {
            setError(false);
        };
        if (!loading) {
            setLoading(true);
        };
        obligationsByAwardTypeRequest.current = fetchObligationsByAwardType(toptierCode, fiscalYear);
        obligationsByAwardTypeRequest.current.promise.then((res) => {
            const categories = [
                {
                    label: ['Financial', 'Assistance'], // line break between words
                    value: 0,
                    color: '#C05600'
                },
                {
                    label: ['Contracts', ''], // so each cat label array is same length
                    value: 0,
                    color: '#545BA3'
                }
            ];
            const details = [
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
                        setError(true);
                }
            });
            setCategoriesForGraph(categories);
            setDetailsForGraph(details);
            setLoading(false);
            obligationsByAwardTypeRequest.current = null;
        }).catch((e) => {
            if (!isCancel(e)) {
                console.error(e);
                setError(true);
                setLoading(false);
                obligationsByAwardTypeRequest.current = null;
            }
        });
    };

    React.useEffect(() => {
        if (toptierCode) {
            getObligationsByAwardType();
        }
    }, [fiscalYear, toptierCode]);


    return (<>
        { loading && <LoadingMessage />}
        { error && <ErrorMessage />}
        { !loading && !error &&
            <ObligationsByAwardType
                outer={categoriesForGraph}
                inner={detailsForGraph}
                windowWidth={windowWidth} />
        }
    </>);
}

ObligationsByAwardTypeContainer.propTypes = propTypes;
