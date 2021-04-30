/**
 * ObligationsByAwardTypeContainer.jsx
 * Created by Brett Varney 4/30/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ObligationsByAwardType from 'components/agencyV2/visualizations/ObligationsByAwardType';
import { LoadingMessage, ErrorMessage, NoResultsMessage } from 'data-transparency-ui';
import { fetchObligationsByAwardType } from 'apis/agencyV2';
// import * as MoneyFormatter from 'helpers/moneyFormatter';

export default function ObligationsByAwardTypeContainer({ windowWidth, fiscalYear }) {

  // recalc chart area when windowWidth prop changes
  const chartRef = React.useRef();
  const [chartRect, setChartRect] = React.useState([0, 0]); // height, width
  React.useEffect(() => {
    if (chartRef.current) {
      const rect = chartRef.current && chartRef.current.getBoundingClientRect();
      if (rect.height !== vizRect.height || rect.width !== vizRect.width) {
        setChartRect([rect.height, rect.width]);
      }
    }
  }, [windowWidth]);

  // reduce api data into 2 arrays, one for each ring
  const categories = [
    {
      label: 'Financial/nAssistance',
      color: '#FFBC78'
    },
    {
      label: 'Contracts',
      color: '#A9ADD1'
    }
  ];
  const details = [
    {
      label: 'Grants',
      color: '#C05600'
    },
    {
      label: 'Loans',
      color: '#FA9441'
    },
    {
      label: 'Direct Payments',
      color: '#E66F0E'
    },
    {
      label: 'Other',
      color: '#FFBC78'
    },
    {
      label: 'IDVs',
      color: '#545BA3'
    },
    {
      label: 'Contracts',
      color: '#A9ADD1'
    },
  ];

  const [loading, setLoading] = React.useState(true);
  const { toptierCode } = useSelector((state) => state.agencyV2.overview);
  if (toptierCode) {
    fetchObligationsByAwardType(toptierCode, fiscalYear).promise.then(res => {

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
            console.error('Category name from API not recognized: ' + category);
        };
      });

      setLoading(false);
    });

  };


  if (loading) {
    return <LoadingMessage />
  }
  return <ObligationsByAwardType ref={chartRef}
    height={chartRect[0]}
    width={chartRect[1]}
    outer={categories}
    inner={details}
  />
}

ObligationsByAwardTypeContainer.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  fiscalYear: PropTypes.number
};
