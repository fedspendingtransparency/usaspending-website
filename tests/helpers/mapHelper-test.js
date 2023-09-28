/**
 * @jest-environment jsdom
 * 
 * mapHelper-test.js
 * Created by Lizzie Salita 12/30/20
 */

import * as MapHelper from 'helpers/mapHelper';

describe('Map helper functions', () => {
    describe('calculateRange', () => {
        const mockValues = [1, 3, 5, 11, 18];
        const { scale, segments, units } = MapHelper.calculateRange(mockValues);
        const mockLgValues = [0, 1000, 5000, 6000, 12000];
        const result = MapHelper.calculateRange(mockLgValues);
        it('should sort values into the correct bucket', () => {
            expect(scale(14)).toEqual(4); // A value of 14 should fall into the 4th "bucket"
            expect(scale(1)).toEqual(0);
            expect(result.scale(8001)).toEqual(4);
        });
        it('should return an array of segments for each map color', () => {
            expect(segments.length).toEqual(MapHelper.visualizationColors.length);
        });
        it('should return an array of segments with the upper range for each bucket', () => {
            expect(segments).toEqual([3, 6, 9, 12, 15, 18]);
            expect(result.segments).toEqual([2000, 4000, 6000, 8000, 10000, 12000]);
        });
        it('should calculate units for large values', () => {
            expect(units.unit).toEqual(1);
            expect(result.units.unit).toEqual(1000);
        });
        it('should handle a max value that exactly equals the upper range of the largest bucket', () => {
            expect(result.scale(12000)).toEqual(5);
        });
    });
});
