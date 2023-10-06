/**
 * @jest-environment jsdom
 *
 * StatusOfFundsVizHelper-test.js
 * Created by Brian Petway 10/06/23
 * */

import { parseRows, getLevel5Data } from 'helpers/agency/StatusOfFundsVizHelper';
import { mockData, mockParsedData } from '../../../mockData/helpers/statusOfFundsHelper';

test('parseRows', () => {
    expect(parseRows(mockData)).toHaveLength(mockParsedData.length);
    expect(parseRows(mockData)).toEqual(expect.arrayContaining(mockParsedData));
});
