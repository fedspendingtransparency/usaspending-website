/**
 * ObligationsByAwardTypeHelper.js
 * Created by Andrea Blackwell 12/15/2021
 */

import { mapToFullCategoryName, getCategoryNameByAwardType, getActiveCategoryType, getOuterCategoryId } from 'helpers/agencyV2/visualizations/ObligationsByAwardTypeHelper.js';

const mockCategories = [
    {
        label: ['All Financial', 'Assistance'], // line break between words
        value: 0,
        color: 'rgb(192, 86, 0)',
        fadedColor: 'rgb(192, 86, 0, 25%)'
    },
    {
        label: ['All Contracts', ''], // so each cat label array is same length
        value: 0,
        color: 'rgb(84, 91, 163)',
        fadedColor: 'rgb(84, 91, 163, 25%)'
    }
];

const mockDetails = [
    {
        label: 'Grants',
        color: 'rgb(230, 111, 14)',
        fadedColor: 'rgb(230, 111, 14, 25%)',
        type: 'financial'
    },
    {
        label: 'Loans',
        color: 'rgb(255, 188, 120)',
        fadedColor: 'rgb(255, 188, 120, 25%)',
        type: 'financial'
    },
    {
        label: 'Direct Payments',
        color: 'rgb(250, 148, 65)',
        fadedColor: 'rgb(250, 148, 65, 25%)',
        type: 'financial'
    },
    {
        label: 'Other Financial Assistance',
        color: 'rgb(252, 226, 197)',
        fadedColor: 'rgb(252, 226, 197, 25%)',
        type: 'financial'
    },
    {
        label: 'Contracts',
        color: 'rgb(127, 132, 186)',
        fadedColor: 'rgb(127, 132, 186, 25%)',
        type: 'contracts'
    },
    {
        label: 'IDVs',
        color: 'rgb(169, 173, 209)',
        fadedColor: 'rgb(169, 173, 209, 25%)',
        type: 'contracts'
    }
];

const mockCategoryMapping = {
    'All Contracts': ['Contracts', 'IDVs'],
    'All Financial': ['Grants', 'Loans', 'Direct Payments', 'Other Financial Assistance']
};

describe('Obligations By Award Type Visualization', () => {

    it('should return a full category name from short category name', () => {
        expect(mapToFullCategoryName('contracts'))
            .toEqual('All Contracts');
    });

    it('should return a full category name by award type', () => {
        expect(getCategoryNameByAwardType('IDVs', mockCategoryMapping))
            .toEqual('All Contracts');
    });

    it('should get the active category type from the active award type', () => {
        expect(getActiveCategoryType('Loans', mockCategoryMapping))
            .toEqual('financial');
    });

    it('should an id from a full category name', () => {
        expect(getOuterCategoryId('All Financial', mockCategories))
            .toEqual(0);
    });
});
