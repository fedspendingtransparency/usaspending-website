/**
 * mockAward.js
 * Created by David Trinh 10/6/18
 */

import { mockContract, mockIdv } from '../../models/award/mockAwardApi';

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
    setCounts: jest.fn(),
    resetAward: jest.fn(),
    setDownloadExpectedUrl: jest.fn(),
    setDownloadExpectedFile: jest.fn(),
    setDownloadPending: jest.fn(),
    setDownloadCollapsed: jest.fn()
};

export const mockRedux = {
    award: {
        id: '1234',
        category: 'idv',
        overview: mockIdv,
        counts: {
            idvs: 45,
            contracts: 52
        }
    }
};
