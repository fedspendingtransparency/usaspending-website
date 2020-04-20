/**
 * Created by Jonathan Hill 03/26/20
 */

import moment from 'moment';

export const goodDates = {
    _startDate: moment('01/25/2011', 'MM/DD/YYYY'),
    _endDate: moment('05/25/2013', 'MM/DD/YYYY'),
    _potentialEndDate: moment('11/13/2015', 'MM/DD/YYYY')
};

export const badDates = {
    _startDate: moment(null),
    _endDate: moment(null),
    _potentialEndDate: moment(null)
};

export const badEndDates = {
    _startDate: moment('01/25/2011', 'MM/DD/YYYY'),
    _endDate: moment(null),
    _potentialEndDate: moment(null)
};

export const badStartDate = {
    _startDate: moment(null),
    _endDate: moment('05/25/2013', 'MM/DD/YYYY'),
    _potentialEndDate: moment('11/13/2015', 'MM/DD/YYYY')
};

export const badEndDate = {
    _startDate: moment('01/25/2011', 'MM/DD/YYYY'),
    _endDate: moment(null),
    _potentialEndDate: moment('11/13/2015', 'MM/DD/YYYY')
};

export const badPotentialEndDate = {
    _startDate: moment('01/25/2011', 'MM/DD/YYYY'),
    _endDate: moment('05/25/2013', 'MM/DD/YYYY'),
    _potentialEndDate: moment(null)
};

export const noTransactionDates = [
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00023_-NONE-_16',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment(null),
        action_type: 'A',
        action_type_description: 'ADDITIONAL WORK (NEW AGREEMENT,FAR PART 6 APPLIES)',
        modification_number: 'P00023',
        description: 'DEFINITIZATION OF 12-14 AND NEW SCOPE.',
        federal_action_obligation: -147906331,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    },
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00023_-NONE-_16',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment(null),
        action_type: 'A',
        action_type_description: 'ADDITIONAL WORK (NEW AGREEMENT,FAR PART 6 APPLIES)',
        modification_number: 'P00023',
        description: 'DEFINITIZATION OF 12-14 AND NEW SCOPE.',
        federal_action_obligation: -147906331,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    }
];

export const oneTransaction = [
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00023_-NONE-_16',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment('2012-10-28', 'YYYY-MM-DD'),
        action_type: 'A',
        action_type_description: 'ADDITIONAL WORK (NEW AGREEMENT,FAR PART 6 APPLIES)',
        modification_number: 'P00023',
        description: 'DEFINITIZATION OF 12-14 AND NEW SCOPE.',
        federal_action_obligation: -147906331,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    }
];

export const mockTransactions = [
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00023_-NONE-_16',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment('2012-10-28', 'YYYY-MM-DD'),
        action_type: 'A',
        action_type_description: 'ADDITIONAL WORK (NEW AGREEMENT,FAR PART 6 APPLIES)',
        modification_number: 'P00023',
        description: 'DEFINITIZATION OF 12-14 AND NEW SCOPE.',
        federal_action_obligation: -147906331,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    },
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00001_-NONE-_14',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment('2012-07-03', 'YYYY-MM-DD'),
        action_type: 'M',
        action_type_description: 'OTHER ADMINISTRATIVE ACTION',
        modification_number: 'P00001',
        description: 'THE PURPOSE OF THIS MODIFICATION IS TO INCREASE USMC LRIP 12 AAC FUNDING AND QUANTITIES, AND AMEND LRIP 12 AAC JAPAN FMS FUNDING',
        federal_action_obligation: 0,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    },
    {
        id: 'CONT_TX_9700_-NONE-_N0001917C0001_P00014_-NONE-_14',
        type: 'D',
        type_description: 'DEFINITIVE CONTRACT',
        action_date: moment('2012-03-25', 'YYYY-MM-DD'),
        action_type: 'B',
        action_type_description: 'SUPPLEMENTAL AGREEMENT FOR WORK WITHIN SCOPE',
        modification_number: 'P00014',
        description: 'IGF::OT::IGF US ONLY REQUIREMENT',
        federal_action_obligation: 0,
        face_value_loan_guarantee: null,
        original_loan_subsidy_cost: null
    }
];
