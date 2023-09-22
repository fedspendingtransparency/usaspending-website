/**
 * @jest-environment jsdom
 * 
 * ObligationsByAwardTypeHelper-test.js
 * Created by Andrea Blackwell 12/15/2021
 */

import { mapToFullCategoryName, getCategoryNameByAwardType, getActiveCategoryType, getOuterCategoryId } from 'helpers/agency/visualizations/ObligationsByAwardTypeHelper';

const mockCategories = [
    {
        label: ['All Category1']
    },
    {
        label: ['All Category2']
    }
];

const mockDetails = [
    {
        label: 'Grants',
        type: 'category2'
    },
    {
        label: 'Loans',
        type: 'category2'
    },
    {
        label: 'Contracts',
        type: 'category1'
    },
    {
        label: 'IDVs',
        type: 'category1'
    }
];

const mockCategoryMapping = {
    'All Category1': ['Contracts', 'IDVs'],
    'All Category2': ['Grants', 'Loans']
};

describe('Obligations By Award Type Visualization', () => {
    it('should return a full category name from category type', () => {
        expect(mapToFullCategoryName(mockDetails[2].type))
            .toEqual('All Category1');
    });

    it('should return a full category name by award type', () => {
        expect(getCategoryNameByAwardType(mockDetails[3].label, mockCategoryMapping))
            .toEqual('All Category1');
    });

    it('should get the active category type from the active award type', () => {
        expect(getActiveCategoryType(mockDetails[1].label, mockCategoryMapping))
            .toEqual('category2');
    });

    it('should an id from a full category name', () => {
        expect(getOuterCategoryId('All Category1', mockCategories))
            .toEqual(0);
    });
});
