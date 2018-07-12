import { initialState } from 'redux/reducers/recipient/recipientReducer';
import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import { mockRecipientOverview } from '../../models/recipient/mockRecipientApi';

export const mockActions = {
    setRecipientOverview: jest.fn(),
    setRecipientFiscalYear: jest.fn()
};

export const mockRedux = {
    params: {
        recipientId: '0123456-ABC-P'
    },
    recipient: initialState
};

export const mockModalActions = {
    setRecipientChildren: jest.fn()
};

// Create a populated recipient overview
const overview = Object.create(BaseRecipientOverview);
overview.populate(mockRecipientOverview);

// Set the id and recipient overview
const recipient = Object.assign({}, initialState, {
    overview
});

export const mockModalRedux = {
    recipient,
    mounted: false,
    hideModal: jest.fn()
};
