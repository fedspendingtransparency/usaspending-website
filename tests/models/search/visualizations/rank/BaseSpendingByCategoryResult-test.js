/**
 * @jest-environment jsdom
 * 
 * BaseSpendingByCategoryResult-test.js
 * Created by Lizzie Salita 6/5/18
 */

import BaseSpendingByCategoryResult, { defaultNameTemplate } from 'models/v2/search/visualizations/rank/BaseSpendingByCategoryResult';
import { mockCategoryApi } from './mockCategoryApi';

describe('defaultNameTemplate', () => {
    it('should create a title string that combines the code with the title', () => {
        const output = defaultNameTemplate('1234', 'Banana');
        expect(output).toEqual('1234 - Banana');
    });
    it('should just return the title when there is no code', () => {
        const output = defaultNameTemplate('', 'Banana');
        expect(output).toEqual('Banana');
    });
});

describe('BaseSpendingByCategoryResult', () => {
    describe('populate', () => {
        it('should store the API input as remapped model properties', () => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(mockCategoryApi.results[0], 2);

            expect(result.id).toEqual(1);
            expect(result._name).toEqual('Banana');
            expect(result._code).toEqual('1234');
            expect(result._amount).toEqual(1.01);
            expect(result.recipientId).toBe('Chocolate');
            expect(result._agencySlug).toBe('slug');
        });
        it('should use fallback values for certain properties when no data is provided', () => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate({}, 2);

            expect(result._name).toEqual('--');
            expect(result._code).toEqual('');
            expect(result._amount).toEqual(0);
        });
    });
    describe('amount', () => {
        it('should format the raw amount as a currency string', () => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(mockCategoryApi.results[0], 2);

            expect(result.amount).toEqual('$1');
        });
    });
    describe('nameTemplate', () => {
        it('should set the _nameTemplate property to the provided function', () => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate({}, 2);

            const testFunc = jest.fn();

            result.nameTemplate = testFunc;
            expect(result._nameTemplate).toEqual(testFunc);
        });
    });
    describe('name', () => {
        it('should output the _nameTemplate function result', () => {
            const result = Object.create(BaseSpendingByCategoryResult);
            result.populate(mockCategoryApi.results[0], 1);

            result.nameTemplate = jest.fn(() => 'test');
            const output = result.name;
            expect(result._nameTemplate).toHaveBeenCalledTimes(1);
            expect(result._nameTemplate).toHaveBeenLastCalledWith('1234', 'Banana');
            expect(output).toEqual('test');
        });
    });
});
