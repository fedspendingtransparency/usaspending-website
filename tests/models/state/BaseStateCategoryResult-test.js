/**
 * @jest-environment jsdom
 * 
 * BaseStateCategoryResult-test.js
 * Created by Kevin Li 5/21/18
 */

import BaseStateCategoryResult, { defaultNameTemplate } from 'models/v2/state/BaseStateCategoryResult';
import { mockStateCategoryApi } from './mockStateApi';

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

describe('BaseStateCategoryResult', () => {
    describe('populate', () => {
        it('should store a numeric index', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[0], 2);

            expect(result.index).toEqual(2);
        });
        it('should store the API input as remapped model properties', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[0], 2);

            expect(result.id).toEqual(1);
            expect(result._name).toEqual('Banana');
            expect(result._code).toEqual('1234');
            expect(result._amount).toEqual(1.01);
        });
        it('should use fallback values for certain properties when no data is provided', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate({}, 2);

            expect(result._name).toEqual('--');
            expect(result._code).toEqual('');
            expect(result._amount).toEqual(0);
        });
    });
    describe('amount', () => {
        it('should format the raw amount as a currency string', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[0], 2);

            expect(result.amount).toEqual('$1');
        });
        it('should add a unit label to amounts that is equal to or more than one million', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[2], 2);

            expect(result.amount).toEqual('$1.00M');
        });
    });
    describe('nameTemplate', () => {
        it('should set the _nameTemplate property to the provided function', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate({}, 2);

            const testFunc = jest.fn();

            result.nameTemplate = testFunc;
            expect(result._nameTemplate).toEqual(testFunc);
        });
    });
    describe('combinedName', () => {
        it('should output the _nameTemplate function result', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[0], 1);

            result.nameTemplate = jest.fn(() => 'test');
            const output = result.combinedName;
            expect(result._nameTemplate).toHaveBeenCalledTimes(1);
            expect(result._nameTemplate).toHaveBeenLastCalledWith('1234', 'Banana', "banana");
            expect(output).toEqual('test');
        });
    });
    describe('name', () => {
        it('should return a string that is the index number and the combined name', () => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(mockStateCategoryApi.results[0], 2);

            expect(result.name).toEqual('2. 1234 - Banana');
        });
    });
});
