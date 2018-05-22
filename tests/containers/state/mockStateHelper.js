
// Fetch State Overview
import { mockStateOverview } from './mockData';
import { mockBreakdownApi} from "../../models/state/mockStateApi";

export const fetchStateOverview = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockStateOverview
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAwardBreakdown = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBreakdownApi
                });
            });
        }),
        cancel: jest.fn()
    }
);
