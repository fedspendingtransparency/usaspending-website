/**
 * mockAward.js
 * Created by David Trinh 10/6/18
 */

import { mockContract } from '../../models/awardsV2/mockAwardApi';

export const mockParams = {
    params: {
        awardId: '1234'
    },
    award: {
        id: '1234',
        category: 'contract',
        overview: mockContract
    }
};

export const mockActions = {
    setAward: jest.fn(),
    resetAward: jest.fn()
};

